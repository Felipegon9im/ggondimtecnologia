import React from 'react';
import { Play, Music, Trophy, Settings, Sparkles, Flame, Zap } from 'lucide-react';
import { soundService } from '../services/soundService';

interface WelcomeScreenProps {
  onStartGame: () => void;
  onOpenLibrary: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGame,
  onOpenLibrary,
  onOpenStats,
  onOpenSettings
}) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden">
      {/* Background Floating Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Title Hero Card */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-purple-600 to-indigo-900 flex items-center justify-center text-white shadow-[0_0_50px_rgba(245,158,11,0.5)] mb-6 animate-pulse">
          <Music size={48} className="text-amber-300 drop-shadow-md" />
        </div>

        <span className="px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Sparkles size={14} /> Memorização Musical Gamificada
        </span>

        <h1 className="font-heading font-black text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-200 to-white tracking-tight leading-tight mb-3">
          LOUVOR PUZZLE
        </h1>

        <p className="text-base md:text-xl text-purple-200/80 font-medium max-w-lg mb-8 leading-relaxed">
          Aprenda e memorize as letras dos seus louvores preferidos através de um quebra-cabeça físico sincronizado com a música.
        </p>

        {/* Action Buttons Stack */}
        <div className="flex flex-col w-full max-w-sm gap-3.5 mb-10">
          <button
            onClick={() => {
              soundService.playClick();
              onStartGame();
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(245,158,11,0.6)] active:scale-95 transition-all"
          >
            <Play size={22} fill="currentColor" className="ml-1" />
            <span>COMEÇAR JOGO</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onOpenLibrary();
            }}
            className="w-full py-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-white font-extrabold text-sm flex items-center justify-center gap-2.5 backdrop-blur-md active:scale-95 transition-all"
          >
            <Music size={18} className="text-amber-400" />
            <span>MEUS LOUVORES</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundService.playClick();
                onOpenStats();
              }}
              className="py-3 rounded-2xl bg-slate-900/90 border border-purple-500/30 hover:border-amber-400 text-purple-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Trophy size={16} className="text-amber-400" />
              <span>PROGRESSÃO</span>
            </button>

            <button
              onClick={() => {
                soundService.playClick();
                onOpenSettings();
              }}
              className="py-3 rounded-2xl bg-slate-900/90 border border-purple-500/30 hover:border-amber-400 text-purple-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Settings size={16} className="text-purple-400" />
              <span>CONFIGURAÇÕES</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Zap size={14} className="text-amber-400" /> Física Google Gravity
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-orange-400" /> Sincronismo por Timestamps
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles size={14} className="text-emerald-400" /> Modo Memorização
          </span>
        </div>
      </div>
    </div>
  );
};
