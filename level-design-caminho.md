# Level design de Caminho programado

## Objetivo do design

`Caminho programado` deve medir principalmente **planejamento, abstração e otimização**. A pessoa precisa transformar uma rota visível em um programa curto, prever o resultado dos comandos e reconhecer padrões que podem ser representados com repetição e condições.

A dificuldade deve estar na estrutura da rota, nunca em arrastar blocos, interpretar símbolos, ler textos longos ou descobrir uma regra que não foi apresentada.

O jogador deve terminar pensando:

> Eu sabia o que cada bloco fazia, mas poderia ter planejado um programa melhor.

## O princípio da dificuldade justa

Um nível justo fica entre dois extremos:

- **Fácil demais:** a solução é percebida imediatamente, quase todos vencem na primeira tentativa e não existe motivo para usar abstrações.
- **Difícil demais:** o jogador não consegue formar uma hipótese útil, precisa testar combinações ao acaso ou falha por não conhecer um bloco.
- **Na medida certa:** o objetivo e os comandos são claros, existem alternativas plausíveis e a melhor solução exige prever algumas consequências antes de executar.

O nível não deve ficar mais difícil apenas porque a rota ficou maior. A dificuldade deve aumentar por meio de:

- mais passos que precisam ser simulados mentalmente;
- decisões locais plausíveis que produzem resultados piores depois;
- padrões que podem ser comprimidos de maneiras diferentes;
- necessidade de combinar repetição e condição;
- diferença maior entre uma solução que funciona e a solução mínima;
- menor quantidade de informação redundante na rota.

## Treino e avaliação

O treino pode apresentar os blocos gradualmente, explicar erros e oferecer outra fase do mesmo conceito. Ele existe para ensinar a linguagem do jogo.

A avaliação deve começar somente depois desse treino. Em todos os níveis avaliados, a interface e os blocos disponíveis devem permanecer iguais. Assim, o aumento de dificuldade mede raciocínio, não adaptação a novos controles.

Não adaptar a dificuldade no meio de uma sessão usada para comparar pessoas. Todos devem receber as mesmas seeds ou conjuntos estatisticamente equivalentes. Adaptação é apropriada no treino, não no benchmark comparativo.

## Progressão recomendada

### Nível 0: aprender sem ser avaliado

**Objetivo:** comprovar que a pessoa entende orientação, encaixe e execução.

- Rota curta, sem bifurcação e com no máximo uma curva.
- Usar apenas `avançar`, `esquerda` e `direita`.
- Mostrar a direção inicial de forma evidente.
- Não usar cronômetro nem registrar o resultado no score.
- Permitir repetição imediata e explicar exatamente onde o programa parou.
- Encerrar assim que a pessoa concluir uma rota reta e uma rota com curva.

Este nível não pode ser usado para diferenciar desempenho. Ele apenas remove familiaridade com Blockly como variável acidental.

### Nível 1: sequência e orientação

**Objetivo:** medir se a pessoa consegue traduzir uma rota simples em uma sequência.

- Caminho de 4 a 5 deslocamentos.
- Uma ou duas curvas, sem retorno de 180 graus.
- Sem bifurcação relevante.
- Solução mínima de 5 a 7 blocos simples.
- Nenhuma vantagem importante ao usar condição.

O nível está fácil demais se puder ser resolvido sem conferir a direção inicial. Está difícil demais se a maioria dos erros ocorrer no primeiro comando de giro.

### Nível 2: planejar várias curvas

**Objetivo:** exigir simulação mental da orientação ao longo da rota.

- Caminho de 5 a 7 deslocamentos.
- Duas a quatro mudanças de direção.
- Pode incluir um retorno de 180 graus, desde que o treino já tenha deixado claro como girar.
- Uma bifurcação visual pode existir, mas a rota correta deve continuar legível.
- Solução mínima ainda possível com blocos simples.

A dificuldade deve vir de manter a orientação após cada curva. Não aumentar a quantidade de blocos apenas para cansar o jogador.

### Nível 3: descobrir compressão

**Objetivo:** perceber que uma sequência repetida deve virar uma abstração.

- Criar um padrão visual repetível, como `avançar, virar, avançar`.
- A solução com comandos simples deve funcionar, mas ultrapassar o limite de blocos.
- A solução mínima deve usar `repetir até o pino`.
- Evitar bifurcações que exijam condições neste momento.
- A economia deve ser clara: usar repetição deve remover pelo menos 2 blocos em relação à sequência literal.

O jogador não deve aprender repetição por tentativa cega. O padrão da rota precisa estar visível antes da execução.

### Nível 4: tomar decisão pelo caminho

**Objetivo:** usar informação local da rota para escolher uma ação.

- Incluir bifurcações ou curvas cuja ação possa ser descrita por `se caminho`.
- A condição necessária deve ser observável na grade.
- A solução mínima deve usar uma condição, mas não exigir condição e repetição aninhadas de forma complexa.
- Deve existir uma solução literal que funcione, porém use mais blocos que o limite.
- Evitar duas interpretações condicionais igualmente curtas quando a métrica exigir solução única.

Uma condição não deve servir apenas para esconder uma sequência fixa. Ela deve representar uma regra reutilizável sobre o caminho.

### Nível 5: combinar abstrações

**Objetivo:** medir planejamento estrutural, não apenas memorização de sequências.

- A solução mínima deve combinar `repetir até o pino` com `se caminho` ou `se/senão`.
- Usar uma rota em que a mesma regra resolva situações visualmente diferentes.
- Exigir de duas a quatro decisões relevantes durante a execução.
- Manter a grade e a quantidade de elementos visuais próximas dos níveis anteriores.
- Aceitar mais de um programa mínimo somente se todos representarem a mesma qualidade de raciocínio.

Este é o primeiro nível em que a pessoa deve pensar no programa como uma regra geral, e não como uma lista de movimentos.

### Nível 6: otimização sob alternativas plausíveis

**Objetivo:** diferenciar quem encontra uma solução funcional de quem encontra uma solução realmente eficiente.

- Oferecer pelo menos duas estratégias que parecem boas antes da execução.
- Uma estratégia deve funcionar, mas usar 1 ou 2 blocos além do mínimo.
- A estratégia ótima deve exigir antecipar uma consequência posterior.
- Não adicionar blocos novos, textos novos ou uma grade maior apenas para elevar a dificuldade.
- Manter o tempo de animação curto o suficiente para não recompensar tentativa e erro.

Este nível deve registrar separadamente conclusão e qualidade. Resolver com mais blocos é melhor que não resolver, mas não equivale à solução ótima.

### Nível 7: transferência e domínio

**Objetivo:** verificar se a pessoa aprendeu o princípio e consegue aplicá-lo em uma estrutura nova.

- Usar uma seed com topologia diferente das anteriores.
- Combinar orientação, repetição e condição sem introduzir nenhuma regra nova.
- Não repetir o mesmo formato visual de solução dos níveis 5 e 6.
- Exigir um programa curto, validado previamente por um solver.
- Limitar alternativas inúteis para que a fase continue cabendo confortavelmente em uma tela móvel.

O nível final não deve ser um pico de punição. Ele deve confirmar transferência. Se o jogador dominou os conceitos anteriores, precisa conseguir formular uma hipótese forte sem explorar combinações aleatórias.

## Como medir a dificuldade de uma fase

Antes de aceitar uma seed, o gerador deve calcular ou estimar:

- `B*`: quantidade mínima real de blocos para chegar ao pino;
- `P`: quantidade de comandos primitivos da rota literal;
- `C = P / B*`: taxa de compressão oferecida pelas abstrações;
- quantidade de curvas e mudanças de orientação;
- quantidade de decisões condicionais executadas;
- profundidade máxima de aninhamento;
- quantidade de programas mínimos distintos;
- quantidade de programas quase ótimos, com `B* + 1` ou `B* + 2` blocos;
- quantas escolhas erradas continuam parecendo válidas por dois ou mais passos;
- número de ações executadas até sucesso ou falha.

O limite exibido ao jogador deve derivar de `B*`, não da quantidade de comandos da rota literal. Se o objetivo é usar o mínimo possível, o sistema precisa conhecer esse mínimo ou tratar blocos usados como score contínuo, sem afirmar que um valor não comprovado é ótimo.

## Faixas de calibração

As faixas abaixo são sinais para teste com pessoas, não verdades universais:

| Etapa | Acerto na primeira tentativa | Conclusão em até 3 tentativas |
| --- | ---: | ---: |
| Treino | não pontuar | 90% a 100% |
| Níveis 1 e 2 | 65% a 85% | 90% a 100% |
| Níveis 3 e 4 | 45% a 70% | 80% a 95% |
| Níveis 5 e 6 | 30% a 55% | 70% a 90% |
| Nível 7 | 25% a 50% | 65% a 85% |

Se quase todos acertarem de primeira, a fase tem pouco poder de diferenciação. Se menos de dois terços concluírem mesmo após três tentativas, investigar primeiro ambiguidade, interface e conhecimento não ensinado antes de aumentar dicas ou reduzir a lógica.

## Diagnóstico de um nível fácil demais

Sinais:

- mais de 85% acertam na primeira tentativa;
- quase ninguém edita o programa depois de montá-lo;
- tempo de solução fica próximo do tempo mecânico de arrastar os blocos;
- a solução ótima é apenas copiar cada trecho da rota;
- repetição e condição não reduzem blocos de maneira relevante;
- seeds diferentes produzem essencialmente o mesmo programa.

Ajustes recomendados:

- aumentar a profundidade de planejamento, não o tamanho da tela;
- incluir uma alternativa local plausível que falha mais adiante;
- aumentar a diferença entre solução literal e solução abstrata;
- variar a direção inicial e a posição do padrão;
- rejeitar seeds cuja solução seja visualmente óbvia ou repetida.

## Diagnóstico de um nível difícil demais

Sinais:

- menos de 65% concluem em três tentativas;
- muitos programas falham no primeiro bloco;
- jogadores perguntam o significado de comandos durante a avaliação;
- a estratégia mais eficiente é executar várias combinações rapidamente;
- há muitos programas quase corretos sem feedback suficiente para revisão;
- o resultado muda por detalhes de encaixe ou precisão motora;
- o tempo é consumido mais pela animação do que pelo raciocínio.

Ajustes recomendados:

- voltar o conceito para o treino;
- remover uma abstração simultânea ou reduzir o aninhamento;
- tornar a direção e os caminhos mais legíveis;
- diminuir alternativas irrelevantes sem revelar a resposta;
- preservar o programa após falha e destacar onde a execução parou;
- rejeitar seeds ambíguas ou sem solução mínima comprovada.

## Regra de progressão no treino

Durante o treino, avançar após duas soluções corretas consecutivas do mesmo conceito. Se houver duas falhas consecutivas, oferecer outra fase mais simples do mesmo conceito, não entregar imediatamente a solução.

Uma dica deve apontar a categoria do erro, por exemplo `observe a direção inicial` ou `há uma sequência que se repete`. Ela não deve indicar quais blocos colocar.

Durante a avaliação, não mudar de nível por desempenho. Registrar o resultado e seguir a sequência previamente definida.

## Métricas que devem ser armazenadas

- seed e nível;
- tempo até o primeiro bloco e até a primeira execução;
- tempo total;
- blocos usados e `B*`;
- distância para o mínimo: `blocos usados - B*`;
- tentativas;
- sucesso na primeira tentativa;
- ponto da rota em que cada programa falhou;
- quantidade e tipo de edições entre tentativas;
- uso de repetição, condição e `se/senão`;
- passos executados;
- abandono ou conclusão.

Não resumir tudo em um único score. Tempo, precisão e qualidade do programa representam perfis diferentes.

## Checklist para aprovar cada seed

- A rota tem solução comprovada.
- O mínimo real de blocos foi calculado.
- A dificuldade corresponde ao objetivo do nível.
- Todas as informações necessárias estão visíveis.
- A seed não depende de precisão motora ou velocidade de leitura.
- O nível cabe em `100vw × 100dvh` sem scroll.
- A solução não é sugerida por cor, posição ou destaque visual.
- As alternativas erradas falham por lógica, não por ambiguidade.
- Reiniciar restaura exatamente a mesma fase.
- A seed é reproduzível e comparável com outras da mesma faixa.
- A execução termina em tempo curto e não incentiva spam no botão.
- O programa permanece editável depois de uma falha.

## Regra final

Cada nível deve ensinar ou medir **uma mudança cognitiva por vez**:

1. entender a orientação;
2. planejar uma sequência;
3. reconhecer repetição;
4. expressar uma decisão;
5. combinar abstrações;
6. comparar estratégias;
7. transferir o princípio para uma rota nova.

Se um nível exige aprender controles, interpretar uma regra nova e descobrir uma otimização ao mesmo tempo, ele não está difícil: está mal escalonado.
