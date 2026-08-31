import React, { useState, useEffect } from 'react';
import type { UserProgress, Question } from '../types';
import { QUESTIONS } from '../data/questionsData';
import { audioService } from '../services/audioService';
import { SRSEngine } from '../services/srsEngine';
import { Clock, Check, AlertTriangle, ArrowLeft, Filter, Lightbulb } from 'lucide-react';

interface ExamModeProps {
  progress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
  onBack: () => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({
  progress,
  onSaveProgress,
  onBack
}) => {
  const [selectedBanca, setSelectedBanca] = useState<string>('TODAS');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const filteredQuestions = QUESTIONS.filter(q => {
    if (selectedBanca === 'TODAS') return true;
    return q.banca === selectedBanca;
  });

  const currentQ: Question = filteredQuestions[currentIndex] || QUESTIONS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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
      updated.stats.xp += 20;
      updated.stats.dailyXP += 20;
      updated.stats.correctAnswers += 1;
    } else {
      audioService.playWrong();
    }

    updated.stats.questionsAnswered += 1;
    const currentSRS = updated.srsItems[currentQ.id];
    updated.srsItems[currentQ.id] = SRSEngine.processAnswer(currentSRS, currentQ.id, correct);

    onSaveProgress(updated);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div style={{ maxWidth: 750, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
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

        {/* Timer Pill */}
        <div style={{
          background: 'rgba(236, 72, 153, 0.15)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          padding: '6px 14px',
          borderRadius: 20,
          color: '#ec4899',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <Clock size={16} /> {formatTimer(seconds)}
        </div>

        {/* Banca Filter Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Filter size={16} color="#9ca3af" />
          <select 
            value={selectedBanca}
            onChange={(e) => {
              setSelectedBanca(e.target.value);
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <option value="TODAS">Todas as Bancas</option>
            <option value="Cebraspe">Cebraspe / CESPE</option>
            <option value="FCC">FCC (Fundação Carlos Chagas)</option>
            <option value="FGV">FGV (Fundação Getulio Vargas)</option>
            <option value="Vunesp">Vunesp</option>
          </select>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: 'rgba(139, 92, 246, 0.2)',
              color: '#a78bfa',
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 800
            }}>
              BANCA {currentQ.banca || 'SIMULADO'} {currentQ.concursoYear ? `(${currentQ.concursoYear})` : ''}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Questão {currentIndex + 1} de {filteredQuestions.length}</span>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
            Dificuldade: {'★'.repeat(currentQ.difficulty)}
          </span>
        </div>

        <p style={{
          color: '#ffffff',
          fontSize: '1.05rem',
          lineHeight: 1.6,
          marginBottom: 24,
          whiteSpace: 'pre-line',
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
              border = '2px solid #ec4899';
              bg = 'rgba(236, 72, 153, 0.15)';
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

        {/* Tip Box if present */}
        {currentQ.tip && !isAnswered && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.85rem',
            color: '#f59e0b'
          }}>
            <Lightbulb size={18} /> Dica de Prova: {currentQ.tip}
          </div>
        )}

        {/* Feedback & Detailed Explanation */}
        {isAnswered && (
          <div style={{
            padding: 18,
            borderRadius: 14,
            marginBottom: 24,
            background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: isCorrect ? '#34d399' : '#f87171', fontWeight: 800, fontSize: '1.1rem', marginBottom: 8 }}>
              {isCorrect ? <Check size={22} /> : <AlertTriangle size={22} />}
              {isCorrect ? 'Resposta Correta! (+20 XP)' : 'Resposta Incorreta.'}
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', marginBottom: 4 }}>
              EXPLICAÇÃO PASSO A PASSO DA BANCA:
            </div>
            <p style={{ color: '#d1d5db', fontSize: '0.92rem', lineHeight: 1.5 }}>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="btn-3d rose"
            style={{ width: '100%', opacity: selectedOption === null ? 0.5 : 1 }}
          >
            Responder Questão
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="btn-3d purple"
            style={{ width: '100%' }}
          >
            Próxima Questão
          </button>
        )}
      </div>
    </div>
  );
};
