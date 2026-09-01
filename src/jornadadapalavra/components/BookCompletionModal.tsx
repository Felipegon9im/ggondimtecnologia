import React from 'react';
import type { BibleTerritory } from '../types';
import { audioService } from '../services/audioService';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface BookCompletionModalProps {
  territory: BibleTerritory;
  onClose: () => void;
}

export const BookCompletionModal: React.FC<BookCompletionModalProps> = ({ territory, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 480,
        width: '100%',
        padding: 32,
        textAlign: 'center',
        border: '3px solid #fbbf24',
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
          🏆
        </div>

        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 1 }}>
          TERRITÓRIO CONQUISTADO
        </span>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: 4, marginBottom: 8 }}>
          Você Concluiu {territory.name}!
        </h2>
        <p style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: 20 }}>
          Todos os {territory.chaptersCount} capítulos de {territory.name} foram lidos e compreendidos com maestria!
        </p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(124, 58, 237, 0.2))',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          padding: 18,
          borderRadius: 16,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12
        }}>
          <Sparkles size={24} color="#fbbf24" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>+200 XP BÔNUS</div>
            <div style={{ fontSize: '0.8rem', color: '#a78bfa' }}>Recompensa de Conclusão do Livro</div>
          </div>
        </div>

        <button
          onClick={() => { audioService.playClick(); onClose(); }}
          className="btn-3d gold"
          style={{ width: '100%', fontSize: '1.05rem', padding: '14px' }}
        >
          Avançar para a Próxima Etapa <ArrowRight size={18} />
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
