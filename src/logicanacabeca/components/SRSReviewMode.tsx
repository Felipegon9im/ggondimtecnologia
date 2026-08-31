import React, { useState } from 'react';
import type { UserProgress, Question } from '../types';
import { QUESTIONS } from '../data/questionsData';
import { SRSEngine } from '../services/srsEngine';
import { audioService } from '../services/audioService';
import { RotateCcw, Check, AlertTriangle, ArrowLeft } from 'lucide-react';

interface SRSReviewModeProps {
  progress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
  onBack: () => void;
}

export const SRSReviewMode: React.FC<SRSReviewModeProps> = ({
  progress,
  onSaveProgress,
  onBack
}) => {
  const dueQuestionIds = SRSEngine.getDueReviewQuestionIds(progress.srsItems);
  const dueQuestions = QUESTIONS.filter(q => dueQuestionIds.includes(q.id));

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentQ: Question = dueQuestions[currentIndex] || QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    audioService.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === currentQ.answer;
    setIsAnswered(true);
    setIsCorrect(correct);

    const updated = { ...progress };

    if (correct) {
      audioService.playCorrect();
      updated.stats.xp += 15;
      updated.stats.dailyXP += 15;
      updated.stats.correctAnswers += 1;
    } else {
      audioService.playWrong();
    }

    updated.stats.questionsAnswered += 1;

    const currentSRS = updated.srsItems[currentQ.id];
    updated.srsItems[currentQ.id] = SRSEngine.processAnswer(currentSRS, currentQ.id, correct);

    onSaveProgress(updated);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentIndex + 1 < dueQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (dueQuestions.length === 0 || currentIndex >= dueQuestions.length) {
    return (
      <div className="glass-card" style={{ maxWidth: 600, margin: '0 auto', padding: 36, textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
          Todas as revisões concluídas!
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: 24 }}>
          Sua memória de longo prazo está em dia. Volte amanhã para novas revisões agendadas pelo algoritmo SRS.
        </p>
        <button onClick={onBack} className="btn-3d purple" style={{ width: '100%' }}>
          Voltar ao Painel
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Navigation Bar */}
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

        <div style={{
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          padding: '6px 14px',
          borderRadius: 20,
          color: '#a78bfa',
          fontWeight: 800,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <RotateCcw size={16} /> Revisão Agendada ({currentIndex + 1}/{dueQuestions.length})
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card" style={{ padding: 28 }}>
        <p style={{
          color: '#ffffff',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          marginBottom: 24,
          background: 'rgba(0,0,0,0.3)',
          padding: 20,
          borderRadius: 14
        }}>
          {currentQ.question}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {currentQ.options.map((opt, idx) => {
            let border = '1px solid rgba(255,255,255,0.1)';
            let bg = 'rgba(255,255,255,0.03)';
            let textColor = '#f3f4f6';

            if (selectedOption === idx) {
              border = '2px solid #8b5cf6';
              bg = 'rgba(139, 92, 246, 0.15)';
            }

            if (isAnswered) {
              if (idx === currentQ.answer) {
                border = '2px solid #10b981';
                bg = 'rgba(16, 185, 129, 0.2)';
                textColor = '#34d399';
              } else if (selectedOption === idx) {
                border = '2px solid #ef4444';
                bg = 'rgba(239, 68, 68, 0.2)';
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
                  gap: 12
                }}
              >
                <span style={{
                  width: 30,
                  height: 30,
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

        {/* Feedback Banner */}
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
              {isCorrect ? 'Acertou! A próxima revisão foi adiada para mais tarde.' : 'Errou! A questão voltará em breve.'}
            </div>
            <p style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="btn-3d purple"
            style={{ width: '100%', opacity: selectedOption === null ? 0.5 : 1 }}
          >
            Confirmar Resposta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-3d emerald"
            style={{ width: '100%' }}
          >
            Próxima da Revisão
          </button>
        )}
      </div>
    </div>
  );
};
