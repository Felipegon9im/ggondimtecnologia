import React from 'react';
import type { UserProfile } from '../types';
import { LEAGUE_TIERS, BibleJourneyService } from '../services/bibleJourneyService';
import { X, Trophy } from 'lucide-react';

interface LeaderboardModalProps {
  profile: UserProfile;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ profile, onClose }) => {
  const currentLeague = BibleJourneyService.getLeagueTier(profile.stats.xp);
  const leaderboardList = BibleJourneyService.getMockLeaderboard(
    profile.stats.xp,
    profile.name,
    profile.gender
  );

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 580,
        width: '100%',
        maxHeight: '88vh',
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

        {/* Title Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Trophy size={32} color="#fbbf24" />
          <div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
              Liga dos Peregrinos 🏆
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>Classificação Competitiva da Jornada</span>
          </div>
        </div>

        {/* User Current League Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${currentLeague.color}30, rgba(30, 20, 48, 0.9))`,
          borderLeft: `6px solid ${currentLeague.color}`,
          padding: 16,
          borderRadius: 14,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: currentLeague.color, textTransform: 'uppercase' }}>
              SUA DIVISÃO ATUAL
            </span>
            <h3 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.2rem', marginTop: 2 }}>
              {currentLeague.name}
            </h3>
            <p style={{ color: '#d1d5db', fontSize: '0.8rem', marginTop: 2 }}>
              {currentLeague.description}
            </p>
          </div>

          <div style={{ fontSize: '2rem' }}>
            {currentLeague.icon}
          </div>
        </div>

        {/* All League Tiers Bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 8 }}>
            DIVISÕES DA LIGA DOS PEREGRINOS:
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6 }}>
            {LEAGUE_TIERS.map(tier => {
              const isCurrent = tier.id === currentLeague.id;
              return (
                <div
                  key={tier.id}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 10,
                    background: isCurrent ? `${tier.color}35` : 'rgba(255,255,255,0.03)',
                    border: isCurrent ? `2px solid ${tier.color}` : '1px solid rgba(255,255,255,0.08)',
                    color: isCurrent ? '#ffffff' : '#9ca3af',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {tier.icon} {tier.name.replace(/.*Liga d[aeos] /i, '')} ({tier.minXP} XP)
                </div>
              );
            })}
          </div>
        </div>

        {/* Competitors Ranking Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {leaderboardList.map(user => (
            <div
              key={user.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
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
                  minWidth: 26
                }}>
                  #{user.rank}
                </span>

                <span style={{ fontSize: '1.4rem' }}>{user.avatar}</span>

                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>
                    {user.name} {user.isUser ? '(Você)' : ''}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{user.league}</span>
                </div>
              </div>

              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#fbbf24', fontSize: '1.05rem' }}>
                {user.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
