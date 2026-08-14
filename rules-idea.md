# Princípios para criar bons benchmarks de funcionários

## Objetivo do benchmark

O objetivo de um benchmark não é descobrir quem “é mais inteligente” de forma genérica nem quem aprende mais rápido um jogo específico. O objetivo é **isolar capacidades úteis para o trabalho**, medir essas capacidades de forma repetível e descobrir onde cada funcionário é naturalmente forte, onde precisa de treino e qual tipo de função combina melhor com ele.

Um bom benchmark deve responder perguntas práticas. Quem planeja melhor vários passos à frente? Quem toma boas decisões sob pressão? Quem é rápido sem ser imprudente? Quem percebe dependências? Quem evita gastar recursos importantes cedo demais? Quem consegue otimizar um sistema? Quem aprende com um erro e melhora rapidamente? O resultado deve ajudar a decidir **onde investir treinamento e quais responsabilidades entregar a cada pessoa**.

## A regra principal: dificuldade no raciocínio, não na interface

A pessoa deve aprender a usar o benchmark quase instantaneamente. Se ela precisa assistir a uma aula de uma hora para entender o jogo, o benchmark começa a medir o quanto ela aprendeu aquele jogo, e não a capacidade que eu queria testar.

A interface, os símbolos e as regras básicas devem ser óbvios. A dificuldade precisa surgir das **relações entre as informações**. Um puzzle fácil e um difícil podem ter praticamente a mesma aparência; o difícil exige enxergar consequências mais distantes, perceber armadilhas ou encontrar uma ordem globalmente melhor.

Uma ótima regra é: **a complexidade deve estar no problema, nunca no controle do jogo**.

## Um benchmark ruim mede coisas acidentais

Um benchmark é ruim quando fica mais difícil simplesmente porque há mais texto para ler, mais emojis para comparar, números maiores, mais elementos piscando ou regras escondidas. Nesse caso, posso acabar medindo velocidade de leitura, memória visual, familiaridade com videogames ou habilidade motora em vez da competência que me interessa.

Se eu quero medir planejamento, não devo dificultar o teste colocando vinte informações desnecessárias na tela. Se eu quero medir lógica, não devo exigir que a pessoa conheça uma linguagem estranha do jogo. Se eu quero medir tomada de decisão, não devo transformar o resultado em um teste de reflexo.

Sempre devo perguntar: **“A pessoa perdeu porque raciocinou pior ou porque teve dificuldade para entender/operar o teste?”** Se a segunda resposta for frequente, o benchmark está mal desenhado.

## Todas as informações importantes devem estar disponíveis

O funcionário pode errar, mas idealmente não deve poder dizer: “Eu não tinha como saber.”

Uma decisão ruim deve ser ruim porque a pessoa **não enxergou uma consequência que já estava representada no sistema**, não porque o jogo revelou posteriormente uma regra secreta.

Isso é importante porque aproxima o benchmark do trabalho real. Muitas decisões ruins em uma empresa acontecem não por falta absoluta de informação, mas porque alguém não conectou corretamente as informações que já possuía.

## Consequências tardias são melhores que erros óbvios

Uma característica valiosa de puzzles de raciocínio é permitir decisões que sejam válidas agora, mas ruins globalmente. Uma ação pode funcionar perfeitamente no primeiro momento e somente três ou quatro passos depois tornar impossível completar o objetivo.

Isso é melhor do que uma ação que simplesmente dá erro imediatamente, porque obriga o funcionário a pensar: **“Eu consigo fazer isso agora, mas deveria fazer?”**

Esse tipo de benchmark mede planejamento, capacidade de simulação mental, preservação de recursos e entendimento de consequências de segunda ordem.

## O difícil não precisa ter mais elementos

A dificuldade pode aumentar sem aumentar o número de cards, símbolos ou textos. Alguns parâmetros interessantes são a quantidade de passos que é necessário prever, o número de escolhas que parecem boas no momento, quantas decisões erradas sobrevivem por vários passos antes de falhar, o grau de irreversibilidade das decisões e a presença de recompensas imediatas que prejudicam o resultado futuro.

Um puzzle com seis ações pode ser muito mais difícil do que um com doze se três ações forem inicialmente possíveis e somente uma delas permitir completar corretamente toda a cadeia.

## Ambiguidade local, solução global

Um bom puzzle pode permitir várias ações aparentemente razoáveis em determinado momento, mas possuir uma única solução global correta ou uma solução claramente superior.

Isso força o funcionário a diferenciar **“ação possível” de “ação correta”**. Essa distinção é extremamente importante no trabalho: quase sempre existem várias coisas que poderiam ser feitas, mas poucas são as melhores coisas para fazer agora.

No caso de puzzles determinísticos, eu prefiro que o algoritmo confirme matematicamente a solução antes de apresentar a fase ao funcionário.

## Solução única quando o objetivo é ordenação

Se o benchmark é especificamente de ordenação, é melhor que exista uma única ordem correta. Caso contrário, dois funcionários podem encontrar caminhos diferentes igualmente válidos e o score deixa de representar claramente a capacidade testada.

O gerador deve produzir o puzzle, testar todas as combinações relevantes e rejeitar automaticamente fases com múltiplas respostas corretas quando esse não for o objetivo do teste.

Ao mesmo tempo, uma solução única não significa que o puzzle precisa ser óbvio. O ideal é existir uma única solução cercada por **várias sequências plausíveis que acabam fracassando posteriormente**.

## Treino e benchmark são coisas diferentes

Um modo de treino deve ajudar a pessoa a aprender. Pode mostrar onde ocorreu o erro, permitir infinitas tentativas, oferecer feedback imediato e explicar a lógica posteriormente.

Um modo de benchmark deve principalmente medir. Pode registrar tempo, número de tentativas, decisões tomadas e desempenho final. O feedback pode ser menor para impedir que a pessoa transforme o próprio teste em um processo de tentativa e erro.

Eu posso usar o mesmo motor para os dois, mas não devo confundir os objetivos.

## Tentativa e erro não pode ser a melhor estratégia

Se apertar “Play” vinte vezes rapidamente for melhor do que pensar, o benchmark está medindo exploração mecânica e não raciocínio.

O custo de errar pode ser natural: o timer continua rodando enquanto a pessoa corrige. Também pode existir uma penalidade explícita em determinados benchmarks.

A ideia não é impedir o erro. O erro é útil. A ideia é fazer com que **pensar tenha valor**.

## Tempo é uma métrica, não necessariamente a habilidade principal

O cronômetro é útil, mas o benchmark não deve virar uma corrida de leitura. O timer deve diferenciar duas pessoas que entenderam o mesmo problema, mas uma conseguiu raciocinar e executar a solução mais rapidamente.

Sempre que eu perceber que alguém vence simplesmente porque lê símbolos mais rápido, devo revisar o design.

O tempo deve medir **velocidade de raciocínio**, não velocidade de decodificação da interface.

## Não resumir tudo em um único score

Dinheiro, pontos ou tempo podem gerar um ranking simples, mas eu devo armazenar métricas separadamente.

Dependendo do benchmark, podem ser interessantes: tempo até a solução, número de tentativas, quantidade de reordenações, taxa de acerto na primeira tentativa, distância da solução ótima, quantidade de erros, tempo gasto depois de um erro e evolução entre as primeiras e últimas fases.

Dois funcionários podem terminar com scores parecidos por motivos completamente diferentes. Um pode ser lento e extremamente preciso; outro rápido e agressivo. Esses perfis podem ser úteis para funções diferentes.

## O benchmark deve ter uma habilidade principal

Cada benchmark deve ter uma pergunta central. “Estou testando planejamento?” “Probabilidade?” “Velocidade de aprendizado?” “Atenção a dependências?” “Otimização?” “Capacidade de priorização?” “Pensamento lógico?”

Posso registrar habilidades secundárias, mas o puzzle deve possuir uma competência principal claramente identificável. Se eu misturar dez capacidades em um único teste, fica difícil interpretar por que alguém foi bem ou mal.

## Separar determinístico de probabilístico

Benchmarks determinísticos e probabilísticos medem coisas diferentes.

No determinístico, dadas as mesmas ações, o resultado é sempre o mesmo. Isso é excelente para lógica, planejamento, otimização e dependências.

No probabilístico, uma mesma decisão pode produzir resultados diferentes. Isso é útil para testar valor esperado, gestão de risco, tolerância à incerteza e decisão sob probabilidades.

Os dois tipos não devem ser comparados diretamente usando apenas um resultado individual. No probabilístico é necessário usar muitas rodadas, porque uma pessoa pode tomar a melhor decisão e mesmo assim ter azar.

## Benchmark deve ser procedural e difícil de decorar

Sempre que possível, o mesmo motor deve gerar milhares de variações. Eu quero que o funcionário aprenda **o princípio**, não memorize uma fase.

Os valores, dependências e estados podem mudar mantendo exatamente a mesma interface. Assim eu posso aplicar o teste novamente meses depois e medir evolução sem reutilizar as mesmas respostas.

Idealmente, o sistema também calcula automaticamente a dificuldade de cada puzzle antes de apresentá-lo.

## Dificuldade deve ser mensurável

Em vez de classificar manualmente um puzzle como “fácil” ou “difícil”, o algoritmo pode estimar características objetivas.

Por exemplo: quantas ações são válidas no início; quantos passos à frente precisam ser considerados; quantas ordens erradas sobrevivem por três, quatro ou cinco ações; quantas decisões são irreversíveis; quantas sequências parecem boas inicialmente; e quão distante está uma solução intuitiva da solução correta.

Isso permite gerar diferentes níveis de dificuldade sem simplesmente adicionar mais informação visual.

## Comparação deve ser justa

Se eu quiser comparar funcionários, eles devem enfrentar os mesmos puzzles ou conjuntos estatisticamente equivalentes.

Idealmente uso seeds para conseguir reproduzir exatamente uma sessão. Posso registrar qual puzzle cada pessoa recebeu, dificuldade calculada, tempo e resultado.

Um benchmark só é útil para comparação se a diferença no resultado vier principalmente da pessoa, e não de uma diferença aleatória enorme entre as provas.

## Repetição revela mais do que uma tentativa

Não devo concluir que alguém é ótimo ou ruim com base em um único puzzle.

Uma sessão com dezenas de puzzles permite enxergar padrões. Também posso observar a curva de aprendizado. Às vezes uma pessoa começa muito abaixo das outras e termina acima delas porque aprende sistemas extremamente rápido.

Isso é uma informação valiosa por si só.

## O benchmark também deve descobrir aptidão

O objetivo não é simplesmente encontrar defeitos para corrigir. Quero descobrir **onde cada pessoa naturalmente performa acima da média**.

Alguém pode ser excelente em planejamento determinístico e ruim em decisões probabilísticas. Outra pessoa pode ser excelente sob pressão, mas cometer erros em tarefas que exigem cautela. Outra pode demorar mais inicialmente, mas ter uma curva de aprendizado excepcional.

Esses perfis podem sugerir funções diferentes dentro da empresa.

## Benchmark não substitui desempenho real

Nenhum puzzle consegue representar completamente o trabalho. O benchmark deve ser usado como instrumento adicional para formular hipóteses sobre uma pessoa.

Se alguém tem score alto em planejamento, a hipótese é que essa capacidade também apareça em tarefas reais. Depois eu verifico isso no trabalho.

O indicador mais importante continua sendo: **as habilidades medidas conseguem prever desempenho real?**

Com o tempo eu devo comparar os resultados dos benchmarks com resultados concretos dos funcionários e eliminar testes que não possuem poder preditivo.

## O melhor benchmark é simples por fora e profundo por dentro

A pessoa olha e entende quase imediatamente o que precisa fazer. Não há dezenas de regras, tutoriais longos ou conhecimento específico necessário.

Por trás dessa interface simples, porém, existe uma estrutura capaz de exigir planejamento, simulação, otimização, gestão de risco e raciocínio em vários passos.

Esse é o ideal: **zero ou quase zero esforço para aprender o jogo e muito esforço para resolver bem o problema**.

## Perguntas que devo fazer antes de criar qualquer novo benchmark

Antes de desenvolver um puzzle, devo conseguir responder claramente: qual habilidade principal quero medir? O que faria uma pessoa excelente nessa habilidade vencer? Existe alguma habilidade irrelevante que pode dominar o resultado? A interface pode ser aprendida em segundos? Todas as informações necessárias estão disponíveis? O algoritmo consegue determinar o que é uma boa resposta? É possível gerar muitas variações? Posso separar velocidade, precisão e qualidade da decisão? O benchmark consegue ficar muito difícil sem simplesmente adicionar mais texto ou elementos?

Se essas respostas forem boas, provavelmente estou construindo um benchmark útil.

## Princípio final

**Um bom benchmark deve fazer uma tarefa parecer óbvia de entender, mas difícil de executar excepcionalmente bem.**

O funcionário não deveria sair pensando “eu não entendi aquele jogo”. Ele deveria sair pensando:

**“Era óbvio o que eu precisava fazer. Eu só não enxerguei a melhor decisão.”**

Quando isso acontece, o benchmark está muito mais próximo de medir a capacidade que realmente me interessa desenvolver e aproveitar dentro da empresa.
