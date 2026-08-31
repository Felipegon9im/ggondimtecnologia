import React from 'react';
import type { UserProfile, DuolingoLesson } from '../types';
import { DUOLINGO_UNITS } from '../data/duolingoUnitsData';
import { LEVELS } from '../data/levelsData';
import { audioService } from '../services/audioService';
import { Lock, Check, Gift, Heart } from 'lucide-react';

interface DuolingoPathViewProps {
  profile: UserProfile;
  onStartLesson: (lesson: DuolingoLesson) => void;
  onOpenShop: () => void;
}

export const DuolingoPathView: React.FC<DuolingoPathViewProps> = ({
  profile,
  onStartLesson,
  onOpenShop
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 680, margin: '0 auto' }}>
      {/* Path Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>
          Trilha de Aprendizado 🗺️
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Siga o caminho em zigue-zague, complete as lições e avance na jornada espiritual.
        </p>
      </div>

      {/* Out of Hearts Warning Banner if hearts <= 0 */}
      {profile.stats.hearts <= 0 && (
        <div className="glass-card" style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Heart size={28} color="#ef4444" fill="#ef4444" />
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem' }}>Você ficou sem corações! ❤️</h4>
              <p style={{ color: '#d1d5db', fontSize: '0.85rem' }}>Recarregue na Loja por XP para continuar os exercícios.</p>
            </div>
          </div>

          <button
            onClick={() => { audioService.playClick(); onOpenShop(); }}
            className="btn-3d rose"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Ir para a Loja 🛒
          </button>
        </div>
      )}

      {/* Units Loop */}
      {DUOLINGO_UNITS.map((unit) => {
        const levelInfo = LEVELS.find(l => l.id === unit.levelId) || LEVELS[0];
        const isUnitUnlocked = profile.stats.currentLevelId >= unit.levelId || profile.unlockedLevelIds.includes(unit.levelId);

        return (
          <div key={unit.id} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Duolingo Unit Header Banner */}
            <div className="glass-card" style={{
              background: `linear-gradient(135deg, ${unit.color}35, rgba(30, 20, 48, 0.9))`,
              borderLeft: `6px solid ${unit.color}`,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: unit.color, textTransform: 'uppercase', letterSpacing: 1 }}>
                  ETAPA {unit.id} DE {DUOLINGO_UNITS.length}
                </span>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                  {unit.title}
                </h3>
                <p style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: 4 }}>
                  {unit.description}
                </p>
              </div>

              <div style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: `${unit.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}>
                {levelInfo.icon}
              </div>
            </div>

            {/* Duolingo Nodes Trail (Snake / Zig-Zag layout) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              padding: '10px 0'
            }}>
              {unit.lessons.map((lesson, lIdx) => {
                const isCompleted = profile.completedLessonIds.includes(lesson.id);
                const isLessonAvailable = isUnitUnlocked && (lIdx === 0 || profile.completedLessonIds.includes(unit.lessons[lIdx - 1].id));
                const isCurrentActive = isLessonAvailable && !isCompleted;

                // Zig-zag offset for nodes
                const nodeOffsets = [0, 45, 90, 45, 0, -45, -90, -45];
                const currentOffset = nodeOffsets[lIdx % nodeOffsets.length];

                return (
                  <div
                    key={lesson.id}
                    style={{
                      transform: `translateX(${currentOffset}px)`,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {/* Walking Avatar Badge if Current Active Node */}
                    {isCurrentActive && (
                      <div style={{
                        position: 'absolute',
                        top: -34,
                        background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                        color: '#000000',
                        padding: '4px 10px',
                        borderRadius: 14,
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        boxShadow: '0 4px 10px rgba(245, 158, 11, 0.5)',
                        whiteSpace: 'nowrap',
                        animation: 'bounce 1.5s infinite'
                      }}>
                        🚶 Você está aqui
                      </div>
                    )}

                    {/* Circular 3D Node Button */}
                    <button
                      disabled={!isLessonAvailable}
                      onClick={() => {
                        if (isLessonAvailable) {
                          audioService.playClick();
                          onStartLesson(lesson);
                        }
                      }}
                      className={`node-3d ${isCompleted ? 'completed' : isCurrentActive ? 'active' : 'locked'}`}
                    >
                      {isCompleted ? (
                        <Check size={32} color="#ffffff" />
                      ) : isLessonAvailable ? (
                        <span>{lesson.icon}</span>
                      ) : (
                        <Lock size={24} color="#6b7280" />
                      )}
                    </button>

                    {/* Node Title Label */}
                    <div style={{
                      marginTop: 8,
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: isCompleted ? '#34d399' : isCurrentActive ? '#fbbf24' : '#6b7280',
                      textAlign: 'center'
                    }}>
                      {lesson.title}
                    </div>
                  </div>
                );
              })}

              {/* End of Unit Reward Chest */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px dashed rgba(245, 158, 11, 0.4)',
                padding: '12px 20px',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 8
              }}>
                <Gift size={24} color="#fbbf24" />
                <span style={{ fontSize: '0.85rem', color: '#d1d5db', fontWeight: 600 }}>
                  Baú de Recompensas ao Concluir a Unidade
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};
