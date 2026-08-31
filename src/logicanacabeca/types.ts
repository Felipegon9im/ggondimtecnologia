export type MasteryLevel = 'NOT_STARTED' | 'LEARNING' | 'EASY' | 'MASTERED' | 'EXAM_MASTER';

export type QuestionDifficulty = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  subject: string;      // e.g. 'estruturas-logicas', 'conectivos', 'tabelas-verdade'
  topic: string;        // e.g. 'negacao', 'condicional', 'diagramas'
  subtopic?: string;
  difficulty: QuestionDifficulty;
  question: string;
  options: string[];
  answer: number;       // 0-indexed index of correct option
  explanation: string;
  tip?: string;
  banca?: string;       // e.g. 'Cebraspe', 'FCC', 'FGV', 'Vunesp'
  concursoYear?: string;
  symbolicForm?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  simpleRule: string;    // E.g. "NÃO inverte V -> F e F -> V"
  macete?: string;       // E.g. "E = TODOS", "OU = UM", "Vera Fischer é Falsa"
  dailyExample: string;  // E.g. "João estuda E trabalha"
  symbolicNote?: string; // E.g. "¬P ou P ∧ Q"
  questions: Question[];
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  iconName: string;
  color: string;
  lessons: Lesson[];
}

export interface SRSItem {
  questionId: string;
  nextReviewTimestamp: number; // ms
  intervalDays: number;        // 0 (5min), 1, 3, 7, 14, 30
  consecutiveCorrect: number;
  lastTestedTimestamp: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  questionsAnswered: number;
  correctAnswers: number;
  dailyGoalXP: number;    // Default 50 XP
  dailyXP: number;
  level: number;
}

export interface UserProgress {
  stats: UserStats;
  moduleMastery: Record<number, MasteryLevel>; // module.id -> level
  completedLessonIds: string[];
  srsItems: Record<string, SRSItem>; // questionId -> SRSItem
  badges: Badge[];
}

export type AppViewMode = 
  | 'DASHBOARD'
  | 'MODULES_PATH'
  | 'LESSON_VIEWER'
  | 'SPEED_TRAIN'     // 🧠 Treino de Automatização
  | 'EXAM_SIMULATOR'  // 📝 Modo Concurso
  | 'TRUTH_TABLE'     // ⚡ Tabela-Verdade Interativa
  | 'DIAGRAMS'        // 🔵 Diagramas Lógicos
  | 'SRS_REVIEW';     // 🔄 Revisão Espaçada
