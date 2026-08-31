export type AppLanguage = 'PT' | 'ES' | 'EN';
export type AvatarGender = 'MASCULINO' | 'FEMININO';
export type AvatarStyle = 'BIBLICO' | 'ATUAL';

export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface LevelInfo {
  id: LevelId;
  name: string;
  concept: string;       // e.g. "Receber", "Conhecer", "Compartilhar", "Alcançar"
  evolutionDesc: string; // e.g. "Início da caminhada como semente"
  avatarVisual: string;  // e.g. "Roupa simples + Celular"
  resourcesUnlocked: string[];
  earlyAccessPrice?: string; // e.g. "R$ 9,90"
  color: string;
  icon: string;
  minXP: number;
}

export interface Devotional {
  id: string;
  title: string;
  passage: string;
  passageText: string;
  reflection: string;
  date: string; // 'YYYY-MM-DD'
  videoUrl?: string;
  videoTitle?: string;
  quizQuestion: string;
  quizOptions: string[];
  quizAnswer: number;
  quizExplanation: string;
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'OLD' | 'NEW';
  chaptersCount: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  rewardXP: number;
  completed: boolean;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  league: string; // 'Bronze' | 'Prata' | 'Ouro' | 'Diamante'
  isUser?: boolean;
}

export interface UserStats {
  xp: number;
  hearts: number; // 0 to 5 (Duolingo lives)
  maxHearts: number;
  streakDays: number;
  streakFreeze: boolean;
  lastActiveDate: string; // 'YYYY-MM-DD'
  readToday: boolean;
  devotionalsCompleted: number;
  quizzesCorrect: number;
  sharedCount: number;
  peopleReached: number;
  dailyGoalXP: number;
  dailyXP: number;
  currentLevelId: LevelId;
}

export interface UserProfile {
  name: string;
  language: AppLanguage;
  gender: AvatarGender;
  style: AvatarStyle;
  stats: UserStats;
  completedDevotionalIds: string[];
  completedLessonIds: string[];
  unlockedLevelIds: LevelId[];
  badges: Badge[];
  quests: Quest[];
  claimedChestUnitIds?: number[];
  hasOnboarded: boolean;
}

export interface DuolingoLesson {
  id: string;
  unitId: number;
  title: string;
  icon: string;
  mascotTip: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface DuolingoUnit {
  id: number;
  title: string;
  description: string;
  levelId: LevelId;
  color: string;
  lessons: DuolingoLesson[];
}

export type AppViewMode = 
  | 'FEED'
  | 'MAP'
  | 'BIBLE'
  | 'QUIZ'
  | 'IMPACT'
  | 'EARLY_ACCESS'
  | 'SHOP'
  | 'QUESTS'
  | 'LEADERBOARD';
