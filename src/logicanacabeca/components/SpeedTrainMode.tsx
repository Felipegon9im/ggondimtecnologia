import React, { useState, useEffect } from 'react';
import type { UserProgress } from '../types';
import { audioService } from '../services/audioService';
import { RotateCcw, ArrowLeft, Trophy, Flame } from 'lucide-react';

interface SpeedTrainModeProps {
  progress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
  onBack: () => void;
}

interface Flashcard {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
}

const SPEED_CARDS: Flashcard[] = [
  { id: 's1', prompt: '∧ significa?', options: ['E (Conjunção)', 'OU (Disjunção)', 'NÃO (Negação)', 'SE... ENTÃO'], answer: 0 },
  { id: 's2', prompt: '∨ significa?', options: ['E', 'OU (Disjunção)', 'SE E SOMENTE SE', 'NÃO'], answer: 1 },
  { id: 's3', prompt: '→ significa?', options: ['E', 'OU', 'SE... ENTÃO (Condicional)', 'NÃO'], answer: 2 },
  { id: 's4', prompt: '↔ significa?', options: ['SE E SOMENTE SE (Bicondicional)', 'OU', 'NÃO', 'E'], answer: 0 },
  { id: 's5', prompt: '¬P significa?', options: ['Afirmação', 'Negação (NÃO P)', 'Dupla Condicional', 'Tautologia'], answer: 1 },

  // Macetes de valores lógicos rápidos
  { id: 's6', prompt: 'V ∧ F = ?', options: ['V', 'F'], answer: 1 },
  { id: 's7', prompt: 'V ∧ V = ?', options: ['V', 'F'], answer: 0 },
  { id: 's8', prompt: 'F ∨ F = ?', options: ['V', 'F'], answer: 1 },
  { id: 's9', prompt: 'V ∨ F = ?', options: ['V', 'F'], answer: 0 },
  { id: 's10', prompt: 'V → F = ?', options: ['V', 'F'], answer: 1 },
  { id: 's11', prompt: 'F → V = ?', options: ['V', 'F'], answer: 0 },
  { id: 's12', prompt: 'F → F = ?', options: ['V', 'F'], answer: 0 },
  { id: 's13', prompt: 'V ↔ V = ?', options: ['V', 'F'], answer: 0 },
  { id: 's14', prompt: 'F ↔ F = ?', options: ['V', 'F'], answer: 0 },
  { id: 's15', prompt: 'V ↔ F = ?', options: ['V', 'F'], answer: 1 },
  { id: 's16', prompt: 'Macete: "E = ?"', options: ['Basta UM', 'TODOS Verdadeiros', 'Vera Fischer', 'Diferentes'], answer: 1 },
  { id: 's17', prompt: 'Macete: "OU = ?"', options: ['Basta UM Verdadeiro', 'Todos Falsos', 'Iguais', 'Nenhum'], answer: 0 },
  { id: 's18', prompt: 'Macete: "Condicional SÓ É FALSA na...?"', options: ['F → F', 'Vera Fischer (V → F)', 'V ↔ V', 'F ∨ F'], answer: 1 }
];

export const SpeedTrainMode: React.FC<SpeedTrainModeProps> = ({
  progress,
  onSaveProgress,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);

  const card = SPEED_CARDS[currentIndex];

  useEffect(() => {
    if (isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isGameOver]);

  const handleTimeOut = () => {
    audioService.playWrong();
    setCombo(0);
    nextCard();
  };

  const handleSelectOption = (index: number) => {
    if (index === card.answer) {
      audioService.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore(prev => prev + 10 * newCombo);

      if (newCombo >= 5) {
        audioService.playStreak();
      }
    } else {
      audioService.playWrong();
      setCombo(0);
    }

    nextCard();
  };

  const nextCard = () => {
    if (currentIndex + 1 >= SPEED_CARDS.length) {
      finishGame();
    } else {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(6);
    }
  };

  const finishGame = () => {
    setIsGameOver(true);
    audioService.playLevelUp();

    const gainedXP = Math.round(score / 2);
    const updated = { ...progress };
    updated.stats.xp += gainedXP;
    updated.stats.dailyXP += gainedXP;
    updated.stats.level = Math.floor(updated.stats.xp / 100) + 1;
    onSaveProgress(updated);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setTimeLeft(6);
    setIsGameOver(false);
  };

  return (
    <div style={{ maxWidth: 650, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={() => { audioService.playClick(); onBack(); }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#9ca3af',
            padding: '8px 14px',
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontWeight: 800 }}>
            <Flame size={20} /> Combo x{combo}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#a78bfa', fontWeight: 800 }}>
            <Trophy size={20} /> {score} pts
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="glass-card" style={{ padding: 32, textAlign: 'center', border: '2px solid rgba(245, 158, 11, 0.4)' }}>
          {/* Timer Bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af', marginBottom: 6 }}>
              <span>PROVOCAÇÃO RÁPIDA ({currentIndex + 1}/{SPEED_CARDS.length})</span>
              <span style={{ color: timeLeft <= 2 ? '#ef4444' : '#f59e0b', fontWeight: 800 }}>⏱️ {timeLeft}s</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{
                  width: `${(timeLeft / 6) * 100}%`,
                  background: timeLeft <= 2 ? '#ef4444' : '#f59e0b'
                }}
              />
            </div>
          </div>

          {/* Flashcard Prompt */}
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: 32,
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 16,
            padding: 16
          }}>
            {card.prompt}
          </div>

          {/* Options Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: card.options.length === 2 ? '1fr 1fr' : '1fr 1fr',
            gap: 14
          }}>
            {card.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className="btn-3d amber"
                style={{ padding: '20px 16px', fontSize: '1.1rem' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>⚡</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
            Treino Concluído!
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: 20 }}>
            Você acumulou <strong>{score} pontos</strong> no Treino de Automatização!
          </p>

          <div style={{
            background: 'rgba(139, 92, 246, 0.15)',
            padding: 16,
            borderRadius: 12,
            marginBottom: 24,
            color: '#a78bfa',
            fontWeight: 700
          }}>
            + {Math.round(score / 2)} XP Adicionados à sua conta!
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleRestart} className="btn-3d amber" style={{ flex: 1 }}>
              <RotateCcw size={18} /> Jogar Novamente
            </button>
            <button onClick={onBack} className="btn-3d purple" style={{ flex: 1 }}>
              Voltar ao Painel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
