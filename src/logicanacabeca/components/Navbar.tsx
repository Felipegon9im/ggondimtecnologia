import React from 'react';
import type { UserProgress, AppViewMode } from '../types';
import { audioService } from '../services/audioService';
import { Flame, Zap, Award, Volume2, VolumeX, Download, BookOpen, Brain, Clock, Table, CircleDot, RotateCcw } from 'lucide-react';

interface NavbarProps {
  progress: UserProgress;
  currentMode: AppViewMode;
  setMode: (mode: AppViewMode) => void;
  onOpenBadges: () => void;
  pwaDeferredPrompt: any;
  onInstallPwa: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  currentMode,
  setMode,
  onOpenBadges,
  pwaDeferredPrompt,
  onInstallPwa
}) => {
  const [isMuted, setIsMuted] = React.useState(audioService.getMuted());

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
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
        {/* Logo / Title */}
        <div 
          onClick={() => { audioService.playClick(); setMode('DASHBOARD'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
          }}>
            <Brain size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #ffffff 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}>
              Lógica na Cabeça
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600 }}>Raciocínio para Concursos</span>
          </div>
        </div>

        {/* Mode Navigation Buttons */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', padding: '4px 0' }}>
          <button 
            onClick={() => { audioService.playClick(); setMode('DASHBOARD'); }}
            className={`btn-nav ${currentMode === 'DASHBOARD' ? 'active' : ''}`}
            title="Painel Geral"
          >
            <BookOpen size={16} /> <span className="nav-text">Início</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('MODULES_PATH'); }}
            className={`btn-nav ${currentMode === 'MODULES_PATH' ? 'active' : ''}`}
            title="Trilha dos Módulos"
          >
            <Brain size={16} /> <span className="nav-text">Trilha</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('SPEED_TRAIN'); }}
            className={`btn-nav ${currentMode === 'SPEED_TRAIN' ? 'active' : ''}`}
            title="Treino de Automatização"
          >
            <Zap size={16} color="#f59e0b" /> <span className="nav-text">Treino 🧠</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('EXAM_SIMULATOR'); }}
            className={`btn-nav ${currentMode === 'EXAM_SIMULATOR' ? 'active' : ''}`}
            title="Modo Concurso"
          >
            <Clock size={16} color="#ec4899" /> <span className="nav-text">Simulado</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('TRUTH_TABLE'); }}
            className={`btn-nav ${currentMode === 'TRUTH_TABLE' ? 'active' : ''}`}
            title="Tabela-Verdade Interativa"
          >
            <Table size={16} color="#10b981" /> <span className="nav-text">Tabelas</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('DIAGRAMS'); }}
            className={`btn-nav ${currentMode === 'DIAGRAMS' ? 'active' : ''}`}
            title="Diagramas Lógicos"
          >
            <CircleDot size={16} color="#06b6d4" /> <span className="nav-text">Diagramas</span>
          </button>

          <button 
            onClick={() => { audioService.playClick(); setMode('SRS_REVIEW'); }}
            className={`btn-nav ${currentMode === 'SRS_REVIEW' ? 'active' : ''}`}
            title="Revisão Espaçada"
          >
            <RotateCcw size={16} color="#8b5cf6" /> <span className="nav-text">Revisar</span>
          </button>
        </nav>

        {/* Stat Counters & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Streak */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: '0.875rem',
            fontWeight: 800,
            color: '#f59e0b'
          }} title="Dias Seguidos Estudando">
            <Flame size={18} fill="#f59e0b" />
            <span>{progress.stats.streakDays}d</span>
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
            fontSize: '0.875rem',
            fontWeight: 800,
            color: '#a78bfa'
          }} title="Pontos de Experiência">
            <Zap size={18} fill="#a78bfa" />
            <span>{progress.stats.xp} XP</span>
          </div>

          {/* Badges Modal Button */}
          <button 
            onClick={() => { audioService.playClick(); onOpenBadges(); }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 8,
              borderRadius: 12,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Conquistas e Medalhas"
          >
            <Award size={18} color="#ec4899" />
          </button>

          {/* Audio Mute Toggle */}
          <button 
            onClick={handleToggleMute}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 8,
              borderRadius: 12,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Desativar Sons'}
          >
            {isMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} color="#10b981" />}
          </button>

          {/* PWA Install Button if available */}
          {pwaDeferredPrompt && (
            <button
              onClick={onInstallPwa}
              className="btn-3d purple"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              <Download size={14} /> Baixar App
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
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
          color: #a78bfa;
        }
        @media (max-width: 640px) {
          .nav-text { display: none; }
        }
      `}</style>
    </header>
  );
};
