import React, { useState } from 'react';
import type { UserProfile, AppViewMode, AppLanguage } from '../types';
import { LEVELS } from '../data/levelsData';
import { audioService } from '../services/audioService';
import { Flame, Zap, Award, Volume2, VolumeX, Download, BookOpen, MapPin, Compass, Layers } from 'lucide-react';

interface NavbarProps {
  profile: UserProfile;
  currentMode: AppViewMode;
  setMode: (mode: AppViewMode) => void;
  onChangeLanguage: (lang: AppLanguage) => void;
  onOpenBadges: () => void;
  pwaDeferredPrompt: any;
  onInstallPwa: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  currentMode,
  setMode,
  onChangeLanguage,
  onOpenBadges,
  pwaDeferredPrompt,
  onInstallPwa
}) => {
  const [isMuted, setIsMuted] = useState(audioService.getMuted());
  const currentLevel = LEVELS.find(l => l.id === profile.stats.currentLevelId) || LEVELS[0];

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(13, 9, 20, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
      padding: '12px 20px'
    }}>
      <div style={{
        maxWidth: 1050,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        {/* Title & Brand */}
        <div 
          onClick={() => { audioService.playClick(); setMode('FEED'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #fbbf24, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
          }}>
            <span style={{ fontSize: '1.4rem' }}>📖</span>
          </div>
          <div>
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#fbbf24',
              letterSpacing: 1,
              lineHeight: 1.1
            }}>
              Jornada da Palavra
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700 }}>
                {currentLevel.icon} {currentLevel.name}
              </span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 6, color: '#d1d5db' }}>
                {profile.style === 'BIBLICO' ? 'Época Bíblica' : 'Atual'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', padding: '4px 0' }}>
          <button 
            onClick={() => { audioService.playClick(); setMode('FEED'); }}
            className={`btn-nav ${currentMode === 'FEED' ? 'active' : ''}`}
          >
            <Compass size={16} /> <span className="nav-text">Feed</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('MAP'); }}
            className={`btn-nav ${currentMode === 'MAP' ? 'active' : ''}`}
          >
            <MapPin size={16} /> <span className="nav-text">Mapa</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('BIBLE'); }}
            className={`btn-nav ${currentMode === 'BIBLE' ? 'active' : ''}`}
          >
            <BookOpen size={16} /> <span className="nav-text">Bíblia</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('IMPACT'); }}
            className={`btn-nav ${currentMode === 'IMPACT' ? 'active' : ''}`}
          >
            <Layers size={16} /> <span className="nav-text">Impacto</span>
          </button>
        </nav>

        {/* Counters & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Streak */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#fbbf24'
          }} title="Sequência Diária">
            <Flame size={17} fill="#fbbf24" />
            <span>{profile.stats.streakDays}d</span>
          </div>

          {/* XP */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#a78bfa'
          }} title="Pontos de Experiência">
            <Zap size={17} fill="#a78bfa" />
            <span>{profile.stats.xp} XP</span>
          </div>

          {/* Language Selector */}
          <select 
            value={profile.language}
            onChange={(e) => onChangeLanguage(e.target.value as AppLanguage)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '6px 8px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <option value="PT">🇧🇷 PT</option>
            <option value="ES">🇪🇸 ES</option>
            <option value="EN">🇺🇸 EN</option>
          </select>

          {/* Badges Modal */}
          <button 
            onClick={() => { audioService.playClick(); onOpenBadges(); }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 8,
              borderRadius: 10,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Conquistas"
          >
            <Award size={18} color="#fbbf24" />
          </button>

          {/* Audio Toggle */}
          <button 
            onClick={handleToggleMute}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 8,
              borderRadius: 10,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Desativar Sons'}
          >
            {isMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} color="#10b981" />}
          </button>

          {/* PWA Install Button */}
          {pwaDeferredPrompt && (
            <button
              onClick={onInstallPwa}
              className="btn-3d gold"
              style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            >
              <Download size={14} /> Instalar
            </button>
          )}
        </div>
      </div>

      <style>{`
        .btn-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          color: #9ca3af;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .btn-nav:hover {
          background: rgba(255,255,255,0.08);
          color: #ffffff;
        }
        .btn-nav.active {
          background: rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.5);
          color: #fbbf24;
        }
        @media (max-width: 640px) {
          .nav-text { display: none; }
        }
      `}</style>
    </header>
  );
};
