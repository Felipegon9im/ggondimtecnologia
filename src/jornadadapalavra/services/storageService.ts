import type { UserProfile, Badge } from '../types';

const STORAGE_KEY = 'JORNADA_DA_PALAVRA_PROFILE_V1';

const INITIAL_BADGES: Badge[] = [
  { id: 'first_devotional', title: 'Primeira Leitura 🌱', description: 'Concluiu o primeiro devocional diário', icon: '📖', unlocked: false },
  { id: 'streak_3', title: 'Fogo Santo 🔥', description: 'Manteve 3 dias seguidos lendo a Palavra', icon: '🔥', unlocked: false },
  { id: 'streak_7', title: 'Perseverante 🛡️', description: 'Manteve 7 dias de caminhada diária', icon: '⚡', unlocked: false },
  { id: 'disciple_rank', title: 'Conhecedor da Palavra 🌿', description: 'Alcançou o Nível de Discípulo e liberou a Bíblia', icon: '📜', unlocked: false },
  { id: 'evangelist_share', title: 'Semeador de Vidas 🕊️', description: 'Compartilhou 5 devocionais com amigos', icon: '📲', unlocked: false },
  { id: 'quiz_master', title: 'Mestre da Palavra 🎓', description: 'Acertou 10 quizzes bíblicos consecutivos', icon: '👑', unlocked: false }
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Peregrino',
  language: 'PT',
  gender: 'MASCULINO',
  style: 'BIBLICO',
  stats: {
    xp: 0,
    streakDays: 1,
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
  unlockedLevelIds: [1],
  badges: INITIAL_BADGES,
  hasOnboarded: false
};

export class StorageService {
  public static loadProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_PROFILE;
      const parsed: UserProfile = JSON.parse(data);

      // Check daily streak reset
      const todayStr = new Date().toISOString().split('T')[0];
      const lastActive = parsed.stats.lastActiveDate;
      if (lastActive !== todayStr) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays > 1) {
          parsed.stats.streakDays = 1;
        }
        parsed.stats.readToday = false;
        parsed.stats.dailyXP = 0;
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
