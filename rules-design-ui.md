# Regras visuais para todos os benchmarks

## Mobile-first obrigatório

Todo benchmark deve ser projetado **primeiro para celular**. Desktop pode aproveitar espaço adicional, mas nenhuma funcionalidade pode depender de uma tela grande. O teste precisa funcionar confortavelmente com uma mão e com toque.

## Tudo deve caber em uma única tela

A interface inteira deve permanecer dentro de **100vw × 100dvh**, considerando também as safe areas do celular. **Não pode existir scroll vertical ou horizontal durante o puzzle.** O funcionário deve conseguir enxergar simultaneamente tudo que é necessário para tomar a decisão.

Se um puzzle não cabe na tela, o problema deve ser simplificado visualmente; não se deve resolver isso adicionando scroll.

## Não medir velocidade de leitura

Textos devem ser extremamente curtos. O benchmark deve testar raciocínio, não quem consegue ler mais palavras por segundo. Sempre que possível, representar relações através de ícones, números, setas e estruturas visuais consistentes.

## Interface aprendida em segundos

A pessoa deve entender como interagir praticamente imediatamente. Arrastar significa arrastar, tocar significa executar, Play significa iniciar. Evitar menus escondidos, gestos incomuns, combinações de botões e controles que precisam ser ensinados.

## Poucos controles

Cada tela deve possuir somente os controles necessários. Normalmente algo como **Iniciar, Executar, Reiniciar e Novo puzzle** já é suficiente. Quanto mais botões existirem, maior a chance de o benchmark começar a medir conhecimento da interface.

## Cards grandes e fáceis de tocar

Elementos interativos precisam ter área confortável para dedos. Evitar botões minúsculos ou alvos próximos demais. Como referência prática, elementos de toque devem ter aproximadamente **44–48 px de altura ou área equivalente**, sempre que o espaço permitir.

## O card inteiro deve ser interativo

Se a mecânica for ordenar cards, não exigir que a pessoa encontre uma pequena “alça”. **Qualquer ponto do card pode iniciar o drag.** Isso reduz habilidade motora desnecessária e torna o teste mais sobre raciocínio.

## Drag-and-drop precisa ser instantâneo

Ao arrastar um card, os outros devem abrir espaço imediatamente e deixar claro onde ele será colocado. Não deve existir atraso, animação lenta ou comportamento impreciso que transforme o benchmark em teste de coordenação motora.

## Estado visual durante o drag

O card sendo movido deve ficar claramente destacado, enquanto o local onde ele será inserido deve possuir um placeholder visível. A pessoa nunca deve ficar em dúvida sobre onde o card será colocado ao soltar.

## Feedback visual imediato

Toda interação deve produzir resposta instantânea. Tocou, arrastou ou executou: alguma mudança visual deve confirmar a ação. Não pode existir a sensação de “será que o botão funcionou?”.

## Animações não podem atrasar o raciocínio

Animações servem apenas para explicar mudanças de estado. Devem ser rápidas. Se uma animação força o funcionário a esperar antes de poder continuar pensando ou interagindo, ela está prejudicando o benchmark.

A exceção é quando o tempo de execução visual faz parte deliberadamente da experiência, como mostrar uma cadeia sendo executada passo a passo.

## O estado do sistema deve estar sempre visível

Recursos importantes, dinheiro, vidas, tentativas ou qualquer variável necessária para decidir devem permanecer visíveis sem abrir menus. O usuário não deve precisar memorizar algo simplesmente porque a interface escondeu a informação.

## Símbolos consistentes

Um mesmo recurso deve sempre utilizar o mesmo símbolo. Se 🪵 significa madeira, nunca deve representar outra coisa em outro ponto daquele benchmark. Consistência reduz carga cognitiva irrelevante.

## Emoji não pode ser a única informação

Emojis ajudam a reconhecer recursos rapidamente, mas quando houver risco de ambiguidade eles devem ser acompanhados de nomes curtos. Por exemplo, **🪵 Madeira**, e não apenas 🪵.

Depois que o usuário já conhece o benchmark, versões mais compactas podem utilizar somente ícones se não houver possibilidade razoável de confusão.

## Não depender apenas de cores

Verde pode representar sucesso e vermelho erro, mas o significado também deve aparecer através de ícone, texto ou forma. Por exemplo, **✅ Sucesso** e **❌ Erro**. Isso melhora acessibilidade e evita que cor se transforme em informação escondida.

## Hierarquia visual óbvia

O olho deve entender imediatamente o que é mais importante. Normalmente:

**Objetivo/score → estado atual → puzzle → ação principal → controles secundários.**

Informações administrativas não devem disputar atenção com o problema.

## Score deve ter destaque

A principal medida daquele benchmark deve possuir uma localização constante e fácil de enxergar. Se dinheiro é o score, dinheiro deve estar visualmente destacado. Se tempo é importante, o cronômetro deve permanecer visível.

## Timer sempre no mesmo lugar

Quando existir cronômetro, ele deve aparecer em uma posição fixa e não se mover conforme elementos mudam. Isso permite checar o tempo rapidamente sem procurar pela tela.

## Timer só começa quando o benchmark começa

O tempo não pode correr enquanto o funcionário está lendo uma tela de preparação. Deve existir um **overlay inicial com um Play grande**. Ao tocar nele, o puzzle aparece e o timer começa simultaneamente.

## Overlay inicial simples

Antes de começar, a tela deve mostrar praticamente apenas o necessário para iniciar. Um grande botão Play e, quando necessário, uma instrução curtíssima. Não mostrar o puzzle antes do timer começar se a velocidade de solução fizer parte da métrica.

## Reiniciar volta exatamente ao estado original

O botão **Reiniciar** deve restaurar o mesmo puzzle, mesma configuração inicial e mesma ordem inicial embaralhada, além de zerar o timer e as tentativas quando essa for a regra do benchmark.

Depois disso, o overlay inicial volta a aparecer.

## Novo puzzle é diferente de reiniciar

**Reiniciar** repete exatamente o mesmo teste. **Novo** gera outra instância procedural. Os dois controles devem ser visualmente e conceitualmente distintos.

## Erro não deve destruir o trabalho do usuário

Se a pessoa ordenou oito cards e a sequência falhou, a cadeia deve permanecer como estava. O usuário deve poder identificar, mover e corrigir os elementos sem reconstruir tudo do zero, a menos que apagar tudo seja deliberadamente parte da habilidade testada.

## Durante erro, interação volta imediatamente

Quando uma execução falhar, a interface deve liberar novamente drag, botões ou outros controles assim que o feedback terminar. Nunca deixar o puzzle visualmente disponível mas tecnicamente travado.

## Diferenciar estado inicial de estado executado

Depois de uma tentativa, pode ser útil mostrar o estado onde a sequência quebrou. Porém, assim que o usuário começa a editar novamente, a interface deve deixar claro que está preparando uma nova execução a partir do estado inicial.

## Não esconder consequência atrás de animação

Se uma ação alterou 💰10 para 💰4, essa mudança deve aparecer imediatamente no estado visual correspondente. A pessoa deve enxergar claramente a consequência de cada passo.

## Números devem ser fáceis de comparar

Evitar casas decimais desnecessárias, números gigantes ou formatação inconsistente. Se a habilidade não exige cálculo complexo, trabalhar com números pequenos facilita enxergar relações e mantém o foco na lógica.

## Informação visual deve ser mínima

Cada elemento na tela deve justificar sua existência. Bordas decorativas, gráficos sem função, fundos chamativos, efeitos e textos redundantes aumentam carga cognitiva sem melhorar a medição.

## Dificuldade nunca vem de poluição visual

Não aumentar dificuldade colocando mais ícones, textos menores, elementos mais apertados ou mais informação irrelevante. A dificuldade deve vir da estrutura lógica do problema.

**Mais difícil não significa mais bagunçado.**

## Mesma interface entre dificuldades

Sempre que possível, um puzzle fácil, médio e difícil deve parecer praticamente igual. Isso impede que o funcionário precise reaprender controles conforme sobe de nível.

A estrutura interna é que muda: dependências, consequências futuras, probabilidades, custo do erro etc.

## Fonte legível sem zoom

Nenhum texto importante deve exigir zoom. Em telas menores, reduzir quantidade de texto antes de reduzir drasticamente o tamanho da fonte.

## Evitar quebra desnecessária de linhas

Cards devem usar nomes curtos e informações compactas. Quebras de linha demais aumentam a altura dos elementos e tornam comparação visual mais lenta.

## Valores alinhados

Números relacionados devem aparecer em posições consistentes. Isso permite comparar estados visualmente sem precisar reler cada componente.

## O layout não pode “pular”

Atualizações de recursos, timer ou score não devem mudar o tamanho dos elementos e empurrar outros componentes pela tela. Usar larguras estáveis e números tabulares quando necessário.

## Safe areas precisam ser respeitadas

Em celulares com notch, Dynamic Island ou barra de gestos, botões e informações não podem ficar escondidos nas bordas. Usar `env(safe-area-inset-*)` quando o benchmark rodar no navegador.

## Usar 100dvh, não depender apenas de 100vh

Em mobile, `100vh` pode se comportar mal devido às barras do navegador. Priorizar **100dvh**, com fallback quando necessário, para garantir que o jogo realmente caiba na área visível.

## Bloquear scroll e overscroll durante o jogo

O usuário não pode mover a página acidentalmente enquanto tenta arrastar um elemento. `overflow: hidden`, tratamento correto de `touch-action` e controle de overscroll são importantes para benchmarks baseados em gestos.

## Gestos devem funcionar com touch e mouse

Mesmo sendo mobile-first, drag e outros controles devem funcionar com dedo, mouse e stylus. Pointer Events normalmente são uma boa base porque unificam esses tipos de entrada.

## Evitar hover como informação obrigatória

Hover praticamente não existe no celular. Nada necessário para resolver o puzzle pode depender de passar o mouse sobre algo.

## Orientação preferencial deve ser vertical

O benchmark deve funcionar principalmente em **portrait**, porque é a forma mais natural de uso no celular. Landscape pode funcionar, mas não deve ser obrigatório salvo quando o próprio teste exigir espaço horizontal.

## Não exigir precisão motora

Se mover um card poucos pixels para o lugar errado causa uma resposta diferente, talvez o benchmark esteja medindo coordenação motora. As áreas de drop devem ser generosas e o comportamento deve “encaixar” naturalmente.

## Resultado deve ser imediatamente compreensível

Quando terminar, mostrar poucas informações importantes: **resultado, tempo, tentativas e score principal**. Não cobrir a tela instantaneamente com dezenas de métricas secundárias.

As métricas detalhadas podem ficar armazenadas para análise administrativa.

## Benchmark não mostra informação administrativa ao funcionário

Dados como “dificuldade calculada 8,4”, “percentil previsto” ou solução ótima podem influenciar psicologicamente o participante. Essas informações devem ficar no sistema de análise, não necessariamente durante o teste.

## O design não deve sugerir a resposta

Posição, tamanho, cor ou destaque de um card não podem acidentalmente indicar que ele deveria vir primeiro. Todos os elementos equivalentes devem possuir tratamento visual equivalente.

## Ordem inicial precisa parecer neutra

Puzzles procedurais devem embaralhar os elementos sem criar padrões visuais previsíveis. Evitar que a solução frequentemente esteja “quase ordenada” ou que determinado tipo de ação sempre apareça numa mesma região.

## Não usar estética para criar dificuldade

Um benchmark não precisa ser feio, mas beleza deve servir à clareza. Contraste ruim, fontes estranhas, animações excessivas ou elementos deliberadamente confusos jamais devem ser usados para aumentar dificuldade.

## Regra visual final

A pessoa deve conseguir olhar para a tela e pensar:

**“Eu sei exatamente como usar isso. Agora preciso descobrir o que fazer.”**

Se ela estiver gastando capacidade mental descobrindo onde clicar, como arrastar, o que significa uma cor, onde está uma informação ou por que a tela se moveu, parte do benchmark está medindo a interface em vez do funcionário.

**Visualmente simples, cognitivamente profundo.**
