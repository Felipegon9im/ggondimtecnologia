import React, { useState, useEffect } from 'react';
import type { BibleVerse } from '../types';
import { BibleJourneyService } from '../services/bibleJourneyService';
import { bibleService } from '../services/bibleService';
import { audioService } from '../services/audioService';
import { X, BookOpen, UserCheck, HelpCircle, HeartHandshake, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

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

  const contextData = BibleJourneyService.generateChapterContext(bookId, chapterNum);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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

  const handleSelectOption = (idx: number) => {
    if (isQuizAnswered) return;
    audioService.playClick();
    setSelectedOption(idx);
  };

  const handleCheckQuiz = () => {
    if (selectedOption === null || isQuizAnswered) return;
    const correct = selectedOption === contextData.quizAnswer;
    setIsQuizAnswered(true);
    setIsQuizCorrect(correct);

    if (correct) audioService.playCorrect();
    else audioService.playWrong();
  };

  const handleFinishStudy = () => {
    onCompleteChapter(bookId, chapterNum, isQuizCorrect);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 720,
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: 28,
        position: 'relative',
        border: '2px solid #fbbf24'
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

        {/* Modal Header */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 1 }}>
            📖 ESTUDO BÍBLICO DA PEREGRINAÇÃO
          </span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
            {contextData.title}
          </h2>
        </div>

        {/* Tabs Bar */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 10 }}>
          <button
            onClick={() => { audioService.playClick(); setActiveTab('CONTEXT'); }}
            className={`btn-nav ${activeTab === 'CONTEXT' ? 'active' : ''}`}
          >
            <UserCheck size={16} /> Contexto & Personagens
          </button>

          <button
            onClick={() => { audioService.playClick(); setActiveTab('READING'); }}
            className={`btn-nav ${activeTab === 'READING' ? 'active' : ''}`}
          >
            <BookOpen size={16} /> Leitura da Palavra
          </button>

          <button
            onClick={() => { audioService.playClick(); setActiveTab('QUIZ'); }}
            className={`btn-nav ${activeTab === 'QUIZ' ? 'active' : ''}`}
          >
            <HelpCircle size={16} /> Quiz do Capítulo
          </button>

          <button
            onClick={() => { audioService.playClick(); setActiveTab('REFLECTION'); }}
            className={`btn-nav ${activeTab === 'REFLECTION' ? 'active' : ''}`}
          >
            <HeartHandshake size={16} /> Reflexão & Oração
          </button>
        </div>

        {/* TAB 1: CONTEXT & CHARACTERS */}
        {activeTab === 'CONTEXT' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Historical Context */}
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', borderLeft: '4px solid #8b5cf6', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 4 }}>
                CONTEXTO HISTÓRICO E ESPIRITUAL
              </div>
              <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {contextData.historicalContext}
              </p>
            </div>

            {/* Key Characters */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 8 }}>
                PERSONAGENS PRINCIPAIS
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {contextData.keyCharacters.map((person, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#fbbf24',
                    padding: '4px 12px',
                    borderRadius: 10,
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    👤 {person}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Events */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: 8 }}>
                EVENTOS IMPORTANTES
              </div>
              <ul style={{ paddingLeft: 18, color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {contextData.importantEvents.map((ev, idx) => (
                  <li key={idx}>{ev}</li>
                ))}
              </ul>
            </div>

            {/* Curiosities */}
            <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: 16, borderRadius: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 4 }}>
                💡 CURIOSIDADE BÍBLICA
              </div>
              <p style={{ color: '#ffffff', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {contextData.curiosities}
              </p>
            </div>

            <button
              onClick={() => { audioService.playClick(); setActiveTab('READING'); }}
              className="btn-3d gold"
              style={{ width: '100%', marginTop: 8 }}
            >
              Ir para Leitura da Palavra <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* TAB 2: BIBLE READING */}
        {activeTab === 'READING' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Version Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700 }}>Tradução da Bíblia:</span>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value as any)}
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: '0.85rem'
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
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#fbbf24' }}>
                <p style={{ fontWeight: 600 }}>Carregando texto de {contextData.title}...</p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: 20,
                borderRadius: 14,
                maxHeight: 380,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                {verses.map(v => (
                  <div key={v.number} style={{ display: 'flex', gap: 10, lineHeight: 1.6 }}>
                    <span style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.8rem', minWidth: 20 }}>
                      {v.number}
                    </span>
                    <span style={{ color: '#f3f4f6', fontSize: '0.95rem' }}>
                      {v.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => { audioService.playClick(); setActiveTab('QUIZ'); }}
              className="btn-3d gold"
              style={{ width: '100%', marginTop: 8 }}
            >
              Testar Conhecimento (Quiz) <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* TAB 3: QUIZ */}
        {activeTab === 'QUIZ' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Desafio de Compreensão do Capítulo 🎯
            </h3>

            <p style={{
              color: '#ffffff',
              fontSize: '1rem',
              lineHeight: 1.5,
              background: 'rgba(0,0,0,0.3)',
              padding: 16,
              borderRadius: 12
            }}>
              {contextData.quizQuestion}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contextData.quizOptions.map((opt, idx) => {
                let border = '1px solid rgba(255,255,255,0.1)';
                let bg = 'rgba(255,255,255,0.03)';
                let textColor = '#f3f4f6';

                if (selectedOption === idx) {
                  border = '2px solid #fbbf24';
                  bg = 'rgba(245, 158, 11, 0.2)';
                }

                if (isQuizAnswered) {
                  if (idx === contextData.quizAnswer) {
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
                    disabled={isQuizAnswered}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 12,
                      border,
                      background: bg,
                      color: textColor,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textAlign: 'left',
                      cursor: isQuizAnswered ? 'default' : 'pointer',
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

            {isQuizAnswered && (
              <div style={{
                padding: 16,
                borderRadius: 12,
                background: isQuizCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: isQuizCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: isQuizCorrect ? '#34d399' : '#f87171', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>
                  {isQuizCorrect ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                  {isQuizCorrect ? 'Incrível! Resposta Correta (+10 XP Bônus)' : 'Ops! Veja o ensinamento:'}
                </div>
                <p style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
                  {contextData.quizExplanation}
                </p>
              </div>
            )}

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
                onClick={() => { audioService.playClick(); setActiveTab('REFLECTION'); }}
                className="btn-3d purple"
                style={{ width: '100%' }}
              >
                Ver Reflexão Final <ArrowRight size={18} />
              </button>
            )}
          </div>
        )}

        {/* TAB 4: REFLECTION & PRAYER */}
        {activeTab === 'REFLECTION' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(124, 58, 237, 0.15)', borderLeft: '4px solid #7c3aed', padding: 18, borderRadius: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', marginBottom: 6 }}>
                💡 APLICAÇÃO PRÁTICA DA PALAVRA
              </div>
              <p style={{ color: '#ffffff', fontSize: '1rem', lineHeight: 1.55 }}>
                {contextData.reflection}
              </p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: 18, borderRadius: 12 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 6 }}>
                🙏 ORAÇÃO DO PEREGRINO
              </div>
              <p style={{ color: '#d1d5db', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                "Senhor, obrigado pelo ensinamento deste capítulo. Que a Tua Palavra seja lâmpada para os meus pés e luz para o meu caminho em cada dia de peregrinação. Amém."
              </p>
            </div>

            <button
              onClick={handleFinishStudy}
              className="btn-3d gold"
              style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: 8 }}
            >
              Concluir Capítulo e Ganhar XP! 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
