import React, { useState } from 'react';
import type { FloatingCard, DifficultyLevel } from '../types';
import { soundService } from '../services/soundService';
import { Sparkles, Check, AlertCircle, GripVertical, Pointer } from 'lucide-react';

interface PhraseBoardProps {
  cards: FloatingCard[];
  targetPhraseId: string;
  difficulty: DifficultyLevel;
  dropZoneRect: DOMRect | null;
  onDropMatch: (card: FloatingCard, isCorrect: boolean) => void;
}

export const PhraseBoard: React.FC<PhraseBoardProps> = ({
  cards,
  targetPhraseId,
  difficulty,
  dropZoneRect,
  onDropMatch
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [draggedCard, setDraggedCard] = useState<FloatingCard | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Direct Click to Place / Select Handler
  const handleCardClick = (card: FloatingCard) => {
    soundService.playClick();
    setSelectedCardId(card.id);

    const isCorrect = card.phraseId === targetPhraseId;
    if (isCorrect) {
      soundService.playCorrect();
      onDropMatch(card, true);
    } else {
      soundService.playWrong();
      onDropMatch(card, false);
      setTimeout(() => setSelectedCardId(null), 800);
    }
  };

  // Touch & Pointer Drag Handlers
  const handlePointerDown = (card: FloatingCard, e: React.PointerEvent) => {
    e.stopPropagation();
    soundService.playClick();
    setDraggedCard(card);
    setDragPos({ x: e.clientX, y: e.clientY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggedCard) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggedCard) return;
    const card = draggedCard;
    setDraggedCard(null);

    // Check if released over DropZone
    let isDroppedInZone = false;
    if (dropZoneRect) {
      const dropX = e.clientX;
      const dropY = e.clientY;

      if (
        dropX >= dropZoneRect.left - 20 &&
        dropX <= dropZoneRect.right + 20 &&
        dropY >= dropZoneRect.top - 20 &&
        dropY <= dropZoneRect.bottom + 40
      ) {
        isDroppedInZone = true;
      }
    }

    if (isDroppedInZone) {
      const isCorrect = card.phraseId === targetPhraseId;
      if (isCorrect) {
        soundService.playCorrect();
        onDropMatch(card, true);
      } else {
        soundService.playWrong();
        onDropMatch(card, false);
      }
    } else {
      // If tapped in place without drag, trigger click match
      handleCardClick(card);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-2 p-5 md:p-6 rounded-3xl bg-slate-950/80 border border-amber-500/20 backdrop-blur-xl shadow-2xl relative select-none">
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={16} />
          <span>Quadro Estático de Frases • Clique ou Arraste a Peça</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-purple-300/60 font-medium">
          <Pointer size={14} /> <span>Toque ou arraste para encaixar</span>
        </div>
      </div>

      {/* Grid Board of Static Phrase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {cards.map((card, idx) => {
          const isTarget = card.phraseId === targetPhraseId;
          const isEasyHighlight = difficulty === 'EASY' && isTarget;
          const isSelected = selectedCardId === card.id;

          let cardBg = 'bg-gradient-to-r from-purple-950/90 via-slate-900/95 to-indigo-950/90 hover:from-purple-900/90 hover:to-indigo-900/90';
          let borderColor = 'border-purple-500/30 hover:border-amber-400';
          let textColor = 'text-slate-100';
          let shadow = 'shadow-[0_4px_15px_rgba(0,0,0,0.4)]';

          if (card.status === 'CORRECT') {
            cardBg = 'bg-gradient-to-r from-emerald-600 to-teal-500';
            borderColor = 'border-emerald-300';
            textColor = 'text-white font-bold';
            shadow = 'shadow-[0_0_20px_rgba(16,185,129,0.7)]';
          } else if (card.status === 'WRONG' || (isSelected && !isTarget)) {
            cardBg = 'bg-gradient-to-r from-rose-700 to-red-600';
            borderColor = 'border-red-400';
            textColor = 'text-white font-bold';
            shadow = 'shadow-[0_0_20px_rgba(239,68,68,0.7)]';
          } else if (isEasyHighlight) {
            borderColor = 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse';
          }

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              onPointerDown={e => handlePointerDown(card, e)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{ touchAction: 'none' }}
              className={`group cursor-pointer p-4 rounded-2xl border-2 ${cardBg} ${borderColor} ${textColor} ${shadow} backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-200 active:scale-98 hover:scale-[1.015] ${
                card.status === 'WRONG' ? 'animate-shake' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-xl bg-purple-900/50 border border-purple-400/30 text-amber-300 text-xs font-mono font-extrabold flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>

                <span className="font-heading font-semibold text-sm md:text-base leading-snug tracking-wide truncate drop-shadow-md">
                  {card.displayText}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {card.status === 'CORRECT' ? (
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Check size={18} className="text-white" />
                  </div>
                ) : card.status === 'WRONG' ? (
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <AlertCircle size={18} className="text-white" />
                  </div>
                ) : (
                  <GripVertical size={18} className="text-purple-400/50 group-hover:text-amber-400 transition-colors" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Dragged Tile Overlay */}
      {draggedCard && (
        <div
          style={{
            position: 'fixed',
            left: `${dragPos.x - 120}px`,
            top: `${dragPos.y - 25}px`,
            zIndex: 9999,
            pointerEvents: 'none',
            transform: 'scale(1.05)'
          }}
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-heading font-black text-base shadow-[0_0_30px_rgba(245,158,11,0.8)] border-2 border-white flex items-center gap-2"
        >
          <Pointer size={18} />
          <span>{draggedCard.displayText}</span>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate3d(0, 0, 0); }
          20%, 60% { transform: translate3d(-6px, 0, 0); }
          40%, 80% { transform: translate3d(6px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};
