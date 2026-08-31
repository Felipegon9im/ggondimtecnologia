import type { Module } from '../types';

export const MODULES: Module[] = [
  {
    id: 1,
    slug: 'estruturas-logicas',
    title: 'Módulo 1 — Estruturas Lógicas',
    shortDesc: 'Conceitos básicos de proposição, frases válidas, valores lógicos V/F e tipos de frases.',
    iconName: 'Sparkles',
    color: '#ec4899',
    lessons: [
      {
        id: 'm1-l1',
        title: 'O que é uma Proposição?',
        description: 'Aprenda a identificar declarações que possuem valor de Verdadeiro (V) ou Falso (F).',
        simpleRule: 'Uma proposição é uma frase declarativa que pode ser julgada obrigatoriamente como Verdadeira (V) ou Falsa (F).',
        dailyExample: '"O Brasil fica na América do Sul" (V) | "2 + 2 = 5" (F)',
        symbolicNote: 'Frases interrogativas (?), exclamativas (!), imperativas (Ordens!) NÃO são proposições.',
        questions: []
      },
      {
        id: 'm1-l2',
        title: 'Proposições Simples vs Compostas',
        description: 'Diferença entre proposições únicas e proposições ligadas por conectivos lógicos.',
        simpleRule: 'Proposição Simples tem um único pensamento. Proposição Composta une duas ou mais proposições simples.',
        dailyExample: 'Simples: "Maria é médica" | Composta: "Maria é médica E João é engenheiro"',
        symbolicNote: 'P (Simples) | P ∧ Q (Composta)',
        questions: []
      }
    ]
  },
  {
    id: 2,
    slug: 'logica-argumentacao',
    title: 'Módulo 2 — Lógica de Argumentação',
    shortDesc: 'Premissas, conclusões, argumentos válidos/inválidos, dedução, indução e silogismos.',
    iconName: 'Brain',
    color: '#8b5cf6',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Estrutura de um Argumento',
        description: 'Entenda como as premissas se unem para gerar uma conclusão necessária.',
        simpleRule: 'Um argumento é um conjunto de premissas que dão suporte a uma conclusão.',
        dailyExample: 'Premissa 1: Todos os homens são mortais. Premissa 2: Sócrates é homem. Conclusão: Sócrates é mortal.',
        symbolicNote: 'P1, P2, ... Pn ⊢ C',
        questions: []
      },
      {
        id: 'm2-l2',
        title: 'Dedução vs Indução e Silogismos',
        description: 'Raciocínio dedutivo (garante a verdade) vs indutivo (probabilidade).',
        simpleRule: 'Dedução parte do geral para o particular (infalível se as premissas forem V). Indução parte do particular para o geral.',
        dailyExample: 'Dedução: "Todo gato mia. Félix é um gato. Logo, Félix mia."',
        questions: []
      }
    ]
  },
  {
    id: 3,
    slug: 'logica-sentencial',
    title: 'Módulo 3 — Conectivos Lógicos & Macetes',
    shortDesc: 'Aprenda os 5 conectivos centrais com os macetes definitivos V/F.',
    iconName: 'Zap',
    color: '#f59e0b',
    lessons: [
      {
        id: 'm3-l1',
        title: 'NÃO (¬) — A Negação',
        description: 'O operador que inverte o valor lógico da proposição.',
        simpleRule: 'O NÃO (¬) inverte o valor lógico: se era Verdadeiro vira Falso; se era Falso vira Verdadeiro.',
        macete: 'NÃO inverte V → F e F → V.',
        dailyExample: 'P: "Hoje está chovendo" (V) → ¬P: "Hoje NÃO está chovendo" (F)',
        symbolicNote: 'Símbolo: ¬P ou ~P',
        questions: []
      },
      {
        id: 'm3-l2',
        title: 'E (∧) — A Conjunção',
        description: 'Exige que TODAS as partes sejam verdadeiras.',
        simpleRule: 'O conectivo E (∧) só é Verdadeiro se TODAS as proposições forem Verdadeiras.',
        macete: '“E = TODOS VERDADEIROS” (V ∧ V = V, o resto é F)',
        dailyExample: '"Vou à praia E tomo sorvete" (Só cumpri a promessa se fizer AMBOS).',
        symbolicNote: 'Símbolo: P ∧ Q',
        questions: []
      },
      {
        id: 'm3-l3',
        title: 'OU (∨) — A Disjunção',
        description: 'Basta apenas UMA parte ser verdadeira para o conjunto valer V.',
        simpleRule: 'O conectivo OU (∨) só é Falso se TODAS as partes forem Falsas.',
        macete: '“OU = BASTA UM VERDADEIRO” (F ∨ F = F, o resto é V)',
        dailyExample: '"Passo no concurso OU mudo de país" (Se fizer pelo menos um dos dois, a frase é V).',
        symbolicNote: 'Símbolo: P ∨ Q',
        questions: []
      },
      {
        id: 'm3-l4',
        title: 'SE... ENTÃO (→) — A Condicional',
        description: 'A regra de ouro dos concursos de Raciocínio Lógico.',
        simpleRule: 'A condicional (→) SÓ É FALSA se a primeira for V e a segunda for F.',
        macete: '“Vera Fischer é FALSA!” (V → F = F, o resto é V)',
        dailyExample: '"Se estudar, ENTÃO serei aprovado." (Só é mentira se eu estudar [V] e NÃO for aprovado [F]).',
        symbolicNote: 'Símbolo: P → Q',
        questions: []
      },
      {
        id: 'm3-l5',
        title: 'SE E SOMENTE SE (↔) — A Bicondicional',
        description: 'A exigência de equivalência exata entre os lados.',
        simpleRule: 'A bicondicional (↔) é Verdadeira quando as duas proposições têm o MESMO valor lógico.',
        macete: '“BICONDICIONAL = IGUAIS” (V↔V = V, F↔F = V. Diferentes = F)',
        dailyExample: '"Passo no concurso SE E SOMENTE SE minha nota for acima do corte."',
        symbolicNote: 'Símbolo: P ↔ Q',
        questions: []
      }
    ]
  },
  {
    id: 4,
    slug: 'tabelas-verdade',
    title: 'Módulo 4 — Tabelas-Verdade Interativas',
    shortDesc: 'Construção, fórmula 2ⁿ linhas e classificação em Tautologia, Contradição e Contingência.',
    iconName: 'Table',
    color: '#10b981',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Construindo Tabelas (Fórmula 2ⁿ)',
        description: 'Descubra a quantidade exata de linhas de qualquer tabela-verdade.',
        simpleRule: 'O número de linhas de uma tabela-verdade é dado por 2ⁿ, onde n é o número de proposições simples.',
        macete: '1 prop = 2¹ (2 linhas) | 2 props = 2² (4 linhas) | 3 props = 2³ (8 linhas)',
        dailyExample: 'Proposições P e Q → 2² = 4 linhas de combinações VV, VF, FV, FF.',
        symbolicNote: 'Linhas = 2ⁿ',
        questions: []
      },
      {
        id: 'm4-l2',
        title: 'Tautologia, Contradição e Contingência',
        description: 'Classificação do resultado final de uma proposição composta.',
        simpleRule: 'Tautologia = Tudo V | Contradição = Tudo F | Contingência = Mistura V e F.',
        dailyExample: 'P ∨ ¬P ("Hoje chove ou não chove") é sempre TAUTOLOGIA (sempre V).',
        questions: []
      }
    ]
  },
  {
    id: 5,
    slug: 'equivalencias-logicas',
    title: 'Módulo 5 — Equivalências Lógicas',
    shortDesc: 'Transformações de proposições equivalentes sem alterar o valor lógico.',
    iconName: 'Repeat',
    color: '#3b82f6',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Equivalência da Condicional (Neymar & Inverte-Nega)',
        description: 'As duas regras mais cobradas em provas para P → Q.',
        simpleRule: '1ª Regra (NE-Y-MAR): P → Q ≡ ¬P ∨ Q (Nega a primeira OU Mantém a segunda).\n2ª Regra (Inverte e Nega): P → Q ≡ ¬Q → ¬P.',
        macete: 'Reescreva "Se chover, levo guarda-chuva" por "Não chove OU levo guarda-chuva".',
        symbolicNote: 'P → Q ≡ ¬P ∨ Q ≡ ¬Q → ¬P',
        dailyExample: '"Se sou brasileiro, então sou sul-americano" ≡ "Se NÃO sou sul-americano, então NÃO sou brasileiro"',
        questions: []
      },
      {
        id: 'm5-l2',
        title: 'Leis de De Morgan',
        description: 'Como distribuir a negação dentro do E e do OU.',
        simpleRule: 'Para negar o E (∧), nega-se ambos e troca por OU (∨). Para negar o OU (∨), nega-se ambos e troca por E (∧).',
        macete: 'Troca a letra do meio: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q',
        dailyExample: 'Negação de "Como bolo E bebo suco": "NÃO como bolo OU NÃO bebo suco"',
        questions: []
      }
    ]
  },
  {
    id: 6,
    slug: 'negacao',
    title: 'Módulo 6 — Negação de Proposições',
    shortDesc: 'Regras práticas de negação de simples, compostas e da condicional (MANÉ).',
    iconName: 'ShieldAlert',
    color: '#ef4444',
    lessons: [
      {
        id: 'm6-l1',
        title: 'Negação da Condicional — Regra do MA-NÉ',
        description: 'Como negar a frase "Se P, então Q".',
        simpleRule: 'Para negar uma condicional (P → Q), MANTÉM a primeira E NEGA a segunda (MA-NÉ).',
        macete: '¬(P → Q) ≡ P ∧ ¬Q (MANTÉM a 1ª E NEGA a 2ª)',
        dailyExample: 'Negação de "Se eu estudar, serei aprovado": "Eu estudei E NÃO fui aprovado".',
        symbolicNote: '¬(P → Q) ≡ P ∧ ¬Q',
        questions: []
      }
    ]
  },
  {
    id: 7,
    slug: 'diagramas-logicos',
    title: 'Módulo 7 — Diagramas Lógicos',
    shortDesc: 'Conjuntos e representação visual de Todo, Nenhum e Algum.',
    iconName: 'CircleDot',
    color: '#06b6d4',
    lessons: [
      {
        id: 'm7-l1',
        title: 'Todo, Nenhum e Algum',
        description: 'Relações de inclusão, exclusão e interseção de conjuntos.',
        simpleRule: 'Todo A é B (Inclusão total de A em B) | Nenhum A é B (Exclusão total) | Algum A é B (Interseção).',
        dailyExample: '"Todo carioca é brasileiro" (O círculo dos cariocas está dentro do Brasil).',
        questions: []
      }
    ]
  },
  {
    id: 8,
    slug: 'primeira-ordem',
    title: 'Módulo 8 — Lógica de Primeira Ordem',
    shortDesc: 'Quantificadores Universal (∀) e Existencial (∃) e sua linguagem formal.',
    iconName: 'Code',
    color: '#831843',
    lessons: [
      {
        id: 'm8-l1',
        title: 'Quantificadores ∀ e ∃',
        description: 'Tradução do Português para símbolos quantificados.',
        simpleRule: '∀x = Para todo x | ∃x = Existe um x tal que...',
        macete: '"Todo aluno estuda" → ∀x (Aluno(x) → Estuda(x))',
        dailyExample: '"Existe um homem justo" → ∃x (Homem(x) ∧ Justo(x))',
        questions: []
      }
    ]
  },
  {
    id: 9,
    slug: 'problemas-aritmeticos',
    title: 'Módulo 9 — Problemas Aritméticos',
    shortDesc: 'Regra de três, porcentagem, razão, proporção, sequências e idade.',
    iconName: 'Calculator',
    color: '#84cc16',
    lessons: [
      {
        id: 'm9-l1',
        title: 'Regra de Três & Porcentagem Rápidas',
        description: 'Resolução direta de problemas quantitativos recorrentes em concursos.',
        simpleRule: 'Identifique se as grandezas são diretamente ou inversamente proporcionais antes de cruzar as razões.',
        dailyExample: 'Se 3 máquinas fazem 60 peças em 1 hora, 5 máquinas farão 100 peças.',
        questions: []
      }
    ]
  },
  {
    id: 10,
    slug: 'problemas-geometricos',
    title: 'Módulo 10 — Problemas Geométricos',
    shortDesc: 'Perímetro, áreas clássicas, ângulos e raciocínio de figuras.',
    iconName: 'Shapes',
    color: '#6366f1',
    lessons: [
      {
        id: 'm10-l1',
        title: 'Perímetros e Áreas Fundamentais',
        description: 'Cálculo de áreas de retângulos, triângulos e círculos com visão lógica.',
        simpleRule: 'Área Retângulo = Base × Altura | Área Triângulo = (Base × Altura) / 2 | Área Círculo = π × r²',
        dailyExample: 'Um terreno de 10m x 25m possui área de 250m² e perímetro de 70m.',
        questions: []
      }
    ]
  },
  {
    id: 11,
    slug: 'problemas-matriciais',
    title: 'Módulo 11 — Problemas Matriciais',
    shortDesc: 'Linhas, colunas, posições aᵢⱼ e lógica de matrizes.',
    iconName: 'Grid',
    color: '#14b8a6',
    lessons: [
      {
        id: 'm11-l1',
        title: 'Estrutura de Matrizes & Linhas/Colunas',
        description: 'Compreendendo ordenação matricial aᵢⱼ (Linha i, Coluna j).',
        simpleRule: 'Em qualquer elemento aᵢⱼ, o primeiro número (i) é a LINHA e o segundo (j) é a COLUNA.',
        dailyExample: 'O elemento a₂₃ está na 2ª Linha e na 3ª Coluna.',
        questions: []
      }
    ]
  }
];
