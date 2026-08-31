import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // ==========================================
  // MÓDULO 1: ESTRUTURAS LÓGICAS
  // ==========================================
  // m1-l1: O que é uma Proposição?
  {
    id: 'q-m1-l1-1',
    lessonId: 'm1-l1',
    subject: 'estruturas-logicas',
    topic: 'proposicao',
    difficulty: 1,
    question: 'Assinale a alternativa que apresenta uma PROPOSIÇÃO LÓGICA válida:',
    options: [
      'Que dia lindo!',
      'Feche a porta da sala.',
      'O número 7 é um número primo.',
      'Onde fica o centro da cidade?'
    ],
    answer: 2,
    explanation: 'Frases exclamativas (!), imperativas (ordens) e interrogativas (?) NÃO são proposições. Apenas "O número 7 é um número primo" é uma frase declarativa que pode ser julgada em Verdadeiro (V) ou Falso (F).',
    tip: 'Lembre-se: Pergunta, Ordem e Exclamação NUNCA são proposições!',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m1-l1-2',
    lessonId: 'm1-l1',
    subject: 'estruturas-logicas',
    topic: 'proposicao',
    difficulty: 2,
    question: 'Qual das seguintes sentenças NÃO pode ser considerada uma proposição lógica?',
    options: [
      'A capital da França é Paris.',
      'Existe vida em outros planetas do universo.',
      'Por favor, traga um copo de água.',
      'O número 12 é um número ímpar.'
    ],
    answer: 2,
    explanation: '"Por favor, traga um copo de água" é uma frase imperativa (pedido/ordem). Sentenças imperativas não possuem valor de verdadeiro ou falso.',
    tip: 'Pedidos e ordens não são proposições.',
    banca: 'Cebraspe',
    concursoYear: '2023'
  },
  {
    id: 'q-m1-l1-3',
    lessonId: 'm1-l1',
    subject: 'estruturas-logicas',
    topic: 'proposicao',
    difficulty: 2,
    question: 'Dentre as frases abaixo, a única que constitui uma proposição lógica é:',
    options: [
      'x + 5 = 10 (com x sem valor atribuído)',
      'O Brasil conquistou a Copa do Mundo de 1970.',
      'Viva a liberdade!',
      'Qual é o seu nome?'
    ],
    answer: 1,
    explanation: 'A frase "O Brasil conquistou a Copa do Mundo de 1970" é declarativa e possui valor verdadeiro. Frases abertas (com variáveis desconhecidas), exclamativas e interrogativas não são proposições.',
    tip: 'Frases abertas sem valor definido para a variável não são proposições.',
    banca: 'FCC',
    concursoYear: '2024'
  },

  // m1-l2: Proposições Simples vs Compostas
  {
    id: 'q-m1-l2-1',
    lessonId: 'm1-l2',
    subject: 'estruturas-logicas',
    topic: 'proposicao-composta',
    difficulty: 2,
    question: 'Dadas as frases:\nI. Brasília é a capital do Brasil.\nII. Faça o seu dever de casa.\nIII. 5 + 3 = 9 E 10 > 2.\nQuantas proposições lógicas temos no total?',
    options: ['Nenhuma', 'Apenas 1', 'Apenas 2', 'Todas as 3'],
    answer: 2,
    explanation: 'I é uma proposição simples (V). II é uma ordem (não é proposição). III é uma proposição composta (F). Portanto, existem 2 proposições (I e III).',
    tip: 'Frase II é ordem/imperativa.',
    banca: 'FCC',
    concursoYear: '2023'
  },
  {
    id: 'q-m1-l2-2',
    lessonId: 'm1-l2',
    subject: 'estruturas-logicas',
    topic: 'proposicao-composta',
    difficulty: 2,
    question: 'Qual das alternativas a seguir é um exemplo de PROPOSIÇÃO COMPOSTA?',
    options: [
      'O Sol é uma estrela.',
      'Marcos é advogado e Júlia é médica.',
      'A Lua é um satélite natural da Terra.',
      'O número 9 é divisível por 3.'
    ],
    answer: 1,
    explanation: '"Marcos é advogado e Júlia é médica" une duas proposições simples pelo conectivo "e", formando uma proposição composta.',
    tip: 'Proposição composta possui conectivos lógicos (E, OU, SE...ENTÃO, etc).',
    banca: 'FGV',
    concursoYear: '2024'
  },

  // ==========================================
  // MÓDULO 2: LÓGICA DE ARGUMENTAÇÃO
  // ==========================================
  // m2-l1: Estrutura de um Argumento
  {
    id: 'q-m2-l1-1',
    lessonId: 'm2-l1',
    subject: 'logica-argumentacao',
    topic: 'estrutura-argumento',
    difficulty: 2,
    question: 'Considere as premissas:\n- Todo concurseiro é dedicado.\n- Pedro é concurseiro.\nQual a conclusão LÓGICA necessária?',
    options: [
      'Pedro não estuda aos finais de semana.',
      'Pedro é dedicado.',
      'Todo homem dedicado é concurseiro.',
      'Nenhum concurseiro é dedicado.'
    ],
    answer: 1,
    explanation: 'Se TODO concurseiro é dedicado e Pedro pertence ao grupo dos concurseiros, Pedro é obrigatoriamente dedicado.',
    tip: 'Desenhe o círculo dos Concurseiros dentro do círculo dos Dedicados.',
    banca: 'FGV',
    concursoYear: '2024'
  },
  {
    id: 'q-m2-l1-2',
    lessonId: 'm2-l1',
    subject: 'logica-argumentacao',
    topic: 'estrutura-argumento',
    difficulty: 2,
    question: 'Em um argumento válido, se todas as premissas forem verdadeiras, a conclusão obrigatoriamente será:',
    options: [
      'Falsa',
      'Verdadeira',
      'Indeterminada',
      'Provável mas não garantida'
    ],
    answer: 1,
    explanation: 'Por definição de validade lógica dedutiva, é impossível ter premissas verdadeiras e conclusão falsa em um argumento válido. A conclusão deve ser Verdadeira.',
    tip: 'Argumento válido com premissas V garante conclusão V.',
    banca: 'Cebraspe',
    concursoYear: '2023'
  },

  // m2-l2: Dedução vs Indução e Silogismos
  {
    id: 'q-m2-l2-1',
    lessonId: 'm2-l2',
    subject: 'logica-argumentacao',
    topic: 'silogismo',
    difficulty: 2,
    question: 'Analise o raciocínio: "Todos os cães latem. Rex é um cão. Logo, Rex late." Esse tipo de raciocínio é classificado como:',
    options: [
      'Indutivo',
      'Dedutivo',
      'Analógico',
      'Falacioso'
    ],
    answer: 1,
    explanation: 'É um raciocínio DEDUTIVO (Silogismo clássico), pois parte de uma regra geral ("Todos os cães latem") para uma conclusão específica necessária sobre Rex.',
    tip: 'Dedução parte do Geral para o Particular.',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m2-l2-2',
    lessonId: 'm2-l2',
    subject: 'logica-argumentacao',
    topic: 'inducao',
    difficulty: 3,
    question: 'Analise: "Observei 100 cisnes brancos na Europa. Logo, todos os cisnes do mundo são brancos." Esse raciocínio é:',
    options: [
      'Dedutivo infalível',
      'Indutivo (probabilístico)',
      'Uma tautologia perfeita',
      'Uma condicional lógica'
    ],
    answer: 1,
    explanation: 'É um raciocínio INDUTIVO. Parte de observações particulares (100 cisnes) para generalizar uma regra. A indução gera conclusões prováveis, mas não garantidas.',
    tip: 'Indução parte do Particular para o Geral.',
    banca: 'IBFC',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 3: CONECTIVOS LÓGICOS & MACETES
  // ==========================================
  // m3-l1: NÃO (¬) — A Negação
  {
    id: 'q-m3-l1-1',
    lessonId: 'm3-l1',
    subject: 'logica-sentencial',
    topic: 'negacao-simples',
    difficulty: 1,
    question: 'Se a proposição P: "O candidato foi aprovado" é VERDADEIRA, qual o valor de ¬P ("O candidato NÃO foi aprovado")?',
    options: ['Verdadeiro (V)', 'Falso (F)', 'Indeterminado', 'Depende da banca'],
    answer: 1,
    explanation: 'O operador NÃO (¬) simplesmente inverte o valor lógico. Se P é V, a negação ¬P é Falsa (F).',
    tip: 'NÃO inverte: V vira F, F vira V.',
    banca: 'Cebraspe',
    concursoYear: '2024'
  },
  {
    id: 'q-m3-l1-2',
    lessonId: 'm3-l1',
    subject: 'logica-sentencial',
    topic: 'negacao-simples',
    difficulty: 1,
    question: 'Qual o valor lógico de ¬(¬P) quando a proposição P é Verdadeira?',
    options: ['Falso (F)', 'Verdadeiro (V)', 'Indefinido', 'Nulo'],
    answer: 1,
    explanation: 'A dupla negação cancela a si mesma: ¬(¬P) é equivalente ao próprio P. Como P é Verdadeiro, a dupla negação resulta em Verdadeiro.',
    tip: 'Dupla negação cancela: ¬(¬P) = P.',
    banca: 'Vunesp',
    concursoYear: '2023'
  },

  // m3-l2: E (∧) — A Conjunção
  {
    id: 'q-m3-l2-1',
    lessonId: 'm3-l2',
    subject: 'logica-sentencial',
    topic: 'conjuncao',
    difficulty: 2,
    question: 'Se P = Verdadeiro e Q = Falso, qual é o valor lógico da conjunção P ∧ Q (P E Q)?',
    options: ['Verdadeiro (V)', 'Falso (F)'],
    answer: 1,
    explanation: 'No conectivo E (∧), a expressão só é Verdadeira se TODOS os lados forem Verdadeiros. Como Q é Falso, o resultado é Falso (F).',
    tip: 'Macete: "E = TODOS VERDADEIROS". Se tiver 1 falso, já é F!',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m3-l2-2',
    lessonId: 'm3-l2',
    subject: 'logica-sentencial',
    topic: 'conjuncao',
    difficulty: 2,
    question: 'A afirmação "O sol brilha E a lua é de queijo" é verdadeira somente se:',
    options: [
      'Ambas as afirmações forem verdadeiras',
      'Pelo menos uma das afirmações for verdadeira',
      'A primeira afirmação for verdadeira',
      'Nenhuma afirmação for verdadeira'
    ],
    answer: 0,
    explanation: 'A conjunção (E) exige obrigatoriamente que AMBAS as proposições sejam verdadeiras para que o conjunto seja verdadeiro.',
    tip: 'Conjunção E exige V em ambos os lados.',
    banca: 'FCC',
    concursoYear: '2023'
  },

  // m3-l3: OU (∨) — A Disjunção
  {
    id: 'q-m3-l3-1',
    lessonId: 'm3-l3',
    subject: 'logica-sentencial',
    topic: 'disjuncao',
    difficulty: 2,
    question: 'Se P = Falso e Q = Verdadeiro, qual o valor de P ∨ Q (P OU Q)?',
    options: ['Verdadeiro (V)', 'Falso (F)'],
    answer: 0,
    explanation: 'No conectivo OU (∨), basta que PELO MENOS UM lado seja Verdadeiro. Como Q é V, o resultado da disjunção é Verdadeiro (V).',
    tip: 'Macete: "OU = BASTA UM VERDADEIRO". Só é F se ambos forem F.',
    banca: 'FCC',
    concursoYear: '2024'
  },
  {
    id: 'q-m3-l3-2',
    lessonId: 'm3-l3',
    subject: 'logica-sentencial',
    topic: 'disjuncao',
    difficulty: 2,
    question: 'Uma proposição do tipo P ∨ Q é FALSA somente na seguinte situação:',
    options: [
      'P é V e Q é F',
      'P é F e Q é V',
      'Ambas P e Q são Falsas',
      'Ambas P e Q são Verdadeiras'
    ],
    answer: 2,
    explanation: 'A disjunção (OU) só é FALSA quando TODOS os seus componentes forem Falsos (F ∨ F = F).',
    tip: 'F ∨ F = F (Único caso de falsidade no OU).',
    banca: 'AOCP',
    concursoYear: '2023'
  },

  // m3-l4: SE... ENTÃO (→) — A Condicional
  {
    id: 'q-m3-l4-1',
    lessonId: 'm3-l4',
    subject: 'logica-sentencial',
    topic: 'condicional',
    difficulty: 2,
    question: 'Sabendo que P = Verdadeiro e Q = Falso, a proposição condicional P → Q (Se P, então Q) é:',
    options: ['Verdadeira (V)', 'Falsa (F)'],
    answer: 1,
    explanation: 'A condicional P → Q SÓ É FALSA na combinação V → F ("Vera Fischer é Falsa"). Como P=V e Q=F, a proposição é FALSA.',
    tip: 'Macete: "Vera Fischer é FALSA!" V → F = F.',
    banca: 'Cebraspe',
    concursoYear: '2024'
  },
  {
    id: 'q-m3-l4-2',
    lessonId: 'm3-l4',
    subject: 'logica-sentencial',
    topic: 'condicional',
    difficulty: 3,
    question: 'Considere P = Falso e Q = Falso. Qual o valor lógico de P → Q?',
    options: ['Verdadeiro (V)', 'Falso (F)'],
    answer: 0,
    explanation: 'A condicional SÓ é falsa quando V → F. Quando a primeira parte é Falsa (F → F), o resultado da condicional é VERDADEIRO (V)!',
    tip: 'Cuidado! F → F é VERDADEIRO. Só é Falso se for V → F.',
    banca: 'FGV',
    concursoYear: '2023'
  },

  // m3-l5: SE E SOMENTE SE (↔) — A Bicondicional
  {
    id: 'q-m3-l5-1',
    lessonId: 'm3-l5',
    subject: 'logica-sentencial',
    topic: 'bicondicional',
    difficulty: 2,
    question: 'A proposição P ↔ Q (P se e somente se Q) com P = Falso e Q = Falso é:',
    options: ['Verdadeira (V)', 'Falsa (F)'],
    answer: 0,
    explanation: 'A bicondicional ↔ é Verdadeira quando os dois lados têm o MESMO valor lógico. F ↔ F = V!',
    tip: 'Macete: "Bicondicional = IGUAIS" (V↔V = V, F↔F = V).',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m3-l5-2',
    lessonId: 'm3-l5',
    subject: 'logica-sentencial',
    topic: 'bicondicional',
    difficulty: 2,
    question: 'Quando a proposição P ↔ Q assume o valor lógico FALSO?',
    options: [
      'Quando P e Q têm valores lógicos diferentes (um V e outro F)',
      'Quando P e Q são ambos Verdadeiros',
      'Quando P e Q são ambos Falsos',
      'Em nenhuma situação'
    ],
    answer: 0,
    explanation: 'A bicondicional só é Falsa quando os valores dos lados forem diferentes (V ↔ F = F ou F ↔ V = F).',
    tip: 'Diferentes no SE E SOMENTE SE dão FALSO.',
    banca: 'IBFC',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 4: TABELAS-VERDADE INTERATIVAS
  // ==========================================
  // m4-l1: Construindo Tabelas (Fórmula 2ⁿ)
  {
    id: 'q-m4-l1-1',
    lessonId: 'm4-l1',
    subject: 'tabelas-verdade',
    topic: 'quantidade-linhas',
    difficulty: 2,
    question: 'Uma tabela-verdade construída para avaliar a proposição composta (P ∧ Q) → (R ∨ S) terá quantas linhas?',
    options: ['4 linhas', '8 linhas', '16 linhas', '32 linhas'],
    answer: 2,
    explanation: 'Temos 4 proposições simples distintas (P, Q, R, S). O número de linhas é 2ⁿ = 2⁴ = 16 linhas.',
    tip: 'Fórmula: 2ⁿ onde n é a quantidade de letras distintas.',
    banca: 'Cebraspe',
    concursoYear: '2024'
  },
  {
    id: 'q-m4-l1-2',
    lessonId: 'm4-l1',
    subject: 'tabelas-verdade',
    topic: 'quantidade-linhas',
    difficulty: 2,
    question: 'Se uma proposição lógica contém 3 proposições simples distintas (P, Q e R), sua tabela-verdade possuirá exatamente:',
    options: ['3 linhas', '6 linhas', '8 linhas', '12 linhas'],
    answer: 2,
    explanation: 'Usando a fórmula 2ⁿ com n = 3: 2³ = 2 × 2 × 2 = 8 linhas.',
    tip: '2³ = 8 linhas.',
    banca: 'FCC',
    concursoYear: '2023'
  },

  // m4-l2: Tautologia, Contradição e Contingência
  {
    id: 'q-m4-l2-1',
    lessonId: 'm4-l2',
    subject: 'tabelas-verdade',
    topic: 'tautologia',
    difficulty: 3,
    question: 'A proposição composta P ∨ ¬P é uma:',
    options: ['Tautologia', 'Contradição', 'Contingência', 'Equivalência falsa'],
    answer: 0,
    explanation: 'P ∨ ¬P ("Hoje chove ou não chove") sempre resulta em Verdadeiro em todas as linhas da tabela. Isso é uma TAUTOLOGIA.',
    tip: 'Tautologia = Última coluna toda V.',
    banca: 'FCC',
    concursoYear: '2024'
  },
  {
    id: 'q-m4-l2-2',
    lessonId: 'm4-l2',
    subject: 'tabelas-verdade',
    topic: 'contradicao',
    difficulty: 3,
    question: 'Uma proposição composta cuja última coluna da tabela-verdade resulta APENAS em valores FALSOS é chamada de:',
    options: ['Tautologia', 'Contradição', 'Contingência', 'Silogismo'],
    answer: 1,
    explanation: 'Quando o resultado final de uma tabela-verdade é obrigatoriamente Falso em todas as combinações, trata-se de uma CONTRADIÇÃO (ex: P ∧ ¬P).',
    tip: 'Tudo F = Contradição.',
    banca: 'FGV',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 5: EQUIVALÊNCIAS LÓGICAS
  // ==========================================
  // m5-l1: Equivalência da Condicional (Neymar & Inverte-Nega)
  {
    id: 'q-m5-l1-1',
    lessonId: 'm5-l1',
    subject: 'equivalencias-logicas',
    topic: 'equivalencia-condicional',
    difficulty: 3,
    question: 'Qual frase é LOGICAMENTE EQUIVALENTE à sentença: "Se estudo, então passo no concurso"?',
    options: [
      'Se não estudo, então não passo no concurso.',
      'Não estudo OU passo no concurso.',
      'Estudo e não passo no concurso.',
      'Se passo no concurso, então estudo.'
    ],
    answer: 1,
    explanation: 'Pela regra de equivalência da condicional P → Q ≡ ¬P ∨ Q (Regra do NE-Y-MAR: Nega a 1ª OU Mantém a 2ª), temos: "NÃO estudo OU passo no concurso".',
    tip: 'Macete NE-Y-MAR: Nega a 1ª (NÃO estudo) + OU + Mantém a 2ª (passo no concurso).',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m5-l1-2',
    lessonId: 'm5-l1',
    subject: 'equivalencias-logicas',
    topic: 'contrapositiva',
    difficulty: 3,
    question: 'Usando a regra da Contrapositiva (Inverte e Nega), a equivalência de "Se chove, então a rua fica molhada" é:',
    options: [
      'Se a rua não fica molhada, então não chove.',
      'Se não chove, a rua não fica molhada.',
      'Chove ou a rua fica molhada.',
      'Se a rua fica molhada, então chove.'
    ],
    answer: 0,
    explanation: 'P → Q ≡ ¬Q → ¬P. Inverte-se a ordem e negam-se ambas as partes: "Se a rua NÃO fica molhada, então NÃO chove".',
    tip: 'Contrapositiva = Inverte a ordem e Nega ambas!',
    banca: 'Cebraspe',
    concursoYear: '2023'
  },

  // m5-l2: Leis de De Morgan
  {
    id: 'q-m5-l2-1',
    lessonId: 'm5-l2',
    subject: 'equivalencias-logicas',
    topic: 'de-morgan',
    difficulty: 3,
    question: 'Pelas Leis de De Morgan, a negação de (P ∧ Q) é equivalente a:',
    options: ['¬P ∧ ¬Q', '¬P ∨ ¬Q', 'P ∨ Q', '¬P → ¬Q'],
    answer: 1,
    explanation: 'A Lei de De Morgan diz que ao negar uma conjunção ¬(P ∧ Q), negamos ambas as partes e trocamos o E (∧) por OU (∨): ¬P ∨ ¬Q.',
    tip: 'Nega tudo e inverte o símbolo do meio (∧ vira ∨).',
    banca: 'FGV',
    concursoYear: '2024'
  },
  {
    id: 'q-m5-l2-2',
    lessonId: 'm5-l2',
    subject: 'equivalencias-logicas',
    topic: 'de-morgan',
    difficulty: 3,
    question: 'Qual a negação lógica da afirmação: "João é médico OU Maria é professora"?',
    options: [
      'João não é médico E Maria não é professora',
      'João não é médico OU Maria não é professora',
      'Se João é médico, Maria não é professora',
      'João é médico E Maria não é professora'
    ],
    answer: 0,
    explanation: 'Para negar o OU (∨), nega-se a 1ª, nega-se a 2ª e troca-se por E (∧): "João NÃO é médico E Maria NÃO é professora".',
    tip: 'Negação do OU troca por E e nega os dois lados.',
    banca: 'FCC',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 6: NEGAÇÃO DE PROPOSIÇÕES
  // ==========================================
  // m6-l1: Negação da Condicional — Regra do MA-NÉ
  {
    id: 'q-m6-l1-1',
    lessonId: 'm6-l1',
    subject: 'negacao',
    topic: 'negacao-condicional',
    difficulty: 3,
    question: 'A negação lógica da afirmação "Se o alarme toca, então os guardas acordam" é:',
    options: [
      'Se o alarme não toca, os guardas não acordam.',
      'O alarme toca E os guardas NÃO acordam.',
      'O alarme não toca OU os guardas acordam.',
      'Se os guardas acordam, o alarme toca.'
    ],
    answer: 1,
    explanation: 'Para negar uma condicional (P → Q), usamos a regra do MA-NÉ: MANTÉM a 1ª (O alarme toca) E NEGA a 2ª (os guardas NÃO acordam) → P ∧ ¬Q.',
    tip: 'Macete do MANÉ: Mantém a primeira E Nega a segunda!',
    banca: 'Cebraspe',
    concursoYear: '2024'
  },
  {
    id: 'q-m6-l1-2',
    lessonId: 'm6-l1',
    subject: 'negacao',
    topic: 'negacao-condicional',
    difficulty: 3,
    question: 'Qual é a negação de: "Se como doces, então ganho peso"?',
    options: [
      'Como doces E NÃO ganho peso.',
      'Não como doces ou ganho peso.',
      'Se não como doces, não ganho peso.',
      'Não como doces e não ganho peso.'
    ],
    answer: 0,
    explanation: 'Regra do MANÉ (Negação de P → Q): Mantém a 1ª ("Como doces") E Nega a 2ª ("NÃO ganho peso").',
    tip: '¬(P → Q) = P ∧ ¬Q (MANTÉM E NEGA).',
    banca: 'Vunesp',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 7: DIAGRAMAS LÓGICOS
  // ==========================================
  // m7-l1: Todo, Nenhum e Algum
  {
    id: 'q-m7-l1-1',
    lessonId: 'm7-l1',
    subject: 'diagramas-logicos',
    topic: 'todo-algum',
    difficulty: 3,
    question: 'Considerando verdadeiras as afirmações:\n1. Todo advogado é letrado.\n2. Alguns advogados são poetas.\nConclui-se necessariamente que:',
    options: [
      'Todo poeta é advogado.',
      'Nenhum poeta é letrado.',
      'Algum poeta é letrado.',
      'Nenhum advogado é poeta.'
    ],
    answer: 2,
    explanation: 'Como alguns advogados são poetas e TODOS os advogados são letrados, obrigatoriamente esses advogados poetas são letrados. Logo, "Algum poeta é letrado".',
    tip: 'Faça a interseção entre Advogados e Poetas dentro do grande conjunto dos Letrados.',
    banca: 'FCC',
    concursoYear: '2024'
  },
  {
    id: 'q-m7-l1-2',
    lessonId: 'm7-l1',
    subject: 'diagramas-logicos',
    topic: 'negacao-quantificadores',
    difficulty: 3,
    question: 'Qual é a negação lógica da sentença universal: "Todo estudante passou na prova"?',
    options: [
      'Nenhum estudante passou na prova.',
      'Algum estudante NÃO passou na prova.',
      'Todos os estudantes reprovaram.',
      'Nenhuma das anteriores.'
    ],
    answer: 1,
    explanation: 'Para negar o quantificador "TODO", usa-se o macete PEA + NÃO (Pelo menos um, Existe, Algum) acompanhado da negação: "Algum estudante NÃO passou na prova".',
    tip: 'Macete: Negação de TODO é "PEA + NÃO" (Pelo menos um / Existe / Algum + NÃO).',
    banca: 'FGV',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 8: LÓGICA DE PRIMEIRA ORDEM
  // ==========================================
  // m8-l1: Quantificadores ∀ e ∃
  {
    id: 'q-m8-l1-1',
    lessonId: 'm8-l1',
    subject: 'primeira-ordem',
    topic: 'quantificador-universal',
    difficulty: 4,
    question: 'Como se traduz em linguagem formal a frase: "Todo jurista é conhecedor das leis"?',
    options: [
      '∃x (Jurista(x) ∧ Conhecedor(x))',
      '∀x (Jurista(x) → Conhecedor(x))',
      '∀x (Jurista(x) ∧ Conhecedor(x))',
      '¬∀x (Jurista(x) → Conhecedor(x))'
    ],
    answer: 1,
    explanation: 'O quantificador universal "Todo" usa a estrutura ∀x (P(x) → Q(x)), significando: Para todo x, se x é jurista, então x é conhecedor.',
    tip: 'Todo = ∀ com condicional (→). Existe = ∃ com conjunção (∧).',
    banca: 'Cebraspe',
    concursoYear: '2024'
  },
  {
    id: 'q-m8-l1-2',
    lessonId: 'm8-l1',
    subject: 'primeira-ordem',
    topic: 'quantificador-existencial',
    difficulty: 4,
    question: 'Qual símbolo formal representa o quantificador existencial ("Existe pelo menos um")?',
    options: ['∀', '∃', '∈', '∧'],
    answer: 1,
    explanation: 'O símbolo ∃ representa o quantificador existencial ("Existe", "Existe pelo menos um", "Algum").',
    tip: '∃ = Existe (Existencial); ∀ = Para todo (Universal).',
    banca: 'Cebraspe',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 9: PROBLEMAS ARITMÉTICOS
  // ==========================================
  // m9-l1: Regra de Três & Porcentagem Rápidas
  {
    id: 'q-m9-l1-1',
    lessonId: 'm9-l1',
    subject: 'problemas-aritmeticos',
    topic: 'porcentagem-regra-tres',
    difficulty: 2,
    question: 'Um produto de R$ 200,00 teve um aumento de 15%. Qual o novo preço do produto?',
    options: ['R$ 215,00', 'R$ 230,00', 'R$ 225,00', 'R$ 240,00'],
    answer: 1,
    explanation: '10% de 200 = 20. 5% de 200 = 10. Aumento total = 20 + 10 = R$ 30,00. Novo preço = 200 + 30 = R$ 230,00.',
    tip: '15% = 10% + 5%. Fica facílimo de calcular de cabeça!',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m9-l1-2',
    lessonId: 'm9-l1',
    subject: 'problemas-aritmeticos',
    topic: 'regra-tres-direta',
    difficulty: 2,
    question: 'Se 4 operadores digitam 120 páginas em um dia, quantos operadores com a mesma capacidade serão necessários para digitar 300 páginas no mesmo tempo?',
    options: ['8 operadores', '10 operadores', '12 operadores', '15 operadores'],
    answer: 1,
    explanation: 'Regra de três direta: 4/120 = x/300 → 120x = 1200 → x = 10 operadores.',
    tip: 'Mais páginas exigem mais operadores (Proporcionalidade Direta).',
    banca: 'FCC',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 10: PROBLEMAS GEOMÉTRICOS
  // ==========================================
  // m10-l1: Perímetros e Áreas Fundamentais
  {
    id: 'q-m10-l1-1',
    lessonId: 'm10-l1',
    subject: 'problemas-geometricos',
    topic: 'area-perimetro',
    difficulty: 2,
    question: 'Um terreno retangular tem 12 metros de largura e 20 metros de comprimento. Qual a sua área e seu perímetro?',
    options: [
      'Área: 240 m² | Perímetro: 64 m',
      'Área: 64 m² | Perímetro: 240 m',
      'Área: 240 m² | Perímetro: 32 m',
      'Área: 120 m² | Perímetro: 64 m'
    ],
    answer: 0,
    explanation: 'Área = largura × comprimento = 12 × 20 = 240 m². Perímetro = 2×(12 + 20) = 2×32 = 64 m.',
    tip: 'Área é multiplicação (m²); Perímetro é a soma de todos os lados (m).',
    banca: 'FGV',
    concursoYear: '2024'
  },
  {
    id: 'q-m10-l1-2',
    lessonId: 'm10-l1',
    subject: 'problemas-geometricos',
    topic: 'area-triangulo',
    difficulty: 2,
    question: 'Qual a área de um triângulo retângulo com base de 10 cm e altura de 6 cm?',
    options: ['60 cm²', '30 cm²', '16 cm²', '40 cm²'],
    answer: 1,
    explanation: 'Área do triângulo = (Base × Altura) / 2 = (10 × 6) / 2 = 60 / 2 = 30 cm².',
    tip: 'Área do triângulo é metade do retângulo!',
    banca: 'Vunesp',
    concursoYear: '2023'
  },

  // ==========================================
  // MÓDULO 11: PROBLEMAS MATRICIAIS
  // ==========================================
  // m11-l1: Estrutura de Matrizes & Linhas/Colunas
  {
    id: 'q-m11-l1-1',
    lessonId: 'm11-l1',
    subject: 'problemas-matriciais',
    topic: 'posicao-matriz',
    difficulty: 3,
    question: 'Em uma matriz A de ordem 3x3 com elementos dados por aᵢⱼ = 2i + j, qual é o valor do elemento a₂₃ (2ª linha, 3ª coluna)?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    explanation: 'Substituindo i = 2 e j = 3 na fórmula aᵢⱼ = 2i + j: a₂₃ = 2(2) + 3 = 4 + 3 = 7.',
    tip: 'Primeiro índice i é Linha (2), segundo índice j é Coluna (3).',
    banca: 'FCC',
    concursoYear: '2024'
  },
  {
    id: 'q-m11-l1-2',
    lessonId: 'm11-l1',
    subject: 'problemas-matriciais',
    topic: 'ordem-matriz',
    difficulty: 2,
    question: 'Uma matriz com 4 linhas e 5 colunas possui quantos elementos no total?',
    options: ['9 elementos', '20 elementos', '16 elementos', '25 elementos'],
    answer: 1,
    explanation: 'O total de elementos de uma matriz de ordem m x n é m × n. Para 4 linhas e 5 colunas: 4 × 5 = 20 elementos.',
    tip: 'Total = Linhas × Colunas.',
    banca: 'Vunesp',
    concursoYear: '2023'
  }
];
