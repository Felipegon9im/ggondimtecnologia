export type DifficultyLevel = 'EASY' | 'NORMAL' | 'HARD';
export type GameModeType = 'STANDARD' | 'MEMORIZATION';

export interface LyricPhrase {
  id: string;
  text: string;
  start: number; // in seconds
  end: number;   // in seconds
  isDistractor?: boolean; // false distractor phrase for difficulty
  clozeText?: string;     // text with blanks for Memorização mode
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  category: 'ADORAÇÃO' | 'LOUVOR' | 'HINO' | 'POPULAR';
  coverGradient: string;
  audioUrl: string;
  duration: number; // in seconds
  phrases: LyricPhrase[];
  isCustom?: boolean;
}

export interface SongProgress {
  songId: string;
  completed: boolean;
  bestXp: number;
  bestCombo: number;
  accuracy: number; // percentage
  playCount: number;
  lastPlayedAt: string;
}

export interface UserStats {
  xp: number;
  level: number;
  totalSongsCompleted: number;
  currentStreak: number;
  bestStreak: number;
  totalAcertos: number;
  totalErros: number;
}

export interface FloatingCard {
  id: string;
  phraseId: string;
  text: string;
  displayText: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  width: number;
  height: number;
  isDragging: boolean;
  status: 'IDLE' | 'CORRECT' | 'WRONG';
  isDistractor?: boolean;
}
