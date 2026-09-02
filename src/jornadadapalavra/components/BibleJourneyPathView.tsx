import React, { useState, useEffect, useRef } from 'react';
import type { UserProfile, BibleTerritory } from '../types';
import { BIBLE_TERRITORIES, TOTAL_BIBLE_CHAPTERS, BibleJourneyService } from '../services/bibleJourneyService';
import { audioService } from '../services/audioService';
import { CloudSVG, TreeSVG, PalmTreeSVG, CampfireSVG, PilgrimMascotSVG } from './BibleWorldSVG';
import { LessonPreviewModal } from './LessonPreviewModal';
import { Check, Lock, Gift, Heart, Sparkles, Search, BookOpen, Brain } from 'lucide-react';

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

  // Lesson preview popup state
  const [previewChapter, setPreviewChapter] = useState<{
    bookId: string;
    bookName: string;
    chapterNum: number;
    title: string;
    historicalContext: string;
    themeImage?: string;
    isCompleted: boolean;
    isAvailable: boolean;
  } | null>(null);

  const activeNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const completedKeys = profile.stats.completedChapterKeys || [];
  const progressInfo = BibleJourneyService.getOverallProgress(completedKeys);

  // Auto-scroll to active node on mount
  useEffect(() => {
    if (activeNodeRef.current) {
      setTimeout(() => {
        activeNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, []);

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

  const handleNodeClick = (bookId: string, bookName: string, chNum: number, isCompleted: boolean, isAvailable: boolean) => {
    if (!isAvailable) return;
    audioService.playClick();
    const ctx = BibleJourneyService.generateChapterContext(bookId, chNum);
    setPreviewChapter({
      bookId,
      bookName,
      chapterNum: chNum,
      title: ctx.title,
      historicalContext: ctx.historicalContext,
      themeImage: ctx.themeImage,
      isCompleted,
      isAvailable
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 780, margin: '0 auto', width: '100%', position: 'relative' }}>
      {/* Header Banner: Overall Bible Journey Progress */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(124, 58, 237, 0.25))',
        border: '2px solid rgba(245, 158, 11, 0.4)',
        padding: isMobile ? 16 : 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background clouds */}
        <CloudSVG style={{ position: 'absolute', top: 10, right: 20, opacity: 0.6, animation: 'cloudFloat 12s ease-in-out infinite' }} />
        <CloudSVG style={{ position: 'absolute', bottom: 5, left: 15, opacity: 0.4, animation: 'cloudFloat 18s ease-in-out infinite reverse' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12, position: 'relative', zIndex: 2 }}>
          <div>
            <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              🗺️ MUNDO DE AVENTURA BÍBLICA • GÊNESIS A APOCALIPSE
            </span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
              Jornada na Palavra de Deus
            </h2>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.5)',
            padding: isMobile ? '6px 12px' : '8px 16px',
            borderRadius: 14,
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: isMobile ? '0.95rem' : '1.1rem'
          }}>
            {progressInfo.percentage}% CONCLUÍDO
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container" style={{ height: 12, marginBottom: 10, position: 'relative', zIndex: 2 }}>
          <div className="progress-bar-fill" style={{ width: `${progressInfo.percentage}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: isMobile ? '0.78rem' : '0.85rem', color: '#d1d5db', fontWeight: 600, flexWrap: 'wrap', gap: 4, position: 'relative', zIndex: 2 }}>
          <span>Capítulos lidos: <strong>{progressInfo.totalCompleted}</strong> de {TOTAL_BIBLE_CHAPTERS}</span>
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
          gap: 12,
          padding: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart size={24} color="#ef4444" fill="#ef4444" />
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.95rem' }}>Sem Vidas no Momento! ❤️</h4>
              <p style={{ color: '#d1d5db', fontSize: '0.8rem' }}>Recarregue na Loja por XP para continuar sua caminhada.</p>
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

      {/* Territories / World Regions Loop */}
      {filteredTerritories.map((territory) => {
        let completedInBook = 0;
        for (let ch = 1; ch <= territory.chaptersCount; ch++) {
          const key = BibleJourneyService.getChapterKey(territory.id, ch);
          if (completedKeys.includes(key)) completedInBook++;
        }

        const isBookFullyCompleted = completedInBook >= territory.chaptersCount;
        const isChestClaimed = profile.stats.claimedChestBookIds?.includes(territory.id);

        // Environment Background Customizations
        let landscapeElement = <TreeSVG size={isMobile ? 36 : 46} color="#10b981" />;

        if (territory.id === 'ex' || territory.id === 'lv' || territory.id === 'nm' || territory.id === 'dt') {
          landscapeElement = (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PalmTreeSVG size={isMobile ? 34 : 44} />
              <CampfireSVG size={isMobile ? 24 : 32} />
            </div>
          );
        } else if (territory.id === 'sl' || territory.id === 'pv') {
          landscapeElement = <TreeSVG size={isMobile ? 36 : 46} color="#a78bfa" />;
        } else if (territory.testament === 'NEW') {
          landscapeElement = <TreeSVG size={isMobile ? 36 : 46} color="#38bdf8" />;
        }

        return (
          <div key={territory.id} style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            {/* Territory Header Banner with Cinematic Illustrative Theme Artwork */}
            <div className="glass-card" style={{
              position: 'relative',
              overflow: 'hidden',
              borderLeft: `6px solid ${territory.color}`,
              padding: isMobile ? '18px' : '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              minHeight: isMobile ? 135 : 160
            }}>
              {/* Background Theme Image with Ken Burns Zoom */}
              {territory.themeImage && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${territory.themeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  animation: 'kenBurnsZoom 20s infinite alternate ease-in-out',
                  filter: 'brightness(0.85)',
                  zIndex: 0
                }} />
              )}

              {/* Gradient Overlay for Typography High Contrast */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, rgba(15, 10, 25, 0.75) 0%, rgba(15, 10, 25, 0.25) 100%)`,
                zIndex: 1
              }} />

              {/* Background SVG Scenery Objects */}
              <div style={{ position: 'absolute', right: 20, bottom: -4, opacity: 0.8, pointerEvents: 'none', zIndex: 2 }}>
                {landscapeElement}
              </div>

              <div style={{ position: 'relative', zIndex: 3 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: territory.color, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  TERRITÓRIO {territory.testament === 'OLD' ? 'ANTIGO' : 'NOVO'} TESTAMENTO • {territory.chaptersCount} CAPÍTULOS
                </span>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: isMobile ? '1.35rem' : '1.7rem', fontWeight: 800, color: '#ffffff', marginTop: 2, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  {territory.name}
                </h3>
                <p style={{ color: '#e5e7eb', fontSize: isMobile ? '0.8rem' : '0.88rem', marginTop: 2, textShadow: '0 1px 4px rgba(0,0,0,0.8)', maxWidth: 460 }}>
                  {territory.description}
                </p>
              </div>

              <div style={{
                width: isMobile ? 44 : 54,
                height: isMobile ? 44 : 54,
                borderRadius: 14,
                background: `${territory.color}40`,
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                flexShrink: 0,
                position: 'relative',
                zIndex: 3
              }}>
                {territory.icon}
              </div>
            </div>

            {/* Chapters Trail Nodes & Micro-Scenery Objects */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? 22 : 28,
              padding: '16px 0',
              position: 'relative'
            }}>
              {Array.from({ length: territory.chaptersCount }, (_, i) => i + 1).map((chNum, chIdx) => {
                const chapterKey = BibleJourneyService.getChapterKey(territory.id, chNum);
                const isCompleted = completedKeys.includes(chapterKey);

                const tIdx = BIBLE_TERRITORIES.findIndex(t => t.id === territory.id);
                const prevKey = chNum > 1
                  ? BibleJourneyService.getChapterKey(territory.id, chNum - 1)
                  : (tIdx > 0 ? BibleJourneyService.getChapterKey(BIBLE_TERRITORIES[tIdx - 1].id, BIBLE_TERRITORIES[tIdx - 1].chaptersCount) : null);

                const isAvailable = (tIdx === 0 && chNum === 1) || (prevKey !== null && completedKeys.includes(prevKey)) || isCompleted;
                const isCurrentActive = isAvailable && !isCompleted;

                const currentOffset = offsets[chIdx % offsets.length];

                // Special node types (Quiz)
                const isQuizNode = chNum % 5 === 0;

                return (
                  <div
                    key={chapterKey}
                    ref={isCurrentActive ? activeNodeRef : null}
                    style={{
                      transform: `translateX(${currentOffset}px)`,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {/* Side Decorative Scenery (Trees / Tents / Campfire) */}
                    {chIdx % 3 === 0 && (
                      <div style={{
                        position: 'absolute',
                        left: currentOffset > 0 ? -48 : 'auto',
                        right: currentOffset <= 0 ? -48 : 'auto',
                        top: -6,
                        opacity: 0.7,
                        pointerEvents: 'none'
                      }}>
                        {territory.testament === 'OLD' && territory.id === 'ex' ? (
                          <CampfireSVG size={28} />
                        ) : (
                          <TreeSVG size={32} color={territory.color} />
                        )}
                      </div>
                    )}

                    {/* Active Mascot Pilgrim standing on current chapter */}
                    {isCurrentActive && (
                      <div style={{
                        position: 'absolute',
                        top: isMobile ? -54 : -64,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                        animation: 'bounce 1.5s infinite'
                      }}>
                        <PilgrimMascotSVG size={isMobile ? 42 : 52} />
                        <div style={{
                          background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                          color: '#000000',
                          padding: '2px 8px',
                          borderRadius: 10,
                          fontWeight: 800,
                          fontSize: '0.68rem',
                          boxShadow: '0 3px 8px rgba(245, 158, 11, 0.6)',
                          whiteSpace: 'nowrap',
                          marginTop: -4
                        }}>
                          Você está aqui 🚶
                        </div>
                      </div>
                    )}

                    {/* Circular 3D Chapter Node Button */}
                    <button
                      disabled={!isAvailable}
                      onClick={() => handleNodeClick(territory.id, territory.name, chNum, isCompleted, isAvailable)}
                      className={`node-3d ${isCompleted ? 'completed' : isCurrentActive ? 'active' : 'locked'}`}
                      style={{
                        width: isQuizNode ? (isMobile ? 64 : 76) : undefined,
                        height: isQuizNode ? (isMobile ? 64 : 76) : undefined,
                        border: isQuizNode ? '2px stroke #fbbf24' : undefined
                      }}
                    >
                      {isCompleted ? (
                        <Check size={isMobile ? 24 : 32} color="#ffffff" />
                      ) : isQuizNode ? (
                        <Brain size={isMobile ? 26 : 32} color={isCurrentActive ? '#000000' : '#ffffff'} />
                      ) : isAvailable ? (
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: isMobile ? '1.05rem' : '1.2rem', color: isCurrentActive ? '#000000' : '#ffffff' }}>
                          {chNum}
                        </span>
                      ) : (
                        <Lock size={isMobile ? 18 : 22} color="#6b7280" />
                      )}
                    </button>

                    {/* Node Label Title */}
                    <div style={{
                      marginTop: 4,
                      fontSize: isMobile ? '0.72rem' : '0.8rem',
                      fontWeight: 700,
                      color: isCompleted ? '#34d399' : isCurrentActive ? '#fbbf24' : '#6b7280',
                      textAlign: 'center'
                    }}>
                      {isQuizNode ? `Quiz Cap. ${chNum}` : `Capítulo ${chNum}`}
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
                    <span>Baú de {territory.name} (Conclua todos os {territory.chaptersCount} capítulos)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Lesson Preview Modal Card Popup */}
      {previewChapter && (
        <LessonPreviewModal
          bookName={previewChapter.bookName}
          chapterNum={previewChapter.chapterNum}
          title={previewChapter.title}
          historicalContext={previewChapter.historicalContext}
          themeImage={previewChapter.themeImage}
          isCompleted={previewChapter.isCompleted}
          isAvailable={previewChapter.isAvailable}
          onStartLesson={() => {
            const { bookId, chapterNum } = previewChapter;
            setPreviewChapter(null);
            onOpenChapter(bookId, chapterNum);
          }}
          onClose={() => setPreviewChapter(null)}
        />
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.6); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.9); }
        }
      `}</style>
    </div>
  );
};
