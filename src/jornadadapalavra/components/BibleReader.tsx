import React, { useState } from 'react';
import type { UserProfile, BibleBook } from '../types';
import { BIBLE_BOOKS, FEATURED_CHAPTERS, VERSE_OF_THE_DAY } from '../data/bibleData';
import { audioService } from '../services/audioService';
import { BookOpen, Bookmark, Star } from 'lucide-react';

interface BibleReaderProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const BibleReader: React.FC<BibleReaderProps> = ({ profile, onSaveProfile }) => {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[2]); // Salmos default
  const [selectedChapter, setSelectedChapter] = useState<number>(23);
  const [highlightedVerses, setHighlightedVerses] = useState<number[]>([]);

  const chapterKey = `${selectedBook.id}-${selectedChapter}`;
  const currentVerses = FEATURED_CHAPTERS[chapterKey] || FEATURED_CHAPTERS['sl-23'];

  const toggleHighlight = (verseNumber: number) => {
    audioService.playClick();
    if (highlightedVerses.includes(verseNumber)) {
      setHighlightedVerses(prev => prev.filter(v => v !== verseNumber));
    } else {
      setHighlightedVerses(prev => [...prev, verseNumber]);

      // Give small XP bonus for studying verses
      const updated = { ...profile };
      updated.stats.xp += 2;
      onSaveProfile(updated);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: 6 }}>
          Bíblia Sagrada 📖
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Explore as Sagradas Escrituras, medite nos versículos e alimente sua fé diariamente.
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

      {/* Book & Chapter Navigation Control Bar */}
      <div className="glass-card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          {/* Select Book */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={20} color="#fbbf24" />
            <select
              value={selectedBook.id}
              onChange={(e) => {
                const b = BIBLE_BOOKS.find(book => book.id === e.target.value);
                if (b) {
                  audioService.playClick();
                  setSelectedBook(b);
                  setSelectedChapter(1);
                }
              }}
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: 10,
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              <optgroup label="Antigo Testamento">
                {BIBLE_BOOKS.filter(b => b.testament === 'OLD').map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Novo Testamento">
                {BIBLE_BOOKS.filter(b => b.testament === 'NEW').map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Select Chapter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 700 }}>Capítulo:</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 3, 23, 4, 16].map(ch => (
                <button
                  key={ch}
                  onClick={() => { audioService.playClick(); setSelectedChapter(ch); }}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border: selectedChapter === ch ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                    background: selectedChapter === ch ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.03)',
                    color: selectedChapter === ch ? '#fbbf24' : '#d1d5db',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verses Reader Canvas */}
      <div className="glass-card" style={{ padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 16 }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
            {selectedBook.name} {selectedChapter}
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#a78bfa' }}>Versão Almeida Revista e Atualizada (ARA)</span>
        </div>

        {/* Verses List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentVerses.map(v => {
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
                  minWidth: 20,
                  marginTop: 2
                }}>
                  {v.number}
                </span>

                <p style={{
                  color: '#f3f4f6',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
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
      </div>
    </div>
  );
};
