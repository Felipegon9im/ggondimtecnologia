import React, { useState, useMemo } from 'react';
import type { Module, Lesson, Question, UserProgress } from '../types';
import { QUESTIONS } from '../data/questionsData';
import { audioService } from '../services/audioService';
import { SRSEngine } from '../services/srsEngine';
import { X, Check, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

interface LessonModalProps {
  module: Module;
  lesson: Lesson;
  progress: UserProgress;
  onSaveProgress: (updated: UserProgress) => void;
  onClose: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  module,
  lesson,
  progress,
  onSaveProgress,
  onClose
}) => {
  const [step, setStep] = useState<'THEORY' | 'PRACTICE' | 'COMPLETED'>('THEORY');
  
  // Pick specific question for this lesson from bank or cycle based on total questions answered
  const currentQuestion: Question = useMemo(() => {
    // 1. Strict filter by lessonId or topic
    const lessonQuestions = QUESTIONS.filter(
      q => q.lessonId === lesson.id || q.topic === lesson.id
    );

    if (lessonQuestions.length > 0) {
      // Pick question based on questionsAnswered count so it cycles to different questions
      const index = progress.stats.questionsAnswered % lessonQuestions.length;
      return lessonQuestions[index];
    }

    // 2. Fallback filter by module subject
    const moduleQuestions = QUESTIONS.filter(q => q.subject === module.slug);
    if (moduleQuestions.length > 0) {
      const index = progress.stats.questionsAnswered % moduleQuestions.length;
      return moduleQuestions[index];
    }

    // 3. Dynamic Fallback Question specific to lesson rule
    return {
      id: `fallback-${lesson.id}`,
      lessonId: lesson.id,
      subject: module.slug,
      topic: lesson.id,
      difficulty: 2,
      question: `Considerando o conceito de "${lesson.title}", assinale a alternativa que expressa corretamente sua REGRA FUNDAMENTAL:`,
      options: [
        lesson.simpleRule,
        'A regra nega os conectivos sem nenhuma lógica formal.',
        'O valor lógico é sempre indeterminado em todas as premissas.',
        'Nenhuma das alternativas anteriores está correta.'
      ],
      answer: 0,
      explanation: `A regra ensinada nesta lição é: "${lesson.simpleRule}"`,
      tip: lesson.macete
    };
  }, [lesson.id, module.slug, progress.stats.questionsAnswered]);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    audioService.playClick();
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === currentQuestion.answer;
    setIsAnswered(true);
    setIsCorrect(correct);

    const updated = { ...progress };

    if (correct) {
      audioService.playCorrect();
      const gainedXP = 15;
      updated.stats.xp += gainedXP;
      updated.stats.dailyXP += gainedXP;
      updated.stats.correctAnswers += 1;
      updated.stats.level = Math.floor(updated.stats.xp / 100) + 1;
    } else {
      audioService.playWrong();
    }

    updated.stats.questionsAnswered += 1;

    const currentSRS = updated.srsItems[currentQuestion.id];
    updated.srsItems[currentQuestion.id] = SRSEngine.processAnswer(currentSRS, currentQuestion.id, correct);

    const moduleQuestions = Object.keys(updated.srsItems).map(qId => ({
      isCorrect: updated.srsItems[qId].consecutiveCorrect > 0,
      consecutive: updated.srsItems[qId].consecutiveCorrect
    }));

    updated.moduleMastery[module.id] = SRSEngine.calculateModuleMastery(
      module.id,
      5,
      moduleQuestions
    );

    if (!updated.completedLessonIds.includes(lesson.id)) {
      updated.completedLessonIds.push(lesson.id);
    }

    onSaveProgress(updated);
  };

  const handleNextStep = () => {
    if (step === 'THEORY') {
      audioService.playClick();
      setStep('PRACTICE');
    } else if (step === 'PRACTICE') {
      audioService.playStreak();
      setStep('COMPLETED');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 620,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: 28,
        position: 'relative',
        border: '1px solid rgba(139, 92, 246, 0.4)'
      }}>
        {/* Close Button */}
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

        {/* Header Module Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: module.color,
            background: `${module.color}20`,
            padding: '3px 10px',
            borderRadius: 8
          }}>
            {module.title}
          </span>
          <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Microlição</span>
        </div>

        {/* STEP 1: THEORY */}
        {step === 'THEORY' && (
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
              {lesson.title}
            </h2>

            {/* Simple Rule Box */}
            <div style={{
              background: 'rgba(139, 92, 246, 0.15)',
              borderLeft: '4px solid #8b5cf6',
              padding: 16,
              borderRadius: 12,
              marginBottom: 16
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 4 }}>
                REGRA FUNDAMENTAL
              </div>
              <p style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 }}>
                {lesson.simpleRule}
              </p>
            </div>

            {/* Daily Example */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 16,
              borderRadius: 12,
              marginBottom: 16
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>
                EXEMPLO DO DIA A DIA
              </div>
              <p style={{ color: '#d1d5db', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.4 }}>
                {lesson.dailyExample}
              </p>
            </div>

            {/* Macete V/F Banner if present */}
            {lesson.macete && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: 14,
                borderRadius: 12,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <Lightbulb size={24} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
                    MACETE PARA GUARDAR NA MEMÓRIA
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>
                    {lesson.macete}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleNextStep}
              className="btn-3d purple"
              style={{ width: '100%', marginTop: 8 }}
            >
              Testar Agora <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: PRACTICE QUESTION */}
        {step === 'PRACTICE' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                Exercício de Fixação 🎯
              </h3>
              {currentQuestion.banca && (
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#fbbf24',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '2px 8px',
                  borderRadius: 6
                }}>
                  {currentQuestion.banca} {currentQuestion.concursoYear || ''}
                </span>
              )}
            </div>

            <p style={{ color: '#f3f4f6', fontSize: '1rem', lineHeight: 1.5, marginBottom: 20, background: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 12, whiteSpace: 'pre-line' }}>
              {currentQuestion.question}
            </p>

            {/* Options Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {currentQuestion.options.map((opt, idx) => {
                let border = '1px solid rgba(255,255,255,0.1)';
                let bg = 'rgba(255,255,255,0.03)';
                let textColor = '#f3f4f6';

                if (selectedOption === idx) {
                  border = '2px solid #8b5cf6';
                  bg = 'rgba(139, 92, 246, 0.2)';
                }

                if (isAnswered) {
                  if (idx === currentQuestion.answer) {
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
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
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

            {/* Feedback Panel after answering */}
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
                  {isCorrect ? '🔥 Acertou em cheio! +15 XP' : 'Quase lá! Vamos revisar a explicação:'}
                </div>
                <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.4 }}>
                  {currentQuestion.explanation}
                </p>
                {currentQuestion.tip && (
                  <div style={{ marginTop: 8, color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                    💡 Dica: {currentQuestion.tip}
                  </div>
                )}
              </div>
            )}

            {/* Check / Continue Action Button */}
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className="btn-3d purple"
                style={{ width: '100%', opacity: selectedOption === null ? 0.5 : 1 }}
              >
                Verificar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="btn-3d emerald"
                style={{ width: '100%' }}
              >
                Concluir Lição <ArrowRight size={18} />
              </button>
            )}
          </div>
        )}

        {/* STEP 3: CELEBRATION */}
        {step === 'COMPLETED' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: 12
            }}>
              🎉
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
              Lição Concluída!
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: 24 }}>
              Sua memória de raciocínio lógico está cada dia mais afiada.
            </p>

            <button
              onClick={onClose}
              className="btn-3d purple"
              style={{ width: '100%' }}
            >
              Voltar ao Painel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
