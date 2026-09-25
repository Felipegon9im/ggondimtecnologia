import React, { useEffect, useRef } from 'react';
import { Target, Sparkles, HelpCircle } from 'lucide-react';
import type { GameModeType } from '../types';

interface DropZoneProps {
  currentPhraseIndex: number;
  totalPhrases: number;
  expectedTextHint: string;
  gameMode: GameModeType;
  feedbackMessage: { text: string; type: 'SUCCESS' | 'WRONG' } | null;
  onUpdateRect: (rect: DOMRect) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  currentPhraseIndex,
  totalPhrases,
  expectedTextHint,
  gameMode,
  feedbackMessage,
  onUpdateRect
}) => {
  const zoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (zoneRef.current) {
        onUpdateRect(zoneRef.current.getBoundingClientRect());
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [onUpdateRect]);

  return (
    <div
      ref={zoneRef}
      className={`relative w-full max-w-2xl mx-auto p-5 md:p-6 rounded-3xl border-2 transition-all duration-300 backdrop-blur-xl ${
        feedbackMessage?.type === 'SUCCESS'
          ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)]'
          : feedbackMessage?.type === 'WRONG'
          ? 'bg-rose-950/80 border-rose-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]'
          : 'bg-purple-950/40 border-amber-400/40 hover:border-amber-400/80 shadow-[0_0_30px_rgba(124,58,237,0.25)]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Target size={18} />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              ÁREA DE ENCAIXE • PRÓXIMA FRASE ({currentPhraseIndex + 1}/{totalPhrases})
            </span>
            <span className="text-[11px] text-purple-200/60 font-medium">
              Arraste a peça correspondente ao tempo da música
            </span>
          </div>
        </div>

        {gameMode === 'MEMORIZATION' && (
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold flex items-center gap-1">
            <HelpCircle size={13} /> Modo Memorização
          </span>
        )}
      </div>

      <div className="min-h-[58px] flex items-center justify-center p-3 rounded-2xl bg-black/40 border border-dashed border-purple-400/30 text-center relative overflow-hidden">
        {feedbackMessage ? (
          <div
            className={`flex items-center gap-2 font-heading font-extrabold text-base md:text-lg animate-bounce ${
              feedbackMessage.type === 'SUCCESS' ? 'text-emerald-300' : 'text-rose-300'
            }`}
          >
            <Sparkles size={20} />
            <span>{feedbackMessage.text}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="font-heading font-semibold text-sm md:text-base text-purple-100/90 tracking-wide italic">
              "{expectedTextHint}"
            </span>
            <span className="text-xs text-amber-400/80 font-medium animate-pulse">
              🎯 Solte a frase correta aqui
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
