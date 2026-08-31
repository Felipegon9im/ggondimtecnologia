import React, { useState, useEffect } from 'react';
import type { UserProfile, BibleBook, BibleVerse } from '../types';
import { BIBLE_BOOKS, VERSE_OF_THE_DAY } from '../data/bibleData';
import { bibleService } from '../services/bibleService';
import { audioService } from '../services/audioService';
import { BookOpen, Bookmark, Star, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface BibleReaderProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const BibleReader: React.FC<BibleReaderProps> = ({ profile, onSaveProfile }) => {
  const [selectedVersion, setSelectedVersion] = useState<'nvi' | 'acf' | 'kjv' | 'rvr'>('nvi');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS.find(b => b.id === 'sl') || BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState<number>(23);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [highlightedVerses, setHighlightedVerses] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    bibleService.getChapterVerses(selectedVersion, selectedBook.id, selectedChapter)
      .then(loadedVerses => {
        if (isMounted) {
          setVerses(loadedVerses);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar capítulo:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [selectedVersion, selectedBook, selectedChapter]);

  const toggleHighlight = (verseNumber: number) => {
    audioService.playClick();
    if (highlightedVerses.includes(verseNumber)) {
      setHighlightedVerses(prev => prev.filter(v => v !== verseNumber));
    } else {
      setHighlightedVerses(prev => [...prev, verseNumber]);
      const updated = { ...profile };
      updated.stats.xp += 2;
      onSaveProfile(updated);
    }
  };

  const handleBookChange = (bookId: string) => {
    const b = BIBLE_BOOKS.find(book => book.id === bookId);
    if (b) {
      audioService.playClick();
      setSelectedBook(b);
      setSelectedChapter(1);
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      audioService.playClick();
      setSelectedChapter(prev => prev - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chaptersCount) {
      audioService.playClick();
      setSelectedChapter(prev => prev + 1);
    }
  };

  const filteredBooks = BIBLE_BOOKS.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 850, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>
          Bíblia Sagrada Completa 📖
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Todos os 66 livros do Antigo e Novo Testamento em múltiplas versões e idiomas.
        </p>
      </div>

      {/* Verse of the Day Card */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(124, 58, 237, 0.2))',
        border: '2px solid rgba(245, 158, 11, 0.4)',
        padding: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbbf24', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 8 }}>
          <Star size={18} fill="#fbbf24" /> VERSÍCULO DO DIA • {VERSE_OF_THE_DAY.reference}
        </div>
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#ffffff', fontWeight: 700, lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
          "{VERSE_OF_THE_DAY.text}"
        </p>
        <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.5 }}>
          {VERSE_OF_THE_DAY.context}
        </p>
      </div>

      {/* Control Bar: Book, Chapter & Version selector */}
      <div className="glass-card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Row 1: Translation selector & Search */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            {/* Version dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700 }}>Versão:</span>
              <select
                value={selectedVersion}
                onChange={(e) => {
                  audioService.playClick();
                  setSelectedVersion(e.target.value as any);
                }}
                style={{
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
                <option value="nvi">🇧🇷 NVI (Nova Versão Internacional)</option>
                <option value="acf">🇧🇷 ACF (Almeida Corrigida Fiel)</option>
                <option value="kjv">🇺🇸 KJV (King James Version)</option>
                <option value="rvr">🇪🇸 RVR (Reina Valera 1960)</option>
              </select>
            </div>

            {/* Book Filter Search Input */}
            <div style={{ position: 'relative', minWidth: 200 }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: 11 }} />
              <input
                type="text"
                placeholder="Buscar livro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
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

          {/* Row 2: Select Book Dropdown (66 Books) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <BookOpen size={20} color="#fbbf24" />
            <select
              value={selectedBook.id}
              onChange={(e) => handleBookChange(e.target.value)}
              style={{
                flex: 1,
                minWidth: 240,
                background: 'rgba(0,0,0,0.4)',
                border: '2px solid rgba(245, 158, 11, 0.4)',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: 12,
                fontFamily: 'Cinzel, serif',
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              <optgroup label="ANTIGO TESTAMENTO (39 LIVROS)">
                {filteredBooks.filter(b => b.testament === 'OLD').map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.chaptersCount} cap.)
                  </option>
                ))}
              </optgroup>
              <optgroup label="NOVO TESTAMENTO (27 LIVROS)">
                {filteredBooks.filter(b => b.testament === 'NEW').map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.chaptersCount} cap.)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Row 3: Chapters Grid / Buttons */}
          <div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, marginBottom: 8 }}>
              CAPÍTULO DO LIVRO ({selectedBook.chaptersCount} CAPÍTULOS):
            </div>
            <div style={{
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              paddingBottom: 6,
              maxWidth: '100%'
            }}>
              {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map(ch => (
                <button
                  key={ch}
                  onClick={() => { audioService.playClick(); setSelectedChapter(ch); }}
                  style={{
                    minWidth: 38,
                    height: 38,
                    padding: '0 8px',
                    borderRadius: 10,
                    border: selectedChapter === ch ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                    background: selectedChapter === ch ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.03)',
                    color: selectedChapter === ch ? '#fbbf24' : '#d1d5db',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Reader Canvas */}
      <div className="glass-card" style={{ padding: 32 }}>
        {/* Navigation Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 16 }}>
          <button
            onClick={handlePrevChapter}
            disabled={selectedChapter <= 1}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: selectedChapter <= 1 ? '#6b7280' : '#ffffff',
              padding: '6px 12px',
              borderRadius: 10,
              cursor: selectedChapter <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <ChevronLeft size={16} /> Capítulo Anterior
          </button>

          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
            {selectedBook.name} {selectedChapter}
          </h3>

          <button
            onClick={handleNextChapter}
            disabled={selectedChapter >= selectedBook.chaptersCount}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: selectedChapter >= selectedBook.chaptersCount ? '#6b7280' : '#ffffff',
              padding: '6px 12px',
              borderRadius: 10,
              cursor: selectedChapter >= selectedBook.chaptersCount ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Próximo Capítulo <ChevronRight size={16} />
          </button>
        </div>

        {/* Verses List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#fbbf24' }}>
            <div className="spinner" style={{ margin: '0 auto 16px auto' }} />
            <p style={{ fontWeight: 600 }}>Carregando {selectedBook.name} {selectedChapter}...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {verses.map(v => {
              const isHighlighted = highlightedVerses.includes(v.number);

              return (
                <div 
                  key={v.number}
                  onClick={() => toggleHighlight(v.number)}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    background: isHighlighted ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    borderLeft: isHighlighted ? '4px solid #f59e0b' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12
                  }}
                >
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#fbbf24',
                    fontFamily: 'Outfit, sans-serif',
                    minWidth: 22,
                    marginTop: 2
                  }}>
                    {v.number}
                  </span>

                  <p style={{
                    color: '#f3f4f6',
                    fontSize: '1.05rem',
                    lineHeight: 1.65,
                    flex: 1
                  }}>
                    {v.text}
                  </p>

                  {isHighlighted && (
                    <Bookmark size={16} color="#fbbf24" fill="#fbbf24" style={{ flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
