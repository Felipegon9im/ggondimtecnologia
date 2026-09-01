import React from 'react';
import { audioService } from '../services/audioService';
import { X, Zap, Clock, Play, Lock } from 'lucide-react';

interface LessonPreviewModalProps {
  bookName: string;
  chapterNum: number;
  title: string;
  historicalContext: string;
  isCompleted: boolean;
  isAvailable: boolean;
  onStartLesson: () => void;
  onClose: () => void;
}

export const LessonPreviewModal: React.FC<LessonPreviewModalProps> = ({
  bookName,
  chapterNum,
  title,
  historicalContext,
  isCompleted,
  isAvailable,
  onStartLesson,
  onClose
}) => {
  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 420,
        width: '100%',
        padding: 24,
        position: 'relative',
        border: '2px solid #fbbf24',
        textAlign: 'center'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
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

        {/* Icon & Title */}
        <div style={{
          width: 60,
          height: 60,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(124, 58, 237, 0.3))',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          margin: '0 auto 14px auto'
        }}>
          📖
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 1 }}>
          {bookName} — CAPÍTULO {chapterNum}
        </span>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: 4, marginBottom: 8 }}>
          {title}
        </h3>

        <p style={{
          color: '#d1d5db',
          fontSize: '0.88rem',
          lineHeight: 1.5,
          marginBottom: 20,
          background: 'rgba(0,0,0,0.3)',
          padding: 12,
          borderRadius: 12
        }}>
          {historicalContext}
        </p>

        {/* Badges: XP and Estimated Time */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 24
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: '6px 14px',
            borderRadius: 14,
            color: '#a78bfa',
            fontWeight: 800,
            fontSize: '0.88rem'
          }}>
            <Zap size={16} fill="#a78bfa" /> +20 XP
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 14px',
            borderRadius: 14,
            color: '#fbbf24',
            fontWeight: 800,
            fontSize: '0.88rem'
          }}>
            <Clock size={16} /> 5 min
          </div>
        </div>

        {/* Action Button */}
        {!isAvailable ? (
          <button
            disabled
            className="btn-3d"
            style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}
          >
            <Lock size={18} /> Lição Bloqueada
          </button>
        ) : (
          <button
            onClick={() => { audioService.playClick(); onStartLesson(); }}
            className={`btn-3d ${isCompleted ? 'purple' : 'gold'}`}
            style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}
          >
            <Play size={18} fill="currentColor" /> {isCompleted ? 'Revisar Capítulo' : 'COMEÇAR ESTUDO'}
          </button>
        )}
      </div>
    </div>
  );
};
