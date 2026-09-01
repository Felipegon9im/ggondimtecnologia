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

// Specific authentic quiz bank for key chapters across Old and New Testaments
const SPECIFIC_CHAPTER_QUIZZES: Record<string, {
  title: string;
  historicalContext: string;
  keyCharacters: string[];
  importantEvents: string[];
  curiosities: string;
  quizQuestion: string;
  correctAnswerText: string;
  wrongAnswers: string[];
  quizExplanation: string;
  reflection: string;
}> = {
  'gn-1': {
    title: 'Gênesis 1 — A Criação do Universo',
    historicalContext: 'O relato solene da criação dos céus, da terra e de tudo o que neles há pelo poder da Palavra de Deus.',
    keyCharacters: ['Deus Criador', 'Espírito de Deus'],
    importantEvents: ['Criação do mundo em 6 dias', 'Haja luz', 'Criação do homem à imagem e semelhança de Deus'],
    curiosities: 'A frase "E disse Deus" aparece 10 vezes no primeiro capítulo de Gênesis!',
    quizQuestion: 'O que Deus declarou ao ver tudo o que havia criado ao final do sexto dia?',
    correctAnswerText: 'E viu Deus tudo quanto tinha feito, e eis que era MUITO BOM (Gn 1:31)',
    wrongAnswers: [
      'Que a criação precisava ser refeita',
      'Que a terra ainda estava incompleta e imperfeita',
      'Que o homem devia governar sem prestar contas'
    ],
    quizExplanation: 'Em Gênesis 1:31 está escrito: "E viu Deus tudo quanto tinha feito, e eis que era muito bom".',
    reflection: 'Reconheça a perfeição da obra de Deus em sua vida hoje.'
  },
  'gn-2': {
    title: 'Gênesis 2 — O Jardim do Éden e o Sopro de Vida',
    historicalContext: 'Deus estabelece o descanso no 7º dia, forma o homem do pó da terra, sopra nele o fôlego de vida e institui o casamento.',
    keyCharacters: ['Deus', 'Adão', 'Eva'],
    importantEvents: ['Santificação do 7º dia', 'O homem formado do pó', 'Instalação do Jardim do Éden'],
    curiosities: 'Deus soprou nas narinas do homem o fôlego de vida e o homem foi feito alma vivente.',
    quizQuestion: 'Como Deus deu vida ao homem segundo Gênesis 2:7?',
    correctAnswerText: 'Formou o homem do pó da terra e soprou em suas narinas o fôlego de vida',
    wrongAnswers: [
      'Falou de longe através de uma tempestade no deserto',
      'Criou o homem a partir de um anjo celestial',
      'Colocou o homem em um sono profundo de mil anos'
    ],
    quizExplanation: 'Gênesis 2:7 relata que o Senhor Deus formou o homem do pó da terra e soprou nas suas narinas o fôlego de vida.',
    reflection: 'Sua vida é sustentada pelo fôlego sagrado que vem de Deus.'
  },
  'gn-3': {
    title: 'Gênesis 3 — A Queda da Humanidade',
    historicalContext: 'A tentação pela serpente astuta, a desobediência do homem no Éden e a primeira promessa de redenção (Protoevangelho).',
    keyCharacters: ['Adão', 'Eva', 'A Serpente Astuta', 'Deus'],
    importantEvents: ['A tentação do fruto proibido', 'Entrada do pecado no mundo', 'A promessa da semente da mulher'],
    curiosities: 'Em Gênesis 3:15 está a primeira profecia messiânica da Bíblia sobre a vitória da semente da mulher sobre a serpente.',
    quizQuestion: 'Qual profecia de vitória e salvação é revelada por Deus em Gênesis 3:15?',
    correctAnswerText: 'A semente da mulher feriria a cabeça da serpente',
    wrongAnswers: [
      'Que a serpente governaria para sempre a terra',
      'Que o homem seria perdoado sem necessidade de redentor',
      'Que o Jardim do Éden seria destruído por um raio'
    ],
    quizExplanation: 'Gênesis 3:15 aponta para Jesus Cristo, a semente da mulher que esmagou a cabeça do inimigo.',
    reflection: 'Mesmo diante da falha humana, a graça de Deus providencia a salvação.'
  },
  'gn-4': {
    title: 'Gênesis 4 — Caim e Abel',
    historicalContext: 'As ofertas apresentadas a Deus por Caim e Abel e a história das primeiras gerações após a saída do Éden.',
    keyCharacters: ['Caim', 'Abel', 'Deus'],
    importantEvents: ['A oferta aceita de Abel', 'O ciúme e crime de Caim', 'Nascimento de Sete'],
    curiosities: 'Abel ofereceu dos primogênitos das suas ovelhas e da sua gordura, agradando ao Senhor pela fé.',
    quizQuestion: 'Por que a oferta de Abel foi aceita por Deus em Gênesis 4?',
    correctAnswerText: 'Abel ofereceu o melhor das suas ovelhas com fé e coração sincero',
    wrongAnswers: [
      'Abel era mais rico e ofereceu ouro puro',
      'Caim não ofereceu nenhum produto da terra',
      'Deus escolheu aleatoriamente sem olhar o coração'
    ],
    quizExplanation: 'Hebreus 11:4 confirma que foi pela fé que Abel ofereceu a Deus maior sacrifício do que Caim.',
    reflection: 'Ofereça o seu melhor a Deus com amor e sinceridade de coração.'
  },
  'gn-12': {
    title: 'Gênesis 12 — O Chamado de Abraão',
    historicalContext: 'Deus chama Abrão de Ur dos Caldeus para ir a uma terra desconhecida e faz com ele uma aliança eterna.',
    keyCharacters: ['Abrão (Abraão)', 'Sarai (Sara)', 'Ló', 'Deus'],
    importantEvents: ['Saída de Harã', 'A promessa da grande nação', 'Construção de altares ao Senhor'],
    curiosities: 'Abraão tinha 75 anos quando saiu de Harã obedecendo ao chamado divino.',
    quizQuestion: 'Qual foi a grande promessa feita por Deus a Abraão em Gênesis 12:3?',
    correctAnswerText: 'Em ti serão benditas todas as famílias da terra',
    wrongAnswers: [
      'Que ele governaria o império do Egito imediatamente',
      'Que ele nunca enfrentaria momentos de escassez',
      'Que seus descendentes construiriam pirâmides de ouro'
    ],
    quizExplanation: 'Em Gênesis 12:3, Deus promete que através de Abraão todas as famílias da terra seriam abençoadas.',
    reflection: 'A obediência ao chamado de Deus abre portas de bênçãos para futuras gerações.'
  },
  'ex-3': {
    title: 'Êxodo 3 — A Sarça Ardente e o Chamado de Moisés',
    historicalContext: 'Moisés apascenta o rebanho no Monte Horebe e ouve a voz de Deus vinda de uma sarça em chamas que não se consumia.',
    keyCharacters: ['Moisés', 'Deus (EU SOU O QUE EU SOU)'],
    importantEvents: ['A visão da sarça em chamas', 'Tira os sapatos dos pés', 'O nome de Deus: EU SOU'],
    curiosities: 'Deus revelou Seu nome santo a Moisés como "EU SOU O QUE SOU" (Yahweh).',
    quizQuestion: 'Como Deus se manifestou a Moisés em Êxodo 3:2?',
    correctAnswerText: 'Em uma chama de fogo do meio de uma sarça que ardia sem se consumir',
    wrongAnswers: [
      'Em um trovão ruidoso no topo de uma torre',
      'Através de uma estátua de bronze que falava',
      'Num sonho de noite durante uma tempestade'
    ],
    quizExplanation: 'Êxodo 3:2 declara que o anjo do Senhor lhe apareceu numa chama de fogo do meio de uma sarça.',
    reflection: 'Deus nos chama pelo nome e nos envia com Seu poder.'
  },
  'ex-14': {
    title: 'Êxodo 14 — A Travessia do Mar Vermelho',
    historicalContext: 'O povo de Israel está encurralado entre o exército de Faraó e o mar, e Deus opera a abertura milagrosa das águas.',
    keyCharacters: ['Moisés', 'Faraó', 'O Povo de Israel', 'Anjo de Deus'],
    importantEvents: ['O Mar Vermelho se divide', 'Israel atravessa em pé enxuto', 'Derrota do exército egípcio'],
    curiosities: 'Moisés estendeu a mão sobre o mar, e o Senhor fez retirar o mar por um forte vento oriental toda aquela noite.',
    quizQuestion: 'O que Moisés disse ao povo assustado diante do Mar Vermelho em Êxodo 14:13?',
    correctAnswerText: 'Não temais; estai quietos e vede o livramento do Senhor',
    wrongAnswers: [
      'Voltemos imediatamente e nos entreguemos aos egípcios',
      'Construamos barcos para fugir pelas águas',
      'Cada um corra para o seu lado para tentar se salvar'
    ],
    quizExplanation: 'Êxodo 14:13 nos ensina que a salvação vem do Senhor quando mantemos a fé e a firmeza.',
    reflection: 'Diante de caminhos bloqueados, confie que Deus abrirá o mar para você.'
  },
  'ex-20': {
    title: 'Êxodo 20 — Os Dez Mandamentos no Monte Sinai',
    historicalContext: 'Deus desce com fogo e glória sobre o Monte Sinai e entrega os 10 Mandamentos como padrão moral para Seu povo.',
    keyCharacters: ['Deus', 'Moisés', 'Todo o Povo de Israel'],
    importantEvents: ['A voz de Deus no Sinai', 'Entrega dos 10 Mandamentos', 'Temor solene do povo'],
    curiosities: 'Os Dez Mandamentos resumem os deveres do homem para com Deus (1-4) e para com o próximo (5-10).',
    quizQuestion: 'Qual é o primeiro dos Dez Mandamentos proclamados em Êxodo 20:3?',
    correctAnswerText: 'Não terás outros deuses diante de mim',
    wrongAnswers: [
      'Honra a teu pai e a tua mãe',
      'Não furtarás',
      'Não tomarás o nome do Senhor em vão'
    ],
    quizExplanation: 'O primeiro mandamento estabelece a exclusividade do culto ao único Deus verdadeiro.',
    reflection: 'Coloque a Palavra de Deus como guia absoluto para suas decisões diárias.'
  },
  'sl-23': {
    title: 'Salmos 23 — O Senhor é o Meu Pastor',
    historicalContext: 'Um cântico sublime do Rei Davi expressando confiança plena na provisão, direção e proteção do Bom Pastor.',
    keyCharacters: ['Rei Davi', 'O Senhor (Bom Pastor)'],
    importantEvents: ['Guiado a verdes pastos', 'Restauração da alma', 'A mesa preparada perante os inimigos'],
    curiosities: 'Davi conhecia pessoalmente os perigos do pastoreio, o que deu profundidade à sua metáfora sobre o cuidado de Deus.',
    quizQuestion: 'Qual é a famosa declaração de confiança que abre o Salmo 23?',
    correctAnswerText: 'O Senhor é o meu pastor; nada me faltará (Sl 23:1)',
    wrongAnswers: [
      'O Senhor é o meu refúgio nas batalhas',
      'Em Deus faremos proezas contra os exércitos',
      'Buscai em primeiro lugar as vitórias terrenas'
    ],
    quizExplanation: 'Salmos 23:1 declara que sob a proteção do Bom Pastor, nenhuma necessidade essencial nos faltará.',
    reflection: 'Descanse no cuidado amoroso do Pastor das nossas almas.'
  },
  'sl-91': {
    title: 'Salmos 91 — O Esconderijo do Altíssimo',
    historicalContext: 'Um salmo de proteção divina inabalável para quem habita na presença de Deus e confia em Suas asas.',
    keyCharacters: ['O Fiel Peregrino', 'Deus Altíssimo'],
    importantEvents: ['Habitar no esconderijo', 'Livramento do laço do passarinheiro', 'Proteção dos anjos'],
    curiosities: 'Salmos 91 declara que Deus dará ordem aos Seus anjos a teu respeito para te guardarem em todos os teus caminhos.',
    quizQuestion: 'O que promete Salmos 91:1 àquele que habita no esconderijo do Altíssimo?',
    correctAnswerText: 'À sombra do Onipotente descansará',
    wrongAnswers: [
      'Nunca precisará trabalhar ou lutar',
      'Receberá glória e coroas terrenas dos homens',
      'Ficará imune a qualquer responsabilidade'
    ],
    quizExplanation: 'Salmos 91:1 garante paz e descanso espiritual sob a sombra protetora do Onipotente.',
    reflection: 'Sua segurança espiritual está firme na presença diária de Deus.'
  },
  'pv-1': {
    title: 'Provérbios 1 — O Princípio da Sabedoria',
    historicalContext: 'Salomão apresenta os provérbios para ensinar sabedoria, instrução e discernimento aos jovens e prudentes.',
    keyCharacters: ['Rei Salomão', 'A Sabedoria'],
    importantEvents: ['O valor dos conselhos', 'Alerta contra as más companhias', 'O clamor da sabedoria nas praças'],
    curiosities: 'Salomão escreveu mais de 3.000 provérbios repletos de sabedoria prática para a vida cristã.',
    quizQuestion: 'Segundo Provérbios 1:7, qual é o princípio do conhecimento?',
    correctAnswerText: 'O temor do Senhor é o princípio do conhecimento',
    wrongAnswers: [
      'Acumular diplomas e títulos acadêmicos',
      'Vencer discussões e ter razão sempre',
      'Seguir os impulsos dos próprios sentimentos'
    ],
    quizExplanation: 'Provérbios 1:7 ensina que o respeito reverente a Deus é o ponto de partida de toda verdadeira sabedoria.',
    reflection: 'Busque a sabedoria divina antes de tomar qualquer decisão importante.'
  },
  'mt-5': {
    title: 'Mateus 5 — O Sermão da Montanha',
    historicalContext: 'Jesus sobe ao monte e ensina as As Bem-Aventuranças, revelando o padrão moral e a pureza de coração do Reino de Deus.',
    keyCharacters: ['Jesus Cristo', 'Os Discípulos', 'A Multidão'],
    importantEvents: ['As Bem-Aventuranças', 'Sal da Terra e Luz do Mundo', 'Cumprimento da Lei'],
    curiosities: 'O Sermão da Montanha (Mt 5-7) é a mensagem mais famosa de Jesus sobre a transformação interior.',
    quizQuestion: 'Segundo Jesus em Mateus 5:14, o que os Seus seguidores são no mundo?',
    correctAnswerText: 'Vós sois a luz do mundo; não se pode esconder uma cidade no monte',
    wrongAnswers: [
      'Juízes severos da sociedade',
      'Líderes políticos de impérios',
      'Apenas observadores distantes'
    ],
    quizExplanation: 'Jesus declarou: "Vós sois a luz do mundo", chamando Seus discípulos a iluminar as trevas com boas obras.',
    reflection: 'Deixe a sua luz brilhar através de atitudes de amor e verdade.'
  },
  'jo-3': {
    title: 'João 3 — Nicodemos e o Novo Nascimento',
    historicalContext: 'Nicodemos visita Jesus à noite e ouve sobre a necessidade do novo nascimento pelo Espírito e a demonstração suprema do amor de Deus.',
    keyCharacters: ['Jesus Cristo', 'Nicodemos (Mestre em Israel)'],
    importantEvents: ['O ensino do novo nascimento', 'O vento sopra onde quer', 'João 3:16 — O amor de Deus pelo mundo'],
    curiosities: 'João 3:16 é considerado o versículo mais famoso de toda a Bíblia!',
    quizQuestion: 'O que declara o famoso versículo de João 3:16?',
    correctAnswerText: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna',
    wrongAnswers: [
      'Que a salvação é alcançada apenas por mérito das próprias obras',
      'Que Deus perdoa apenas quem nunca errou na vida',
      'Que o amor de Deus é exclusivo de um pequeno grupo'
    ],
    quizExplanation: 'João 3:16 resume o plano divino de redenção através do sacrifício por amor de Jesus Cristo.',
    reflection: 'Agradeça hoje pelo amor incondicional que lhe deu vida eterna.'
  },
  'jo-14': {
    title: 'João 14 — O Caminho, a Verdade e a Vida',
    historicalContext: 'Jesus consola os Seus discípulos antes da paixão, promete a habitação do Espírito Santo (Consolador) e declara Sua divindade.',
    keyCharacters: ['Jesus Cristo', 'Tomé', 'Filipe', 'O Espírito Santo'],
    importantEvents: ['A promessa das moradas celestiais', 'Eu sou o caminho', 'Promessa do Consolador'],
    curiosities: 'Jesus promete o Parácleto (Espírito Santo), que estaria para sempre com os crentes.',
    quizQuestion: 'Qual afirmação central Jesus faz em João 14:6?',
    correctAnswerText: 'Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim',
    wrongAnswers: [
      'Existem múltiplos caminhos equivalentes até Deus',
      'A verdade varia conforme o pensamento humano',
      'A vida eterna só existe para quem estuda filosofia'
    ],
    quizExplanation: 'João 14:6 estabelece Jesus Cristo como o único mediador e caminho de acesso ao Pai.',
    reflection: 'Ande no Caminho que é Jesus e vivencie a Verdade libertadora.'
  },
  'at-2': {
    title: 'Atos 2 — O Dia de Pentecostes e o Nascimento da Igreja',
    historicalContext: 'O Espírito Santo é derramado com poder sobre os crentes reunidos no cenáculo em Jerusalém e Pedro prega para multidões.',
    keyCharacters: ['Pedro', 'Os 120 Discípulos', 'Multidões em Jerusalém'],
    importantEvents: ['Derramamento do Espírito Santo', 'Línguas de fogo', 'Conversão de quase 3.000 almas'],
    curiosities: 'Cerca de 3.000 pessoas se converteram e foram batizadas em um único dia após a pregação de Pedro.',
    quizQuestion: 'Qual sinal visível e audível marcou a vinda do Espírito Santo em Atos 2:2-3?',
    correctAnswerText: 'Um som como de um vento impetuoso e línguas divididas como de fogo sobre eles',
    wrongAnswers: [
      'Um terremoto que destruiu o templo de Jerusalém',
      'Um eclipse solar de três dias seguidos',
      'A aparição de um exército visível de anjos de espada na mão'
    ],
    quizExplanation: 'Atos 2 relata a vinda do Espírito Santo com som de vento impetuoso e línguas de fogo.',
    reflection: 'Busque diariamente ser cheio da presença e do poder do Espírito Santo.'
  },
  'ro-8': {
    title: 'Romanos 8 — Mais que Vencedores em Cristo',
    historicalContext: 'Paulo descreve a vida no Espírito, a filiação divina dos crentes e a certeza inabalável de que nada nos separará do amor de Deus.',
    keyCharacters: ['Apóstolo Paulo', 'Os Crentes em Roma'],
    importantEvents: ['Nenhuma condenação há', 'Testemunho do Espírito', 'Mais que vencedores'],
    curiosities: 'Romanos 8 começa com "Nenhuma condenação há" e termina garantindo que "nada nos separará do amor de Deus".',
    quizQuestion: 'O que o Apóstolo Paulo proclama com triunfo em Romanos 8:31?',
    correctAnswerText: 'Se Deus é por nós, quem será contra nós?',
    wrongAnswers: [
      'Se enfrentarmos dificuldades, fomos abandonados',
      'A vitória depende apenas das forças físicas humanas',
      'O sofrimento prova que Deus não nos ouve'
    ],
    quizExplanation: 'Romanos 8:31 traz a garantia reconfortante da soberania de Deus a favor dos Seus filhos.',
    reflection: 'Caminhe com a convicção de que você é mais que vencedor por meio daquele que nos amou.'
  },
  'ap-21': {
    title: 'Apocalipse 21 — A Nova Jerusalém e os Novos Céus',
    historicalContext: 'João contempla a visão gloriosa dos novos céus, da nova terra e da Nova Jerusalém que desce do céu da parte de Deus.',
    keyCharacters: ['Apóstolo João', 'Deus no Trono', 'A Noiva do Cordeiro'],
    importantEvents: ['Visão dos Novos Céus e Nova Terra', 'Deus habitando com os homens', 'Fim de toda dor e morte'],
    curiosities: 'Em Apocalipse 21:4 promete-se que Deus enxugará dos olhos toda lágrima e a morte já não existirá.',
    quizQuestion: 'Qual promessa gloriosa é revelada em Apocalipse 21:4?',
    correctAnswerText: 'Deus enxugará dos olhos toda lágrima, e não haverá mais morte, nem pranto, nem dor',
    wrongAnswers: [
      'Que a dor continuará existindo eternamente',
      'Que os crentes ficarão sem memórias no céu',
      'Que a Nova Jerusalém será construída por mãos humanas'
    ],
    quizExplanation: 'Apocalipse 21:4 descreve a restauração final onde a dor, o luto e a morte serão extintos para sempre.',
    reflection: 'Mantenha seus olhos fixos na esperança da eternidade com Deus.'
  }
};

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
    const key = this.getChapterKey(bookId, chapterNum);
    const territory = BIBLE_TERRITORIES.find(t => t.id.toLowerCase() === bookId.toLowerCase()) || BIBLE_TERRITORIES[0];

    // 1. Check if specific custom quiz exists for this chapter
    const specificQuiz = SPECIFIC_CHAPTER_QUIZZES[key];

    if (specificQuiz) {
      // Deterministically rotate the correct answer index between 0, 1, 2, 3 so it's not always option A!
      const correctIdx = (chapterNum + bookId.charCodeAt(0)) % 4;
      const options = [...specificQuiz.wrongAnswers];
      options.splice(correctIdx, 0, specificQuiz.correctAnswerText);

      return {
        bookId,
        bookName: territory.name,
        chapterNumber: chapterNum,
        title: specificQuiz.title,
        historicalContext: specificQuiz.historicalContext,
        themeImage: territory.themeImage,
        keyCharacters: specificQuiz.keyCharacters,
        importantEvents: specificQuiz.importantEvents,
        curiosities: specificQuiz.curiosities,
        quizQuestion: specificQuiz.quizQuestion,
        quizOptions: options,
        quizAnswer: correctIdx,
        quizExplanation: specificQuiz.quizExplanation,
        reflection: specificQuiz.reflection
      };
    }

    // 2. Dynamic Algorithmic Question Generator for All 1,189 Chapters
    // Ensures every single chapter gets unique context, questions, options, and rotating correct answer position!
    const title = `${territory.name} — Capítulo ${chapterNum}`;
    const historicalContext = `Neste capítulo de ${territory.name}, acompanhamos a narração dos ensinamentos divinos e da história de fé de Israel e da Igreja.`;
    const keyCharacters = [
      territory.testament === 'OLD' ? 'O Senhor Deus / Servos de Israel' : 'Jesus Cristo / Os Apóstolos'
    ];
    const importantEvents = [
      `Revelação espiritual da vontade de Deus em ${territory.name} ${chapterNum}`,
      'Instruções para uma vida de fidelidade, obediência e crescimento na Palavra'
    ];
    const curiosities = `O livro de ${territory.name} possui ${territory.chaptersCount} capítulos repletos de sabedoria e revelações espirituais.`;

    // Generate unique chapter-specific questions
    const questionTemplates = [
      `Qual é a lição central revelada na passagem de ${territory.name} ${chapterNum}?`,
      `O que a leitura de ${territory.name} ${chapterNum} nos ensina sobre a caminhada de fé?`,
      `Qual atitude do servo fiel é destacada no capítulo ${chapterNum} de ${territory.name}?`,
      `Como a glória e a fidelidade de Deus são demonstradas em ${territory.name} ${chapterNum}?`
    ];
    const quizQuestion = questionTemplates[chapterNum % questionTemplates.length];

    const correctOptionText = `A fidelidade de Deus e a busca por guardar Sua Palavra com temor em ${territory.name} ${chapterNum}`;
    const wrong1 = `Buscar interesses materiais sem priorizar a vontade divina`;
    const wrong2 = `Desanimar diante dos desafios e abandonar a oração`;
    const wrong3 = `Ignorar os ensinamentos dos profetas e apóstolos`;

    // Rotate the correct answer position deterministically: 0 = A, 1 = B, 2 = C, 3 = D
    const correctIdx = (chapterNum * 7 + bookId.charCodeAt(0)) % 4;
    const options = [wrong1, wrong2, wrong3];
    options.splice(correctIdx, 0, correctOptionText);

    const quizExplanation = `Em ${territory.name} ${chapterNum}, o texto nos ensina que guardar os mandamentos de Deus traz verdadeira direção e paz ao coração.`;
    const reflection = `Reflita hoje em como colocar os princípios de ${territory.name} ${chapterNum} em prática no seu dia a dia.`;

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
      quizOptions: options,
      quizAnswer: correctIdx,
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
