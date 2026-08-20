(function () {
  'use strict';

  const tutorials = {
    ordenacao: {
      title: 'Tutorial de ordenacao',
      steps: [
        { target: '#chain', title: 'Qual e o objetivo?', text: 'Voce deve colocar todos os cards em uma ordem que possa ser executada do primeiro ao ultimo. Uma acao so funciona quando os recursos exigidos por ela ja estao disponiveis.', example: 'Objetivo: terminar a cadeia inteira, nao apenas encontrar uma primeira acao valida.' },
        { target: '#chain .row', title: 'Como ler um card', text: 'O lado esquerdo da seta mostra o que a acao gasta ou consome. O lado direito mostra o que ela entrega; esse resultado fica disponivel para os cards seguintes.', example: 'Exemplo: dinheiro 5 -> madeira 2 significa pagar 5 e receber 2 madeiras.' },
        { target: '#stats', title: 'Simule os recursos', text: 'Este painel mostra o caixa e o estoque inicial. Ao pensar na ordem, atualize esses valores mentalmente depois de cada card, pois um recurso consumido deixa de existir.', example: 'Se voce tem 2 madeiras e usa 1, sobra apenas 1 para todo o restante da cadeia.' },
        { target: '#chain .row', title: 'Possivel nao e correto', text: 'Pode haver mais de uma acao possivel agora, mas uma delas pode gastar cedo um recurso necessario depois. Arraste os cards pensando nas consequencias ate o final.', example: 'Uma compra pode caber no caixa agora e ainda assim impedir outra compra indispensavel mais tarde.' },
        { target: '#executeBtn', title: 'Valide e corrija', text: 'Quando acreditar que a cadeia completa funciona, toque em Executar. Se ela parar, os cards permanecem na ordem escolhida para voce localizar o ponto da falta e ajustar o plano.', example: 'Reiniciar restaura esta mesma fase; Novo cria outra fase.' }
      ]
    },
    diagnostico: {
      title: 'Tutorial de diagnostico',
      steps: [
        { target: '#modules', title: 'Qual e o objetivo?', text: 'Existe exatamente um modulo com defeito entre os doze. Voce precisa descobrir qual e usando os quatro testes de grupo, sem testar cada modulo isoladamente.', example: 'A resposta correta deve explicar ao mesmo tempo todos os testes que passam e todos os que falham.' },
        { target: '#test-a', title: 'Entenda a cobertura', text: 'A linha pequena de cada teste lista os modulos examinados por ele. Toque no teste para executa-lo uma vez e revelar se aquele grupo Passa ou Falha.', example: 'Se o Teste A lista 1, 3 e 5, ele verifica esses tres modulos juntos.' },
        { target: '#out-a', title: 'Elimine candidatos', text: 'Quando um teste Passa, nenhum modulo listado nele pode ser o defeituoso. Quando Falha, o defeito esta em algum dos modulos que o teste cobre.', example: 'Se A falha e B passa, procure um modulo coberto por A, mas nao por B.' },
        { target: '#module-1', title: 'Cruze os resultados', text: 'Execute os testes necessarios e compare as letras escritas em cada modulo com os resultados obtidos. Escolha o unico modulo presente em todas as falhas e ausente de todos os testes que passam.', example: 'Nao escolha apenas por uma falha: confirme o candidato contra os quatro resultados.' },
        { target: '#submit-button', title: 'Confirme o diagnostico', text: 'Toque no modulo suspeito e depois em Diagnosticar. Uma escolha errada conta como tentativa, mas o painel continua aberto para voce revisar o raciocinio.', example: 'Reiniciar repete o mesmo defeito; Novo gera outro diagnostico.' }
      ]
    },
    cronograma: {
      title: 'Tutorial de cronograma',
      steps: [
        { target: '#schedule', title: 'Qual e o objetivo?', text: 'Nos primeiros niveis, monte o conjunto pedido sem sobreposicoes. Nos niveis finais, uma selecao aparece pronta e voce deve auditar os criterios atendidos.', example: 'Uma reuniao de 10h a 12h conflita com outra de 11h a 13h.' },
        { target: '[data-testid="meeting-A"]', title: 'Aceite ou rejeite', text: 'Cada bloco com uma letra representa um intervalo. Claro significa aceito; escuro com um x significa rejeitado. Na montagem, toque no bloco inteiro para alternar.', example: 'Nos niveis Aceite 3, todos comecam rejeitados; escolha os tres que ficarao.' },
        { target: '#schedule', title: 'Compare inicio e fim', text: 'Dois blocos entram juntos somente quando um termina antes de o outro comecar. Horarios que apenas encostam podem ser usados em sequencia.', example: '9h-11h e 11h-13h nao conflitam; 9h-11h e 10h-12h conflitam.' },
        { target: '.rules', title: 'Cruze todas as regras', text: 'Sem conflitos verifica a compatibilidade. Maximizar exige comparar a quantidade aceita com a melhor combinacao possivel, nao apenas com uma selecao que parece cheia.', example: 'Uma selecao de dois trabalhos pode nao ter conflitos e ainda perder para outra combinacao com tres.' },
        { target: '#check-button', title: 'Confira e ajuste', text: 'Toque em Conferir quando tiver uma resposta. O erro preserva a montagem ou a alternativa marcada para que voce revise somente o raciocinio necessario.', example: 'Reiniciar repete nivel e seed; Nova sessao volta ao nivel 1 com outras seeds.' }
      ]
    },
    agenda: {
      title: 'Tutorial de agenda',
      steps: [
        { target: '.board', title: 'Qual e o objetivo?', text: 'Coloque as sete tarefas na agenda sem violar recurso, dependencia ou prazo. As colunas T1 a T5 representam a ordem do tempo, da esquerda para a direita.', example: 'Uma tarefa em T2 acontece depois de T1 e antes de T3.' },
        { target: '#task-preparar', title: 'Leia cada tarefa', text: 'A linha pequena informa qual recurso executa a tarefa e o que precisa acontecer antes ou depois. Antes significa estar em uma coluna T menor, nao apenas na mesma agenda.', example: 'Se Cortar exige Preparar e Calibrar, os dois precisam estar em horarios anteriores ao corte.' },
        { target: '#slot-equipe-1', title: 'Equipe e maquina', text: 'Cada linha e um recurso diferente. Uma tarefa da Equipe so entra na linha Equipe, e uma tarefa da Maquina so entra na linha Maquina; cada celula recebe uma tarefa.', example: 'Equipe e Maquina podem trabalhar no mesmo T, pois ocupam linhas diferentes.' },
        { target: '.tasks', title: 'Como montar o plano', text: 'Toque em uma tarefa e depois em um horario livre compativel. Para corrigir, toque numa tarefa ja agendada: ela volta a ficar selecionada e pode ser colocada em outro horario.', example: 'Comece pelos prazos fixos e pelas tarefas que dependem de varias outras.' },
        { target: '#execute-button', title: 'Confira antes de executar', text: 'Todas as sete tarefas precisam estar agendadas, a auditoria deve cumprir a regra escrita no card e a entrega deve ocorrer em T5. Executar valida o plano sem apagar o que voce montou.', example: 'Se houver erro, mova apenas as tarefas necessarias e execute novamente.' }
      ]
    },
    carteira: {
      title: 'Tutorial de carteira',
      steps: [
        { target: '#options', title: 'Qual e o objetivo?', text: 'Em cada uma das sete rodadas, escolha a opcao com maior valor esperado. O melhor plano nao e necessariamente o maior premio nem a maior chance isoladamente.', example: 'Voce deve combinar chance, ganho e perda numa unica comparacao.' },
        { target: '#option-0', title: 'Leia os resultados', text: 'Sucesso mostra a probabilidade de receber o ganho positivo. Se o sucesso nao acontecer, vale o numero negativo indicado em Se falha.', example: 'Com 60% de sucesso, a falha acontece nos 40% restantes.' },
        { target: '#option-0', title: 'Calcule o valor esperado', text: 'Multiplique cada resultado por sua probabilidade e some os dois valores. Use a chance em forma decimal ou divida a conta final por 100.', example: '60% de +10 e 40% de -5: 0,6 x 10 + 0,4 x -5 = 4.' },
        { target: '#confirm-button', title: 'Escolha antes do sorteio', text: 'Toque numa opcao e confirme. O resultado real da rodada e sorteado depois da escolha, por isso uma boa decisao ainda pode perder e uma decisao ruim ainda pode ganhar.', example: 'Avalie a qualidade da decisao pela expectativa, nao pela sorte de uma unica rodada.' },
        { target: '#quality', title: 'Entenda os dois placares', text: 'Resultado real soma o dinheiro ganho ou perdido nos sorteios. Qualidade EV compara a soma das expectativas que voce escolheu com a melhor soma que estava disponivel.', example: 'O objetivo principal e aproximar os dois numeros de Qualidade EV, mesmo quando o resultado real tiver azar.' }
      ]
    },
    'regra-oculta': {
      title: 'Tutorial de regra oculta',
      steps: [
        { target: '#examples', title: 'Qual e o objetivo?', text: 'Os seis grupos desta area obedecem a mesma regra escondida. Descubra a relacao entre os quatro simbolos e use essa hipotese para classificar oito casos novos.', example: 'A regra usa a ordem e a relacao entre as quatro posicoes, nao a aparencia ou a cor da tela.' },
        { target: '#examples', title: 'Compare posicoes', text: 'Leia cada grupo como quatro lugares: primeiro, segundo, terceiro e quarto. Compare os pares, repeticoes e mudancas de um lugar para o seguinte em todos os exemplos.', example: 'Uma hipotese pode relacionar o primeiro par com o segundo; ela precisa funcionar nos seis exemplos.' },
        { target: '#examples', title: 'Teste sua hipotese', text: 'Nao escolha uma regra que explique somente um ou dois exemplos. Tente encontrar mentalmente um exemplo mostrado que quebraria sua hipotese e descarte-a se isso acontecer.', example: 'A melhor hipotese e a mais simples que continua verdadeira nos seis grupos.' },
        { target: '#case', title: 'Analise o caso atual', text: 'A area grande mostra apenas o caso que voce deve responder agora. Aplique exatamente a mesma regra inferida dos exemplos, sem mudar a hipotese para acomodar um caso dificil.', example: 'Se ele preserva a relacao, responda Aceita; se quebra qualquer parte dela, responda Recusa.' },
        { target: '.decision', title: 'Classifique os oito casos', text: 'Cada toque em Aceita ou Recusa registra a resposta e avanca imediatamente. Nao ha correcao durante a serie; a precisao total aparece somente depois do oitavo caso.', example: 'Observe os exemplos novamente antes de responder: eles permanecem visiveis durante toda a sessao.' }
      ]
    },
    fluxo: {
      title: 'Tutorial de rede de fluxo',
      steps: [
        { target: '.meta', title: 'Qual e o objetivo?', text: 'Distribua as nove unidades das fontes A, B e C entre Norte, Centro e Sul. Toda a oferta precisa sair e toda a demanda precisa ser atendida pelo menor custo total.', example: 'Nao basta entregar tudo: entre as distribuicoes completas, somente a de menor custo conclui.' },
        { target: '.meta', title: 'Leia o que ainda falta', text: 'Os numeros das fontes mostram unidades ainda disponiveis para sair. Os numeros dos destinos mostram unidades que ainda precisam chegar; ambos diminuem quando voce adiciona fluxo.', example: 'Fonte A em 2 ainda pode enviar 2; Norte em 1 ainda precisa receber 1.' },
        { target: '#routes', title: 'Entenda uma rota', text: 'Cada card liga uma fonte a um destino e mostra custo por unidade, capacidade maxima e fluxo atual. O custo da rota e fluxo multiplicado pelo custo unitario.', example: 'Fluxo 3 numa rota de custo 2 acrescenta 6 ao custo total.' },
        { target: '[data-testid="plus-a-n"]', title: 'Distribua as unidades', text: 'Use mais para enviar uma unidade e menos para remove-la. O sistema impede ultrapassar a oferta da fonte, a demanda do destino ou a capacidade da rota.', example: 'Se Norte ja recebeu tudo, nenhuma rota para Norte aceita outra unidade.' },
        { target: '#execute-button', title: 'Pense no custo global', text: 'Rotas baratas competem pelas mesmas fontes e destinos. Antes de executar, confira se usar uma rota barata agora nao obriga outra unidade a seguir por uma rota muito cara depois.', example: 'Execute quando todos os seis numeros do topo estiverem em zero e a distribuicao parecer a mais barata possivel.' }
      ]
    },
    'memoria-palavras': {
      title: 'Tutorial de memoria',
      steps: [
        { target: '#word', title: 'Qual e o objetivo?', text: 'Uma palavra aparece por vez. Decida se ela esta aparecendo pela primeira vez nesta sessao ou se ja foi mostrada em qualquer momento anterior.', example: 'Voce compara com toda a historia da sessao, nao apenas com a palavra anterior.' },
        { target: '#new-button', title: 'Quando tocar Nova', text: 'Toque em Nova quando nao se lembrar de ter visto a palavra atual desde o inicio desta sessao. Toda palavra e Nova na primeira vez em que aparece.', example: 'Se jardim nunca apareceu antes, a resposta correta e Nova.' },
        { target: '#seen-button', title: 'Quando tocar Ja vi', text: 'Toque em Ja vi quando reconhecer a palavra de uma rodada anterior, mesmo que muitas outras tenham aparecido no intervalo. As repeticoes ficam mais distantes conforme o score cresce.', example: 'Se jardim apareceu dez palavras atras e voltou agora, a resposta correta e Ja vi.' },
        { target: '#feedback', title: 'Resposta imediata', text: 'Depois de cada toque, o painel informa se voce acertou e a proxima palavra aparece. Use esse retorno para continuar acompanhando quais palavras ja entraram na sessao.', example: 'Uma resposta errada nao transforma uma palavra antiga em nova.' },
        { target: '#lives', title: 'Score e vidas', text: 'Cada acerto soma um ponto e cada erro remove uma das tres vidas. A sessao continua sem limite de tempo e termina quando as tres vidas forem perdidas.', example: 'Priorize a memoria correta; nao existe bonus por responder rapidamente.' }
      ]
    },
    caminho: {
      title: 'Tutorial do caminho',
      steps: [
        { target: '#board', title: 'Qual e o objetivo?', text: 'Leve o personagem ate o pino vermelho seguindo somente as estradas. O personagem comeca apontando para uma direcao especifica e nao atravessa espacos fora do caminho.', example: 'O pino marca apenas a chegada; voce precisa decidir cada giro e cada avanco desde a posicao inicial.' },
        { target: '.blocklyFlyout', title: 'Aprenda por etapas', text: 'Avancar aparece primeiro. Giros, repeticao e condicoes entram nos niveis seguintes, sempre depois que o conceito anterior foi praticado.', example: 'Cada nivel acrescenta somente uma nova forma de pensar o programa.' },
        { target: '#blockly-editor', title: 'Monte na ordem', text: 'Arraste os blocos da faixa cinza para a area branca e encaixe as pecas. Blocos dentro de faca pertencem ao comando de repeticao ou decisao que os envolve.', example: 'A execucao comeca no bloco mais alto e segue cada encaixe de cima para baixo.' },
        { target: '#budget', title: 'Use poucos blocos', text: 'Meta mostra o tamanho da melhor estrategia conhecida; o contador mostra quantos blocos ainda cabem. Voce pode executar antes de zerar.', example: 'Meta 5 e Restam 2: ainda cabem dois blocos, mas a melhor solucao usa cinco.' },
        { target: '#execute-button', title: 'Execute e observe', text: 'O personagem gira primeiro e depois se desloca quando recebe Avancar. Se a rota falhar, seu programa permanece montado para que voce ajuste somente os blocos necessarios.', example: 'Reiniciar repete o nivel; Nova sessao volta ao nivel 1 com outra seed.' }
      ]
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .tutorial-layer { position:fixed; inset:0; z-index:10000; pointer-events:auto; color:#f5f7fb; font:15px/1.35 system-ui,-apple-system,"Segoe UI",sans-serif; }
    .tutorial-highlight { position:fixed; z-index:1; border:3px solid #7aa2ff; border-radius:12px; box-shadow:0 0 0 9999px rgba(5,9,15,.72), 0 0 0 6px rgba(122,162,255,.2); pointer-events:none; animation:tutorial-pulse 1.25s ease-in-out infinite; }
    .tutorial-pointer { position:fixed; z-index:2; display:grid; place-items:center; width:42px; height:42px; border-radius:50%; background:#7aa2ff; color:#10151b; font-size:21px; font-weight:900; pointer-events:none; animation:tutorial-point .8s ease-in-out infinite alternate; box-shadow:0 5px 18px rgba(0,0,0,.35); }
    .tutorial-card { position:fixed; z-index:3; left:50%; width:min(410px,calc(100vw - 24px)); max-height:calc(100dvh - 24px); overflow-y:auto; transform:translateX(-50%); padding:16px; border:1px solid #44546b; border-radius:14px; background:#18222f; box-shadow:0 16px 44px rgba(0,0,0,.42); }
    .tutorial-card.top { top:max(16px,env(safe-area-inset-top)); }
    .tutorial-card.bottom { bottom:max(16px,env(safe-area-inset-bottom)); }
    .tutorial-progress { margin:0 0 5px; color:#aebbd0; font-size:12px; font-weight:750; }
    .tutorial-card h2 { margin:0; font-size:20px; letter-spacing:-.02em; }
    .tutorial-card p { margin:7px 0 10px; color:#e0e7f2; }
    .tutorial-example { margin:0 0 14px; padding:9px 10px; border-left:3px solid #7aa2ff; background:#202d3d; color:#cbd8eb; font-size:13px; }
    .tutorial-actions { display:grid; grid-template-columns:auto 1fr auto; gap:8px; }
    .tutorial-actions button, .tutorial-launch { min-height:44px; border:1px solid #60718b; border-radius:9px; background:#27364a; color:#f5f7fb; font:750 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif; cursor:pointer; }
    .tutorial-actions .tutorial-next { border-color:#7aa2ff; background:#7aa2ff; color:#0f1826; }
    .tutorial-launch { width:100%; margin-top:10px; }
    .tutorial-actions button:focus-visible, .tutorial-launch:focus-visible { outline:3px solid #b9ccff; outline-offset:2px; }
    @keyframes tutorial-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.018); } }
    @keyframes tutorial-point { from { transform:translateY(0); } to { transform:translateY(7px); } }
    @media (prefers-reduced-motion:reduce) { .tutorial-highlight, .tutorial-pointer { animation:none; } }
  `;
  document.head.append(style);

  function benchmarkName() {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts.at(-1);
  }

  function setStartOverlayVisible(overlay, visible) {
    overlay.hidden = !visible;
    overlay.classList.toggle('hidden', !visible);
  }

  function createTutorial(config, trigger, overlay) {
    let stepIndex = 0;
    let previousFocus = null;
    let layer = null;
    let highlight = null;
    let pointer = null;
    let card = null;

    function position() {
      const step = config.steps[stepIndex];
      const target = document.querySelector(step.target);
      if (!target || !highlight || !pointer || !card) return;

      const rect = target.getBoundingClientRect();
      const padding = 6;
      const left = Math.max(4, rect.left - padding);
      const top = Math.max(4, rect.top - padding);
      const right = Math.min(window.innerWidth - 4, rect.right + padding);
      const bottom = Math.min(window.innerHeight - 4, rect.bottom + padding);

      highlight.style.left = `${left}px`;
      highlight.style.top = `${top}px`;
      highlight.style.width = `${Math.max(0, right - left)}px`;
      highlight.style.height = `${Math.max(0, bottom - top)}px`;
      pointer.style.left = `${Math.max(8, Math.min(window.innerWidth - 50, right - 20))}px`;
      pointer.style.top = `${Math.max(8, top - 22)}px`;
      card.className = `tutorial-card ${rect.top > window.innerHeight * .55 ? 'top' : 'bottom'}`;
    }

    function render() {
      const step = config.steps[stepIndex];
      card.querySelector('.tutorial-progress').textContent = `Passo ${stepIndex + 1} de ${config.steps.length}`;
      card.querySelector('h2').textContent = `${config.title}: ${step.title}`;
      card.querySelector('.tutorial-copy').textContent = step.text;
      card.querySelector('.tutorial-example').textContent = step.example;
      card.querySelector('.tutorial-back').disabled = stepIndex === 0;
      card.querySelector('.tutorial-next').textContent = stepIndex === config.steps.length - 1 ? 'Concluir' : 'Proximo';
      position();
    }

    function close() {
      if (!layer) return;
      window.removeEventListener('resize', position);
      layer.remove();
      layer = null;
      setStartOverlayVisible(overlay, true);
      (previousFocus || trigger).focus();
    }

    function open() {
      previousFocus = document.activeElement;
      stepIndex = 0;
      setStartOverlayVisible(overlay, false);
      layer = document.createElement('section');
      layer.className = 'tutorial-layer';
      layer.dataset.testid = 'tutorial';
      layer.setAttribute('role', 'dialog');
      layer.setAttribute('aria-modal', 'true');
      layer.setAttribute('aria-labelledby', 'tutorial-title');
      layer.innerHTML = `
        <div class="tutorial-highlight" data-testid="tutorial-highlight"></div>
        <div class="tutorial-pointer" aria-hidden="true">&#8595;</div>
        <div class="tutorial-card">
          <div class="tutorial-progress" data-testid="tutorial-progress"></div>
          <h2 id="tutorial-title" data-testid="tutorial-title"></h2>
          <p class="tutorial-copy" data-testid="tutorial-copy"></p>
          <div class="tutorial-example" data-testid="tutorial-example"></div>
          <div class="tutorial-actions">
            <button class="tutorial-back" type="button" aria-label="Passo anterior">Voltar</button>
            <button class="tutorial-next" type="button">Proximo</button>
            <button class="tutorial-close" type="button" aria-label="Sair do tutorial">Sair</button>
          </div>
        </div>
      `;
      document.body.append(layer);
      highlight = layer.querySelector('.tutorial-highlight');
      pointer = layer.querySelector('.tutorial-pointer');
      card = layer.querySelector('.tutorial-card');
      card.querySelector('.tutorial-back').addEventListener('click', () => {
        if (stepIndex > 0) {
          stepIndex--;
          render();
        }
      });
      card.querySelector('.tutorial-next').addEventListener('click', () => {
        if (stepIndex === config.steps.length - 1) close();
        else {
          stepIndex++;
          render();
        }
      });
      card.querySelector('.tutorial-close').addEventListener('click', close);
      window.addEventListener('resize', position);
      render();
      card.querySelector('.tutorial-next').focus();
    }

    trigger.addEventListener('click', open);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && layer) close();
    });
  }

  function installTutorial() {
    const config = tutorials[benchmarkName()];
    const trigger = document.querySelector('[data-tutorial-button]');
    const overlay = document.getElementById('overlay');
    if (!config || !trigger || !overlay) return;
    createTutorial(config, trigger, overlay);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installTutorial);
  else installTutorial();
})();
