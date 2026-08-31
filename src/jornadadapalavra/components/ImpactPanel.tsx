import React from 'react';
import type { UserProfile } from '../types';
import { audioService } from '../services/audioService';
import { Users, Share2, Heart, Shield, Crown } from 'lucide-react';

interface ImpactPanelProps {
  profile: UserProfile;
}

export const ImpactPanel: React.FC<ImpactPanelProps> = ({ profile }) => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>
          Painel de Impacto Espiritual 🤝
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Veja como sua constância e compartilhamento estão multiplicando sementes do Reino.
        </p>
      </div>

      {/* Impact Numbers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16
      }}>
        <div className="glass-card" style={{ padding: 20, textAlign: 'center', borderLeft: '4px solid #f59e0b' }}>
          <Users size={28} color="#f59e0b" style={{ marginBottom: 8 }} />
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>PESSOAS ALCANÇADAS</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
            {profile.stats.peopleReached}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 20, textAlign: 'center', borderLeft: '4px solid #8b5cf6' }}>
          <Share2 size={28} color="#8b5cf6" style={{ marginBottom: 8 }} />
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>CONTEÚDOS COMPARTILHADOS</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
            {profile.stats.sharedCount}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 20, textAlign: 'center', borderLeft: '4px solid #10b981' }}>
          <Heart size={28} color="#10b981" style={{ marginBottom: 8 }} />
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>DEVOCIONAIS LIDOS</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
            {profile.stats.devotionalsCompleted}
          </div>
        </div>
      </div>

      {/* Nível Cooperador (Visão de Impacto) */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: '1.5rem' }}>🤝</span>
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Visão do Cooperador — Indicadores Agregados
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Nível 6 de Maturidade Espiritual</span>
          </div>
        </div>
        <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 16 }}>
          O Cooperador utiliza as métricas de impacto para servir sua comunidade e acompanhar como o evangelho está transbordando organicamente.
        </p>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: 16,
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem'
        }}>
          <span>Crescimento de Influência Espiritual</span>
          <span style={{ color: '#10b981', fontWeight: 800 }}>+24% este mês</span>
        </div>
      </div>

      {/* Nível Mordomo (Cuidado & Equipe com Consentimento) */}
      <div className="glass-card" style={{ padding: 24, borderLeft: '4px solid #ec4899' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Shield size={24} color="#ec4899" />
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              Mordomo — Cuidado de Vidas & Privacidade
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#ec4899' }}>Nível 7 • Consentimento Prévio & Respeito</span>
          </div>
        </div>
        <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 16 }}>
          Somente pessoas que voluntariamente aceitarem participar do seu grupo poderão compartilhar o progresso bíblico. Ferramentas feitas para incentivar e cuidar, e não vigiar.
        </p>

        <button 
          onClick={() => audioService.playHarpChime()}
          className="btn-3d purple"
          style={{ width: '100%', fontSize: '0.9rem' }}
        >
          Criar Grupo de Cuidado Voluntário
        </button>
      </div>

      {/* Nível Embaixador da Palavra */}
      <div className="glass-card" style={{
        padding: 24,
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(30, 20, 48, 0.9))',
        border: '2px solid #fbbf24'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Crown size={28} color="#fbbf24" />
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24' }}>
              Embaixador da Palavra — Representação Territorial
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#ffffff' }}>Nível 8 • Representante em sua cidade ou região</span>
          </div>
        </div>
        <p style={{ color: '#f3f4f6', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 18 }}>
          Torne-se a referência digital e presencial do projeto em seu bairro ou município. Liberado mediante autorização e constância comprovada na Palavra.
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => audioService.playLevelUp()}
            className="btn-3d gold"
            style={{ flex: 1, fontSize: '0.85rem' }}
          >
            Baixar Kit Digital de Divulgação
          </button>
        </div>
      </div>
    </div>
  );
};
