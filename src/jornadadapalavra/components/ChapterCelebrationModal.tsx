import React from 'react';
import type { RankingShiftInfo } from '../types';
import { audioService } from '../services/audioService';
import { TrendingUp, Flame, Zap, ArrowRight, X } from 'lucide-react';

interface ChapterCelebrationModalProps {
  bookName: string;
  chapterNum: number;
  xpGained: number;
  quizCorrect: boolean;
  rankingShift: RankingShiftInfo;
  onClose: () => void;
}

export const ChapterCelebrationModal: React.FC<ChapterCelebrationModalProps> = ({
  bookName,
  chapterNum,
  xpGained,
  quizCorrect,
  rankingShift,
  onClose
}) => {
  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 480,
        width: '100%',
        padding: 32,
        textAlign: 'center',
        border: '2px solid #fbbf24',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
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

        <div style={{ fontSize: '4.5rem', marginBottom: 8, animation: 'bounce 1.5s infinite' }}>
          🎉
        </div>

        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginBottom: 4 }}>
          Capítulo Concluído!
        </h2>
        <p style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: 20 }}>
          {bookName} — Capítulo {chapterNum}
        </p>

        {/* Rewards Breakdown Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 20
        }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: 14, borderRadius: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#a78bfa', fontWeight: 800, fontSize: '1.2rem' }}>
              <Zap size={18} fill="#a78bfa" /> +{xpGained} XP
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
              {quizCorrect ? 'Capítulo + Bônus do Quiz 🎯' : 'Pontos de Experiência'}
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: 14, borderRadius: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#fbbf24', fontWeight: 800, fontSize: '1.2rem' }}>
              <Flame size={18} fill="#fbbf24" /> Caminhada
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>Sequência Mantida 🔥</div>
          </div>
        </div>

        {/* Ranking Shift Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))',
          border: '2px solid #10b981',
          padding: 16,
          borderRadius: 16,
          marginBottom: 24,
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#34d399', fontWeight: 800, fontSize: '0.95rem', marginBottom: 6 }}>
            <TrendingUp size={20} />
            <span>📈 AVANÇO NA LIGA DOS PEREGRINOS!</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>
            <span>Posição anterior: <span style={{ color: '#9ca3af' }}>#{rankingShift.previousRank}</span></span>
            <ArrowRight size={18} color="#34d399" />
            <span>Nova posição: <span style={{ color: '#fbbf24', fontSize: '1.3rem', fontWeight: 800 }}>#{rankingShift.newRank}</span></span>
          </div>

          {rankingShift.passedCount > 0 && (
            <div style={{ marginTop: 8, fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700 }}>
              🔥 Você ultrapassou {rankingShift.passedCount} peregrino{rankingShift.passedCount > 1 ? 's' : ''} no ranking!
            </div>
          )}

          {rankingShift.isLeagueUp && (
            <div style={{ marginTop: 8, fontSize: '0.9rem', color: '#ec4899', fontWeight: 800 }}>
              ✨ PARABÉNS! VOCÊ SUBIU PARA A {rankingShift.newLeague.toUpperCase()}!
            </div>
          )}
        </div>

        <button
          onClick={() => { audioService.playClick(); onClose(); }}
          className="btn-3d gold"
          style={{ width: '100%', fontSize: '1.05rem', padding: '14px' }}
        >
          Continuar Peregrinação <ArrowRight size={18} />
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};
