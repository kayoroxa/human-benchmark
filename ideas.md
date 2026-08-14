# Ideias de benchmarks

## 1. Painel de diagnóstico

Uma pequena rede de módulos mostra quais conexões poderiam causar uma falha no resultado final. A pessoa escolhe testes simples, cada um com um custo visível, e usa os resultados para identificar o único módulo defeituoso; testar tudo resolve, mas uma boa sequência elimina várias hipóteses por vez. O foco é raciocínio dedutivo e escolha de informação útil, uma habilidade aplicável a suporte, auditoria e investigação de problemas.

Cada seed gera uma topologia, um defeito e resultados consistentes, validados para que o diagnóstico seja único. As métricas separam acerto, número e custo dos testes, hipóteses descartadas por teste e tempo, permitindo distinguir quem diagnostica com precisão de quem apenas verifica todas as opções.

## 2. Agenda de recursos

Tarefas curtas devem ser encaixadas em poucos horários e distribuídas entre recursos com capacidades visíveis; algumas tarefas têm prazo, duração, pré-requisito ou competem pelo mesmo recurso. Todas podem parecer encaixar isoladamente, mas decisões locais ruins criam atrasos adiante. O foco é otimização sob restrições, útil para planejamento operacional e distribuição de trabalho.

O gerador cria agendas com solução ótima calculada e alternativas válidas de qualidade inferior, sem exigir mais elementos nas dificuldades altas. As métricas registram entregas no prazo, tempo ocioso, violações, distância da solução ótima, quantidade de remanejamentos e tempo até a primeira agenda executável.

## 3. Carteira de decisões

Em uma série de rodadas, a pessoa distribui um orçamento pequeno entre opções que exibem claramente ganho, perda e probabilidade; algumas opções compartilham risco, enquanto outras protegem contra resultados ruins. O objetivo não é acertar uma aposta isolada, mas construir decisões de bom valor esperado e risco adequado ao longo de muitas rodadas. O foco é raciocínio probabilístico e gestão de risco.

As sessões usam o mesmo conjunto estatístico ou seeds equivalentes, com rodadas suficientes para reduzir o efeito da sorte. As métricas mantêm separados valor esperado escolhido, resultado realizado, concentração de risco, frequência de decisões dominadas e consistência entre rodadas, sem tratar azar como raciocínio ruim.

## 4. Regra oculta

A tela apresenta poucos exemplos visuais já classificados em dois grupos e novos casos que a pessoa deve classificar; todos os atributos relevantes aparecem como formas, posições e quantidades simples. A regra é única e pode combinar duas relações, como "mesma forma nas pontas e quantidade diferente no centro", sem depender de conhecimento externo. O foco é indução lógica e formação de hipóteses, útil para reconhecer padrões e generalizar procedimentos.

O gerador produz uma regra, cria exemplos que eliminam interpretações alternativas e valida se somente ela explica o conjunto antes de exibi-lo. As métricas incluem acerto na primeira resposta, quantidade de exemplos necessários, tipos de confusão, tempo por decisão e melhora ao longo da sessão, separando descoberta da regra de velocidade de execução.

## 5. Rede de fluxo

Uma rede compacta liga fontes a destinos por caminhos com capacidades visíveis; a pessoa toca nos caminhos para distribuir unidades sem exceder gargalos e tenta entregar toda a demanda com o menor custo. Rotas curtas podem consumir uma conexão crítica e impedir entregas posteriores, embora sejam válidas no momento. O foco é pensamento sistêmico e percepção de gargalos, útil para logística, processos e arquitetura de operações.

Cada seed gera uma rede pequena cuja capacidade máxima e custo ótimo são calculados antes da fase, rejeitando instâncias ambíguas quando a meta exigir solução única. As métricas registram volume entregue, custo excedente sobre o ótimo, gargalos saturados cedo demais, redistribuições, tentativas e tempo, enquanto a dificuldade varia pela estrutura da rede e não pela poluição visual.
