import React, { useEffect, useRef, useState } from 'react';
import type { FloatingCard, DifficultyLevel, GameModeType } from '../types';
import { soundService } from '../services/soundService';
import { Sparkles, Check, AlertCircle } from 'lucide-react';

interface PhysicsFieldProps {
  cards: FloatingCard[];
  targetPhraseId: string;
  difficulty: DifficultyLevel;
  gameMode: GameModeType;
  dropZoneRect: DOMRect | null;
  onDropMatch: (card: FloatingCard, isCorrect: boolean) => void;
}

export const PhysicsField: React.FC<PhysicsFieldProps> = ({
  cards,
  targetPhraseId,
  difficulty,
  dropZoneRect,
  onDropMatch
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [localCards, setLocalCards] = useState<FloatingCard[]>([]);
  const draggedCardIdRef = useRef<string | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; lastX: number; lastY: number }>({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Initialize and keep local cards synced with incoming cards prop
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();

    const initialized: FloatingCard[] = cards.map((c, i) => {
      const cardWidth = Math.min(width * 0.8, Math.max(180, c.displayText.length * 11 + 40));
      const cardHeight = 54;
      const angle = (Math.random() - 0.5) * 12;

      const cols = 2;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const startX = (col + 0.5) * (width / cols) - cardWidth / 2 + (Math.random() - 0.5) * 40;
      const startY = 60 + row * 70 + (Math.random() - 0.5) * 30;

      return {
        ...c,
        width: cardWidth,
        height: cardHeight,
        x: Math.max(10, Math.min(width - cardWidth - 10, c.x || startX)),
        y: Math.max(10, Math.min(height - cardHeight - 10, c.y || startY)),
        vx: c.vx || (Math.random() - 0.5) * 1.2,
        vy: c.vy || (Math.random() - 0.5) * 1.2,
        angle,
        vAngle: (Math.random() - 0.5) * 0.3,
        isDragging: false,
        status: 'IDLE' as const
      };
    });

    setLocalCards(initialized);
  }, [cards]);

  // Main 60FPS Physics Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (containerRef.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        const width = bounds.width;
        const height = bounds.height;

        setLocalCards(prevCards => {
          return prevCards.map(card => {
            if (card.isDragging) {
              const targetX = mousePosRef.current.x - card.width / 2;
              const targetY = mousePosRef.current.y - card.height / 2;
              const vx = (mousePosRef.current.x - mousePosRef.current.lastX) * 15;
              const vy = (mousePosRef.current.y - mousePosRef.current.lastY) * 15;

              return {
                ...card,
                x: targetX,
                y: targetY,
                vx,
                vy
              };
            }

            if (card.status === 'CORRECT') return card;

            let nextX = card.x + card.vx * delta * 60;
            let nextY = card.y + card.vy * delta * 60;
            let nextVx = card.vx * 0.985;
            let nextVy = card.vy * 0.985;
            let nextAngle = card.angle + card.vAngle;

            nextVy += Math.sin(now * 0.002 + card.x * 0.01) * 0.03;

            if (nextX < 10) {
              nextX = 10;
              nextVx = Math.abs(nextVx) * 0.7;
            } else if (nextX > width - card.width - 10) {
              nextX = width - card.width - 10;
              nextVx = -Math.abs(nextVx) * 0.7;
            }

            if (nextY < 10) {
              nextY = 10;
              nextVy = Math.abs(nextVy) * 0.7;
            } else if (nextY > height - card.height - 10) {
              nextY = height - card.height - 10;
              nextVy = -Math.abs(nextVy) * 0.7;
            }

            return {
              ...card,
              x: nextX,
              y: nextY,
              vx: nextVx,
              vy: nextVy,
              angle: nextAngle
            };
          });
        });
      }

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handlePointerDown = (cardId: string, e: React.PointerEvent) => {
    soundService.playClick();
    draggedCardIdRef.current = cardId;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const clientX = e.clientX;
      const clientY = e.clientY;
      mousePosRef.current = { x: clientX - rect.left, y: clientY - rect.top, lastX: clientX - rect.left, lastY: clientY - rect.top };
    }

    setLocalCards(prev =>
      prev.map(c => (c.id === cardId ? { ...c, isDragging: true } : c))
    );

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggedCardIdRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    mousePosRef.current = {
      lastX: mousePosRef.current.x,
      lastY: mousePosRef.current.y,
      x: curX,
      y: curY
    };
  };

  const handlePointerUp = (cardId: string) => {
    if (draggedCardIdRef.current !== cardId) return;
    draggedCardIdRef.current = null;

    const card = localCards.find(c => c.id === cardId);
    if (!card) return;

    let isDroppedInZone = false;
    if (dropZoneRect && containerRef.current) {
      const fieldRect = containerRef.current.getBoundingClientRect();
      const cardAbsX = fieldRect.left + card.x + card.width / 2;
      const cardAbsY = fieldRect.top + card.y + card.height / 2;

      if (
        cardAbsX >= dropZoneRect.left - 20 &&
        cardAbsX <= dropZoneRect.right + 20 &&
        cardAbsY >= dropZoneRect.top - 20 &&
        cardAbsY <= dropZoneRect.bottom + 40
      ) {
        isDroppedInZone = true;
      }
    }

    if (isDroppedInZone) {
      const isCorrect = card.phraseId === targetPhraseId;
      if (isCorrect) {
        soundService.playCorrect();
        setLocalCards(prev =>
          prev.map(c => (c.id === cardId ? { ...c, isDragging: false, status: 'CORRECT' } : c))
        );
        onDropMatch(card, true);
      } else {
        soundService.playWrong();
        setLocalCards(prev =>
          prev.map(c => (c.id === cardId ? { ...c, isDragging: false, status: 'WRONG' } : c))
        );
        onDropMatch(card, false);

        setTimeout(() => {
          setLocalCards(prev =>
            prev.map(c => (c.id === cardId ? { ...c, status: 'IDLE' } : c))
          );
        }, 800);
      }
    } else {
      setLocalCards(prev =>
        prev.map(c => (c.id === cardId ? { ...c, isDragging: false } : c))
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] md:h-[420px] rounded-3xl overflow-hidden bg-slate-950/80 backdrop-blur-xl border border-amber-500/20 shadow-2xl select-none"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-4 left-4 flex items-center gap-2 text-amber-400/70 text-xs font-semibold uppercase tracking-wider pointer-events-none">
        <Sparkles size={14} className="animate-spin-slow" />
        <span>Campo de Memorização • Arraste as Frases</span>
      </div>

      {localCards.map(card => {
        const isTarget = card.phraseId === targetPhraseId;
        const isEasyHighlight = difficulty === 'EASY' && isTarget;

        let cardBg = 'bg-gradient-to-r from-purple-950/90 via-slate-900/95 to-indigo-950/90';
        let borderColor = 'border-purple-500/40';
        let textColor = 'text-slate-100';
        let shadow = 'shadow-[0_8px_25px_rgba(0,0,0,0.5)]';

        if (card.status === 'CORRECT') {
          cardBg = 'bg-gradient-to-r from-emerald-600 to-teal-500';
          borderColor = 'border-emerald-300';
          textColor = 'text-white font-bold';
          shadow = 'shadow-[0_0_25px_rgba(16,185,129,0.8)]';
        } else if (card.status === 'WRONG') {
          cardBg = 'bg-gradient-to-r from-rose-700 to-red-600';
          borderColor = 'border-red-400';
          textColor = 'text-white font-bold';
          shadow = 'shadow-[0_0_25px_rgba(239,68,68,0.8)]';
        } else if (isEasyHighlight) {
          borderColor = 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse';
        }

        return (
          <div
            key={card.id}
            onPointerDown={e => handlePointerDown(card.id, e)}
            onPointerUp={() => handlePointerUp(card.id)}
            style={{
              transform: `translate3d(${card.x}px, ${card.y}px, 0px) rotate(${card.angle.toFixed(1)}deg) scale(${card.isDragging ? 1.08 : 1})`,
              touchAction: 'none',
              width: `${card.width}px`
            }}
            className={`absolute top-0 left-0 cursor-grab active:cursor-grabbing px-4 py-3 rounded-2xl border-2 ${cardBg} ${borderColor} ${textColor} ${shadow} backdrop-blur-md flex items-center justify-between gap-3 transition-transform duration-75 ${
              card.status === 'WRONG' ? 'animate-shake' : ''
            }`}
          >
            <span className="font-heading font-semibold text-sm md:text-base leading-snug tracking-wide pointer-events-none drop-shadow-md">
              {card.displayText}
            </span>

            {card.status === 'CORRECT' && (
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Check size={16} className="text-white" />
              </div>
            )}

            {card.status === 'WRONG' && (
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <AlertCircle size={16} className="text-white" />
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          20%, 60% { transform: translate3d(-8px, 0, 0) rotate(-4deg); }
          40%, 80% { transform: translate3d(8px, 0, 0) rotate(4deg); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};
