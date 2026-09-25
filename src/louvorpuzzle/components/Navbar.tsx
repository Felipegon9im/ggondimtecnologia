import React from 'react';
import { Flame, Zap, Music, Trophy, Settings, HelpCircle, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundService } from '../services/soundService';

interface NavbarProps {
  songTitle: string;
  currentTimeFormatted: string;
  durationFormatted: string;
  streakCombo: number;
  xp: number;
  progressPercent: number;
  onOpenLibrary: () => void;
  onOpenAiSearch: () => void;
  onOpenSettings: () => void;
  onOpenStats: () => void;
  onOpenSyncEditor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  songTitle,
  currentTimeFormatted,
  durationFormatted,
  streakCombo,
  xp,
  progressPercent,
  onOpenLibrary,
  onOpenAiSearch,
  onOpenSettings,
  onOpenStats,
  onOpenSyncEditor
}) => {
  const [isMuted, setIsMuted] = React.useState(soundService.getMuted());

  const handleToggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 border-b border-amber-500/20 backdrop-blur-xl px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Song Name */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-purple-600 to-indigo-900 flex items-center justify-center text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              <Music size={22} />
            </div>
            <div>
              <h1 className="font-heading font-black text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-200 to-white tracking-wide">
                LOUVOR PUZZLE
              </h1>
              <p className="text-xs text-amber-400/80 font-bold truncate max-w-[200px] md:max-w-[260px]">
                🎵 {songTitle}
              </p>
            </div>
          </div>

          {/* Quick Actions (Mobile) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAiSearch}
              className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1"
            >
              <Sparkles size={16} />
            </button>
            <button
              onClick={onOpenLibrary}
              className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-bold flex items-center gap-1"
            >
              <Music size={16} />
            </button>
          </div>
        </div>

        {/* Stats HUD Bar */}
        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto max-w-full py-1">
          {/* Time Counter */}
          <div className="px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 shrink-0">
            <span>⏱ {currentTimeFormatted} / {durationFormatted}</span>
          </div>

          {/* Streak Combo */}
          <div className={`px-3 py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 shrink-0 transition-transform ${
            streakCombo >= 5 ? 'bg-orange-950/90 border-orange-500 text-orange-400 animate-bounce' : 'bg-slate-900/90 border-slate-700 text-amber-400'
          }`}>
            <Flame size={15} fill="currentColor" />
            <span>Sequência: {streakCombo}</span>
          </div>

          {/* XP Counter */}
          <div className="px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/40 text-xs font-bold text-purple-300 flex items-center gap-1.5 shrink-0">
            <Zap size={15} fill="currentColor" />
            <span>{xp} XP</span>
          </div>

          {/* Progress Bar Container */}
          <div className="flex items-center gap-2 min-w-[120px] md:min-w-[160px] shrink-0">
            <div className="flex-1 h-3 rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-300 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {Math.round(progressPercent)}%
            </span>
          </div>
        </div>

        {/* Navigation Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenAiSearch}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-600/20 border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-white text-xs font-extrabold flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all"
          >
            <Sparkles size={15} /> <span>IA Buscar</span>
          </button>

          <button
            onClick={onOpenLibrary}
            className="px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Music size={15} /> <span>Louvores</span>
          </button>

          <button
            onClick={onOpenSyncEditor}
            className="px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <HelpCircle size={15} /> <span>Editor</span>
          </button>

          <button
            onClick={onOpenStats}
            className="px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Trophy size={15} /> <span>Progresso</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-white text-xs font-bold transition-all"
            title="Dificuldade e Modo"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-white text-xs font-bold transition-all"
            title={isMuted ? 'Ativar Efeitos' : 'Mutar Efeitos'}
          >
            {isMuted ? <VolumeX size={18} className="text-rose-400" /> : <Volume2 size={18} className="text-emerald-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
