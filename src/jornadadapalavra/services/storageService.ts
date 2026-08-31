import type { UserProfile, Badge, Quest } from '../types';

const STORAGE_KEY = 'JORNADA_DA_PALAVRA_PROFILE_V2';

const INITIAL_BADGES: Badge[] = [
  { id: 'first_devotional', title: 'Primeira Leitura 🌱', description: 'Concluiu o primeiro devocional diário', icon: '📖', unlocked: false },
  { id: 'streak_3', title: 'Fogo Santo 🔥', description: 'Manteve 3 dias seguidos lendo a Palavra', icon: '🔥', unlocked: false },
  { id: 'streak_7', title: 'Perseverante 🛡️', description: 'Manteve 7 dias de caminhada diária', icon: '⚡', unlocked: false },
  { id: 'disciple_rank', title: 'Conhecedor da Palavra 🌿', description: 'Alcançou o Nível de Discípulo e liberou a Bíblia', icon: '📜', unlocked: false },
  { id: 'evangelist_share', title: 'Semeador de Vidas 🕊️', description: 'Compartilhou 5 devocionais com amigos', icon: '📲', unlocked: false },
  { id: 'quiz_master', title: 'Mestre da Palavra 🎓', description: 'Acertou 10 quizzes bíblicos consecutivos', icon: '👑', unlocked: false }
];

const INITIAL_QUESTS: Quest[] = [
  { id: 'q1', title: 'Ganhar 50 XP', description: 'Responda quizzes e leia versículos para somar 50 XP hoje.', icon: '⚡', target: 50, current: 0, rewardXP: 20, completed: false },
  { id: 'q2', title: 'Manter a Chama Acesas', description: 'Marque a leitura bíblica de hoje.', icon: '🔥', target: 1, current: 0, rewardXP: 15, completed: false },
  { id: 'q3', title: 'Semeador do Reino', description: 'Compartilhe 1 versículo ou devocional.', icon: '📲', target: 1, current: 0, rewardXP: 10, completed: false }
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
    devotionalsCompleted: 0,
    quizzesCorrect: 0,
    sharedCount: 0,
    peopleReached: 1,
    dailyGoalXP: 50,
    dailyXP: 0,
    currentLevelId: 1 // 🌱 Semente
  },
  completedDevotionalIds: [],
  completedLessonIds: [],
  unlockedLevelIds: [1],
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

      // Ensure hearts & new properties exist
      if (parsed.stats.hearts === undefined) parsed.stats.hearts = 5;
      if (parsed.stats.maxHearts === undefined) parsed.stats.maxHearts = 5;
      if (!parsed.quests) parsed.quests = INITIAL_QUESTS;
      if (!parsed.completedLessonIds) parsed.completedLessonIds = [];

      // Check daily streak reset
      const todayStr = new Date().toISOString().split('T')[0];
      const lastActive = parsed.stats.lastActiveDate;
      if (lastActive !== todayStr) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays > 1) {
          if (parsed.stats.streakFreeze) {
            parsed.stats.streakFreeze = false; // Consumed freeze
          } else {
            parsed.stats.streakDays = 1;
          }
        }
        parsed.stats.readToday = false;
        parsed.stats.dailyXP = 0;
        parsed.stats.hearts = 5; // Refill hearts daily
        parsed.stats.lastActiveDate = todayStr;
      }

      return parsed;
    } catch (e) {
      console.error('Erro ao carregar perfil:', e);
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
