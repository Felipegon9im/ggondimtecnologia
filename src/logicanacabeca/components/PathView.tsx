import React from 'react';
import type { UserProgress, Module, Lesson } from '../types';
import { MODULES } from '../data/modulesData';
import { audioService } from '../services/audioService';
import { CheckCircle, Lock, Play } from 'lucide-react';

interface PathViewProps {
  progress: UserProgress;
  onStartLesson: (module: Module, lesson: Lesson) => void;
}

export const PathView: React.FC<PathViewProps> = ({
  progress,
  onStartLesson
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 700, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
          Trilha de Aprendizado 🗺️
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Siga o caminho progressivo: Teoria simples → Exemplos → Macetes → Questões de prova.
        </p>
      </div>

      {MODULES.map((mod, index) => {
        const isModuleUnlocked = index === 0 || progress.moduleMastery[MODULES[index - 1].id] !== undefined;

        return (
          <div 
            key={mod.id}
            className="glass-card"
            style={{
              opacity: isModuleUnlocked ? 1 : 0.6,
              borderLeft: `6px solid ${mod.color}`,
              padding: 24,
              position: 'relative'
            }}
          >
            {/* Module Header Banner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: mod.color, letterSpacing: 1 }}>
                  ETAPA {mod.id} DE {MODULES.length}
                </span>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                  {mod.title}
                </h3>
              </div>
              <div style={{
                padding: '8px 14px',
                borderRadius: 12,
                background: `${mod.color}20`,
                color: mod.color,
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                {isModuleUnlocked ? 'Destravado' : 'Bloqueado'}
              </div>
            </div>

            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: 20 }}>
              {mod.shortDesc}
            </p>

            {/* Lessons Path Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              {mod.lessons.map((lesson, lIdx) => {
                const isCompleted = progress.completedLessonIds.includes(lesson.id);
                const isLessonAvailable = isModuleUnlocked && (lIdx === 0 || progress.completedLessonIds.includes(mod.lessons[lIdx - 1].id));

                return (
                  <div key={lesson.id} style={{ width: '100%', maxWidth: 500 }}>
                    <button
                      disabled={!isLessonAvailable}
                      onClick={() => {
                        if (isLessonAvailable) {
                          audioService.playClick();
                          onStartLesson(mod, lesson);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: 16,
                        border: isCompleted 
                          ? '2px solid #10b981' 
                          : isLessonAvailable 
                            ? `2px solid ${mod.color}` 
                            : '1px solid rgba(255,255,255,0.08)',
                        background: isCompleted
                          ? 'rgba(16, 185, 129, 0.1)'
                          : isLessonAvailable
                            ? `linear-gradient(135deg, ${mod.color}20, rgba(15, 23, 42, 0.8))`
                            : 'rgba(255,255,255,0.02)',
                        cursor: isLessonAvailable ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
                        <div style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: isCompleted ? '#10b981' : isLessonAvailable ? mod.color : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          flexShrink: 0
                        }}>
                          {isCompleted ? (
                            <CheckCircle size={22} color="#ffffff" />
                          ) : isLessonAvailable ? (
                            <Play size={20} fill="#ffffff" />
                          ) : (
                            <Lock size={18} color="#6b7280" />
                          )}
                        </div>

                        <div>
                          <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>
                            {lesson.title}
                          </div>
                          <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                            {lesson.description}
                          </div>
                        </div>
                      </div>

                      {lesson.macete && (
                        <span style={{
                          fontSize: '0.75rem',
                          background: 'rgba(245, 158, 11, 0.2)',
                          color: '#f59e0b',
                          padding: '4px 8px',
                          borderRadius: 8,
                          fontWeight: 700,
                          whiteSpace: 'nowrap'
                        }}>
                          Macete V/F 💡
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
