import type { BibleTerritory, LeagueTier, ChapterContext, RankingShiftInfo, LeaderboardUser } from '../types';
import ALL_BOOKS_DATA from '../data/allBibleBooks.json';

export const TOTAL_BIBLE_CHAPTERS = 1189;

export const LEAGUE_TIERS: LeagueTier[] = [
  { id: 'CAMINHO', name: '🥉 Liga do Caminho', minXP: 0, icon: '🥉', color: '#cd7f32', description: 'O início da grande peregrinação espiritual.' },
  { id: 'JORNADA', name: '🥈 Liga da Jornada', minXP: 300, icon: '🥈', color: '#9ca3af', description: 'Perseverando nos ensinamentos da Palavra.' },
  { id: 'DISCIPULOS', name: '🥇 Liga dos Discípulos', minXP: 700, icon: '🥇', color: '#fbbf24', description: 'Crescimento constante e comunhão profunda.' },
  { id: 'PEREGRINOS', name: '💎 Liga dos Peregrinos', minXP: 1500, icon: '💎', color: '#38bdf8', description: 'Mestres do conhecimento e da fé.' },
  { id: 'GUARDIOES', name: '👑 Liga dos Guardiões', minXP: 3000, icon: '👑', color: '#a78bfa', description: 'Guardiões das escrituras e conselheiros.' },
  { id: 'MENSAGEIROS', name: '✨ Liga dos Mensageiros', minXP: 6000, icon: '✨', color: '#f43f5e', description: 'Elite espiritual que ilumina o caminho de milhares.' }
];

export interface RawBookMetadata {
  id: string;
  name: string;
  testament: 'OLD' | 'NEW';
  chaptersCount: number;
}

// Compute cumulative start and end chapter index for all 66 books
let cumulativeIndex = 1;
export const BIBLE_TERRITORIES: BibleTerritory[] = (ALL_BOOKS_DATA as RawBookMetadata[]).map((book) => {
  const start = cumulativeIndex;
  const end = cumulativeIndex + book.chaptersCount - 1;
  cumulativeIndex += book.chaptersCount;

  let color = '#10b981';
  let icon = '📖';
  let description = `Território de ${book.name} com ${book.chaptersCount} capítulos.`;
  let themeImage = '/gospels_jesus.jpg';

  if (book.id === 'gn') {
    themeImage = '/genesis_creation.png';
  } else if (['ex', 'lv', 'nm', 'dt', 'js', 'jz', 'rt', '1sm', '2sm', '1rs', '2rs'].includes(book.id)) {
    themeImage = '/exodus_redsea.jpg';
  } else if (['sl', 'pv', 'ec', 'ct', 'is', 'jr', 'lm', 'ez', 'dn'].includes(book.id)) {
    themeImage = '/psalms_worship.jpg';
  }

  if (book.testament === 'OLD') {
    if (start <= 187) { color = '#10b981'; icon = '🌱'; description = 'Pentateuco — A Criação, a Lei e a Origem.'; }
    else if (start <= 436) { color = '#f59e0b'; icon = '📜'; description = 'Livros Históricos — Reis, Batalhas e Reinos.'; }
    else if (start <= 680) { color = '#8b5cf6'; icon = '✍️'; description = 'Livros Poéticos — Salmos, Provérbios e Sabedoria.'; }
    else { color = '#ef4444'; icon = '🔥'; description = 'Profetas — Mensagens de Visão e Esperança.'; }
  } else {
    if (start <= 1013) { color = '#06b6d4'; icon = '✝️'; description = 'Evangelhos e Atos — A Vida de Jesus e a Igreja.'; }
    else if (start <= 1167) { color = '#3b82f6'; icon = '✉️'; description = 'Epístolas — Cartas Apostólicas de Ensinamento.'; }
    else { color = '#ec4899'; icon = '👑'; description = 'Apocalipse — A Revelação da Vitória Final.'; }
  }

  return {
    id: book.id,
    name: book.name,
    testament: book.testament,
    chaptersCount: book.chaptersCount,
    startGlobalIndex: start,
    endGlobalIndex: end,
    icon,
    color,
    description,
    themeImage
  };
});

export class BibleJourneyService {
  public static getChapterKey(bookId: string, chapterNum: number): string {
    return `${bookId.toLowerCase()}-${chapterNum}`;
  }

  public static getLeagueTier(xp: number): LeagueTier {
    for (let i = LEAGUE_TIERS.length - 1; i >= 0; i--) {
      if (xp >= LEAGUE_TIERS[i].minXP) {
        return LEAGUE_TIERS[i];
      }
    }
    return LEAGUE_TIERS[0];
  }

  public static getOverallProgress(completedKeys: string[]): {
    totalCompleted: number;
    totalChapters: number;
    percentage: number;
  } {
    const totalCompleted = completedKeys.length;
    const percentage = Math.min(100, parseFloat(((totalCompleted / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(1)));
    return {
      totalCompleted,
      totalChapters: TOTAL_BIBLE_CHAPTERS,
      percentage
    };
  }

  public static generateChapterContext(bookId: string, chapterNum: number): ChapterContext {
    const territory = BIBLE_TERRITORIES.find(t => t.id.toLowerCase() === bookId.toLowerCase()) || BIBLE_TERRITORIES[0];

    let title = `${territory.name} — Capítulo ${chapterNum}`;
    let historicalContext = `Neste capítulo de ${territory.name}, acompanhamos a revelação dos propósitos divinos para o povo de Deus no período bíblico.`;
    let keyCharacters = ['Deus / O Senhor', 'Os Patriarcas / Servos de Deus'];
    let importantEvents = [
      `Manifestação da glória e instrução divina em ${territory.name} ${chapterNum}`,
      'Demonstração de fé, obediência e perseverança na caminhada espiritual'
    ];
    let curiosities = `Sabia que o livro de ${territory.name} contém ${territory.chaptersCount} capítulos repletos de ensinamentos valiosos?`;
    let quizQuestion = `Qual é o tema principal abordado em ${territory.name} ${chapterNum}?`;
    let quizOptions = [
      'A fidelidade de Deus e a importância de andar em obediência à Sua Palavra',
      'Acumular riquezas materiais sem preocupação espiritual',
      'Desistir diante dos desafios do caminho',
      'Nenhuma das alternativas acima'
    ];
    let quizAnswer = 0;
    let quizExplanation = `Em ${territory.name} ${chapterNum}, o texto nos ensina que a fidelidade e a obediência à Palavra de Deus trazem direção e benção.`;
    let reflection = `Reflita hoje sobre como aplicar os princípios de ${territory.name} ${chapterNum} na sua rotina diária.`;

    // Specific custom nuances for famous chapters
    if (bookId === 'gn' && chapterNum === 1) {
      title = 'Gênesis 1 — A Criação do Universo';
      historicalContext = 'O relato solene da criação dos céus, da terra e de tudo o que neles há pelo poder da Palavra de Deus.';
      keyCharacters = ['Deus Criador', 'Espírito de Deus'];
      importantEvents = ['Criação do mundo em 6 dias', 'Haja luz', 'Criação do homem à imagem e semelhança de Deus'];
      curiosities = 'A frase "E disse Deus" aparece 10 vezes no primeiro capítulo de Gênesis!';
      quizQuestion = 'O que Deus declarou ao ver tudo o que havia criado ao final do sexto dia?';
      quizOptions = [
        'E viu Deus que tudo era MUITO BOM',
        'Que o trabalho ainda não estava pronto',
        'Que precisava refazer o mundo',
        'Nenhuma das anteriores'
      ];
      quizAnswer = 0;
      quizExplanation = 'Em Gênesis 1:31 está escrito: "E viu Deus tudo quanto tinha feito, e eis que era muito bom".';
    } else if (bookId === 'sl' && chapterNum === 23) {
      title = 'Salmos 23 — O Senhor é o meu Pastor';
      historicalContext = 'Um dos cânticos mais conhecidos do Rei Davi, expressando confiança plena no cuidado e na proteção do Bom Pastor.';
      keyCharacters = ['Rei Davi (Salmista)', 'O Senhor (Bom Pastor)'];
      importantEvents = ['Guiado a verdes pastos', 'Restauração da alma', 'A mesa preparada perante os inimigos'];
      curiosities = 'Davi foi pastor de ovelhas na juventude, por isso conhecia intimamente a dedicação de um pastor com seu rebanho.';
      quizQuestion = 'Qual é a famosa declaração de confiança que abre o Salmo 23?';
      quizOptions = [
        'O Senhor é o meu pastor; nada me faltará',
        'O Senhor é o meu refúgio nas guerras',
        'Em Deus eu confio sem temor',
        'Buscai primeiro o Reino'
      ];
      quizAnswer = 0;
      quizExplanation = 'Salmos 23:1 declara com fé: "O Senhor é o meu pastor, nada me faltará".';
    } else if (bookId === 'mt' && chapterNum === 5) {
      title = 'Mateus 5 — O Sermão da Montanha';
      historicalContext = 'Jesus sobe ao monte e ensina aos Seus discípulos as Bem-Aventuranças e o padrão moral do Reino de Deus.';
      keyCharacters = ['Jesus Cristo', 'Os Discípulos', 'A Multidão'];
      importantEvents = ['As As Bem-Aventuranças', 'Vós sois o Sal da Terra e a Luz do Mundo', 'O cumprimento da Lei'];
      curiosities = 'O Sermão da Montanha nos capítulos 5, 6 e 7 de Mateus é considerado o maior discurso de Jesus sobre ética e vida cristã!';
      quizQuestion = 'Segundo Jesus em Mateus 5:14, o que os Seus seguidores são no mundo?';
      quizOptions = [
        'A luz do mundo e uma cidade edificada sobre o monte',
        'Apenas ouvintes passivos',
        'Líderes políticos',
        'Nenhuma das alternativas'
      ];
      quizAnswer = 0;
      quizExplanation = 'Jesus disse: "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte."';
    }

    return {
      bookId,
      bookName: territory.name,
      chapterNumber: chapterNum,
      title,
      historicalContext,
      themeImage: territory.themeImage,
      keyCharacters,
      importantEvents,
      curiosities,
      quizQuestion,
      quizOptions,
      quizAnswer,
      quizExplanation,
      reflection
    };
  }

  public static calculateRankingShift(
    previousXP: number,
    newXP: number,
    previousRank: number
  ): RankingShiftInfo {
    const prevLeague = this.getLeagueTier(previousXP);
    const newLeague = this.getLeagueTier(newXP);
    const isLeagueUp = newLeague.minXP > prevLeague.minXP;

    // Simulate competitive ranking jump: gaining XP improves rank
    const xpDifference = newXP - previousXP;
    const ranksGained = Math.min(previousRank - 1, Math.max(1, Math.floor(xpDifference / 10)));
    const newRank = Math.max(1, previousRank - ranksGained);
    const passedCount = previousRank - newRank;

    return {
      previousRank,
      newRank,
      passedCount,
      previousLeague: prevLeague.name,
      newLeague: newLeague.name,
      isLeagueUp
    };
  }

  public static getMockLeaderboard(userXP: number, userName: string, userGender: string): LeaderboardUser[] {
    const userLeague = this.getLeagueTier(userXP);

    // Dynamic competitors around user's XP
    const competitors = [
      { name: 'Pr. Mateus', baseXP: userXP + 450, avatar: '👨‍💼' },
      { name: 'Ana Clara', baseXP: userXP + 220, avatar: '👩' },
      { name: 'Gabriel Santos', baseXP: userXP + 80, avatar: '👨' },
      { name: 'Ruth Oliveira', baseXP: Math.max(0, userXP - 120), avatar: '👩‍🦱' },
      { name: 'Lucas Teófilo', baseXP: Math.max(0, userXP - 350), avatar: '👨' }
    ];

    const list: LeaderboardUser[] = [
      {
        rank: 0,
        name: userName || 'Peregrino',
        xp: userXP,
        avatar: userGender === 'MASCULINO' ? '👨' : '👩',
        league: userLeague.name,
        isUser: true
      },
      ...competitors.map(c => ({
        rank: 0,
        name: c.name,
        xp: c.baseXP,
        avatar: c.avatar,
        league: this.getLeagueTier(c.baseXP).name
      }))
    ];

    // Sort by XP descending and re-assign rank numbers
    list.sort((a, b) => b.xp - a.xp);
    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }
}
