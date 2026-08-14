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

test('index exposes every implemented benchmark', async ({ page }) => {
  await page.goto('/');

  for (const href of [
    'benchmarks/ordenacao/',
    'benchmarks/diagnostico/',
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

test('every play overlay offers a guided tutorial without starting the session', async ({ page }) => {
  const tutorials = [
    ['/benchmarks/ordenacao/?seed=abc', 5, true],
    ['/benchmarks/diagnostico/?seed=1', 5, true],
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

test('path benchmark enforces its exact budget and animates a procedural solution', async ({ page }) => {
  await start(page, '/benchmarks/caminho/?seed=42');
  const commands = await solvePathPuzzle(page);
  expect(commands.length).toBeGreaterThanOrEqual(8);
  const toolbox = page.locator('.blocklyFlyout:not(.blocklyTrashcanFlyout)');
  await expect(toolbox).toBeVisible();
  await expect(toolbox).toContainText('repetir até');
  await expect(toolbox).toContainText('se caminho à');
  await expect(toolbox).toContainText('senão');
  await expect(page.getByTestId('execute-button')).toBeDisabled();

  const firstToolboxBlock = page.locator('.blocklyFlyout:not(.blocklyTrashcanFlyout) .blocklyDraggable').first();
  await firstToolboxBlock.dragTo(page.getByTestId('program'), { targetPosition: { x: 230, y: 60 } });
  await expect(page.getByTestId('budget')).toHaveText(`1/${commands.length} blocos`);

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
  await expect(page.getByTestId('budget')).toHaveText(`${commands.length - 1}/${commands.length} blocos`);
  await expect(page.getByTestId('execute-button')).toBeDisabled();

  await page.evaluate(command => {
    const workspace = window.pathWorkspace;
    const types = { forward: 'move_forward', left: 'turn_left', right: 'turn_right' };
    const previous = workspace.getTopBlocks(false)[0].getDescendants(false).at(-1);
    const block = workspace.newBlock(types[command]);
    block.initSvg();
    block.render();
    previous.nextConnection.connect(block.previousConnection);
  }, commands.at(-1));
  await expect(page.getByTestId('budget')).toHaveText(`${commands.length}/${commands.length} blocos`);
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

test('path benchmark keeps the same procedural maze after reset', async ({ page }) => {
  await start(page, '/benchmarks/caminho/?seed=9876');
  const initial = await page.locator('[data-edge]').evaluateAll(edges => edges.map(edge => edge.dataset.edge));
  await page.evaluate(() => {
    const block = window.pathWorkspace.newBlock('move_forward');
    block.initSvg();
    block.render();
  });
  await page.getByTestId('reset-button').click();

  await expect(page.locator('#overlay')).toBeVisible();
  await expect(page.getByTestId('budget')).toHaveText(/^0\/\d+ blocos$/);
  const reset = await page.locator('[data-edge]').evaluateAll(edges => edges.map(edge => edge.dataset.edge));
  expect(reset).toEqual(initial);
});

test('new benchmark workspaces remain bounded on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  for (const path of [
    '/benchmarks/diagnostico/?seed=1',
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
