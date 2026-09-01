import React, { useState, useEffect } from 'react';
import type { UserProfile, BibleTerritory } from '../types';
import { BIBLE_TERRITORIES, TOTAL_BIBLE_CHAPTERS, BibleJourneyService } from '../services/bibleJourneyService';
import { audioService } from '../services/audioService';
import { Check, Lock, Gift, Heart, Sparkles, Search, BookOpen } from 'lucide-react';

interface BibleJourneyPathViewProps {
  profile: UserProfile;
  onOpenChapter: (bookId: string, chapterNum: number) => void;
  onClaimBookChest: (territory: BibleTerritory) => void;
  onOpenShop: () => void;
}

export const BibleJourneyPathView: React.FC<BibleJourneyPathViewProps> = ({
  profile,
  onOpenChapter,
  onClaimBookChest,
  onOpenShop
}) => {
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const completedKeys = profile.stats.completedChapterKeys || [];
  const progressInfo = BibleJourneyService.getOverallProgress(completedKeys);

  // Responsive zig-zag offsets depending on viewport width
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 768;
  const maxOffset = isMobile ? 32 : isTablet ? 55 : 85;
  const offsets = [0, maxOffset / 2, maxOffset, maxOffset / 2, 0, -maxOffset / 2, -maxOffset, -maxOffset / 2];

  // Filter territories
  const filteredTerritories = BIBLE_TERRITORIES.filter(t => {
    if (selectedBookFilter !== 'ALL' && t.id !== selectedBookFilter) return false;
    if (searchTerm && !t.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720, margin: '0 auto', width: '100%' }}>
      {/* Header Banner: Overall Bible Journey Progress */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(124, 58, 237, 0.25))',
        border: '2px solid rgba(245, 158, 11, 0.4)',
        padding: isMobile ? 16 : 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              🗺️ PEREGRINAÇÃO BÍBLICA • GÊNESIS A APOCALIPSE
            </span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
              Jornada na Palavra de Deus
            </h2>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: isMobile ? '6px 12px' : '8px 16px',
            borderRadius: 14,
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: isMobile ? '0.95rem' : '1.1rem'
          }}>
            {progressInfo.percentage}% CONCLUÍDO
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container" style={{ height: 12, marginBottom: 10 }}>
          <div className="progress-bar-fill" style={{ width: `${progressInfo.percentage}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: isMobile ? '0.78rem' : '0.85rem', color: '#d1d5db', fontWeight: 600, flexWrap: 'wrap', gap: 4 }}>
          <span>Capítulos lidos: <strong>{progressInfo.totalCompleted}</strong> de {TOTAL_BIBLE_CHAPTERS}</span>
          <span>66 Livros</span>
        </div>
      </div>

      {/* Out of Hearts Warning if hearts <= 0 */}
      {profile.stats.hearts <= 0 && (
        <div className="glass-card" style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart size={24} color="#ef4444" fill="#ef4444" />
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.95rem' }}>Sem Vidas no Momento! ❤️</h4>
              <p style={{ color: '#d1d5db', fontSize: '0.8rem' }}>Recarregue na Loja por XP para continuar.</p>
            </div>
          </div>

          <button
            onClick={() => { audioService.playClick(); onOpenShop(); }}
            className="btn-3d rose"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            Ir para a Loja 🛒
          </button>
        </div>
      )}

      {/* Book Jump & Search Selector */}
      <div className="glass-card" style={{ padding: isMobile ? 12 : 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 180 }}>
            <BookOpen size={16} color="#fbbf24" />
            <select
              value={selectedBookFilter}
              onChange={(e) => {
                audioService.playClick();
                setSelectedBookFilter(e.target.value);
              }}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#ffffff',
                padding: '8px 10px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: isMobile ? '0.82rem' : '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">🌐 Todos os 66 Livros da Bíblia</option>
              <optgroup label="ANTIGO TESTAMENTO (39 LIVROS)">
                {BIBLE_TERRITORIES.filter(t => t.testament === 'OLD').map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.chaptersCount} cap.)</option>
                ))}
              </optgroup>
              <optgroup label="NOVO TESTAMENTO (27 LIVROS)">
                {BIBLE_TERRITORIES.filter(t => t.testament === 'NEW').map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.chaptersCount} cap.)</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div style={{ position: 'relative', width: isMobile ? '100%' : 'auto', minWidth: 140 }}>
            <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: 10 }} />
            <input
              type="text"
              placeholder="Buscar livro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px 7px 30px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(0,0,0,0.3)',
                color: '#ffffff',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Territories Loop */}
      {filteredTerritories.map((territory) => {
        let completedInBook = 0;
        for (let ch = 1; ch <= territory.chaptersCount; ch++) {
          const key = BibleJourneyService.getChapterKey(territory.id, ch);
          if (completedKeys.includes(key)) completedInBook++;
        }

        const isBookFullyCompleted = completedInBook >= territory.chaptersCount;
        const isChestClaimed = profile.stats.claimedChestBookIds?.includes(territory.id);

        return (
          <div key={territory.id} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Territory Header Banner */}
            <div className="glass-card" style={{
              background: `linear-gradient(135deg, ${territory.color}35, rgba(30, 20, 48, 0.9))`,
              borderLeft: `5px solid ${territory.color}`,
              padding: isMobile ? '14px 16px' : '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: territory.color, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  TERRITÓRIO {territory.testament === 'OLD' ? 'ANTIGO' : 'NOVO'} TESTAMENTO • {territory.chaptersCount} CAPÍTULOS
                </span>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                  {territory.name}
                </h3>
                <p style={{ color: '#d1d5db', fontSize: isMobile ? '0.78rem' : '0.85rem', marginTop: 2 }}>
                  {territory.description}
                </p>
              </div>

              <div style={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                borderRadius: 12,
                background: `${territory.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '1.3rem' : '1.6rem',
                flexShrink: 0
              }}>
                {territory.icon}
              </div>
            </div>

            {/* Chapters Trail Nodes (Responsive Zig-Zag Layout) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? 18 : 22,
              padding: '10px 0'
            }}>
              {Array.from({ length: territory.chaptersCount }, (_, i) => i + 1).map((chNum, chIdx) => {
                const chapterKey = BibleJourneyService.getChapterKey(territory.id, chNum);
                const isCompleted = completedKeys.includes(chapterKey);

                const prevKey = chNum > 1 ? BibleJourneyService.getChapterKey(territory.id, chNum - 1) : null;
                const isAvailable = chNum === 1 || (prevKey && completedKeys.includes(prevKey)) || isCompleted;
                const isCurrentActive = isAvailable && !isCompleted;

                const currentOffset = offsets[chIdx % offsets.length];

                return (
                  <div
                    key={chapterKey}
                    style={{
                      transform: `translateX(${currentOffset}px)`,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {/* Active Chapter Badge */}
                    {isCurrentActive && (
                      <div style={{
                        position: 'absolute',
                        top: isMobile ? -28 : -34,
                        background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                        color: '#000000',
                        padding: isMobile ? '3px 8px' : '4px 10px',
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: isMobile ? '0.68rem' : '0.75rem',
                        boxShadow: '0 4px 10px rgba(245, 158, 11, 0.5)',
                        whiteSpace: 'nowrap',
                        animation: 'bounce 1.5s infinite'
                      }}>
                        🚶 Capítulo Atual
                      </div>
                    )}

                    {/* Circular 3D Chapter Node Button */}
                    <button
                      disabled={!isAvailable}
                      onClick={() => {
                        if (isAvailable) {
                          audioService.playClick();
                          onOpenChapter(territory.id, chNum);
                        }
                      }}
                      className={`node-3d ${isCompleted ? 'completed' : isCurrentActive ? 'active' : 'locked'}`}
                    >
                      {isCompleted ? (
                        <Check size={isMobile ? 24 : 32} color="#ffffff" />
                      ) : isAvailable ? (
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: isMobile ? '1.05rem' : '1.2rem', color: isCurrentActive ? '#000000' : '#ffffff' }}>
                          {chNum}
                        </span>
                      ) : (
                        <Lock size={isMobile ? 18 : 22} color="#6b7280" />
                      )}
                    </button>

                    {/* Node Title Label */}
                    <div style={{
                      marginTop: 4,
                      fontSize: isMobile ? '0.72rem' : '0.8rem',
                      fontWeight: 700,
                      color: isCompleted ? '#34d399' : isCurrentActive ? '#fbbf24' : '#6b7280',
                      textAlign: 'center'
                    }}>
                      Capítulo {chNum}
                    </div>
                  </div>
                );
              })}

              {/* End of Territory Reward Chest */}
              <div style={{ marginTop: 8, width: '100%', maxWidth: 440 }}>
                {isChestClaimed ? (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    padding: isMobile ? '10px 14px' : '12px 20px',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    color: '#34d399',
                    fontWeight: 700,
                    fontSize: isMobile ? '0.82rem' : '0.9rem'
                  }}>
                    <Gift size={18} color="#34d399" />
                    <span>Baú de {territory.name} Resgatado! ✓ (+200 XP)</span>
                  </div>
                ) : isBookFullyCompleted ? (
                  <button
                    onClick={() => onClaimBookChest(territory)}
                    className="btn-3d gold"
                    style={{
                      width: '100%',
                      padding: isMobile ? '12px 14px' : '14px 20px',
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      animation: 'pulseGlow 1.8s infinite',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <Sparkles size={18} />
                    <span>ABRIR BAÚ DE {territory.name.toUpperCase()} (+200 XP)</span>
                  </button>
                ) : (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px dashed rgba(245, 158, 11, 0.3)',
                    padding: isMobile ? '10px 14px' : '12px 20px',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    color: '#9ca3af',
                    fontSize: isMobile ? '0.78rem' : '0.85rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}>
                    <Gift size={18} color="#fbbf24" />
                    <span>Baú de {territory.name} (Conclua os {territory.chaptersCount} capítulos)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.6); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.9); }
        }
      `}</style>
    </div>
  );
};
