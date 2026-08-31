import React, { useState } from 'react';
import type { UserProfile, Devotional } from '../types';
import { DEVOTIONALS } from '../data/devotionalsData';
import { LEVELS } from '../data/levelsData';
import { audioService } from '../services/audioService';
import { CheckCircle, Share2, Play, Flame, HelpCircle } from 'lucide-react';

interface FeedViewProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onOpenQuiz: (devotional: Devotional) => void;
  onGoToBible: () => void;
  onGoToMap: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  profile,
  onSaveProfile,
  onOpenQuiz,
  onGoToBible,
  onGoToMap
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const currentLevel = LEVELS.find(l => l.id === profile.stats.currentLevelId) || LEVELS[0];

  const handleToggleReadToday = () => {
    audioService.playCorrect();
    const updated = { ...profile };
    updated.stats.readToday = !updated.stats.readToday;

    if (updated.stats.readToday) {
      updated.stats.xp += 10;
      updated.stats.dailyXP += 10;
    }
    onSaveProfile(updated);
  };

  const handleShare = async (dev: Devotional) => {
    audioService.playClick();
    const text = `📖 *Jornada da Palavra*: "${dev.title}"\n${dev.passage}: ${dev.passageText}\n\nLeia mais e cresça diariamente: https://www.ggondimtecnologia.com.br/jornadadapalavra.html`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: dev.title,
          text: text,
          url: 'https://www.ggondimtecnologia.com.br/jornadadapalavra.html'
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(dev.id);
      setTimeout(() => setCopiedId(null), 3000);
    }

    const updated = { ...profile };
    updated.stats.sharedCount += 1;
    updated.stats.peopleReached += 2;
    updated.stats.xp += 5;

    const shareBadge = updated.badges.find(b => b.id === 'evangelist_share');
    if (shareBadge && updated.stats.sharedCount >= 5) {
      shareBadge.unlocked = true;
    }

    onSaveProfile(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Daily Bible Check Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(124, 58, 237, 0.15) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Flame size={20} color="#fbbf24" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24' }}>
              Sequência: {profile.stats.streakDays} Dias Seguidos!
            </span>
          </div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
            Você já leu sua Bíblia hoje? 📖
          </h2>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
            Pequenos momentos diários transformam o seu crescimento na Palavra.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleToggleReadToday}
            className={`btn-3d ${profile.stats.readToday ? 'emerald' : 'gold'}`}
          >
            <CheckCircle size={18} /> {profile.stats.readToday ? 'Sim, Concluído! ✓' : 'Marcar Leitura de Hoje'}
          </button>
          <button
            onClick={onGoToBible}
            className="btn-3d purple"
          >
            Abrir Bíblia
          </button>
        </div>
      </div>

      {/* Level Avatar Progress Bar */}
      <div className="glass-card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.4rem' }}>{currentLevel.icon}</span>
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>
                {profile.name} — Nível {currentLevel.id}: {currentLevel.name}
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{currentLevel.concept} — {currentLevel.avatarVisual}</span>
            </div>
          </div>
          <button
            onClick={onGoToMap}
            style={{
              background: 'none',
              border: 'none',
              color: '#fbbf24',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            Ver Mapa &rarr;
          </button>
        </div>

        <div className="progress-bar-container" style={{ marginTop: 8 }}>
          <div 
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, (profile.stats.xp / (currentLevel.minXP + 250)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Vertical Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24' }}>
          Devocionais & Histórias Bíblicas 📱
        </h3>

        {DEVOTIONALS.map(dev => {
          const isCompleted = profile.completedDevotionalIds.includes(dev.id);

          return (
            <div key={dev.id} className="glass-card" style={{ padding: 24, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#fbbf24',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '4px 10px',
                  borderRadius: 8
                }}>
                  {dev.passage}
                </span>

                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{dev.date}</span>
              </div>

              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                {dev.title}
              </h3>

              {/* Bible Passage Block */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderLeft: '4px solid #f59e0b',
                padding: 14,
                borderRadius: 10,
                marginBottom: 14,
                fontStyle: 'italic',
                color: '#f3f4f6',
                fontSize: '0.95rem',
                lineHeight: 1.5
              }}>
                "{dev.passageText}"
              </div>

              {/* Reflection */}
              <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 18 }}>
                {dev.reflection}
              </p>

              {/* Video Banner if present */}
              {dev.videoTitle && (
                <div style={{
                  background: 'rgba(124, 58, 237, 0.2)',
                  border: '1px solid rgba(124, 58, 237, 0.4)',
                  padding: 14,
                  borderRadius: 12,
                  marginBottom: 18,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}>
                    <Play size={20} fill="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase' }}>
                      VÍDEO / HISTÓRIA BÍBLICA
                    </div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9rem' }}>
                      {dev.videoTitle}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Quiz & Share */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <button
                  onClick={() => onOpenQuiz(dev)}
                  className={`btn-3d ${isCompleted ? 'emerald' : 'purple'}`}
                  style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <HelpCircle size={16} /> {isCompleted ? 'Quiz Concluído ✓' : 'Fazer Quiz +15 XP'}
                </button>

                <button
                  onClick={() => handleShare(dev)}
                  className="btn-3d gold"
                  style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <Share2 size={16} /> {copiedId === dev.id ? 'Copiado para Enviar!' : 'Compartilhar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
