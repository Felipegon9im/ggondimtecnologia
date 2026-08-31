import React from 'react';
import type { UserProfile } from '../types';
import { audioService } from '../services/audioService';
import { X, Heart, Shield, ShoppingBag, Sparkles } from 'lucide-react';

interface ShopModalProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ profile, onSaveProfile, onClose }) => {
  const handleRefillHearts = () => {
    if (profile.stats.xp < 50) return;
    audioService.playHarpChime();
    const updated = { ...profile };
    updated.stats.xp -= 50;
    updated.stats.hearts = updated.stats.maxHearts;
    onSaveProfile(updated);
  };

  const handleBuyStreakFreeze = () => {
    if (profile.stats.xp < 100 || profile.stats.streakFreeze) return;
    audioService.playHarpChime();
    const updated = { ...profile };
    updated.stats.xp -= 100;
    updated.stats.streakFreeze = true;
    onSaveProfile(updated);
  };

  const handleToggleStyle = () => {
    audioService.playClick();
    const updated = { ...profile };
    updated.style = profile.style === 'BIBLICO' ? 'ATUAL' : 'BIBLICO';
    onSaveProfile(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 540,
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
          <ShoppingBag size={28} color="#fbbf24" />
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
            Loja do Reino 🛒
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Refill Hearts Item */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: 16,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Heart size={28} color="#ef4444" fill="#ef4444" />
              <div>
                <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>Recarregar Vidas (❤️ 5 Corações)</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Restaura todas as suas vidas para continuar lições.</p>
              </div>
            </div>

            <button
              onClick={handleRefillHearts}
              disabled={profile.stats.xp < 50 || profile.stats.hearts >= profile.stats.maxHearts}
              className="btn-3d gold"
              style={{
                padding: '8px 14px',
                fontSize: '0.8rem',
                opacity: (profile.stats.xp < 50 || profile.stats.hearts >= profile.stats.maxHearts) ? 0.5 : 1
              }}
            >
              50 XP
            </button>
          </div>

          {/* Streak Freeze Item */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            padding: 16,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Shield size={28} color="#06b6d4" />
              <div>
                <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>Bloqueio de Ofensiva 🧊</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Protege sua sequência se você esquecer 1 dia.</p>
              </div>
            </div>

            <button
              onClick={handleBuyStreakFreeze}
              disabled={profile.stats.xp < 100 || profile.stats.streakFreeze}
              className="btn-3d gold"
              style={{
                padding: '8px 14px',
                fontSize: '0.8rem',
                opacity: (profile.stats.xp < 100 || profile.stats.streakFreeze) ? 0.5 : 1
              }}
            >
              {profile.stats.streakFreeze ? 'Ativo ✓' : '100 XP'}
            </button>
          </div>

          {/* Avatar Outfits Item */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: 16,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Sparkles size={28} color="#a78bfa" />
              <div>
                <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>Trocar Vestes do Avatar</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                  Estilo Atual: <strong>{profile.style === 'BIBLICO' ? '📜 Tempos Bíblicos' : '📱 Tempos Atuais'}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleStyle}
              className="btn-3d purple"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              Alternar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
