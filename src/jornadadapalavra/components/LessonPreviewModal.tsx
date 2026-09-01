import React from 'react';
import { audioService } from '../services/audioService';
import { X, Zap, Clock, Play, Lock } from 'lucide-react';

interface LessonPreviewModalProps {
  bookName: string;
  chapterNum: number;
  title: string;
  historicalContext: string;
  themeImage?: string;
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
  themeImage,
  isCompleted,
  isAvailable,
  onStartLesson,
  onClose
}) => {
  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 440,
        width: '100%',
        padding: 0,
        position: 'relative',
        border: '2px solid #fbbf24',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Top Header Banner with Theme Artwork */}
        <div style={{
          position: 'relative',
          height: 160,
          backgroundImage: `url(${themeImage || '/genesis_creation.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 16
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(13, 9, 20, 0.3) 0%, rgba(13, 9, 20, 0.95) 100%)'
          }} />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              borderRadius: 10,
              padding: 6,
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <X size={18} />
          </button>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 1, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {bookName} — CAPÍTULO {chapterNum}
            </span>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: 2, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              {title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: 22 }}>
          <p style={{
            color: '#d1d5db',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            marginBottom: 20,
            background: 'rgba(0,0,0,0.3)',
            padding: 14,
            borderRadius: 12,
            textAlign: 'left'
          }}>
            {historicalContext}
          </p>

          {/* Badges: XP and Estimated Time */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 22
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
    </div>
  );
};
