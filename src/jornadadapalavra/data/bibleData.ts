import type { BibleBook, BibleVerse } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento
  { id: 'gn', name: 'Gênesis', testament: 'OLD', chaptersCount: 50 },
  { id: 'ex', name: 'Êxodo', testament: 'OLD', chaptersCount: 40 },
  { id: 'sl', name: 'Salmos', testament: 'OLD', chaptersCount: 150 },
  { id: 'pv', name: 'Provérbios', testament: 'OLD', chaptersCount: 31 },
  { id: 'is', name: 'Isaías', testament: 'OLD', chaptersCount: 66 },

  // Novo Testamento
  { id: 'mt', name: 'Mateus', testament: 'NEW', chaptersCount: 28 },
  { id: 'mc', name: 'Marcos', testament: 'NEW', chaptersCount: 16 },
  { id: 'lc', name: 'Lucas', testament: 'NEW', chaptersCount: 24 },
  { id: 'jo', name: 'João', testament: 'NEW', chaptersCount: 21 },
  { id: 'rm', name: 'Romanos', testament: 'NEW', chaptersCount: 16 },
  { id: 'fl', name: 'Filipenses', testament: 'NEW', chaptersCount: 4 },
  { id: 'ap', name: 'Apocalipse', testament: 'NEW', chaptersCount: 22 }
];

export const FEATURED_CHAPTERS: Record<string, BibleVerse[]> = {
  'sl-23': [
    { number: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
    { number: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
    { number: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
    { number: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
    { number: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
    { number: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do Senhor por longos dias.' }
  ],
  'jo-3': [
    { number: 14, text: 'E, como Moisés levantou a serpente no deserto, assim importa que o Filho do Homem seja levantado;' },
    { number: 15, text: 'Para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
    { number: 16, text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
    { number: 17, text: 'Porque Deus enviou o seu Filho ao mundo não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.' }
  ],
  'fl-4': [
    { number: 6, text: 'Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.' },
    { number: 7, text: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.' },
    { number: 13, text: 'Posso todas as coisas naquele que me fortalece.' }
  ]
};

export const VERSE_OF_THE_DAY = {
  reference: 'Filipenses 4:13',
  text: 'Posso todas as coisas naquele que me fortalece.',
  context: 'O apóstolo Paulo nos ensina que a nossa força não vem das circunstâncias, mas da presença constante de Cristo em nossa vida.'
};
