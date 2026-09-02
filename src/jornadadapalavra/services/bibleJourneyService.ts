import type { BibleTerritory, LeagueTier, ChapterContext, ChapterQuestion, RankingShiftInfo, LeaderboardUser } from '../types';
import ALL_BOOKS_DATA from '../data/allBibleBooks.json';
import { QuizBankService } from './quizBankService';

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
  } else if (book.id === 'ex') {
    themeImage = '/exodus_redsea.jpg';
  } else if (['lv', 'nm', 'dt'].includes(book.id)) {
    themeImage = '/sinai_tablets.jpg';
  } else if (['js', 'jz', 'rt'].includes(book.id)) {
    themeImage = '/jericho_walls.jpg';
  } else if (['1sm', '2sm'].includes(book.id)) {
    themeImage = '/david_goliath.jpg';
  } else if (['1rs', '2rs', '1ch', '2ch', 'ezr', 'ne', 'est'].includes(book.id)) {
    themeImage = '/solomon_temple.jpg';
  } else if (['sl', 'pv', 'ec', 'ct', 'jb', 'job', 'ps', 'prv'].includes(book.id)) {
    themeImage = '/psalms_worship.jpg';
  } else if (['dn', 'daniel'].includes(book.id)) {
    themeImage = '/daniel_lions.jpg';
  } else if (['is', 'jr', 'lm', 'ez', 'hos', 'joe', 'amo', 'oba', 'jon', 'mic', 'nah', 'hab', 'zep', 'hag', 'zec', 'mal'].includes(book.id)) {
    themeImage = '/noah_ark.jpg';
  } else if (['mt', 'mc', 'lc', 'jo', 'at'].includes(book.id)) {
    themeImage = '/gospels_jesus.jpg';
  } else if (['ap', 'rev'].includes(book.id)) {
    themeImage = '/new_jerusalem.jpg';
  } else {
    // Epistles and Letters (Romanos, Coríntios, Gálatas, Efésios, Hebreus, etc.)
    themeImage = '/epistles_paul.jpg';
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

// Official 10-Question Bank for Genesis 1 conforming to standard JSON format
const GENESIS_1_QUESTIONS: ChapterQuestion[] = [
  {
    id: "GEN-001-01",
    tipo: "compreensao",
    dificuldade: "facil",
    pergunta: "O que Deus criou no primeiro dia?",
    alternativas: {
      A: "Os animais e as plantas",
      B: "A luz",
      C: "O ser humano",
      D: "O sol e a lua"
    },
    resposta_correta: "B",
    explicacao: "Segundo Gênesis 1:3-5, Deus disse 'Haja luz' e separou a luz das trevas no primeiro dia.",
    referencia: "Gênesis 1:3-5",
    xp: 10
  },
  {
    id: "GEN-001-02",
    tipo: "compreensao",
    dificuldade: "facil",
    pergunta: "Como Deus criou todas as coisas no relato de Gênesis 1?",
    alternativas: {
      A: "Pelo poder de Sua Palavra ('E disse Deus')",
      B: "Trabalhando com ferramentas físicas",
      C: "Através da batalha contra outros seres",
      D: "Utilizando elementos de outros mundos"
    },
    resposta_correta: "A",
    explicacao: "Deus criou o universo através da ordenança de Sua Palavra todo-poderosa.",
    referencia: "Gênesis 1:3, 6, 9, 14",
    xp: 10
  },
  {
    id: "GEN-001-03",
    tipo: "detalhe",
    dificuldade: "facil",
    pergunta: "O que Deus declarou ao ver tudo o que havia criado ao final do sexto dia?",
    alternativas: {
      A: "Que a criação precisava de melhorias",
      B: "Que faltavam elementos essenciais",
      C: "Eis que era MUITO BOM",
      D: "Que o trabalho tinha sido cansativo"
    },
    resposta_correta: "C",
    explicacao: "Em Gênesis 1:31 está escrito: 'E viu Deus tudo quanto tinha feito, e eis que era muito bom'.",
    referencia: "Gênesis 1:31",
    xp: 10
  },
  {
    id: "GEN-001-04",
    tipo: "detalhe",
    dificuldade: "facil",
    pergunta: "Em qual dia da criação Deus criou o homem e a mulher?",
    alternativas: {
      A: "No terceiro dia",
      B: "No quarto dia",
      C: "No quinto dia",
      D: "No sexto dia"
    },
    resposta_correta: "D",
    explicacao: "Gênesis 1:26-31 relata que a criação do ser humano ocorreu no sexto dia.",
    referencia: "Gênesis 1:26-31",
    xp: 10
  },
  {
    id: "GEN-001-05",
    tipo: "detalhe",
    dificuldade: "media",
    pergunta: "Em qual dia da criação Deus fez o sol, a lua e as estrelas?",
    alternativas: {
      A: "No quarto dia",
      B: "No primeiro dia",
      C: "No segundo dia",
      D: "No quinto dia"
    },
    resposta_correta: "A",
    explicacao: "Deus criou os luzeiros do céu no quarto dia para governar o dia e a noite e marcar as estações.",
    referencia: "Gênesis 1:14-19",
    xp: 15
  },
  {
    id: "GEN-001-06",
    tipo: "conexao",
    dificuldade: "media",
    pergunta: "Qual responsabilidade foi confiada por Deus ao ser humano na criação?",
    alternativas: {
      A: "Construir grandes cidades de pedra",
      B: "Dominar e cuidar responsavelmente sobre os peixes, aves e animais da terra",
      C: "Separar os mares dos continentes",
      D: "Mudar o curso do sol e das estrelas"
    },
    resposta_correta: "B",
    explicacao: "Deus confiou ao ser humano o mandato de governar e cuidar com sabedoria de toda a criação.",
    referencia: "Gênesis 1:28",
    xp: 15
  },
  {
    id: "GEN-001-07",
    tipo: "conexao",
    dificuldade: "media",
    pergunta: "O que significa o ser humano ter sido criado 'à imagem e semelhança de Deus'?",
    alternativas: {
      A: "Que o homem possui a mesma altura física de Deus",
      B: "Que o ser humano é idêntico em poder ao Criador",
      C: "Que possui valor sagrado, capacidade moral, espiritual e relacional com o Criador",
      D: "Que o homem não precisa prestar contas de suas atitudes"
    },
    resposta_correta: "C",
    explicacao: "A imagem de Deus confere ao ser humano dignidade única, consciência moral e capacidade espiritual.",
    referencia: "Gênesis 1:26-27",
    xp: 15
  },
  {
    id: "GEN-001-08",
    tipo: "detalhe",
    dificuldade: "media",
    pergunta: "O que estava sobre a superfície do abismo antes de Deus ordenar a luz?",
    alternativas: {
      A: "As trevas, enquanto o Espírito de Deus pairava sobre as águas",
      B: "Um grande fogo consumidor",
      C: "Anjos em exércitos",
      D: "Montanhas cobertas de neve"
    },
    resposta_correta: "A",
    explicacao: "Gênesis 1:2 descreve que a terra era sem forma e vazia; e havia trevas sobre a face do abismo.",
    referencia: "Gênesis 1:2",
    xp: 15
  },
  {
    id: "GEN-001-09",
    tipo: "conexao",
    dificuldade: "dificil",
    pergunta: "O que é indicado pela expressão plural 'Façamos o homem' em Gênesis 1:26?",
    alternativas: {
      A: "Que Deus estava consultando a opinião de reis terrenos",
      B: "Que os anjos foram os criadores do corpo humano",
      C: "Que Deus falava apenas com a natureza inanimada",
      D: "Revela a pluralidade da Divindade (Pai, Filho e Espírito) agindo em unidade na criação"
    },
    resposta_correta: "D",
    explicacao: "O uso da expressão no plural alude à Trindade Santa participando ativamente na criação do homem.",
    referencia: "Gênesis 1:26",
    xp: 25
  },
  {
    id: "GEN-001-10",
    tipo: "bonus",
    dificuldade: "dificil",
    pergunta: "Qual é a relação entre a bênção inicial dada por Deus e a ordem de frutificar e encher a terra?",
    alternativas: {
      A: "A bênção foi revogada no mesmo dia",
      B: "A bênção divina capacita a vida a se multiplicar e prosperar segundo o propósito do Criador",
      C: "Frutificar era uma tarefa reservada apenas aos anjos",
      D: "A ordem dependia de sacrifícios materiais prévios"
    },
    resposta_correta: "B",
    explicacao: "A bênção de Deus em Gênesis 1:28 é a fonte de vida e capacitação para o desenvolvimento humano na terra.",
    referencia: "Gênesis 1:22, 28",
    xp: 30
  }
];

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

  // Generates 10 questions for any chapter conforming strictly to the requested JSON schema
  public static generate10QuestionsForChapter(bookId: string, bookName: string, chapterNum: number): ChapterQuestion[] {
    if (bookId.toLowerCase() === 'gn' && chapterNum === 1) {
      return GENESIS_1_QUESTIONS;
    }

    const prefix = `${bookId.toUpperCase()}-${String(chapterNum).padStart(3, '0')}`;
    
    // Generate 4 easy (10 XP), 4 medium (15 XP), 2 hard/bonus (25-30 XP)
    const questions: ChapterQuestion[] = [];

    // Easy Questions (4)
    questions.push({
      id: `${prefix}-01`,
      tipo: 'compreensao',
      dificuldade: 'facil',
      pergunta: `Qual é o acontecimento principal relatado em ${bookName} ${chapterNum}?`,
      alternativas: {
        A: `A manifestação da fidelidade de Deus e a liderança espiritual em ${bookName}`,
        B: "A busca por riquezas materiais sem fé",
        C: "A destruição de todas as cidades da época",
        D: "A desistência dos servos de Deus"
      },
      resposta_correta: 'A',
      explicacao: `Em ${bookName} ${chapterNum}, vemos o agir de Deus fortalecendo o Seu povo no caminho de obediência.`,
      referencia: `${bookName} ${chapterNum}:1-5`,
      xp: 10
    });

    questions.push({
      id: `${prefix}-02`,
      tipo: 'compreensao',
      dificuldade: 'facil',
      pergunta: `Qual instrução fundamental é apresentada no capítulo ${chapterNum} de ${bookName}?`,
      alternativas: {
        A: "Ignorar os mandamentos sagrados",
        B: `Confiar na provisão e na direção divina para o povo`,
        C: "Abandonar a comunhão comunitária",
        D: "Buscar honra humana acima de tudo"
      },
      resposta_correta: 'B',
      explicacao: `O texto de ${bookName} ${chapterNum} enfatiza a importância de manter a confiança no Senhor.`,
      referencia: `${bookName} ${chapterNum}:6-10`,
      xp: 10
    });

    questions.push({
      id: `${prefix}-03`,
      tipo: 'detalhe',
      dificuldade: 'facil',
      pergunta: `Quem é a figura central de autoridade soberana demonstrada em ${bookName} ${chapterNum}?`,
      alternativas: {
        A: "Os imperadores estrangeiros",
        B: "Os exércitos dos homens",
        C: `O Senhor Deus de Israel`,
        D: "Os sábios da Babilônia"
      },
      resposta_correta: 'C',
      explicacao: `A Palavra de Deus em ${bookName} ${chapterNum} revela a soberania suprema do Senhor sobre a história.`,
      referencia: `${bookName} ${chapterNum}:11-15`,
      xp: 10
    });

    questions.push({
      id: `${prefix}-04`,
      tipo: 'detalhe',
      dificuldade: 'facil',
      pergunta: `Qual atitude espiritual traz bênção ao servo fiel segundo a mensagem de ${bookName} ${chapterNum}?`,
      alternativas: {
        A: "A soberba e o orgulho",
        B: "A pressa e o descontentamento",
        C: "A falsidade nas palavras",
        D: `A humildade, a oração e a obediência à Palavra`
      },
      resposta_correta: 'D',
      explicacao: `A obediência sincera e humilde ao Senhor é a chave de bênção presente em ${bookName} ${chapterNum}.`,
      referencia: `${bookName} ${chapterNum}:16-20`,
      xp: 10
    });

    // Medium Questions (4)
    questions.push({
      id: `${prefix}-05`,
      tipo: 'detalhe',
      dificuldade: 'media',
      pergunta: `Qual promessa divina sobressai para aqueles que perseveram em ${bookName} ${chapterNum}?`,
      alternativas: {
        A: `O livramento e a proteção do Senhor para os retos de coração`,
        B: "Isenção de qualquer trabalho terreno",
        C: "Domínio político sobre todas as nações vizinhas",
        D: "Riqueza acumulada sem integridade"
      },
      resposta_correta: 'A',
      explicacao: `O capítulo ${chapterNum} de ${bookName} traz o encorajamento de que Deus guarda os Seus fiéis.`,
      referencia: `${bookName} ${chapterNum}:21-25`,
      xp: 15
    });

    questions.push({
      id: `${prefix}-06`,
      tipo: 'conexao',
      dificuldade: 'media',
      pergunta: `Como a conduta do povo em ${bookName} ${chapterNum} afeta a sua comunhão com Deus?`,
      alternativas: {
        A: "A comunhão independe de atitudes morais",
        B: `A obediência aproxima o povo de Deus, enquanto a rebeldia traz afaste e disciplina`,
        C: "As decisões humanas não influenciam em nada",
        D: "Deus não atenta para a conduta dos homens"
      },
      resposta_correta: 'B',
      explicacao: `A Bíblia demonstra em ${bookName} ${chapterNum} o elo constante entre fidelidade de coração e comunhão divina.`,
      referencia: `${bookName} ${chapterNum}:26-30`,
      xp: 15
    });

    questions.push({
      id: `${prefix}-07`,
      tipo: 'conexao',
      dificuldade: 'media',
      pergunta: `De que maneira os ensinamentos de ${bookName} ${chapterNum} se relacionam com o testemunho da fé no dia a dia?`,
      alternativas: {
        A: "Ensinando que a fé é apenas teórica sem prática",
        B: "Incentivando a hipocrisia diante dos homens",
        C: `Inspirando uma vida de integridade, amor ao próximo e temor a Deus`,
        D: "Recomendando a busca por vingança"
      },
      resposta_correta: 'C',
      explicacao: `A Palavra em ${bookName} ${chapterNum} convoca os servos a viverem uma fé autêntica e visível nas obras.`,
      referencia: `${bookName} ${chapterNum}:31-35`,
      xp: 15
    });

    questions.push({
      id: `${prefix}-08`,
      tipo: 'detalhe',
      dificuldade: 'media',
      pergunta: `Qual advertência solene é feita aos desobedientes em ${bookName} ${chapterNum}?`,
      alternativas: {
        A: `Que andar longe da verdade gera desorientação e perda espiritual`,
        B: "Que o pecado traz recompensa eterna",
        C: "Que não há diferença entre o justo e o ímpio",
        D: "Que a verdade muda conforme o tempo"
      },
      resposta_correta: 'A',
      explicacao: `O texto sagrado de ${bookName} ${chapterNum} alerta sobre as consequências dolorosas de desviar-se do Senhor.`,
      referencia: `${bookName} ${chapterNum}:36-40`,
      xp: 15
    });

    // Hard / Bonus Questions (2)
    questions.push({
      id: `${prefix}-09`,
      tipo: 'conexao',
      dificuldade: 'dificil',
      pergunta: `Qual aspecto profético ou doutrinário mais amplo é pré-figurado em ${bookName} ${chapterNum}?`,
      alternativas: {
        A: "A permanência eterna dos impérios humanos terrenas",
        B: "A inutilidade das promessas divinas",
        C: "A supremacia da sabedoria dos homens sobre Deus",
        D: `A necessidade de redenção e a fidelidade inabalável do plano de salvação de Deus`
      },
      resposta_correta: 'D',
      explicacao: `O capítulo ${chapterNum} de ${bookName} aponta para o grande plano redentor de Deus revelado nas Escrituras.`,
      referencia: `${bookName} ${chapterNum}:41-45`,
      xp: 25
    });

    questions.push({
      id: `${prefix}-10`,
      tipo: 'bonus',
      dificuldade: 'dificil',
      pergunta: `Como a revelação em ${bookName} ${chapterNum} contribui para a maturidade espiritual do peregrino na jornada?`,
      alternativas: {
        A: "Incentivando a autoconfiança orgulhosa",
        B: `Firmando a fé no caráter imutável de Deus e desenvolvendo perseverança diante das provações`,
        C: "Ensinando a duvidar das promessas da Bíblia",
        D: "Promovendo a preguiça espiritual"
      },
      resposta_correta: 'B',
      explicacao: `Meditar em ${bookName} ${chapterNum} fortalece o discernimento espiritual e a firmeza da esperança em Cristo.`,
      referencia: `${bookName} ${chapterNum}:46-50`,
      xp: 30
    });

    return questions;
  }

  public static generateChapterContext(bookId: string, chapterNum: number): ChapterContext {
    const territory = BIBLE_TERRITORIES.find(t => t.id.toLowerCase() === bookId.toLowerCase()) || BIBLE_TERRITORIES[0];
    const quizBankObj = QuizBankService.getQuizBankForChapter(bookId, chapterNum);
    const questionsBank = quizBankObj.perguntas;

    // Pick 1 representative question from the 10-question bank for quick preview
    const sampleQ = questionsBank[0];
    const optionsArray = [
      sampleQ.alternativas.A,
      sampleQ.alternativas.B,
      sampleQ.alternativas.C,
      sampleQ.alternativas.D
    ];
    const answerIdx = sampleQ.resposta_correta === 'A' ? 0 : sampleQ.resposta_correta === 'B' ? 1 : sampleQ.resposta_correta === 'C' ? 2 : 3;

    return {
      bookId,
      bookName: territory.name,
      chapterNumber: chapterNum,
      title: `${territory.name} ${chapterNum}`,
      historicalContext: `Estudo bíblico e reflexão sobre ${territory.name} capítulo ${chapterNum}.`,
      themeImage: territory.themeImage,
      keyCharacters: [territory.testament === 'OLD' ? 'O Senhor Deus / Povo de Israel' : 'Jesus Cristo / Discípulos'],
      importantEvents: [`Acontecimento marcante em ${territory.name} ${chapterNum}`, 'Ensinamento prático para a fé'],
      curiosities: `Capítulo ${chapterNum} do livro de ${territory.name}.`,
      quizQuestion: sampleQ.pergunta,
      quizOptions: optionsArray,
      quizAnswer: answerIdx,
      quizExplanation: sampleQ.explicacao,
      reflection: `Aplique as lições de ${territory.name} ${chapterNum} na sua vida diária.`,
      questionsBank
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

    list.sort((a, b) => b.xp - a.xp);
    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }
}
