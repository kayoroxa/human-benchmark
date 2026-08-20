const { test, expect } = require('@playwright/test');

async function start(page, path) {
  await page.goto(path);
  await expect(page.getByTestId('start-button')).toBeVisible();
  await page.getByTestId('start-button').click();
  await expect(page.locator('#overlay')).toBeHidden();
}

async function expectPuzzleFitsViewport(page) {
  const dimensions = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
  expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.height);
}

async function expectTutorialHighlightFitsViewport(page) {
  const dimensions = await page.getByTestId('tutorial-highlight').evaluate(element => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };
  });

  expect(dimensions.width).toBeGreaterThan(0);
  expect(dimensions.height).toBeGreaterThan(0);
  expect(dimensions.left).toBeGreaterThanOrEqual(-4);
  expect(dimensions.top).toBeGreaterThanOrEqual(-4);
  expect(dimensions.right).toBeLessThanOrEqual(dimensions.viewportWidth + 4);
  expect(dimensions.bottom).toBeLessThanOrEqual(dimensions.viewportHeight + 4);
}

async function solvePathPuzzle(page) {
  const state = await page.evaluate(() => ({
    start: document.querySelector('[data-testid="character"]').dataset.cell,
    heading: Number(document.querySelector('[data-testid="character"]').dataset.heading),
    goal: document.querySelector('[data-testid="goal"]').dataset.cell,
    edges: [...document.querySelectorAll('[data-edge]')].map(edge => edge.dataset.edge)
  }));
  const adjacency = new Map();
  for (const edge of state.edges) {
    const [from, to] = edge.split('|');
    adjacency.set(from, [...(adjacency.get(from) || []), to]);
    adjacency.set(to, [...(adjacency.get(to) || []), from]);
  }
  const queue = [state.start];
  const previous = new Map([[state.start, null]]);
  for (let index = 0; index < queue.length; index++) {
    const cell = queue[index];
    if (cell === state.goal) break;
    for (const next of adjacency.get(cell) || []) {
      if (!previous.has(next)) {
        previous.set(next, cell);
        queue.push(next);
      }
    }
  }
  const path = [];
  for (let cell = state.goal; cell; cell = previous.get(cell)) path.unshift(cell);
  const vectors = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const commands = [];
  let heading = state.heading;
  for (let index = 1; index < path.length; index++) {
    const [row, column] = path[index - 1].split(',').map(Number);
    const [nextRow, nextColumn] = path[index].split(',').map(Number);
    const target = vectors.findIndex(([dr, dc]) => row + dr === nextRow && column + dc === nextColumn);
    const delta = (target - heading + 4) % 4;
    if (delta === 1) commands.push('right');
    if (delta === 3) commands.push('left');
    if (delta === 2) commands.push('right', 'right');
    commands.push('forward');
    heading = target;
  }
  return commands;
}

async function readSchedulePuzzle(page) {
  return page.evaluate(() => {
    const meetings = [...document.querySelectorAll('.meeting')].map(button => ({
      id: button.dataset.meeting,
      start: Number(button.dataset.start),
      end: Number(button.dataset.end)
    }));
    const countCopy = document.querySelector('#rule-count-copy').textContent;
    const count = Number(countCopy.match(/\d+/)[0]);
    const target = countCopy.startsWith('Rejeite') ? meetings.length - count : count;
    const cutoffRule = document.querySelector('#rule-cutoff');
    const cutoffCopy = document.querySelector('#rule-cutoff-copy').textContent;
    const cutoffHour = cutoffRule.hidden ? null : Number(cutoffCopy.match(/\d+/)[0]);
    const cutoff = cutoffHour === null ? null : (cutoffHour - 9) * 2;
    const selections = [];

    function choose(next, selected) {
      if (selected.length === target) {
        selections.push(selected.slice());
        return;
      }
      for (let index = next; index < meetings.length; index++) {
        selected.push(index);
        choose(index + 1, selected);
        selected.pop();
      }
    }

    choose(0, []);
    const conflicts = (first, second) => first.start < second.end && second.start < first.end;
    const valid = selection => selection.every((meetingIndex, position) => {
      const meeting = meetings[meetingIndex];
      if (cutoff !== null && meeting.end > cutoff) return false;
      return selection.slice(position + 1).every(otherIndex => !conflicts(meeting, meetings[otherIndex]));
    });
    const validSelections = selections.filter(valid).map(selection => selection.map(index => meetings[index].id));
    const wrongSelection = selections.find(selection => !valid(selection)).map(index => meetings[index].id);
    return { meetings, target, cutoff, validSelections, wrongSelection };
  });
}

async function setAcceptedMeetings(page, acceptedIds) {
  const accepted = new Set(acceptedIds);
  const meetings = page.locator('.meeting');
  for (let index = 0; index < await meetings.count(); index++) {
    const meeting = meetings.nth(index);
    const id = await meeting.getAttribute('data-meeting');
    const rejected = await meeting.getAttribute('aria-pressed') === 'true';
    if (rejected !== !accepted.has(id)) await meeting.click();
  }
}

async function readAuditPuzzle(page) {
  return page.evaluate(() => {
    const meetings = [...document.querySelectorAll('.meeting')].map(button => ({
      id: button.dataset.meeting,
      start: Number(button.dataset.start),
      end: Number(button.dataset.end),
      accepted: button.getAttribute('aria-pressed') === 'false'
    }));
    const conflicts = (first, second) => first.start < second.end && second.start < first.end;
    const accepted = meetings.filter(meeting => meeting.accepted);
    const noConflicts = accepted.every((meeting, position) =>
      accepted.slice(position + 1).every(other => !conflicts(meeting, other))
    );
    let optimum = 0;

    function search(next, chosen) {
      if (chosen.every((meeting, position) =>
        chosen.slice(position + 1).every(other => !conflicts(meeting, other)))) {
        optimum = Math.max(optimum, chosen.length);
      }
      for (let index = next; index < meetings.length; index++) search(index + 1, [...chosen, meetings[index]]);
    }

    search(0, []);
    const criterionCopy = document.querySelector('#rule-count-copy').textContent;
    const criterion = criterionCopy.startsWith('Aceita') ? 'count' : 'maximum';
    const target = criterion === 'count' ? Number(criterionCopy.match(/\d+/)[0]) : null;
    const criterionMet = criterion === 'count' ? accepted.length === target : accepted.length === optimum;
    const answer = noConflicts && criterionMet ? 'both' : noConflicts ? 'no-conflicts' : criterionMet ? criterion : '';
    return { meetings, noConflicts, criterion, criterionMet, target, optimum, answer };
  });
}

test('index exposes every implemented benchmark', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('a[href="dashboard/"]')).toBeVisible();

  for (const href of [
    'benchmarks/ordenacao/',
    'benchmarks/diagnostico/',
    'benchmarks/cronograma/',
    'benchmarks/agenda/',
    'benchmarks/carteira/',
    'benchmarks/regra-oculta/',
    'benchmarks/fluxo/',
    'benchmarks/memoria-palavras/',
    'benchmarks/caminho/'
  ]) {
    await expect(page.locator(`a[href="${href}"]`)).toBeVisible();
  }
});

test('dashboard calculates averages and lists saved sessions', async ({ page }) => {
  await page.goto('/dashboard/');
  await page.evaluate(() => {
    BenchmarkHistory.save({ benchmark:'ordenacao', name:'Ordenação', seed:'abc', timeMs:30000, attempts:1, metric:{ label:'Tentativas médias', value:1 } });
    BenchmarkHistory.save({ benchmark:'ordenacao', name:'Ordenação', seed:'def', timeMs:60000, attempts:3, metric:{ label:'Tentativas médias', value:3 } });
  });
  await page.reload();

  const average = page.locator('.average').filter({ hasText:'Ordenação' });
  await expect(average.locator('.average-value')).toHaveText('2');
  await expect(average).toContainText('2 sessões');
  await expect(average).toContainText('0min 45s');
  await expect(page.locator('.history .row:not(.row-head)')).toHaveCount(2);
  await expect(page.locator('.history')).toContainText('seed def');
});

test('every play overlay offers a guided tutorial without starting the session', async ({ page }) => {
  const tutorials = [
    ['/benchmarks/ordenacao/?seed=abc', 5, true],
    ['/benchmarks/diagnostico/?seed=1', 5, true],
    ['/benchmarks/cronograma/?seed=21&level=3', 5, true],
    ['/benchmarks/agenda/?seed=7', 5, true],
    ['/benchmarks/carteira/?seed=10', 5, true],
    ['/benchmarks/regra-oculta/?seed=0', 5, true],
    ['/benchmarks/fluxo/?seed=0', 5, true],
    ['/benchmarks/memoria-palavras/?seed=1', 5, false],
    ['/benchmarks/caminho/?seed=42', 5, true]
  ];

  for (const [path, stepCount, hasTimer] of tutorials) {
    await page.goto(path);
    const initialTimer = hasTimer ? await page.locator('#timer').textContent() : null;

    await page.getByTestId('tutorial-button').click();
    await expect(page.getByTestId('tutorial')).toBeVisible();
    await expect(page.locator('#overlay')).toBeHidden();

    for (let step = 1; step <= stepCount; step++) {
      await expect(page.getByTestId('tutorial-progress')).toHaveText(`Passo ${step} de ${stepCount}`);
      expect((await page.getByTestId('tutorial-copy').innerText()).length).toBeGreaterThan(80);
      expect((await page.getByTestId('tutorial-example').innerText()).length).toBeGreaterThan(30);
      await expectTutorialHighlightFitsViewport(page);
      await expectPuzzleFitsViewport(page);
      await page.locator('.tutorial-next').click();
    }

    await expect(page.getByTestId('tutorial')).toBeHidden();
    await expect(page.locator('#overlay')).toBeVisible();
    if (hasTimer) await expect(page.locator('#timer')).toHaveText(initialTimer);
  }
});

test('diagnostic benchmark identifies the fault and resets the same session', async ({ page }) => {
  await start(page, '/benchmarks/diagnostico/?seed=1');
  await page.getByTestId('test-a').click();
  await page.getByTestId('test-b').click();
  await page.getByTestId('test-c').click();
  await page.getByTestId('test-d').click();
  await expect(page.locator('#out-a')).toHaveText('Passa');
  await expect(page.locator('#out-b')).toHaveText('Falha');
  await page.getByTestId('module-2').click();
  await page.locator('#submit-button').click();
  await expect(page.getByTestId('result')).toContainText('Diagnóstico correto');
  await expectPuzzleFitsViewport(page);

  await page.getByTestId('reset-button').click();
  await expect(page.locator('#overlay')).toBeVisible();
  await expect(page.locator('#tests-count')).toHaveText('0');
});

test('seed control opens a requested diagnostic instance', async ({ page }) => {
  await page.goto('/benchmarks/diagnostico/?seed=1');
  page.once('dialog', dialog => dialog.accept('2'));
  await page.getByTestId('overlay-seed-button').click();

  await expect(page).toHaveURL(/seed=2/);
  await expect(page.locator('#seed-value')).toHaveText('2');
  await expect(page.locator('#overlay')).toBeVisible();
});

test('meeting schedule preserves a wrong attempt and advances with a new level seed', async ({ page }) => {
  await start(page, '/benchmarks/cronograma/?seed=21&level=2');
  const puzzle = await readSchedulePuzzle(page);
  expect(puzzle.validSelections).toHaveLength(1);
  await expect(page.locator('#rule-count-copy')).toHaveText('Rejeite apenas 2 reuniões');

  await page.getByTestId('reset-button').click();
  await expect(page.locator('#overlay')).toBeVisible();
  expect((await readSchedulePuzzle(page)).meetings).toEqual(puzzle.meetings);
  await page.getByTestId('start-button').click();

  await setAcceptedMeetings(page, puzzle.wrongSelection);
  const rejectedBeforeCheck = await page.locator('.meeting[aria-pressed="true"]').evaluateAll(buttons => buttons.map(button => button.dataset.meeting));
  await page.getByTestId('check-button').click();
  await expect(page.getByTestId('feedback')).toContainText('regra');
  await expect(page.getByTestId('check-button')).toHaveText('Tentar de novo');
  const rejectedAfterCheck = await page.locator('.meeting[aria-pressed="true"]').evaluateAll(buttons => buttons.map(button => button.dataset.meeting));
  expect(rejectedAfterCheck).toEqual(rejectedBeforeCheck);

  await setAcceptedMeetings(page, puzzle.validSelections[0]);
  await page.getByTestId('check-button').click();
  await expect(page.getByTestId('feedback')).toContainText('Cronograma válido');
  await expect(page.getByTestId('check-button')).toHaveText('Continuar');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('benchmark-history-v1')).at(-1));
  expect(saved.details).toMatchObject({ level: 2, accepted: 4 });

  await page.getByTestId('check-button').click();
  await expect(page.locator('#overlay')).toBeVisible();
  await expect(page.getByTestId('level')).toHaveText('3/10');
  await expect(page).toHaveURL(/level=3/);
  await expect(page).not.toHaveURL(/seed=21(?:&|$)/);
});

test('every meeting schedule level has one valid answer and fits a compact phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  for (let level = 1; level <= 5; level++) {
    await page.goto(`/benchmarks/cronograma/?seed=${100 + level}&level=${level}`);
    const puzzle = await readSchedulePuzzle(page);
    expect(puzzle.validSelections).toHaveLength(1);
    await page.getByTestId('start-button').click();
    await setAcceptedMeetings(page, puzzle.validSelections[0]);
    await page.getByTestId('check-button').click();
    await expect(page.getByTestId('feedback')).toContainText('Cronograma válido');
    await expectPuzzleFitsViewport(page);
    const geometry = await page.evaluate(() => ({
      meetings: [...document.querySelectorAll('.meeting')].map(element => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
      }),
      controls: [...document.querySelectorAll('.controls button')].map(element => element.getBoundingClientRect().height),
      viewport: { width: innerWidth, height: innerHeight }
    }));
    expect(geometry.meetings.every(rect => rect.width >= 34 && rect.height >= 40)).toBe(true);
    expect(geometry.meetings.every(rect => rect.left >= 0 && rect.right <= geometry.viewport.width && rect.top >= 0 && rect.bottom <= geometry.viewport.height)).toBe(true);
    expect(geometry.controls.every(height => height >= 40)).toBe(true);
  }
  expect(pageErrors).toEqual([]);
});

test('audit levels cover fixed counts, maximum count, and both criteria', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  const scenarios = [
    { level: 6, seed: 10, criterion: 'count', answer: 'both' },
    { level: 7, seed: 1, criterion: 'count', answer: 'no-conflicts' },
    { level: 8, seed: 2, criterion: 'maximum', answer: 'maximum' },
    { level: 9, seed: 4, criterion: 'maximum', answer: 'maximum' },
    { level: 10, seed: 1, criterion: 'maximum', answer: 'both' }
  ];

  for (const scenario of scenarios) {
    await page.goto(`/benchmarks/cronograma/?seed=${scenario.seed}&level=${scenario.level}`);
    const audit = await readAuditPuzzle(page);
    expect(audit.criterion).toBe(scenario.criterion);
    expect(audit.answer).toBe(scenario.answer);
    const criterionCopy = scenario.criterion === 'count'
      ? `Aceita ${audit.target} trabalhos`
      : 'Maximiza o número de trabalhos aceitos';
    await expect(page.locator('#rule-count-copy')).toHaveText(criterionCopy);
    await expect(page.getByTestId('answer-criterion')).toHaveText(criterionCopy);
    await page.getByTestId('start-button').click();

    if (scenario.level === 6) {
      await page.getByTestId('reset-button').click();
      expect((await readAuditPuzzle(page)).meetings).toEqual(audit.meetings);
      await page.getByTestId('start-button').click();
    }

    await expect(page.locator('.meeting')).toHaveCount(4);
    await expect(page.locator('.meeting').first()).toBeDisabled();
    await expect(page.locator('#answers')).toBeVisible();

    if (scenario.level === 8) {
      const acceptedBefore = audit.meetings.filter(meeting => meeting.accepted).map(meeting => meeting.id);
      await page.getByTestId('answer-no-conflicts').click();
      await page.getByTestId('check-button').click();
      await expect(page.getByTestId('feedback')).toContainText('Resposta incorreta');
      const acceptedAfter = await page.locator('.meeting[aria-pressed="false"]').evaluateAll(buttons => buttons.map(button => button.dataset.meeting));
      expect(acceptedAfter).toEqual(acceptedBefore);
    }

    await page.locator(`#answers [data-answer="${scenario.answer}"]`).click();
    await page.getByTestId('check-button').click();
    await expect(page.getByTestId('feedback')).toContainText('Auditoria correta');
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('benchmark-history-v1'))[0]);
    expect(saved.details).toMatchObject({ level: scenario.level, mode: 'audit', criterion: scenario.criterion, answer: scenario.answer });
    await expectPuzzleFitsViewport(page);
    const answerHeights = await page.locator('#answers button').evaluateAll(buttons => buttons.map(button => button.getBoundingClientRect().height));
    expect(answerHeights.every(height => height >= 40)).toBe(true);
  }
});

test('schedule benchmark produces the dependency-safe optimum', async ({ page }) => {
  await start(page, '/benchmarks/agenda/?seed=7');
  const schedule = [
    ['#task-preparar', '#slot-equipe-1'],
    ['#task-calibrar', '#slot-maquina-1'],
    ['#task-cortar', '#slot-maquina-2'],
    ['#task-revisar', '#slot-equipe-3'],
    ['#task-auditar', '#slot-equipe-4'],
    ['#task-embalar', '#slot-maquina-4'],
    ['#task-entregar', '#slot-equipe-5']
  ];

  for (const [task, slot] of schedule) {
    await page.locator(task).click();
    await page.locator(slot).click();
  }

  await page.getByTestId('execute-button').click();
  await expect(page.getByTestId('result')).toContainText('Otimizado');
  await expectPuzzleFitsViewport(page);
});

test('portfolio benchmark completes seven calculated expected-value choices', async ({ page }) => {
  await start(page, '/benchmarks/carteira/?seed=10');

  for (let round = 0; round < 7; round++) {
    const options = page.locator('.option');
    const count = await options.count();
    let bestIndex = 0;
    let bestValue = -Infinity;

    for (let optionIndex = 0; optionIndex < count; optionIndex++) {
      const optionText = await options.nth(optionIndex).innerText();
      const probability = Number(optionText.match(/Sucesso: (\d+)%/)[1]) / 100;
      const win = Number(optionText.match(/Se sucesso: \+(\d+)/)[1]);
      const loss = Number(optionText.match(/Se falha: (-\d+)/)[1]);
      const expectedValue = probability * win + (1 - probability) * loss;
      if (expectedValue > bestValue) {
        bestValue = expectedValue;
        bestIndex = optionIndex;
      }
    }

    await page.getByTestId(`option-${bestIndex}`).click();
    await page.getByTestId('confirm-button').click();
  }

  await expect(page.getByTestId('result')).toContainText('Resultado concluído');
  const resultText = await page.getByTestId('result').innerText();
  const expectedValues = resultText.match(/Valor esperado escolhido: (-?\d+(?:\.\d+)?) de (-?\d+(?:\.\d+)?)/);
  expect(Number(expectedValues[1])).toBeCloseTo(Number(expectedValues[2]), 5);
  await expectPuzzleFitsViewport(page);
});

test('hidden-rule benchmark classifies the eight seeded cases', async ({ page }) => {
  await start(page, '/benchmarks/regra-oculta/?seed=0');

  const values = new Map([['●', 0], ['▲', 1], ['■', 2], ['◆', 3]]);
  for (let index = 0; index < 8; index++) {
    const symbols = (await page.locator('#case').innerText()).trim().split(/\s+/).map(symbol => values.get(symbol));
    const accepted = (symbols[0] + symbols[1]) % 4 === (symbols[2] + symbols[3]) % 4;
    await page.getByTestId(accepted ? 'accept-button' : 'reject-button').click();
  }

  await expect(page.getByTestId('result')).toContainText('Precisão: 8 de 8');
  await expectPuzzleFitsViewport(page);
});

test('hidden-rule examples disprove first-symbol repetition for the transition rule', async ({ page }) => {
  await page.goto('/benchmarks/regra-oculta/?seed=15');

  const examples = await page.locator('.example').allInnerTexts();
  const hasUniqueFirstSymbol = examples.some(example => {
    const symbols = example.trim().split(/\s+/);
    return symbols.slice(1).every(symbol => symbol !== symbols[0]);
  });

  expect(hasUniqueFirstSymbol).toBe(true);
});

test('flow benchmark preserves the critical route and finds minimum cost', async ({ page }) => {
  await start(page, '/benchmarks/fluxo/?seed=0');

  for (const control of ['plus-c-m', 'plus-c-m', 'plus-b-s', 'plus-b-s', 'plus-b-s', 'plus-a-n', 'plus-a-n', 'plus-a-n', 'plus-a-m']) {
    await page.getByTestId(control).click();
  }

  await page.getByTestId('execute-button').click();
  await expect(page.getByTestId('result')).toContainText('Otimizado: custo 13');
  await expectPuzzleFitsViewport(page);
});

test('word-memory benchmark updates score, spends lives, and ends after three errors', async ({ page }) => {
  await start(page, '/benchmarks/memoria-palavras/?seed=1');
  const seenWords = new Set();
  const answerCurrent = async correct => {
    const word = await page.getByTestId('word').innerText();
    const isSeen = seenWords.has(word);
    if (!isSeen) seenWords.add(word);
    const answerSeen = correct ? isSeen : !isSeen;
    await page.getByTestId(answerSeen ? 'seen-button' : 'new-button').click();
  };

  await answerCurrent(false);
  await expect(page.getByTestId('lives')).toHaveText('2');
  await expect(page.getByTestId('score')).toHaveText('0');

  await answerCurrent(true);
  await expect(page.getByTestId('score')).toHaveText('1');

  await answerCurrent(false);
  await answerCurrent(false);
  await expect(page.getByTestId('result')).toBeVisible();
  await expect(page.getByTestId('lives')).toHaveText('0');
  await expectPuzzleFitsViewport(page);
});

test('path benchmark advances from movement to curves', async ({ page }) => {
  await start(page, '/benchmarks/caminho/?seed=42&level=1');
  const commands = await solvePathPuzzle(page);
  expect(commands).toEqual(['forward', 'forward', 'forward', 'forward']);
  await expect(page.getByTestId('level')).toHaveText('1/7');
  await expect(page.getByTestId('target')).toHaveText('Meta 4');
  const toolbox = page.locator('.blocklyFlyout:not(.blocklyTrashcanFlyout)');
  await expect(toolbox).toContainText('avançar');
  await expect(toolbox).not.toContainText('esquerda');

  await page.evaluate(program => {
    const workspace = window.pathWorkspace;
    let previous = null;
    for (const command of program) {
      const block = workspace.newBlock(command === 'forward' ? 'move_forward' : command);
      block.initSvg();
      block.render();
      if (previous) previous.nextConnection.connect(block.previousConnection);
      else block.moveBy(70, 30);
      previous = block;
    }
  }, commands);
  await page.getByTestId('execute-button').click();
  await expect(page.locator('#overlay')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#overlay-title')).toHaveText('Nível 1 concluído');
  await expect(page.getByTestId('start-button')).toHaveText('Nível 2');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('benchmark-history-v1')).at(-1));
  expect(saved.details).toMatchObject({ level: 1, blocks: 4, target: 4, firstTry: true });

  await page.getByTestId('start-button').click();
  await expect(page.locator('#overlay')).toBeHidden();
  await expect(page.getByTestId('level')).toHaveText('2/7');
  await expect(page.getByTestId('target')).toHaveText('Meta 8');
  await expect(toolbox).toContainText('vire à esquerda');
});

test('path benchmark allows a complete program within its level limit', async ({ page }) => {
  await start(page, '/benchmarks/caminho/?seed=42&level=2');
  const commands = await solvePathPuzzle(page);
  expect(commands).toHaveLength(8);
  const toolbox = page.locator('.blocklyFlyout:not(.blocklyTrashcanFlyout)');
  await expect(toolbox).toBeVisible();
  await expect(toolbox).toContainText('vire à direita');
  await expect(toolbox).not.toContainText('repetir até');
  await expect(page.getByTestId('execute-button')).toBeDisabled();

  const firstToolboxBlock = page.locator('.blocklyFlyout:not(.blocklyTrashcanFlyout) .blocklyDraggable').first();
  await firstToolboxBlock.dragTo(page.getByTestId('program'), { targetPosition: { x: 230, y: 60 } });
  await expect(page.getByTestId('budget')).toHaveText(`Restam ${commands.length - 1} ${commands.length - 1 === 1 ? 'bloco' : 'blocos'}`);
  await expect(page.getByTestId('execute-button')).toBeEnabled();

  await page.evaluate(program => {
    const workspace = window.pathWorkspace;
    workspace.clear();
    const types = { forward: 'move_forward', left: 'turn_left', right: 'turn_right' };
    let previous = null;
    for (const command of program) {
      const block = workspace.newBlock(types[command]);
      block.initSvg();
      block.render();
      if (previous) previous.nextConnection.connect(block.previousConnection);
      else block.moveBy(70, 30);
      previous = block;
    }
  }, commands.slice(0, -1));
  await expect(page.getByTestId('budget')).toHaveText('Restam 1 bloco');
  await expect(page.getByTestId('execute-button')).toBeEnabled();

  await page.evaluate(command => {
    const workspace = window.pathWorkspace;
    const types = { forward: 'move_forward', left: 'turn_left', right: 'turn_right' };
    const previous = workspace.getTopBlocks(false)[0].getDescendants(false).at(-1);
    const block = workspace.newBlock(types[command]);
    block.initSvg();
    block.render();
    previous.nextConnection.connect(block.previousConnection);
  }, commands.at(-1));
  await expect(page.getByTestId('budget')).toHaveText('Limite atingido');
  await expect(page.getByTestId('execute-button')).toBeEnabled();

  await page.getByTestId('execute-button').click();
  await expect.poll(() => page.getByTestId('character').evaluate(character => {
    const animation = character.getAnimations().find(candidate => candidate.playState === 'running');
    return animation?.effect.getKeyframes().map(frame => frame.transform) || [];
  })).toHaveLength(2);
  await expect(page.getByTestId('feedback')).toContainText('Chegada alcançada', { timeout: 10000 });
  const positions = await page.evaluate(() => ({
    character: document.querySelector('[data-testid="character"]').dataset.cell,
    goal: document.querySelector('[data-testid="goal"]').dataset.cell
  }));
  expect(positions.character).toBe(positions.goal);
  await expect(page.locator('#attempts')).toHaveText('1 tentativa');
  await expectPuzzleFitsViewport(page);
});

test('path benchmark requires repetition to meet the pattern level budget', async ({ page }) => {
  await start(page, '/benchmarks/caminho/?seed=12&level=3');
  const toolbox = page.locator('.blocklyFlyout:not(.blocklyTrashcanFlyout)');
  await expect(page.getByTestId('level')).toHaveText('3/7');
  await expect(page.getByTestId('target')).toHaveText('Meta 5');
  await expect(page.getByTestId('budget')).toHaveText('Restam 6 blocos');
  await expect(toolbox).toContainText('repetir até');
  await expect(toolbox).not.toContainText('se caminho à');

  await page.evaluate(() => {
    const workspace = window.pathWorkspace;
    const repeat = workspace.newBlock('repeat_until_goal');
    repeat.initSvg();
    repeat.render();
    repeat.moveBy(70, 30);
    let previous = null;
    for (const type of ['move_forward', 'turn_right', 'move_forward', 'turn_left']) {
      const block = workspace.newBlock(type);
      block.initSvg();
      block.render();
      if (previous) previous.nextConnection.connect(block.previousConnection);
      else repeat.getInput('DO').connection.connect(block.previousConnection);
      previous = block;
    }
  });
  await expect(page.getByTestId('budget')).toHaveText('Restam 1 bloco');
  await expect(page.getByTestId('feedback')).toContainText('Meta de blocos atingida');
  await page.getByTestId('execute-button').click();
  await expect(page.locator('#overlay-title')).toHaveText('Nível 3 concluído', { timeout: 10000 });
});

test('path benchmark level strategies solve conditions through mastery', async ({ page }) => {
  const scenarios = [
    { level: 4, seed: 2, kind: 'single', turn: 'RIGHT', turnType: 'turn_right' },
    { level: 5, seed: 2, kind: 'fallback', turn: 'RIGHT', turnType: 'turn_right', fallbackType: 'turn_left' },
    { level: 6, seed: 2, kind: 'fallback', turn: 'RIGHT', turnType: 'turn_right', fallbackType: 'turn_left' },
    { level: 7, seed: 2, kind: 'fallback', turn: 'LEFT', turnType: 'turn_left', fallbackType: 'turn_right' },
    { level: 7, seed: 6, kind: 'fallback', turn: 'RIGHT', turnType: 'turn_right', fallbackType: 'turn_left' }
  ];

  for (const scenario of scenarios) {
    await start(page, `/benchmarks/caminho/?seed=${scenario.seed}&level=${scenario.level}`);
    await page.evaluate(config => {
      const workspace = window.pathWorkspace;
      const create = type => {
        const block = workspace.newBlock(type);
        block.initSvg();
        block.render();
        return block;
      };
      const repeat = create('repeat_until_goal');
      repeat.moveBy(70, 30);
      const decision = create(config.kind === 'single' ? 'if_path' : 'if_else_path');
      decision.setFieldValue(config.turn, 'DIRECTION');
      repeat.getInput('DO').connection.connect(decision.previousConnection);
      const turn = create(config.turnType);
      decision.getInput('DO').connection.connect(turn.previousConnection);

      if (config.kind === 'fallback') {
        const straight = create('if_else_path');
        straight.setFieldValue('FRONT', 'DIRECTION');
        decision.getInput('ELSE').connection.connect(straight.previousConnection);
        const fallback = create(config.fallbackType);
        straight.getInput('ELSE').connection.connect(fallback.previousConnection);
      }

      const forward = create('move_forward');
      decision.nextConnection.connect(forward.previousConnection);
    }, scenario);

    await expect(page.getByTestId('feedback')).toContainText('Meta de blocos atingida');
    await page.getByTestId('execute-button').click();
    await expect(page.locator('#overlay-title')).toHaveText(scenario.level === 7 ? 'Sessão concluída' : `Nível ${scenario.level} concluído`, { timeout: 10000 });
  }
});

test('path benchmark keeps the same procedural maze and level after reset', async ({ page }) => {
  await start(page, '/benchmarks/caminho/?seed=9876&level=6');
  const initial = await page.locator('[data-edge]').evaluateAll(edges => edges.map(edge => edge.dataset.edge));
  await page.evaluate(() => {
    const block = window.pathWorkspace.newBlock('move_forward');
    block.initSvg();
    block.render();
  });
  await page.getByTestId('reset-button').click();

  await expect(page.locator('#overlay')).toBeVisible();
  await expect(page.getByTestId('level')).toHaveText('6/7');
  await expect(page.getByTestId('budget')).toHaveText(/^Restam \d+ blocos$/);
  const reset = await page.locator('[data-edge]').evaluateAll(edges => edges.map(edge => edge.dataset.edge));
  expect(reset).toEqual(initial);
});

test('path benchmark levels fit a compact phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await start(page, '/benchmarks/caminho/?seed=6&level=7');
  await expectPuzzleFitsViewport(page);
  const controls = await page.locator('.controls button').evaluateAll(buttons => buttons.map(button => button.getBoundingClientRect().height));
  expect(controls.every(height => height >= 40)).toBe(true);
});

test('new benchmark workspaces remain bounded on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  for (const path of [
    '/benchmarks/diagnostico/?seed=1',
    '/benchmarks/cronograma/?seed=2&level=8',
    '/benchmarks/agenda/?seed=7',
    '/benchmarks/carteira/?seed=10',
    '/benchmarks/regra-oculta/?seed=0',
    '/benchmarks/fluxo/?seed=0',
    '/benchmarks/memoria-palavras/?seed=0',
    '/benchmarks/caminho/?seed=42'
  ]) {
    await start(page, path);
    await expectPuzzleFitsViewport(page);
  }
});
