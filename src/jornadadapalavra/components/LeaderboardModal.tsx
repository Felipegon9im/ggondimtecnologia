import React from 'react';
import type { UserProfile, LeaderboardUser } from '../types';
import { X, Trophy } from 'lucide-react';

interface LeaderboardModalProps {
  profile: UserProfile;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ profile, onClose }) => {
  const mockLeaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Pr. Mateus', xp: 2450, avatar: '👨‍💼', league: 'Liga de Ouro' },
    { rank: 2, name: 'Ana Clara', xp: 1980, avatar: '👩', league: 'Liga de Ouro' },
    { rank: 3, name: profile.name, xp: profile.stats.xp, avatar: profile.gender === 'MASCULINO' ? '👨' : '👩', league: 'Liga de Ouro', isUser: true },
    { rank: 4, name: 'Gabriel Santos', xp: 1420, avatar: '👨', league: 'Liga de Prata' },
    { rank: 5, name: 'Ruth Oliveira', xp: 1100, avatar: '👩‍🦱', league: 'Liga de Prata' },
    { rank: 6, name: 'Lucas Teófilo', xp: 850, avatar: '👨', league: 'Liga de Bronze' }
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

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
          <Trophy size={28} color="#fbbf24" />
          <div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
              Liga dos Peregrinos 🏆
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>Classificação Semanal de XP</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockLeaderboard.map(user => (
            <div
              key={user.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 14,
                borderRadius: 14,
                background: user.isUser ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                border: user.isUser ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: user.rank === 1 ? '#fbbf24' : user.rank === 2 ? '#9ca3af' : user.rank === 3 ? '#b45309' : '#ffffff',
                  minWidth: 24
                }}>
                  #{user.rank}
                </span>

                <span style={{ fontSize: '1.5rem' }}>{user.avatar}</span>

                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>
                    {user.name} {user.isUser ? '(Você)' : ''}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{user.league}</span>
                </div>
              </div>

              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#fbbf24', fontSize: '1.1rem' }}>
                {user.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
