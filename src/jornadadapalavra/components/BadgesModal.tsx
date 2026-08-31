import React from 'react';
import type { Badge } from '../types';
import { X, Award, Lock, CheckCircle } from 'lucide-react';

interface BadgesModalProps {
  badges: Badge[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ badges, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 520,
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: 28,
        position: 'relative'
      }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <Award size={28} color="#fbbf24" />
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
            Conquistas & Recompensas
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {badges.map(b => (
            <div
              key={b.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 14,
                borderRadius: 14,
                background: b.unlocked ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)',
                border: b.unlocked ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                opacity: b.unlocked ? 1 : 0.6
              }}
            >
              <div style={{
                fontSize: '2rem',
                width: 48,
                height: 48,
                borderRadius: 12,
                background: b.unlocked ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {b.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>{b.title}</h4>
                  {b.unlocked ? (
                    <CheckCircle size={16} color="#10b981" />
                  ) : (
                    <Lock size={14} color="#6b7280" />
                  )}
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.3 }}>
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
