import React, { useState } from 'react';
import type { DuolingoLesson, UserProfile } from '../types';
import { LEVELS } from '../data/levelsData';
import { audioService } from '../services/audioService';
import { X, Heart, CheckCircle2, AlertTriangle, ArrowRight, ShoppingBag } from 'lucide-react';

interface DuolingoQuizModalProps {
  lesson: DuolingoLesson;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
  onOpenShop: () => void;
}

export const DuolingoQuizModal: React.FC<DuolingoQuizModalProps> = ({
  lesson,
  profile,
  onSaveProfile,
  onClose,
  onOpenShop
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    audioService.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === lesson.answer;
    setIsAnswered(true);
    setIsCorrect(correct);

    const updated = { ...profile };

    if (correct) {
      audioService.playCorrect();
      const gainedXP = 15;
      updated.stats.xp += gainedXP;
      updated.stats.dailyXP += gainedXP;
      updated.stats.quizzesCorrect += 1;

      // Update quest progress
      const q1 = updated.quests.find(q => q.id === 'q1');
      if (q1 && !q1.completed) {
        q1.current += gainedXP;
        if (q1.current >= q1.target) q1.completed = true;
      }

      // Unlock lesson ID
      if (!updated.completedLessonIds.includes(lesson.id)) {
        updated.completedLessonIds.push(lesson.id);
      }

      // Check level up
      const nextLevel = LEVELS.find(l => l.minXP <= updated.stats.xp && l.id > updated.stats.currentLevelId);
      if (nextLevel) {
        updated.stats.currentLevelId = nextLevel.id;
        if (!updated.unlockedLevelIds.includes(nextLevel.id)) {
          updated.unlockedLevelIds.push(nextLevel.id);
        }
        audioService.playLevelUp();
      }
    } else {
      audioService.playWrong();
      updated.stats.hearts = Math.max(0, updated.stats.hearts - 1);
    }

    onSaveProfile(updated);
  };

  const handleNext = () => {
    audioService.playHarpChime();
    setIsCompleted(true);
  };

  return (
    <div className="modal-overlay" style={{ padding: 0 }}>
      {/* Quiz Modal Outer Container */}
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#0d0914',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header Bar: Exit Button, Progress Bar & Hearts Counter */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          maxWidth: 850,
          width: '100%',
          margin: '0 auto'
        }}>
          {/* Exit X */}
          <button
            onClick={() => setShowExitConfirm(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={24} />
          </button>

          {/* Progress Bar */}
          <div className="progress-bar-container" style={{ flex: 1 }}>
            <div 
              className="progress-bar-fill"
              style={{ width: isCompleted ? '100%' : isAnswered ? '80%' : '40%' }}
            />
          </div>

          {/* Hearts Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#ef4444',
            fontWeight: 800,
            fontSize: '1rem'
          }}>
            <Heart size={22} fill="#ef4444" />
            <span>{profile.stats.hearts}</span>
          </div>
        </div>

        {/* Quiz Body Content */}
        {!isCompleted ? (
          profile.stats.hearts > 0 ? (
            <div style={{
              flex: 1,
              maxWidth: 680,
              width: '100%',
              margin: '0 auto',
              padding: '24px 20px 140px 20px',
              overflowY: 'auto'
            }}>
              {/* Mascot Speech Bubble */}
              <div className="mascot-bubble">
                <div style={{ fontWeight: 800, color: '#fbbf24', marginBottom: 4 }}>
                  💬 DICA DO MASCOTE PEREGRINO:
                </div>
                {lesson.mascotTip}
              </div>

              {/* Question Title */}
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 24 }}>
                {lesson.question}
              </h3>

              {/* Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {lesson.options.map((opt, idx) => {
                  let border = '2px solid rgba(255,255,255,0.12)';
                  let bg = 'rgba(255,255,255,0.03)';
                  let textColor = '#f3f4f6';

                  if (selectedOption === idx) {
                    border = '2px solid #fbbf24';
                    bg = 'rgba(245, 158, 11, 0.2)';
                  }

                  if (isAnswered) {
                    if (idx === lesson.answer) {
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
                        padding: '16px 20px',
                        borderRadius: 16,
                        border,
                        background: bg,
                        color: textColor,
                        fontWeight: 700,
                        fontSize: '1rem',
                        textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        transition: 'all 0.15s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    >
                      <span style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
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
            </div>
          ) : (
            /* Out of Hearts View */
            <div style={{
              flex: 1,
              maxWidth: 540,
              margin: '0 auto',
              padding: 32,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 12 }}>💔</div>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', marginBottom: 8 }}>
                Você ficou sem corações!
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: 24, lineHeight: 1.5 }}>
                Recarregue seus corações na Loja por XP para continuar praticando suas lições bíblicas.
              </p>

              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                <button
                  onClick={() => { onClose(); onOpenShop(); }}
                  className="btn-3d gold"
                  style={{ flex: 1 }}
                >
                  <ShoppingBag size={18} /> Loja do Reino
                </button>

                <button
                  onClick={onClose}
                  className="btn-3d purple"
                  style={{ flex: 1 }}
                >
                  Voltar à Trilha
                </button>
              </div>
            </div>
          )
        ) : (
          /* Lesson Completed Celebration View */
          <div style={{
            flex: 1,
            maxWidth: 540,
            margin: '0 auto',
            padding: 32,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '4.5rem', marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: 8 }}>
              Lição Concluída!
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: 24 }}>
              Você ganhou <strong>+15 XP</strong> e fortaleceu seu entendimento na Palavra!
            </p>

            <button
              onClick={onClose}
              className="btn-3d gold"
              style={{ width: '100%', fontSize: '1.1rem' }}
            >
              Continuar a Jornada
            </button>
          </div>
        )}

        {/* Duolingo Fixed Bottom Footer Bar */}
        {!isCompleted && profile.stats.hearts > 0 && (
          <div className={`duolingo-quiz-footer ${isAnswered ? (isCorrect ? 'duolingo-footer-correct' : 'duolingo-footer-wrong') : 'duolingo-footer-default'}`}>
            {isAnswered ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isCorrect ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                    {isCorrect ? 'Incrível! +15 XP' : 'Que pena! -1 ❤️'}
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 2 }}>
                    {lesson.explanation}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="btn-3d gold"
                  style={{ padding: '12px 24px' }}
                >
                  CONTINUAR <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="btn-3d gold"
                  style={{ width: '100%', opacity: selectedOption === null ? 0.5 : 1 }}
                >
                  VERIFICAR RESPOSTA
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exit Confirmation Dialog */}
        {showExitConfirm && (
          <div className="modal-overlay">
            <div className="glass-card" style={{ maxWidth: 420, width: '100%', textAlign: 'center', padding: 28 }}>
              <h3 style={{ color: '#ffffff', fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>
                Sair da lição?
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: 20 }}>
                Se você sair agora, perderá o progresso desta lição.
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowExitConfirm(false)} className="btn-3d purple" style={{ flex: 1 }}>
                  Continuar Lição
                </button>
                <button onClick={onClose} className="btn-3d rose" style={{ flex: 1 }}>
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
