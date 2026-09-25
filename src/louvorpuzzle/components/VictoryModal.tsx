import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { Trophy, Star, Zap, Flame, RotateCcw, Music } from 'lucide-react';

interface VictoryModalProps {
  songTitle: string;
  xpEarned: number;
  accuracy: number;
  maxCombo: number;
  totalAcertos: number;
  totalErros: number;
  onReplay: () => void;
  onOpenLibrary: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  songTitle,
  xpEarned,
  accuracy,
  maxCombo,
  totalAcertos,
  totalErros,
  onReplay,
  onOpenLibrary
}) => {
  useEffect(() => {
    soundService.playComboFanfare();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#10b981', '#7c3aed']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#10b981', '#7c3aed']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const numStars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-lg bg-slate-950 border border-amber-400/50 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-center relative my-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-purple-600 to-indigo-900 mx-auto flex items-center justify-center text-slate-950 font-bold shadow-xl mb-4 animate-bounce">
          <Trophy size={42} className="text-amber-300" />
        </div>

        <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">
          LOUVOR CONCLUÍDO COM SUCESSO!
        </span>

        <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-4">
          {songTitle}
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map(starIdx => (
            <Star
              key={starIdx}
              size={36}
              className={`${
                starIdx <= numStars
                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                  : 'text-slate-800'
              } transition-transform hover:scale-110`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex flex-col items-center">
            <span className="text-xs font-bold text-purple-300 uppercase flex items-center gap-1">
              <Zap size={14} /> XP Ganho
            </span>
            <span className="font-heading font-black text-xl text-amber-400 mt-1">
              +{xpEarned} XP
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex flex-col items-center">
            <span className="text-xs font-bold text-purple-300 uppercase flex items-center gap-1">
              <Flame size={14} /> Maior Combo
            </span>
            <span className="font-heading font-black text-xl text-amber-400 mt-1">
              {maxCombo}x
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex flex-col items-center">
            <span className="text-xs font-bold text-purple-300 uppercase">
              Precisão
            </span>
            <span className="font-heading font-black text-xl text-emerald-400 mt-1">
              {Math.round(accuracy)}%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex flex-col items-center">
            <span className="text-xs font-bold text-purple-300 uppercase">
              Acertos / Erros
            </span>
            <span className="font-heading font-black text-xl text-white mt-1">
              {totalAcertos} / <span className="text-rose-400">{totalErros}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <button
            onClick={() => {
              soundService.playClick();
              onReplay();
            }}
            className="w-full py-3.5 rounded-2xl bg-slate-900 border border-amber-400/40 hover:border-amber-400 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RotateCcw size={16} /> <span>REPETIR LOUVOR</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onOpenLibrary();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95 transition-all"
          >
            <Music size={16} /> <span>ESCOLHER OUTRO LOUVOR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
