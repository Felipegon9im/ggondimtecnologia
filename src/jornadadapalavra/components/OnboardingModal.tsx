import React, { useState } from 'react';
import type { UserProfile, AppLanguage, AvatarGender, AvatarStyle } from '../types';
import { audioService } from '../services/audioService';

interface OnboardingModalProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ initialProfile, onComplete }) => {
  const [name, setName] = useState(initialProfile.name || 'Peregrino');
  const [language, setLanguage] = useState<AppLanguage>(initialProfile.language || 'PT');
  const [gender, setGender] = useState<AvatarGender>(initialProfile.gender || 'MASCULINO');
  const [style, setStyle] = useState<AvatarStyle>(initialProfile.style || 'BIBLICO');

  const handleFinish = () => {
    audioService.playHarpChime();
    const updated: UserProfile = {
      ...initialProfile,
      name,
      language,
      gender,
      style,
      hasOnboarded: true
    };
    onComplete(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card" style={{
        maxWidth: 540,
        width: '100%',
        padding: 32,
        textAlign: 'center',
        border: '2px solid rgba(245, 158, 11, 0.5)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 8 }}>📖</div>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginBottom: 8 }}>
          Bem-vindo à Jornada da Palavra
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: 24, lineHeight: 1.5 }}>
          Personalize seu avatar e inicie sua caminhada diária de crescimento espiritual.
        </p>

        {/* Name Input */}
        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Seu Nome ou Apelido:
          </label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Pedro, Maria"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(0,0,0,0.3)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 600,
              outline: 'none'
            }}
          />
        </div>

        {/* Language Selector */}
        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Idioma Preferido:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { id: 'PT', label: '🇧🇷 Português' },
              { id: 'ES', label: '🇪🇸 Español' },
              { id: 'EN', label: '🇺🇸 English' }
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id as AppLanguage)}
                style={{
                  padding: '10px 8px',
                  borderRadius: 10,
                  border: language === lang.id ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  background: language === lang.id ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: language === lang.id ? '#fbbf24' : '#d1d5db',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gender Selector */}
        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Gênero do Avatar:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { id: 'MASCULINO', label: '👨 Avatar Masculino' },
              { id: 'FEMININO', label: '👩 Avatar Feminino' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => setGender(g.id as AvatarGender)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: gender === g.id ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  background: gender === g.id ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: gender === g.id ? '#fbbf24' : '#d1d5db',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selector (Biblical vs Modern) */}
        <div style={{ textAlign: 'left', marginBottom: 24 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Estilo das Vestes do Avatar:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { id: 'BIBLICO', label: '📜 Tempos Bíblicos', desc: 'Manto & Túnica' },
              { id: 'ATUAL', label: '📱 Tempos Atuais', desc: 'Visual Moderno' }
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setStyle(st.id as AvatarStyle)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: style === st.id ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  background: style === st.id ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: style === st.id ? '#fbbf24' : '#d1d5db',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>{st.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>{st.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="btn-3d gold"
          style={{ width: '100%', fontSize: '1.1rem' }}
        >
          Começar como 🌱 Semente
        </button>
      </div>
    </div>
  );
};
