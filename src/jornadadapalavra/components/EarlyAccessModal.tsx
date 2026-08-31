import React from 'react';
import type { LevelInfo, UserProfile } from '../types';
import { audioService } from '../services/audioService';
import { X, Check, ShieldCheck, ShoppingBag } from 'lucide-react';

interface EarlyAccessModalProps {
  level: LevelInfo;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  level,
  profile,
  onSaveProfile,
  onClose
}) => {
  const handleSimulateSubscription = () => {
    audioService.playLevelUp();

    const updated = { ...profile };
    if (!updated.unlockedLevelIds.includes(level.id)) {
      updated.unlockedLevelIds.push(level.id);
    }
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 540,
        width: '100%',
        padding: 30,
        textAlign: 'center',
        border: '2px solid #fbbf24',
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

        <div style={{ fontSize: '3rem', marginBottom: 6 }}>{level.icon}</div>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24', marginBottom: 4 }}>
          Acesso Antecipado ao Nível {level.name}
        </h2>
        <span style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700 }}>
          Assinatura de Conveniência • {level.earlyAccessPrice} / mês
        </span>

        {/* Principles Box */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 16,
          borderRadius: 12,
          textAlign: 'left',
          margin: '20px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontWeight: 800, fontSize: '0.85rem', marginBottom: 6 }}>
            <ShieldCheck size={18} /> PRINCIPIOS DE REINO & TRANSPARÊNCIA:
          </div>

          <ul style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: 1.5, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong>Caminho Orgânico (Gratuito):</strong> Qualquer pessoa pode alcançar este nível sem pagar nada, apenas com constância e aprendizado!</li>
            <li><strong>Acesso Antecipado:</strong> O pagamento é apenas para conveniência e acesso adiantado aos recursos, não representando mérito espiritual superior.</li>
          </ul>
        </div>

        {/* Features to unlock */}
        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
            RECURSOS LIBERADOS NESTE NÍVEL:
          </div>
          {level.resourcesUnlocked.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ffffff', fontSize: '0.9rem', marginBottom: 4 }}>
              <Check size={16} color="#fbbf24" /> {r}
            </div>
          ))}
        </div>

        <button
          onClick={handleSimulateSubscription}
          className="btn-3d gold"
          style={{ width: '100%', fontSize: '1rem' }}
        >
          <ShoppingBag size={18} /> Simular Acesso Antecipado por {level.earlyAccessPrice}
        </button>
      </div>
    </div>
  );
};
