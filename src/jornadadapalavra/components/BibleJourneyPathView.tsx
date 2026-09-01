import React, { useState } from 'react';
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

  const completedKeys = profile.stats.completedChapterKeys || [];
  const progressInfo = BibleJourneyService.getOverallProgress(completedKeys);

  // Filter territories
  const filteredTerritories = BIBLE_TERRITORIES.filter(t => {
    if (selectedBookFilter !== 'ALL' && t.id !== selectedBookFilter) return false;
    if (searchTerm && !t.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720, margin: '0 auto' }}>
      {/* Header Banner: Overall Bible Journey Progress */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(124, 58, 237, 0.25))',
        border: '2px solid rgba(245, 158, 11, 0.4)',
        padding: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
              🗺️ PEREGRINAÇÃO BÍBLICA • GÊNESIS A APOCALIPSE
            </span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
              Jornada na Palavra de Deus
            </h2>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '8px 16px',
            borderRadius: 14,
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem'
          }}>
            {progressInfo.percentage}% CONCLUÍDO
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container" style={{ height: 14, marginBottom: 10 }}>
          <div className="progress-bar-fill" style={{ width: `${progressInfo.percentage}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#d1d5db', fontWeight: 600 }}>
          <span>Capítulos concluídos: <strong>{progressInfo.totalCompleted}</strong> de {TOTAL_BIBLE_CHAPTERS}</span>
          <span>66 Livros da Bíblia</span>
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
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Heart size={28} color="#ef4444" fill="#ef4444" />
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem' }}>Sem Vidas no Momento! ❤️</h4>
              <p style={{ color: '#d1d5db', fontSize: '0.85rem' }}>Recarregue na Loja por XP para continuar sua caminhada.</p>
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

      {/* Book Jump & Search Selector */}
      <div className="glass-card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 220 }}>
            <BookOpen size={18} color="#fbbf24" />
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
                padding: '8px 12px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: '0.9rem',
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

          <div style={{ position: 'relative', minWidth: 180 }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 10, top: 10 }} />
            <input
              type="text"
              placeholder="Buscar território..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px 7px 32px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(0,0,0,0.3)',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Territories Loop */}
      {filteredTerritories.map((territory) => {
        // Calculate completed chapters for this book
        let completedInBook = 0;
        for (let ch = 1; ch <= territory.chaptersCount; ch++) {
          const key = BibleJourneyService.getChapterKey(territory.id, ch);
          if (completedKeys.includes(key)) completedInBook++;
        }

        const isBookFullyCompleted = completedInBook >= territory.chaptersCount;
        const isChestClaimed = profile.stats.claimedChestBookIds?.includes(territory.id);

        return (
          <div key={territory.id} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Territory / Book Header Banner */}
            <div className="glass-card" style={{
              background: `linear-gradient(135deg, ${territory.color}35, rgba(30, 20, 48, 0.9))`,
              borderLeft: `6px solid ${territory.color}`,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: territory.color, textTransform: 'uppercase', letterSpacing: 1 }}>
                  TERRITÓRIO {territory.testament === 'OLD' ? 'ANTIGO' : 'NOVO'} TESTAMENTO • {territory.chaptersCount} CAPÍTULOS
                </span>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                  {territory.name}
                </h3>
                <p style={{ color: '#d1d5db', fontSize: '0.85rem', marginTop: 4 }}>
                  {territory.description}
                </p>
              </div>

              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: `${territory.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem'
              }}>
                {territory.icon}
              </div>
            </div>

            {/* Chapters Trail Nodes (Zig-Zag Layout) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
              padding: '10px 0'
            }}>
              {Array.from({ length: territory.chaptersCount }, (_, i) => i + 1).map((chNum, chIdx) => {
                const chapterKey = BibleJourneyService.getChapterKey(territory.id, chNum);
                const isCompleted = completedKeys.includes(chapterKey);

                // A chapter is available if it's the first chapter or previous chapter is completed
                const prevKey = chNum > 1 ? BibleJourneyService.getChapterKey(territory.id, chNum - 1) : null;
                const isAvailable = chNum === 1 || (prevKey && completedKeys.includes(prevKey)) || isCompleted;
                const isCurrentActive = isAvailable && !isCompleted;

                // Zig-zag offset for trail buttons
                const offsets = [0, 45, 90, 45, 0, -45, -90, -45];
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
                    {/* Active Chapter Walking Badge */}
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
                        <Check size={32} color="#ffffff" />
                      ) : isAvailable ? (
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: isCurrentActive ? '#000000' : '#ffffff' }}>
                          {chNum}
                        </span>
                      ) : (
                        <Lock size={22} color="#6b7280" />
                      )}
                    </button>

                    {/* Node Title Label */}
                    <div style={{
                      marginTop: 6,
                      fontSize: '0.8rem',
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
              <div style={{ marginTop: 12, width: '100%', maxWidth: 440 }}>
                {isChestClaimed ? (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    padding: '12px 20px',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    color: '#34d399',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    <Gift size={22} color="#34d399" />
                    <span>Baú de {territory.name} Resgatado! ✓ (+200 XP)</span>
                  </div>
                ) : isBookFullyCompleted ? (
                  <button
                    onClick={() => onClaimBookChest(territory)}
                    className="btn-3d gold"
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      fontSize: '0.95rem',
                      animation: 'pulseGlow 1.8s infinite',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10
                    }}
                  >
                    <Sparkles size={20} />
                    <span>ABRIR BAÚ DE {territory.name.toUpperCase()} (+200 XP)</span>
                  </button>
                ) : (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px dashed rgba(245, 158, 11, 0.3)',
                    padding: '12px 20px',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    color: '#9ca3af',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>
                    <Gift size={20} color="#fbbf24" />
                    <span>Baú de Recompensas de {territory.name} (Conclua todos os capítulos)</span>
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
          50% { transform: translateY(-5px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.6); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.9); }
        }
      `}</style>
    </div>
  );
};
