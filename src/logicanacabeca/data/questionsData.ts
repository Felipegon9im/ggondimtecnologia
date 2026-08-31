import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // --- MÓDULO 1: ESTRUTURAS LÓGICAS ---
  {
    id: 'q-m1-1',
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
    explanation: 'Frases exclamativas (!), imperativas (ordens) e interrogativas (?) NÃO são proposições. Apenas "O número 7 é um número primo" é uma frase declarativa que pode ser julgada em V ou F.',
    tip: 'Lembre-se: Pergunta, Ordem e Exclamação NUNCA são proposições!',
    banca: 'Vunesp',
    concursoYear: '2024'
  },
  {
    id: 'q-m1-2',
    subject: 'estruturas-logicas',
    topic: 'proposicao-composta',
    difficulty: 2,
    question: 'Dadas as frases:\nI. Brasília é a capital do Brasil.\nII. Faça o seu dever de casa.\nIII. 5 + 3 = 9 E 10 > 2.\nQuantas proposições lógicas temos?',
    options: ['Nenhuma', 'Apenas 1', 'Apenas 2', 'Todas as 3'],
    answer: 2,
    explanation: 'I é uma proposição simples (V). II é uma ordem (imperativa, não é proposição). III é uma proposição composta (F). Portanto, existem 2 proposições (I e III).',
    tip: 'Frase II é ordem/imperativa.',
    banca: 'FCC',
    concursoYear: '2023'
  },

  // --- MÓDULO 2: ARGUMENTAÇÃO ---
  {
    id: 'q-m2-1',
    subject: 'logica-argumentacao',
    topic: 'silogismo',
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

  // --- MÓDULO 3: CONECTIVOS LÓGICOS ---
  {
    id: 'q-m3-neg-1',
    subject: 'logica-sentencial',
    topic: 'negacao-simples',
    difficulty: 1,
    question: 'Se a proposição P: "O candidato foi aprovado" é VERDADEIRA, qual o valor de ¬P ("O candidato NÃO foi aprovado")?',
    options: ['Verdadeiro (V)', 'Falso (F)', 'Indeterminado', 'Depende da banca'],
    answer: 1,
    explanation: 'O operador NÃO (¬) simplesmente inverte o valor lógico. Se P é V, a negação ¬P é Falsa (F).',
    tip: 'NÃO inverte: V vira F, F vira V.',
    banca: 'Cebraspe'
  },
  {
    id: 'q-m3-e-1',
    subject: 'logica-sentencial',
    topic: 'conjuncao',
    difficulty: 2,
    question: 'Se P = Verdadeiro e Q = Falso, qual é o valor lógico da conjunção P ∧ Q (P E Q)?',
    options: ['Verdadeiro (V)', 'Falso (F)'],
    answer: 1,
    explanation: 'No conectivo E (∧), a expressão só é Verdadeira se TODOS os lados forem Verdadeiros. Como Q é Falso, o resultado é Falso (F).',
    tip: 'Macete: "E = TODOS VERDADEIROS". Se tiver 1 falso, já é F!',
    banca: 'Vunesp'
  },
  {
    id: 'q-m3-ou-1',
    subject: 'logica-sentencial',
    topic: 'disjuncao',
    difficulty: 2,
    question: 'Se P = Falso e Q = Verdadeiro, qual o valor de P ∨ Q (P OU Q)?',
    options: ['Verdadeiro (V)', 'Falso (F)'],
    answer: 0,
    explanation: 'No conectivo OU (∨), basta que PELO MENOS UM lado seja Verdadeiro. Como Q é V, o resultado da disjunção é Verdadeiro (V).',
    tip: 'Macete: "OU = BASTA UM VERDADEIRO". Só é F se ambos forem F.',
    banca: 'FCC'
  },
  {
    id: 'q-m3-cond-1',
    subject: 'logica-sentencial',
    topic: 'condicional',
    difficulty: 2,
    question: 'Sabendo que P = Verdadeiro e Q = Falso, a proposição condicional P → Q (Se P, então Q) é:',
    options: ['Verdadeira (V)', 'Falsa (F)'],
    answer: 1,
    explanation: 'A condicional P → Q SÓ É FALSA na combinação V → F ("Vera Fischer é Falsa"). Como P=V e Q=F, a proposição é FALSA.',
    tip: 'Macete: "Vera Fischer é FALSA!" V → F = F.',
    banca: 'Cebraspe'
  },
  {
    id: 'q-m3-cond-2',
    subject: 'logica-sentencial',
    topic: 'condicional',
    difficulty: 3,
    question: 'Considere P = Falso e Q = Falso. Qual o valor lógico de P → Q?',
    options: ['Verdadeiro (V)', 'Falso (F)'],
    answer: 0,
    explanation: 'A condicional SÓ é falsa quando V → F. Quando a primeira parte é Falsa (F → F), o resultado da condicional é VERDADEIRO (V)!',
    tip: 'Cuidado! F → F é VERDADEIRO. Só é Falso se for V → F.',
    banca: 'FGV'
  },
  {
    id: 'q-m3-bicond-1',
    subject: 'logica-sentencial',
    topic: 'bicondicional',
    difficulty: 2,
    question: 'A proposição P ↔ Q (P se e somente se Q) com P = Falso e Q = Falso é:',
    options: ['Verdadeira (V)', 'Falsa (F)'],
    answer: 0,
    explanation: 'A bicondicional ↔ é Verdadeira quando os dois lados têm o MESMO valor lógico. F ↔ F = V!',
    tip: 'Macete: "Bicondicional = IGUAIS" (V↔V = V, F↔F = V).',
    banca: 'Vunesp'
  },

  // --- MÓDULO 4: TABELAS-VERDADE ---
  {
    id: 'q-m4-1',
    subject: 'tabelas-verdade',
    topic: 'quantidade-linhas',
    difficulty: 2,
    question: 'Uma tabela-verdade construída para avaliar a proposição composta (P ∧ Q) → (R ∨ S) terá quantas linhas?',
    options: ['4 linhas', '8 linhas', '16 linhas', '32 linhas'],
    answer: 2,
    explanation: 'Temos 4 proposições simples distintas (P, Q, R, S). O número de linhas é 2ⁿ = 2⁴ = 16 linhas.',
    tip: 'Fórmula: 2ⁿ onde n é a quantidade de letras distintas.',
    banca: 'Cebraspe'
  },
  {
    id: 'q-m4-2',
    subject: 'tabelas-verdade',
    topic: 'tautologia',
    difficulty: 3,
    question: 'A proposição composta P ∨ ¬P é uma:',
    options: ['Tautologia', 'Contradição', 'Contingência', 'Equivalência falsa'],
    answer: 0,
    explanation: 'P ∨ ¬P ("Hoje chove ou não chove") sempre resulta em Verdadeiro em todas as linhas da tabela. Isso é uma TAUTOLOGIA.',
    tip: 'Tautologia = Última coluna toda V.',
    banca: 'FCC'
  },

  // --- MÓDULO 5: EQUIVALÊNCIAS LÓGICAS ---
  {
    id: 'q-m5-1',
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
    banca: 'Vunesp'
  },
  {
    id: 'q-m5-2',
    subject: 'equivalencias-logicas',
    topic: 'de-morgan',
    difficulty: 3,
    question: 'Pelas Leis de De Morgan, a negação de (P ∧ Q) é equivalente a:',
    options: ['¬P ∧ ¬Q', '¬P ∨ ¬Q', 'P ∨ Q', '¬P → ¬Q'],
    answer: 1,
    explanation: 'A Lei de De Morgan diz que ao negar uma conjunção ¬(P ∧ Q), negamos ambas as partes e trocamos o E (∧) por OU (∨): ¬P ∨ ¬Q.',
    tip: 'Nega tudo e inverte o símbolo do meio (∧ vira ∨).',
    banca: 'FGV'
  },

  // --- MÓDULO 6: NEGAÇÃO DE PROPOSIÇÕES ---
  {
    id: 'q-m6-1',
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
    banca: 'Cebraspe'
  },

  // --- MÓDULO 7: DIAGRAMAS LÓGICOS ---
  {
    id: 'q-m7-1',
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
    banca: 'FCC'
  },

  // --- MÓDULO 8: LÓGICA DE PRIMEIRA ORDEM ---
  {
    id: 'q-m8-1',
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
    banca: 'Cebraspe'
  },

  // --- MÓDULO 9: PROBLEMAS ARITMÉTICOS ---
  {
    id: 'q-m9-1',
    subject: 'problemas-aritmeticos',
    topic: 'porcentagem-regra-tres',
    difficulty: 2,
    question: 'Um produto de R$ 200,00 teve um aumento de 15%. Qual o novo preço?',
    options: ['R$ 215,00', 'R$ 230,00', 'R$ 225,00', 'R$ 240,00'],
    answer: 1,
    explanation: '10% de 200 = 20. 5% de 200 = 10. Aumento total = 20 + 10 = R$ 30,00. Novo preço = 200 + 30 = R$ 230,00.',
    tip: '15% = 10% + 5%. Fica facílimo de calcular de cabeça!',
    banca: 'Vunesp'
  },

  // --- MÓDULO 10: PROBLEMAS GEOMÉTRICOS ---
  {
    id: 'q-m10-1',
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
    banca: 'FGV'
  },

  // --- MÓDULO 11: PROBLEMAS MATRICIAIS ---
  {
    id: 'q-m11-1',
    subject: 'problemas-matriciais',
    topic: 'posicao-matriz',
    difficulty: 3,
    question: 'Em uma matriz A de ordem 3x3 com elementos aᵢⱼ = 2i + j, qual é o valor do elemento a₂₃ (2ª linha, 3ª coluna)?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    explanation: 'Substituindo i = 2 e j = 3 na fórmula aᵢⱼ = 2i + j: a₂₃ = 2(2) + 3 = 4 + 3 = 7.',
    tip: 'Primeiro índice i é Linha (2), segundo índice j é Coluna (3).',
    banca: 'FCC'
  }
];
