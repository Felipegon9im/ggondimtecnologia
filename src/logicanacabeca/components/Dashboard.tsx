import React from 'react';
import type { UserProgress, AppViewMode, MasteryLevel } from '../types';
import { MODULES } from '../data/modulesData';
import { SRSEngine } from '../services/srsEngine';
import { audioService } from '../services/audioService';
import { Play, Zap, Clock, Table, RotateCcw } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  setMode: (mode: AppViewMode) => void;
  onSelectModule: (moduleId: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  setMode,
  onSelectModule
}) => {
  const overallProgress = SRSEngine.calculateOverallProgress(progress, MODULES.length);
  const dueSRSCount = SRSEngine.getDueReviewQuestionIds(progress.srsItems).length;

  const renderMasteryBadge = (level: MasteryLevel | undefined) => {
    switch (level) {
      case 'EXAM_MASTER':
        return <span className="badge-pill exam-master">🔥 Domínio Concurso</span>;
      case 'MASTERED':
        return <span className="badge-pill mastered">🟢 Domino</span>;
      case 'EASY':
        return <span className="badge-pill easy">🟡 Consigo Fácil</span>;
      case 'LEARNING':
        return <span className="badge-pill learning">🟠 Aprendendo</span>;
      default:
        return <span className="badge-pill not-started">🔴 Não Conheço</span>;
    }
  };

  const accuracyRate = progress.stats.questionsAnswered > 0
    ? Math.round((progress.stats.correctAnswers / progress.stats.questionsAnswered) * 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome Hero Box */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(236, 72, 153, 0.15) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        padding: '32px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20
      }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#a78bfa'
            }}>
              Nível {progress.stats.level} Concurseiro
            </span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Meta Diária: {progress.stats.dailyXP}/{progress.stats.dailyGoalXP} XP</span>
          </div>

          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: 8,
            color: '#ffffff'
          }}>
            Pronto para fixar a lógica na memória? 🧠
          </h2>
          <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: 540 }}>
            Treine com microlições, automatize seus reflexos em questões de prova e acompanhe sua evolução em tempo real.
          </p>

          {/* Daily XP Progress Bar */}
          <div style={{ marginTop: 16, maxWidth: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af', marginBottom: 4 }}>
              <span>Progresso da Meta Hoje</span>
              <span>{Math.min(100, Math.round((progress.stats.dailyXP / progress.stats.dailyGoalXP) * 100))}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${Math.min(100, (progress.stats.dailyXP / progress.stats.dailyGoalXP) * 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Action Call Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
          <button 
            onClick={() => { audioService.playClick(); setMode('MODULES_PATH'); }}
            className="btn-3d purple"
          >
            <Play size={18} fill="#ffffff" /> Continuar Trilha
          </button>
          <button 
            onClick={() => { audioService.playClick(); setMode('SPEED_TRAIN'); }}
            className="btn-3d amber"
          >
            <Zap size={18} fill="#ffffff" /> Treino de Automatização
          </button>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12
      }}>
        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>PROGRESSO GERAL</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: '#a78bfa' }}>
            {overallProgress}%
          </div>
        </div>

        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>QUESTÕES RESOLVIDAS</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: '#ec4899' }}>
            {progress.stats.questionsAnswered}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>TAXA DE ACERTO</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>
            {accuracyRate}%
          </div>
        </div>

        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>REVISÃO HOJE</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: dueSRSCount > 0 ? '#ef4444' : '#6b7280' }}>
            {dueSRSCount}
          </div>
        </div>
      </div>

      {/* SRS Alert Banner if due */}
      {dueSRSCount > 0 && (
        <div className="glass-card" style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RotateCcw size={22} color="#ef4444" />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>{dueSRSCount} questão(ões) pendente(s) de revisão!</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>O algoritmo agendou estas questões para fixar o aprendizado na memória de longo prazo.</p>
            </div>
          </div>
          <button 
            onClick={() => { audioService.playClick(); setMode('SRS_REVIEW'); }}
            className="btn-3d rose"
          >
            Revisar Agora
          </button>
        </div>
      )}

      {/* Fast Quick Action Tools */}
      <div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: 12, color: '#ffffff' }}>
          Modos Principais & Ferramentas
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 16
        }}>
          {/* Trilha de Módulos */}
          <div 
            onClick={() => { audioService.playClick(); setMode('MODULES_PATH'); }}
            className="glass-card"
            style={{ cursor: 'pointer', borderLeft: '4px solid #8b5cf6' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ padding: 10, borderRadius: 10, background: 'rgba(139, 92, 246, 0.2)' }}>
                <Play size={20} color="#8b5cf6" />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700 }}>Trilha Teórica</h4>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Aprenda módulo a módulo do zero com teoria prática em Português e macetes V/F.
            </p>
          </div>

          {/* Treino de Automatização */}
          <div 
            onClick={() => { audioService.playClick(); setMode('SPEED_TRAIN'); }}
            className="glass-card"
            style={{ cursor: 'pointer', borderLeft: '4px solid #f59e0b' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ padding: 10, borderRadius: 10, background: 'rgba(245, 158, 11, 0.2)' }}>
                <Zap size={20} color="#f59e0b" />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700 }}>Treino de Automatização 🧠</h4>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Flash cards rápidos para gravar na cabeça o valor de V ∧ F, V → F e símbolos automaticamente.
            </p>
          </div>

          {/* Modo Concurso */}
          <div 
            onClick={() => { audioService.playClick(); setMode('EXAM_SIMULATOR'); }}
            className="glass-card"
            style={{ cursor: 'pointer', borderLeft: '4px solid #ec4899' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ padding: 10, borderRadius: 10, background: 'rgba(236, 72, 153, 0.2)' }}>
                <Clock size={20} color="#ec4899" />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700 }}>Modo Concurso 📝</h4>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Simulados cronometrados com questões reais de bancas (Cebraspe, FGV, FCC, Vunesp).
            </p>
          </div>

          {/* Tabela Verdade Interativa */}
          <div 
            onClick={() => { audioService.playClick(); setMode('TRUTH_TABLE'); }}
            className="glass-card"
            style={{ cursor: 'pointer', borderLeft: '4px solid #10b981' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ padding: 10, borderRadius: 10, background: 'rgba(16, 185, 129, 0.2)' }}>
                <Table size={20} color="#10b981" />
              </div>
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700 }}>Tabelas Interativas ⚡</h4>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.4 }}>
              Preencha tabelas-verdade célula a célula e receba correção instantânea.
            </p>
          </div>
        </div>
      </div>

      {/* Module Mastery Status Grid (11 Modules) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
            Maestria por Módulo ({MODULES.length} Módulos)
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Toque em um módulo para estudar</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16
        }}>
          {MODULES.map(mod => {
            const mastery = progress.moduleMastery[mod.id] || 'NOT_STARTED';
            return (
              <div 
                key={mod.id}
                onClick={() => { audioService.playClick(); onSelectModule(mod.id); }}
                className="glass-card"
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: mod.color,
                    background: `${mod.color}20`,
                    padding: '3px 8px',
                    borderRadius: 6
                  }}>
                    MÓDULO {mod.id}
                  </span>
                  {renderMasteryBadge(mastery)}
                </div>

                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: 6 }}>
                  {mod.title.split('—')[1] || mod.title}
                </h4>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.4, marginBottom: 12 }}>
                  {mod.shortDesc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                  <span>{mod.lessons.length} Lições</span>
                  <span style={{ color: '#a78bfa', fontWeight: 600 }}>Acessar &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
