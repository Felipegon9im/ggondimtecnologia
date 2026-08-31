import type { DuolingoUnit } from '../types';

export const DUOLINGO_UNITS: DuolingoUnit[] = [
  {
    id: 1,
    title: 'Unidade 1: 🌱 Semente — Primeiros Passos',
    description: 'Receber a Palavra no coração e entender o amor de Deus.',
    levelId: 1,
    color: '#10b981',
    lessons: [
      {
        id: 'u1-l1',
        unitId: 1,
        title: 'Deus é Amor',
        icon: '📖',
        mascotTip: '💡 "Deus amou o mundo de tal maneira que deu o seu Filho unigênito." (João 3:16)',
        question: 'Segundo João 3:16, qual a maior demonstração de amor de Deus pela humanidade?',
        options: [
          'Enviar o Seu Filho unigênito para nos salvar',
          'Exigir regras sem compaixão',
          'Apenas abençoar quem não erra',
          'Nenhuma das anteriores'
        ],
        answer: 0,
        explanation: 'Deus entregou Jesus Cristo para que todo aquele que Nele crê tenha a vida eterna.'
      },
      {
        id: 'u1-l2',
        unitId: 1,
        title: 'Onde Encontrar Socorro',
        icon: '🛡️',
        mascotTip: '💡 "O Senhor é o meu refúgio e fortaleza, socorro bem presente." (Salmos 46:1)',
        question: 'Em quem o Salmista declara encontrar refúgio seguro em momentos de aflição?',
        options: [
          'Na riqueza material',
          'Em Deus, nosso refúgio e fortaleza',
          'Apenas na própria autoconfiança',
          'Nas dúvidas e incertezas'
        ],
        answer: 1,
        explanation: 'Deus é o nosso porto seguro e o socorro presente em qualquer tempestade.'
      },
      {
        id: 'u1-l3',
        unitId: 1,
        title: 'A Luz no Caminho',
        icon: '💡',
        mascotTip: '💡 "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho." (Salmos 119:105)',
        question: 'Como a Bíblia descreve a Palavra de Deus em Salmos 119:105?',
        options: [
          'Uma lâmpada para os pés e luz para o caminho',
          'Um livro de histórias sem aplicação prática',
          'Apenas um documento histórico antigo',
          'Algo difícil que não orienta as decisões'
        ],
        answer: 0,
        explanation: 'A Palavra ilumina nossas decisões diárias e nos guia com sabedoria em cada passo.'
      }
    ]
  },
  {
    id: 2,
    title: 'Unidade 2: 🌿 Discípulo — Oração & Constância',
    description: 'Aprender a orar com fé e ter comunhão diária com o Pai.',
    levelId: 2,
    color: '#84cc16',
    lessons: [
      {
        id: 'u2-l1',
        unitId: 2,
        title: 'A Atitude da Oração',
        icon: '🙏',
        mascotTip: '💡 "Tudo quanto pedirdes, orando, crede receber, e vós o tereis." (Marcos 11:24)',
        question: 'Qual a postura de coração necessária ao apresentar uma oração a Deus?',
        options: [
          'Orar com fé e crer na resposta de Deus',
          'Duvidar enquanto ora',
          'Repetir palavras sem sentimento',
          'Orar somente quando estiver tudo perfeito'
        ],
        answer: 0,
        explanation: 'A oração feita com fé e confiança move o coração de Deus.'
      },
      {
        id: 'u2-l2',
        unitId: 2,
        title: 'Perseverar no Bem',
        icon: '🌱',
        mascotTip: '💡 "E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos." (Gálatas 6:9)',
        question: 'O que o apóstolo Paulo aconselha sobre plantar boas sementes no Reino?',
        options: [
          'Não se cansar de fazer o bem, pois a colheita virá no tempo certo',
          'Desistir ao primeiro obstáculo',
          'Fazer o bem somente se for recompensado imediatamente',
          'Parar de plantar sementes'
        ],
        answer: 0,
        explanation: 'A perseverança em fazer o bem gera frutos eternos que se colhem no tempo de Deus.'
      }
    ]
  },
  {
    id: 3,
    title: 'Unidade 3: 🔥 Evangelista — Testemunhar & Transbordar',
    description: 'Levar a mensagem de esperança e compartilhar conteúdos que edificam.',
    levelId: 3,
    color: '#f59e0b',
    lessons: [
      {
        id: 'u3-l1',
        unitId: 3,
        title: 'Ide e Pregai',
        icon: '🔥',
        mascotTip: '💡 "Ide por todo o mundo, pregai o evangelho a toda criatura." (Marcos 16:15)',
        question: 'Qual é a Grande Comissão deixada por Jesus Cristo a todos os Seus seguidores?',
        options: [
          'Ir e pregar o Evangelho a toda criatura',
          'Guardar a fé em segredo sem compartilhar',
          'Julgar as pessoas',
          'Nenhuma das anteriores'
        ],
        answer: 0,
        explanation: 'O Evangelho é a boa notícia da salvação que deve ser compartilhada com amor.'
      }
    ]
  }
];
