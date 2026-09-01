import type { UserProfile, Badge, Quest } from '../types';

const STORAGE_KEY = 'JORNADA_BIBLICA_PROFILE_V3';

const INITIAL_BADGES: Badge[] = [
  { id: 'first_chapter', title: 'Primeiro Passo 📖', description: 'Concluiu o 1º capítulo da Jornada Bíblica', icon: '📖', unlocked: false },
  { id: 'streak_3', title: 'Caminhada do Peregrino 🔥', description: 'Manteve 3 dias seguidos de leitura diária', icon: '🔥', unlocked: false },
  { id: 'streak_7', title: 'Perseverante 🛡️', description: 'Manteve 7 dias de caminhada na Palavra', icon: '⚡', unlocked: false },
  { id: 'genesis_done', title: 'Gênesis Concluído 🌍', description: 'Completou todos os 50 capítulos de Gênesis', icon: '🌍', unlocked: false },
  { id: 'league_up', title: 'Subida de Liga 🏆', description: 'Subiu de posição na Liga dos Peregrinos', icon: '🏆', unlocked: false },
  { id: 'nt_unlocked', title: 'Novo Testamento ✝️', description: 'Alcançou os Evangelhos na Jornada Bíblica', icon: '✨', unlocked: false }
];

const INITIAL_QUESTS: Quest[] = [
  { id: 'q1', title: 'Ganhar 50 XP', description: 'Responda aos testes dos capítulos para somar 50 XP hoje.', icon: '⚡', target: 50, current: 0, rewardXP: 20, completed: false },
  { id: 'q2', title: 'Caminhada Diária', description: 'Conclua a leitura de pelo menos 1 capítulo da Bíblia hoje.', icon: '🔥', target: 1, current: 0, rewardXP: 15, completed: false },
  { id: 'q3', title: 'Avanço na Liga', description: 'Ganhe XP e suba de posição na Liga dos Peregrinos.', icon: '🏆', target: 1, current: 0, rewardXP: 20, completed: false }
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Peregrino',
  language: 'PT',
  gender: 'MASCULINO',
  style: 'BIBLICO',
  stats: {
    xp: 0,
    hearts: 5,
    maxHearts: 5,
    streakDays: 1,
    streakFreeze: false,
    lastActiveDate: new Date().toISOString().split('T')[0],
    readToday: false,
    completedChapterKeys: ['gn-1'], // First chapter ready/unlocked
    claimedChestBookIds: [],
    currentBookId: 'gn',
    currentChapterNum: 1,
    currentLeagueId: 'CAMINHO',
    currentRank: 7,
    dailyGoalXP: 50,
    dailyXP: 0
  },
  badges: INITIAL_BADGES,
  quests: INITIAL_QUESTS,
  hasOnboarded: false
};

export class StorageService {
  public static loadProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_PROFILE;
      const parsed: UserProfile = JSON.parse(data);

      // Ensure defaults for new stats
      if (parsed.stats.hearts === undefined) parsed.stats.hearts = 5;
      if (parsed.stats.maxHearts === undefined) parsed.stats.maxHearts = 5;
      if (!parsed.stats.completedChapterKeys) parsed.stats.completedChapterKeys = ['gn-1'];
      if (!parsed.stats.claimedChestBookIds) parsed.stats.claimedChestBookIds = [];
      if (!parsed.stats.currentBookId) parsed.stats.currentBookId = 'gn';
      if (!parsed.stats.currentChapterNum) parsed.stats.currentChapterNum = 1;
      if (!parsed.stats.currentLeagueId) parsed.stats.currentLeagueId = 'CAMINHO';
      if (!parsed.stats.currentRank) parsed.stats.currentRank = 7;
      if (!parsed.quests) parsed.quests = INITIAL_QUESTS;

      // Check daily streak reset
      const todayStr = new Date().toISOString().split('T')[0];
      const lastActive = parsed.stats.lastActiveDate;
      if (lastActive !== todayStr) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays > 1) {
          if (parsed.stats.streakFreeze) {
            parsed.stats.streakFreeze = false;
          } else {
            parsed.stats.streakDays = 1;
          }
        }
        parsed.stats.readToday = false;
        parsed.stats.dailyXP = 0;
        parsed.stats.hearts = 5;
        parsed.stats.lastActiveDate = todayStr;
      }

      return parsed;
    } catch (e) {
      console.error('Erro ao carregar perfil da Jornada Bíblica:', e);
      return DEFAULT_PROFILE;
    }
  }

  public static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Erro ao salvar perfil:', e);
    }
  }

  public static resetProfile(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
