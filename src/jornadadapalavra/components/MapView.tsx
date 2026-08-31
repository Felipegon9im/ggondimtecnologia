import React from 'react';
import type { UserProfile, LevelInfo } from '../types';
import { LEVELS } from '../data/levelsData';
import { audioService } from '../services/audioService';
import { ShoppingBag } from 'lucide-react';

interface MapViewProps {
  profile: UserProfile;
  onOpenEarlyAccess: (level: LevelInfo) => void;
}

export const MapView: React.FC<MapViewProps> = ({ profile, onOpenEarlyAccess }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 720, margin: '0 auto' }}>
      {/* Map Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>
          Mapa da Jornada 🗺️
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Percorra os 8 níveis de maturidade espiritual e evolua seu avatar à medida que aprende e vive a Palavra.
        </p>
      </div>

      {/* Avatar Stats & Current Rank Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(124, 58, 237, 0.15))',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: 'linear-gradient(135deg, #fbbf24, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
          }}>
            {LEVELS.find(l => l.id === profile.stats.currentLevelId)?.icon || '🌱'}
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase' }}>
              SEU PERSONAGEM ATUAL
            </div>
            <h3 style={{ color: '#ffffff', fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 800 }}>
              {profile.name} ({profile.gender === 'MASCULINO' ? '👨' : '👩'} {profile.style})
            </h3>
            <p style={{ color: '#a78bfa', fontSize: '0.85rem' }}>
              Nível {profile.stats.currentLevelId}: {LEVELS.find(l => l.id === profile.stats.currentLevelId)?.name}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>XP ACUMULADO</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
            {profile.stats.xp} XP
          </div>
        </div>
      </div>

      {/* 8 Level Path Nodes Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        alignItems: 'center',
        padding: '20px 0'
      }}>
        {LEVELS.map((lvl, index) => {
          const isUnlocked = profile.stats.currentLevelId >= lvl.id || profile.unlockedLevelIds.includes(lvl.id);
          const isCurrent = profile.stats.currentLevelId === lvl.id;

          // Zig-zag layout offset for visual map path
          const offsetHorizontal = (index % 2 === 0) ? -40 : 40;

          return (
            <div 
              key={lvl.id}
              style={{
                width: '100%',
                maxWidth: 580,
                transform: `translateX(${offsetHorizontal}px)`,
                transition: 'all 0.3s ease'
              }}
            >
              <div 
                className="glass-card"
                style={{
                  borderLeft: `6px solid ${lvl.color}`,
                  background: isCurrent 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(30, 20, 48, 0.9))' 
                    : isUnlocked 
                      ? 'rgba(30, 20, 48, 0.8)' 
                      : 'rgba(20, 14, 32, 0.5)',
                  opacity: isUnlocked ? 1 : 0.6,
                  position: 'relative',
                  padding: 22
                }}
              >
                {/* Walking Avatar Badge if Current Level */}
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: -18,
                    right: 20,
                    background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                    color: '#000000',
                    padding: '4px 12px',
                    borderRadius: 16,
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    animation: 'bounce 1.5s infinite'
                  }}>
                    🚶 Avatar Aqui
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: lvl.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: '#ffffff',
                      boxShadow: `0 4px 12px ${lvl.color}40`
                    }}>
                      {lvl.icon}
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: lvl.color, textTransform: 'uppercase' }}>
                        NÍVEL {lvl.id} • {lvl.concept}
                      </span>
                      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                        {lvl.name}
                      </h3>
                    </div>
                  </div>

                  <div style={{
                    padding: '6px 12px',
                    borderRadius: 10,
                    background: isUnlocked ? `${lvl.color}25` : 'rgba(255,255,255,0.05)',
                    color: isUnlocked ? lvl.color : '#9ca3af',
                    fontWeight: 800,
                    fontSize: '0.8rem'
                  }}>
                    {isUnlocked ? 'Desbloqueado ✓' : 'Bloqueado 🔒'}
                  </div>
                </div>

                <p style={{ color: '#d1d5db', fontSize: '0.9rem', marginBottom: 10 }}>
                  {lvl.evolutionDesc}
                </p>

                <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700, marginBottom: 12 }}>
                  🎨 Visual do Avatar: {lvl.avatarVisual}
                </div>

                {/* Unlocked Features */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 14
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    RECURSOS LIBERADOS:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {lvl.resourcesUnlocked.map((res, rIdx) => (
                      <span key={rIdx} style={{
                        fontSize: '0.75rem',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#f3f4f6',
                        padding: '3px 8px',
                        borderRadius: 6
                      }}>
                        • {res}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Early Access Button if present */}
                {!isUnlocked && lvl.earlyAccessPrice && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => { audioService.playClick(); onOpenEarlyAccess(lvl); }}
                      className="btn-3d gold"
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                    >
                      <ShoppingBag size={14} /> Acesso Antecipado ({lvl.earlyAccessPrice})
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};
