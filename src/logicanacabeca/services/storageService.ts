import type { UserProgress, Badge } from '../types';

const STORAGE_KEY = 'LOGICA_NA_CABECA_PROGRESS_V1';

const INITIAL_BADGES: Badge[] = [
  { id: 'first_step', title: 'Primeiro Passo', description: 'Concluiu a primeira microlição de Raciocínio Lógico', icon: '🌱', unlocked: false },
  { id: 'streak_3', title: 'Em Chamas! 🔥', description: 'Manteve 3 dias seguidos de estudo', icon: '🔥', unlocked: false },
  { id: 'streak_7', title: 'Foco de Aço 🛡️', description: 'Manteve 7 dias seguidos de treino', icon: '⚡', unlocked: false },
  { id: 'master_connectives', title: 'Mestre dos Conectivos ∧ ∨ →', description: 'Dominou todos os macetes de conectivos lógicos', icon: '🏆', unlocked: false },
  { id: 'truth_table_pro', title: 'Genio da Tabela-Verdade 📊', description: 'Completou 10 tabelas-verdade sem cometer nenhum erro', icon: '🧠', unlocked: false },
  { id: 'speed_demon', title: 'Velocidade Máxima ⚡', description: 'Acertou 15 respostas seguidas no Treino de Automatização', icon: '⚡', unlocked: false },
  { id: 'concurso_ready', title: 'Pronto pro Concurso 🎯', description: 'Resolveu 50 questões de concurso com taxa de acerto > 80%', icon: '🎓', unlocked: false }
];

export const INITIAL_PROGRESS: UserProgress = {
  stats: {
    xp: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    questionsAnswered: 0,
    correctAnswers: 0,
    dailyGoalXP: 50,
    dailyXP: 0,
    level: 1
  },
  moduleMastery: {},
  completedLessonIds: [],
  srsItems: {},
  badges: INITIAL_BADGES
};

export class StorageService {
  public static loadProgress(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return INITIAL_PROGRESS;
      const parsed: UserProgress = JSON.parse(data);

      const todayStr = new Date().toISOString().split('T')[0];
      const lastActive = parsed.stats.lastActiveDate;
      if (lastActive !== todayStr) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays > 1) {
          parsed.stats.streakDays = 1;
        }
        parsed.stats.dailyXP = 0;
        parsed.stats.lastActiveDate = todayStr;
      }

      return parsed;
    } catch (e) {
      console.error('Erro ao carregar progresso:', e);
      return INITIAL_PROGRESS;
    }
  }

  public static saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Erro ao salvar progresso:', e);
    }
  }

  public static resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
