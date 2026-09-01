import React, { useState } from 'react';
import type { UserProfile, AppViewMode, AppLanguage } from '../types';
import { BibleJourneyService } from '../services/bibleJourneyService';
import { audioService } from '../services/audioService';
import { Flame, Zap, Heart, ShoppingBag, Target, Trophy, Award, Volume2, VolumeX, Download, BookOpen, Compass } from 'lucide-react';

interface NavbarProps {
  profile: UserProfile;
  currentMode: AppViewMode;
  setMode: (mode: AppViewMode) => void;
  onChangeLanguage: (lang: AppLanguage) => void;
  onOpenBadges: () => void;
  onOpenShop: () => void;
  onOpenQuests: () => void;
  onOpenLeaderboard: () => void;
  pwaDeferredPrompt: any;
  onInstallPwa: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  currentMode,
  setMode,
  onChangeLanguage,
  onOpenBadges,
  onOpenShop,
  onOpenQuests,
  onOpenLeaderboard,
  pwaDeferredPrompt,
  onInstallPwa
}) => {
  const [isMuted, setIsMuted] = useState(audioService.getMuted());
  const leagueTier = BibleJourneyService.getLeagueTier(profile.stats.xp);
  const progressInfo = BibleJourneyService.getOverallProgress(profile.stats.completedChapterKeys || []);

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(13, 9, 20, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
      padding: '12px 20px'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        {/* App Title & Brand */}
        <div 
          onClick={() => { audioService.playClick(); setMode('JOURNEY_PATH'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 44,
            height: 44,
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
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#fbbf24',
              letterSpacing: 1,
              lineHeight: 1.1
            }}>
              Jornada Bíblica
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 700 }}>
                {leagueTier.icon} {leagueTier.name} • {progressInfo.percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', padding: '4px 0' }}>
          <button 
            onClick={() => { audioService.playClick(); setMode('JOURNEY_PATH'); }}
            className={`btn-nav ${currentMode === 'JOURNEY_PATH' ? 'active' : ''}`}
          >
            <Compass size={16} /> <span className="nav-text">Trilha Bíblica</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('BIBLE_READER'); }}
            className={`btn-nav ${currentMode === 'BIBLE_READER' ? 'active' : ''}`}
          >
            <BookOpen size={16} /> <span className="nav-text">Leitor Bíblico</span>
          </button>
        </nav>

        {/* Gamification Stats Counters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Hearts */}
          <div 
            onClick={() => { audioService.playClick(); onOpenShop(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '6px 10px',
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#ef4444',
              cursor: 'pointer'
            }} 
            title="Vidas / Corações (Clique para recarregar)"
          >
            <Heart size={16} fill="#ef4444" />
            <span>{profile.stats.hearts}</span>
          </div>

          {/* Streak (Caminhada do Peregrino) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 10px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#fbbf24'
          }} title="Caminhada do Peregrino (Sequência Diária)">
            <Flame size={16} fill="#fbbf24" />
            <span>{profile.stats.streakDays}d</span>
          </div>

          {/* XP */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: '6px 10px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#a78bfa'
          }} title="Pontos de Experiência">
            <Zap size={16} fill="#a78bfa" />
            <span>{profile.stats.xp} XP</span>
          </div>

          {/* Badges */}
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
            <Award size={17} color="#fbbf24" />
          </button>

          {/* Quests */}
          <button 
            onClick={() => { audioService.playClick(); onOpenQuests(); }}
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
            title="Missões Diárias"
          >
            <Target size={17} color="#fbbf24" />
          </button>

          {/* Leaderboard */}
          <button 
            onClick={() => { audioService.playClick(); onOpenLeaderboard(); }}
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
            title="Liga dos Peregrinos"
          >
            <Trophy size={17} color="#fbbf24" />
          </button>

          {/* Shop */}
          <button 
            onClick={() => { audioService.playClick(); onOpenShop(); }}
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
            title="Loja do Reino"
          >
            <ShoppingBag size={17} color="#fbbf24" />
          </button>

          {/* Language Selector */}
          <select 
            value={profile.language}
            onChange={(e) => onChangeLanguage(e.target.value as AppLanguage)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              padding: '6px 6px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <option value="PT">🇧🇷</option>
            <option value="ES">🇪🇸</option>
            <option value="EN">🇺🇸</option>
          </select>

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
            title={isMuted ? 'Ativar Sons' : 'Desativar Sons'}
          >
            {isMuted ? <VolumeX size={17} color="#ef4444" /> : <Volume2 size={17} color="#10b981" />}
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
