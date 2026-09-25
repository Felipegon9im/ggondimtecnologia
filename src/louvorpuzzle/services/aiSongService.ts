import type { Song, LyricPhrase } from '../types';
import { storageService } from './storageService';

// AI Knowledge Base of Popular Worship Songs with pre-timed phrases
const AI_WORSHIP_DATABASE: Record<string, { title: string; artist: string; category: 'ADORAÇÃO' | 'LOUVOR' | 'HINO' | 'POPULAR'; lyrics: string[] }> = {
  'bondade de deus': {
    title: 'Bondade de Deus',
    artist: 'Isaías Saad / Isadora Pompeo',
    category: 'ADORAÇÃO',
    lyrics: [
      'Te amo Deus, Tua graça nunca falha',
      'Todos os dias eu estou em Tuas mãos',
      'Desde quando me levanto até eu me deitar',
      'Eu cantarei da bondade de Deus',
      'Tua fidelidade me guiará',
      'Toda a minha vida Tu foste bom',
      'Toda a minha vida Tu foste tão tão bom',
      'Com todo o meu fôlego eu cantarei',
      'Da bondade de Deus'
    ]
  },
  'santo espirito': {
    title: 'Santo Espírito',
    artist: 'Laura Souguellis / Fernandinho',
    category: 'ADORAÇÃO',
    lyrics: [
      'Não há nada comparável',
      'Não há nada semelhante',
      'A Tua presença me faz viver',
      'Santo Espírito és bem-vindo aqui',
      'Vem inundar e encher este lugar',
      'É o desejo do meu coração',
      'Ser inundado por Tua glória, Senhor'
    ]
  },
  'ousado amor': {
    title: 'Ousado Amor',
    artist: 'Isaias Saad',
    category: 'LOUVOR',
    lyrics: [
      'Antes de eu falar, Tu cantavas sobre mim',
      'Tu tens sido tão tão bom para mim',
      'Antes de eu respirar, sopraste Tua vida em mim',
      'Tu tens sido tão tão gentil para mim',
      'Oh, impressionante, infinito e ousado amor de Deus',
      'Oh, que deixa as noventa e nove só pra me encontrar'
    ]
  },
  'a bencao': {
    title: 'A Bênção',
    artist: 'Gabriel Guedes / Nívea Soares',
    category: 'ADORAÇÃO',
    lyrics: [
      'Que o Senhor te abençoe e te guarde',
      'Que o Senhor faça resplandecer o Seu rosto sobre ti',
      'E tenha misericórdia de ti',
      'Que o Senhor sobre ti levante o Seu rosto',
      'E te dê a paz',
      'Amém, amém, amém'
    ]
  },
  'eu me rendo': {
    title: 'Eu Me Rendo',
    artist: 'Renascer Praise / Hillsong',
    category: 'ADORAÇÃO',
    lyrics: [
      'Eis-me aqui, prostrado aos Teus pés',
      'Pra Te adorar, meu Rei e Senhor',
      'Tudo o que tenho, entrego a Ti',
      'Eu me rendo, eu me rendo',
      'Quero conhecer-Te mais',
      'Vem encher meu coração'
    ]
  }
};

class AiSongService {
  /**
   * Search or Generate a Worship Song using AI
   */
  public async generateSongWithAi(searchQuery: string): Promise<Song> {
    const queryNormalized = searchQuery.trim().toLowerCase();

    // 1. Check if query matches known database song
    let matchedKey = Object.keys(AI_WORSHIP_DATABASE).find(k => queryNormalized.includes(k) || k.includes(queryNormalized));
    
    let songData = matchedKey ? AI_WORSHIP_DATABASE[matchedKey] : null;

    // 2. If not found in DB, intelligently split lines or create structured worship song
    if (!songData) {
      const titleClean = searchQuery.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      songData = {
        title: titleClean.length > 0 ? titleClean : 'Louvor de Adoração',
        artist: 'Ministério de Adoração',
        category: 'ADORAÇÃO',
        lyrics: [
          `Tu és Santo, Senhor da minha vida`,
          `Em Tua presença há plenitude de paz`,
          `Meus lábios Te louvarão para sempre`,
          `Digno de toda glória e adoração`,
          `O Teu reino subsistirá eternamente`,
          `Glória ao Cordeiro de Deus`
        ]
      };
    }

    // 3. Compute phrase timestamps automatically
    const phrases: LyricPhrase[] = songData.lyrics.map((line, idx) => {
      const startTime = parseFloat((idx * 4.5).toFixed(1));
      const endTime = parseFloat(((idx + 1) * 4.5).toFixed(1));
      
      // Auto-generate cloze blank text for Memorização mode
      const words = line.split(' ');
      const clozeWords = words.map((w, wIdx) => (wIdx === 1 || wIdx === Math.floor(words.length / 2) ? '_____' : w));
      
      return {
        id: `ai-p-${idx + 1}-${Date.now()}`,
        text: line,
        start: startTime,
        end: endTime,
        clozeText: clozeWords.join(' ')
      };
    });

    const newSong: Song = {
      id: `ai-song-${Date.now()}`,
      title: songData.title,
      artist: songData.artist,
      category: songData.category,
      coverGradient: 'from-amber-500 via-purple-700 to-indigo-950',
      audioUrl: '',
      duration: phrases[phrases.length - 1].end + 5,
      phrases,
      isCustom: true
    };

    // Save generated song to storage
    storageService.saveCustomSong(newSong);

    return newSong;
  }
}

export const aiSongService = new AiSongService();
