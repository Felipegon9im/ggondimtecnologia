export type AppLanguage = 'PT' | 'ES' | 'EN';
export type AvatarGender = 'MASCULINO' | 'FEMININO';
export type AvatarStyle = 'BIBLICO' | 'ATUAL';

export type LeagueId = 'CAMINHO' | 'JORNADA' | 'DISCIPULOS' | 'PEREGRINOS' | 'GUARDIOES' | 'MENSAGEIROS';

export interface LeagueTier {
  id: LeagueId;
  name: string;
  minXP: number;
  icon: string;
  color: string;
  description: string;
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'OLD' | 'NEW';
  chaptersCount: number;
}

export interface BibleTerritory {
  id: string;
  name: string;
  testament: 'OLD' | 'NEW';
  chaptersCount: number;
  startGlobalIndex: number; // 1 to 1189
  endGlobalIndex: number;
  icon: string;
  color: string;
  description: string;
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface ChapterContext {
  bookId: string;
  bookName: string;
  chapterNumber: number;
  title: string;
  historicalContext: string;
  keyCharacters: string[];
  importantEvents: string[];
  curiosities: string;
  quizQuestion: string;
  quizOptions: string[];
  quizAnswer: number;
  quizExplanation: string;
  reflection: string;
}

export interface RankingShiftInfo {
  previousRank: number;
  newRank: number;
  passedCount: number;
  previousLeague: string;
  newLeague: string;
  isLeagueUp: boolean;
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
  league: string;
  isUser?: boolean;
}

export interface UserStats {
  xp: number;
  hearts: number;
  maxHearts: number;
  streakDays: number;
  streakFreeze: boolean;
  lastActiveDate: string; // 'YYYY-MM-DD'
  readToday: boolean;
  completedChapterKeys: string[]; // e.g. ["gn-1", "gn-2", "ex-1"]
  claimedChestBookIds: string[]; // e.g. ["gn", "ex"]
  currentBookId: string;
  currentChapterNum: number;
  currentLeagueId: LeagueId;
  currentRank: number;
  dailyGoalXP: number;
  dailyXP: number;
}

export interface UserProfile {
  name: string;
  language: AppLanguage;
  gender: AvatarGender;
  style: AvatarStyle;
  stats: UserStats;
  badges: Badge[];
  quests: Quest[];
  hasOnboarded: boolean;
}

export type AppViewMode = 
  | 'JOURNEY_PATH'
  | 'BIBLE_READER'
  | 'LEADERBOARD'
  | 'QUESTS'
  | 'SHOP'
  | 'BADGES';
