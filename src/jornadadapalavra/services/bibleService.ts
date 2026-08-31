import type { BibleBook, BibleVerse } from '../types';
import ALL_BOOKS_DATA from '../data/allBibleBooks.json';

export const ALL_BIBLE_BOOKS: BibleBook[] = ALL_BOOKS_DATA as BibleBook[];

interface RawBook {
  id: string;
  name: string;
  chapters: string[][];
}

class BibleService {
  private cache: Record<string, RawBook[]> = {};

  public async fetchVersion(versionKey: 'nvi' | 'acf' | 'kjv' | 'rvr'): Promise<RawBook[]> {
    if (this.cache[versionKey]) {
      return this.cache[versionKey];
    }

    try {
      const res = await fetch(`/${versionKey}.json`);
      const text = await res.text();
      const cleanText = text.replace(/^\uFEFF/, '');
      const data: RawBook[] = JSON.parse(cleanText);
      this.cache[versionKey] = data;
      return data;
    } catch (e) {
      console.error(`Erro ao carregar a versão ${versionKey}:`, e);
      return [];
    }
  }

  public async getChapterVerses(
    versionKey: 'nvi' | 'acf' | 'kjv' | 'rvr',
    bookId: string,
    chapterNumber: number
  ): Promise<BibleVerse[]> {
    const books = await this.fetchVersion(versionKey);
    const book = books.find(b => b.id.toLowerCase() === bookId.toLowerCase());
    if (!book) return [];

    const chapterIndex = chapterNumber - 1;
    if (chapterIndex < 0 || chapterIndex >= book.chapters.length) return [];

    const versesArray = book.chapters[chapterIndex];
    return versesArray.map((text, idx) => ({
      number: idx + 1,
      text
    }));
  }
}

export const bibleService = new BibleService();
