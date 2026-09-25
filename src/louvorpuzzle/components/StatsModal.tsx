import React from 'react';
import type { UserStats } from '../types';
import { Trophy, Zap, Flame, CheckCircle, Award, X } from 'lucide-react';

interface StatsModalProps {
  stats: UserStats;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose }) => {
  const currentLevelXp = (stats.level - 1) * 250;
  const progressInLevel = stats.xp - currentLevelXp;
  const levelPercent = Math.min(100, Math.max(0, (progressInLevel / 250) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-950 border border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <Trophy size={24} />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Minha Progressão
            </h2>
            <p className="text-xs text-purple-300/70">
              Estatísticas da sua caminhada no Louvor Puzzle
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950/50 border border-amber-400/40 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-black font-heading text-xl flex items-center justify-center shadow-lg">
              Nv. {stats.level}
            </div>
            <div>
              <h4 className="font-heading font-extrabold text-base text-white">
                Peregrino da Adoração
              </h4>
              <p className="text-xs text-amber-400 font-mono">
                {stats.xp} XP Total
              </p>
            </div>
          </div>

          <Award size={32} className="text-amber-400 opacity-80" />
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5 font-mono">
            <span>Progresso Nível {stats.level}</span>
            <span>{progressInLevel} / 250 XP</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${levelPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <CheckCircle size={22} className="text-emerald-400 mb-1" />
            <span className="text-xs font-bold text-slate-400 uppercase">Louvores Concluídos</span>
            <span className="font-heading font-black text-xl text-white mt-1">
              {stats.totalSongsCompleted}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Flame size={22} className="text-amber-400 mb-1" />
            <span className="text-xs font-bold text-slate-400 uppercase">Maior Sequência</span>
            <span className="font-heading font-black text-xl text-amber-400 mt-1">
              {stats.bestStreak}x
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Zap size={22} className="text-purple-400 mb-1" />
            <span className="text-xs font-bold text-slate-400 uppercase">Total de Acertos</span>
            <span className="font-heading font-black text-xl text-purple-300 mt-1">
              {stats.totalAcertos}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Trophy size={22} className="text-amber-400 mb-1" />
            <span className="text-xs font-bold text-slate-400 uppercase">Pontuação XP</span>
            <span className="font-heading font-black text-xl text-amber-400 mt-1">
              {stats.xp}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-white hover:border-amber-400 transition-all"
        >
          FECHAR
        </button>
      </div>
    </div>
  );
};
