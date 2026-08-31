import type { BibleBook } from '../types';
import ALL_BOOKS_DATA from './allBibleBooks.json';

export const BIBLE_BOOKS: BibleBook[] = ALL_BOOKS_DATA as BibleBook[];

export const VERSE_OF_THE_DAY = {
  reference: 'Filipenses 4:13',
  text: 'Posso todas as coisas naquele que me fortalece.',
  context: 'O apóstolo Paulo nos ensina que a nossa força não vem das circunstâncias, mas da presença constante de Cristo em nossa vida.'
};
