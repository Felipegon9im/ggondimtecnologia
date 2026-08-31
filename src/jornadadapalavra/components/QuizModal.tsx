import React, { useState } from 'react';
import type { UserProfile, Devotional } from '../types';
import { LEVELS } from '../data/levelsData';
import { audioService } from '../services/audioService';
import { X, Check, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

interface QuizModalProps {
  devotional: Devotional;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  devotional,
  profile,
  onSaveProfile,
  onClose
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    audioService.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === devotional.quizAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    const updated = { ...profile };

    if (correct) {
      audioService.playCorrect();
      const gainedXP = 15;
      updated.stats.xp += gainedXP;
      updated.stats.dailyXP += gainedXP;
      updated.stats.quizzesCorrect += 1;

      // Check level evolution
      const nextLevel = LEVELS.find(l => l.minXP <= updated.stats.xp && l.id > updated.stats.currentLevelId);
      if (nextLevel) {
        updated.stats.currentLevelId = nextLevel.id;
        if (!updated.unlockedLevelIds.includes(nextLevel.id)) {
          updated.unlockedLevelIds.push(nextLevel.id);
        }
        audioService.playLevelUp();
      }

      // Check badges
      if (!updated.completedDevotionalIds.includes(devotional.id)) {
        updated.completedDevotionalIds.push(devotional.id);
        updated.stats.devotionalsCompleted += 1;
      }
      const firstBadge = updated.badges.find(b => b.id === 'first_devotional');
      if (firstBadge && !firstBadge.unlocked) firstBadge.unlocked = true;

      const masterBadge = updated.badges.find(b => b.id === 'quiz_master');
      if (masterBadge && updated.stats.quizzesCorrect >= 10) masterBadge.unlocked = true;
    } else {
      audioService.playWrong();
    }

    onSaveProfile(updated);
  };

  const handleFinish = () => {
    audioService.playHarpChime();
    setIsCompleted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 580,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: 28,
        position: 'relative',
        border: '2px solid rgba(245, 158, 11, 0.4)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#9ca3af',
            borderRadius: 10,
            padding: 6,
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {!isCompleted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbbf24', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 12 }}>
              <HelpCircle size={18} /> QUIZ DIÁRIO • {devotional.passage}
            </div>

            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
              {devotional.quizQuestion}
            </h3>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {devotional.quizOptions.map((opt, idx) => {
                let border = '1px solid rgba(255,255,255,0.1)';
                let bg = 'rgba(255,255,255,0.03)';
                let textColor = '#f3f4f6';

                if (selectedOption === idx) {
                  border = '2px solid #f59e0b';
                  bg = 'rgba(245, 158, 11, 0.2)';
                }

                if (isAnswered) {
                  if (idx === devotional.quizAnswer) {
                    border = '2px solid #10b981';
                    bg = 'rgba(16, 185, 129, 0.25)';
                    textColor = '#34d399';
                  } else if (selectedOption === idx) {
                    border = '2px solid #ef4444';
                    bg = 'rgba(239, 68, 68, 0.25)';
                    textColor = '#f87171';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 12,
                      border,
                      background: bg,
                      color: textColor,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textAlign: 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Feedback Banner */}
            {isAnswered && (
              <div style={{
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
                background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: isCorrect ? '#34d399' : '#f87171', fontWeight: 800, fontSize: '1.05rem', marginBottom: 6 }}>
                  {isCorrect ? <Check size={20} /> : <AlertTriangle size={20} />}
                  {isCorrect ? 'Resposta Correta! (+15 XP)' : 'Quase lá! Vamos reforçar o conceito:'}
                </div>
                <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.4 }}>
                  {devotional.quizExplanation}
                </p>
              </div>
            )}

            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="btn-3d gold"
                style={{ width: '100%', opacity: selectedOption === null ? 0.5 : 1 }}
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="btn-3d emerald"
                style={{ width: '100%' }}
              >
                Concluir Desafio <ArrowRight size={18} />
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginBottom: 8 }}>
              Glória a Deus!
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: 24 }}>
              Você concluiu sua missão diária e fortaleceu seu espírito na Palavra.
            </p>

            <button
              onClick={onClose}
              className="btn-3d gold"
              style={{ width: '100%' }}
            >
              Voltar ao Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
