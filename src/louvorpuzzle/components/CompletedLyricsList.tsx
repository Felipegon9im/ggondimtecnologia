import React from 'react';
import type { LyricPhrase } from '../types';
import { Check, Music } from 'lucide-react';

interface CompletedLyricsListProps {
  completedPhrases: LyricPhrase[];
  currentPhraseIndex: number;
  totalPhrases: number;
}

export const CompletedLyricsList: React.FC<CompletedLyricsListProps> = ({
  completedPhrases,
  totalPhrases
}) => {
  if (completedPhrases.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-4 p-4 rounded-3xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Music size={14} />
          <span>Sequência da Letra ({completedPhrases.length}/{totalPhrases})</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
        {completedPhrases.map((phrase, idx) => (
          <div
            key={phrase.id}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900/90 border border-emerald-500/40 text-emerald-100 font-heading text-sm md:text-base font-semibold shadow-sm animate-fade-in"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span>{phrase.text}</span>
            </div>
            <Check size={16} className="text-emerald-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
