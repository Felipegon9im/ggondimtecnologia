import type { Song, UserStats, SongProgress } from '../types';
import { DEFAULT_SONGS } from './defaultSongs';

const PROFILE_KEY = 'louvor_puzzle_profile_v1';
const PROGRESS_KEY = 'louvor_puzzle_progress_v1';
const CUSTOM_SONGS_KEY = 'louvor_puzzle_custom_songs_v1';

const INITIAL_STATS: UserStats = {
  xp: 0,
  level: 1,
  totalSongsCompleted: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalAcertos: 0,
  totalErros: 0
};

class StorageService {
  public getUserStats(): UserStats {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading stats:', e);
    }
    return INITIAL_STATS;
  }

  public saveUserStats(stats: UserStats): void {
    try {
      const calculatedLevel = Math.max(1, Math.floor(stats.xp / 250) + 1);
      const updated = { ...stats, level: calculatedLevel };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving stats:', e);
    }
  }

  public getSongProgress(songId: string): SongProgress | null {
    try {
      const all = this.getAllProgress();
      return all[songId] || null;
    } catch (e) {
      return null;
    }
  }

  public getAllProgress(): Record<string, SongProgress> {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading progress:', e);
    }
    return {};
  }

  public saveSongProgress(progress: SongProgress): void {
    try {
      const all = this.getAllProgress();
      const existing = all[progress.songId];
      if (!existing || progress.bestXp > existing.bestXp) {
        all[progress.songId] = progress;
      } else {
        all[progress.songId] = {
          ...progress,
          bestXp: Math.max(existing.bestXp, progress.bestXp),
          bestCombo: Math.max(existing.bestCombo, progress.bestCombo),
          accuracy: Math.max(existing.accuracy, progress.accuracy),
          playCount: (existing.playCount || 0) + 1
        };
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    } catch (e) {
      console.warn('Error saving progress:', e);
    }
  }

  public getCustomSongs(): Song[] {
    try {
      const data = localStorage.getItem(CUSTOM_SONGS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading custom songs:', e);
    }
    return [];
  }

  public saveCustomSong(song: Song): void {
    try {
      const custom = this.getCustomSongs();
      const existingIndex = custom.findIndex(s => s.id === song.id);
      if (existingIndex >= 0) {
        custom[existingIndex] = song;
      } else {
        custom.push(song);
      }
      localStorage.setItem(CUSTOM_SONGS_KEY, JSON.stringify(custom));
    } catch (e) {
      console.warn('Error saving custom song:', e);
    }
  }

  public getAllSongs(): Song[] {
    const custom = this.getCustomSongs();
    return [...DEFAULT_SONGS, ...custom];
  }
}

export const storageService = new StorageService();
