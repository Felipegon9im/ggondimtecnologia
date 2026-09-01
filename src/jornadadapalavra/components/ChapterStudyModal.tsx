import React, { useState, useEffect } from 'react';
import type { BibleVerse } from '../types';
import { BibleJourneyService } from '../services/bibleJourneyService';
import { bibleService } from '../services/bibleService';
import { audioService } from '../services/audioService';
import { X, BookOpen, UserCheck, HelpCircle, HeartHandshake, CheckCircle2, AlertTriangle, ArrowRight, Zap, BookMarked } from 'lucide-react';

interface ChapterStudyModalProps {
  bookId: string;
  chapterNum: number;
  onCompleteChapter: (bookId: string, chapterNum: number, quizCorrect: boolean) => void;
  onClose: () => void;
}

export const ChapterStudyModal: React.FC<ChapterStudyModalProps> = ({
  bookId,
  chapterNum,
  onCompleteChapter,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'CONTEXT' | 'READING' | 'QUIZ' | 'REFLECTION'>('CONTEXT');
  const [selectedVersion, setSelectedVersion] = useState<'nvi' | 'acf' | 'kjv' | 'rvr'>('nvi');
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loadingVerses, setLoadingVerses] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contextData = BibleJourneyService.generateChapterContext(bookId, chapterNum);
  const questionsBank = contextData.questionsBank || [];

  // Quiz progression state (samples 3 questions out of 10)
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const activeQuestion = questionsBank[currentQIndex] || {
    id: 'Q1',
    tipo: 'compreensao',
    dificuldade: 'facil',
    pergunta: contextData.quizQuestion,
    alternativas: {
      A: contextData.quizOptions[0] || '',
      B: contextData.quizOptions[1] || '',
      C: contextData.quizOptions[2] || '',
      D: contextData.quizOptions[3] || ''
    },
    resposta_correta: (['A', 'B', 'C', 'D'][contextData.quizAnswer] || 'A') as 'A' | 'B' | 'C' | 'D',
    explicacao: contextData.quizExplanation,
    referencia: `${contextData.bookName} ${chapterNum}`,
    xp: 10
  };

  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoadingVerses(true);

    bibleService.getChapterVerses(selectedVersion, bookId, chapterNum)
      .then(loadedVerses => {
        if (isMounted) {
          setVerses(loadedVerses);
          setLoadingVerses(false);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar versículos:', err);
        if (isMounted) setLoadingVerses(false);
      });

    return () => { isMounted = false; };
  }, [selectedVersion, bookId, chapterNum]);

  const handleSelectOptionKey = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isQuizAnswered) return;
    audioService.playClick();
    setSelectedOption(key);
  };

  const handleCheckQuiz = () => {
    if (selectedOption === null || isQuizAnswered) return;
    const correct = selectedOption === activeQuestion.resposta_correta;
    setIsQuizAnswered(true);
    setIsQuizCorrect(correct);

    if (correct) {
      audioService.playCorrect();
    } else {
      audioService.playWrong();
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQIndex < Math.min(2, questionsBank.length - 1)) {
      audioService.playClick();
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsQuizAnswered(false);
      setIsQuizCorrect(false);
    } else {
      audioService.playClick();
      setActiveTab('REFLECTION');
    }
  };

  const handleFinishStudy = () => {
    onCompleteChapter(bookId, chapterNum, isQuizCorrect);
  };

  const getTypeLabel = (tipo: string) => {
    switch (tipo) {
      case 'compreensao': return { text: 'COMPREENSÃO 🧠', bg: 'rgba(59, 130, 246, 0.2)', border: '#3b82f6', color: '#60a5fa' };
      case 'detalhe': return { text: 'DETALHE 🔍', bg: 'rgba(245, 158, 11, 0.2)', border: '#f59e0b', color: '#fbbf24' };
      case 'conexao': return { text: 'CONEXÃO 🔗', bg: 'rgba(139, 92, 246, 0.2)', border: '#8b5cf6', color: '#c084fc' };
      case 'bonus': return { text: 'BÔNUS 🌟', bg: 'rgba(236, 72, 153, 0.2)', border: '#ec4899', color: '#f472b6' };
      default: return { text: 'PERGUNTA 🎯', bg: 'rgba(16, 185, 129, 0.2)', border: '#10b981', color: '#34d399' };
    }
  };

  const typeInfo = getTypeLabel(activeQuestion.tipo);

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 720,
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: isMobile ? 16 : 28,
        position: 'relative',
        border: '2px solid #fbbf24',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: isMobile ? 12 : 20,
            right: isMobile ? 12 : 20,
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#9ca3af',
            borderRadius: 10,
            padding: 6,
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            📖 ESTUDO BÍBLICO DA PEREGRINAÇÃO
          </span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
            {contextData.title}
          </h2>
        </div>

        {/* Illustrative Theme Artwork Header Banner */}
        {contextData.themeImage && (
          <div style={{
            position: 'relative',
            height: isMobile ? 120 : 160,
            borderRadius: 14,
            backgroundImage: `url(${contextData.themeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: 16,
            overflow: 'hidden',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(13, 9, 20, 0.1) 0%, rgba(13, 9, 20, 0.85) 100%)'
            }} />
          </div>
        )}

        {/* Tabs Bar (Horizontally scrollable) */}
        <div style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          marginBottom: 18,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: 8,
          WebkitOverflowScrolling: 'touch'
        }}>
          <button
            onClick={() => { audioService.playClick(); setActiveTab('CONTEXT'); }}
            className={`btn-nav ${activeTab === 'CONTEXT' ? 'active' : ''}`}
          >
            <UserCheck size={14} /> <span>Contexto</span>
          </button>

          <button
            onClick={() => { audioService.playClick(); setActiveTab('READING'); }}
            className={`btn-nav ${activeTab === 'READING' ? 'active' : ''}`}
          >
            <BookOpen size={14} /> <span>Leitura</span>
          </button>

          <button
            onClick={() => { audioService.playClick(); setActiveTab('QUIZ'); }}
            className={`btn-nav ${activeTab === 'QUIZ' ? 'active' : ''}`}
          >
            <HelpCircle size={14} /> <span>Quiz</span>
          </button>

          <button
            onClick={() => { audioService.playClick(); setActiveTab('REFLECTION'); }}
            className={`btn-nav ${activeTab === 'REFLECTION' ? 'active' : ''}`}
          >
            <HeartHandshake size={14} /> <span>Reflexão</span>
          </button>
        </div>

        {/* TAB 1: CONTEXT & CHARACTERS */}
        {activeTab === 'CONTEXT' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Historical Context */}
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', borderLeft: '4px solid #8b5cf6', padding: isMobile ? 12 : 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 4 }}>
                CONTEXTO HISTÓRICO E ESPIRITUAL
              </div>
              <p style={{ color: '#ffffff', fontSize: isMobile ? '0.88rem' : '0.95rem', lineHeight: 1.5 }}>
                {contextData.historicalContext}
              </p>
            </div>

            {/* Key Characters */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? 12 : 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 6 }}>
                PERSONAGENS PRINCIPAIS
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {contextData.keyCharacters.map((person, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#fbbf24',
                    padding: '3px 10px',
                    borderRadius: 8,
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    👤 {person}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Events */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? 12 : 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: 6 }}>
                EVENTOS IMPORTANTES
              </div>
              <ul style={{ paddingLeft: 16, color: '#d1d5db', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: 1.5 }}>
                {contextData.importantEvents.map((ev, idx) => (
                  <li key={idx}>{ev}</li>
                ))}
              </ul>
            </div>

            {/* Curiosities */}
            <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: isMobile ? 12 : 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 4 }}>
                💡 CURIOSIDADE BÍBLICA
              </div>
              <p style={{ color: '#ffffff', fontSize: isMobile ? '0.85rem' : '0.9rem', fontStyle: 'italic' }}>
                {contextData.curiosities}
              </p>
            </div>

            <button
              onClick={() => { audioService.playClick(); setActiveTab('READING'); }}
              className="btn-3d gold"
              style={{ width: '100%', marginTop: 4 }}
            >
              Ir para Leitura da Palavra <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* TAB 2: BIBLE READING */}
        {activeTab === 'READING' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Version Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>Tradução da Bíblia:</span>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value as any)}
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#ffffff',
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}
              >
                <option value="nvi">🇧🇷 NVI (Nova Versão Internacional)</option>
                <option value="acf">🇧🇷 ACF (Almeida Corrigida Fiel)</option>
                <option value="kjv">🇺🇸 KJV (King James Version)</option>
                <option value="rvr">🇪🇸 RVR (Reina Valera 1960)</option>
              </select>
            </div>

            {/* Verses Canvas */}
            {loadingVerses ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#fbbf24' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Carregando texto de {contextData.title}...</p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: isMobile ? 14 : 20,
                borderRadius: 14,
                maxHeight: isMobile ? 320 : 380,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                WebkitOverflowScrolling: 'touch'
              }}>
                {verses.map(v => (
                  <div key={v.number} style={{ display: 'flex', gap: 8, lineHeight: 1.55 }}>
                    <span style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.78rem', minWidth: 18 }}>
                      {v.number}
                    </span>
                    <span style={{ color: '#f3f4f6', fontSize: isMobile ? '0.88rem' : '0.95rem' }}>
                      {v.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => { audioService.playClick(); setActiveTab('QUIZ'); }}
              className="btn-3d gold"
              style={{ width: '100%', marginTop: 4 }}
            >
              Testar Conhecimento (Quiz) <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* TAB 3: QUIZ */}
        {activeTab === 'QUIZ' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Question Progress & Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  background: typeInfo.bg,
                  border: `1px solid ${typeInfo.border}`,
                  color: typeInfo.color,
                  padding: '3px 10px',
                  borderRadius: 10,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  {typeInfo.text}
                </span>

                <span style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#d1d5db',
                  padding: '3px 10px',
                  borderRadius: 10,
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {activeQuestion.dificuldade === 'facil' ? '🟢 Fácil' : activeQuestion.dificuldade === 'media' ? '🟡 Média' : '🔴 Difícil'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#fbbf24',
                  padding: '3px 10px',
                  borderRadius: 10,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <Zap size={13} fill="#fbbf24" /> +{activeQuestion.xp} XP
                </span>

                <span style={{ color: '#9ca3af', fontSize: '0.78rem', fontWeight: 700 }}>
                  Pergunta {currentQIndex + 1} de {Math.min(3, questionsBank.length)}
                </span>
              </div>
            </div>

            {/* Biblical Reference Badge */}
            {activeQuestion.referencia && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a78bfa', fontSize: '0.78rem', fontWeight: 700 }}>
                <BookMarked size={14} />
                <span>Referência Bíblica: {activeQuestion.referencia}</span>
              </div>
            )}

            {/* Question Text */}
            <p style={{
              color: '#ffffff',
              fontSize: isMobile ? '0.92rem' : '1.02rem',
              fontWeight: 700,
              lineHeight: 1.5,
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 16,
              borderRadius: 12
            }}>
              {activeQuestion.pergunta}
            </p>

            {/* 4 Alternatives (A, B, C, D) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['A', 'B', 'C', 'D'] as const).map((key) => {
                const optText = activeQuestion.alternativas[key];
                let border = '1px solid rgba(255,255,255,0.1)';
                let bg = 'rgba(255,255,255,0.03)';
                let textColor = '#f3f4f6';

                if (selectedOption === key) {
                  border = '2px solid #fbbf24';
                  bg = 'rgba(245, 158, 11, 0.2)';
                }

                if (isQuizAnswered) {
                  if (key === activeQuestion.resposta_correta) {
                    border = '2px solid #10b981';
                    bg = 'rgba(16, 185, 129, 0.25)';
                    textColor = '#34d399';
                  } else if (selectedOption === key) {
                    border = '2px solid #ef4444';
                    bg = 'rgba(239, 68, 68, 0.25)';
                    textColor = '#f87171';
                  }
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleSelectOptionKey(key)}
                    disabled={isQuizAnswered}
                    style={{
                      padding: isMobile ? '12px 14px' : '14px 18px',
                      borderRadius: 12,
                      border,
                      background: bg,
                      color: textColor,
                      fontWeight: 600,
                      fontSize: isMobile ? '0.88rem' : '0.95rem',
                      textAlign: 'left',
                      cursor: isQuizAnswered ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'all 0.2s ease'
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
                      {key}
                    </span>
                    <span style={{ flex: 1 }}>{optText}</span>
                  </button>
                );
              })}
            </div>

            {/* Educational Feedback Explanation */}
            {isQuizAnswered && (
              <div style={{
                padding: 14,
                borderRadius: 12,
                background: isQuizCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: isQuizCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: isQuizCorrect ? '#34d399' : '#f87171', fontWeight: 800, fontSize: '0.95rem', marginBottom: 4 }}>
                  {isQuizCorrect ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  {isQuizCorrect ? `Resposta Correta! (+${activeQuestion.xp} XP)` : `Resposta Correta: ${activeQuestion.resposta_correta}`}
                </div>
                <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: 1.45 }}>
                  {activeQuestion.explicacao}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {!isQuizAnswered ? (
              <button
                onClick={handleCheckQuiz}
                disabled={selectedOption === null}
                className="btn-3d gold"
                style={{ width: '100%', opacity: selectedOption === null ? 0.5 : 1 }}
              >
                Verificar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuizQuestion}
                className="btn-3d purple"
                style={{ width: '100%' }}
              >
                {currentQIndex < Math.min(2, questionsBank.length - 1) ? 'Próxima Pergunta ➡️' : 'Ver Reflexão Final 🌟'}
              </button>
            )}
          </div>
        )}

        {/* TAB 4: REFLECTION & PRAYER */}
        {activeTab === 'REFLECTION' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'rgba(124, 58, 237, 0.15)', borderLeft: '4px solid #7c3aed', padding: isMobile ? 14 : 18, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 4 }}>
                💡 APLICAÇÃO PRÁTICA DA PALAVRA
              </div>
              <p style={{ color: '#ffffff', fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: 1.5 }}>
                {contextData.reflection}
              </p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: isMobile ? 14 : 18, borderRadius: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 4 }}>
                🙏 ORAÇÃO DO PEREGRINO
              </div>
              <p style={{ color: '#d1d5db', fontSize: isMobile ? '0.88rem' : '0.95rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                "Senhor, obrigado pelo ensinamento deste capítulo. Que a Tua Palavra seja lâmpada para os meus pés e luz para o meu caminho em cada dia de peregrinação. Amém."
              </p>
            </div>

            <button
              onClick={handleFinishStudy}
              className="btn-3d gold"
              style={{ width: '100%', padding: '14px', fontSize: isMobile ? '0.95rem' : '1.1rem', marginTop: 4 }}
            >
              Concluir Capítulo e Ganhar XP! 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
