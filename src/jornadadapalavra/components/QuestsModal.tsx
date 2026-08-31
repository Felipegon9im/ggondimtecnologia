import React from 'react';
import type { UserProfile } from '../types';
import { audioService } from '../services/audioService';
import { X, Target } from 'lucide-react';

interface QuestsModalProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const QuestsModal: React.FC<QuestsModalProps> = ({ profile, onSaveProfile, onClose }) => {
  const handleClaimReward = (questId: string) => {
    const q = profile.quests.find(quest => quest.id === questId);
    if (!q || !q.completed) return;

    audioService.playHarpChime();
    const updated = { ...profile };
    updated.stats.xp += q.rewardXP;
    q.rewardXP = 0; // Claimed
    onSaveProfile(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 520,
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: 28,
        position: 'relative',
        border: '2px solid #fbbf24'
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
          <Target size={28} color="#fbbf24" />
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
            Missões Diárias 🎯
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {profile.quests.map(q => {
            const percentage = Math.min(100, Math.round((q.current / q.target) * 100));

            return (
              <div
                key={q.id}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.03)',
                  border: q.completed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>{q.icon}</span>
                    <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>{q.title}</h4>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
                    {q.current}/{q.target}
                  </span>
                </div>

                <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: 10 }}>
                  {q.description}
                </p>

                <div className="progress-bar-container" style={{ marginBottom: 10 }}>
                  <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
                </div>

                {q.completed && q.rewardXP > 0 && (
                  <button
                    onClick={() => handleClaimReward(q.id)}
                    className="btn-3d gold"
                    style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}
                  >
                    Resgatar +{q.rewardXP} XP 🎁
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
