import React, { useState } from 'react';
import type { Song, LyricPhrase } from '../types';
import { storageService } from '../services/storageService';
import { soundService } from '../services/soundService';
import { FileText, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface LyricPasteCardProps {
  currentSongTitle: string;
  onApplyLyrics: (newSong: Song) => void;
}

export const LyricPasteCard: React.FC<LyricPasteCardProps> = ({
  currentSongTitle,
  onApplyLyrics
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [songTitle, setSongTitle] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [rawLyrics, setRawLyrics] = useState<string>('');

  const handleProcessLyrics = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playClick();

    if (!rawLyrics.trim()) {
      alert('Por favor, cole a letra do louvor no campo abaixo.');
      return;
    }

    const lines = rawLyrics
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    const phrases: LyricPhrase[] = lines.map((line, idx) => {
      const words = line.split(' ');
      const clozeWords = words.map((w, wIdx) => (wIdx === 1 || wIdx === Math.floor(words.length / 2) ? '_____' : w));

      return {
        id: `pasted-p-${idx + 1}-${Date.now()}`,
        text: line,
        start: idx * 4.5,
        end: (idx + 1) * 4.5,
        clozeText: clozeWords.join(' ')
      };
    });

    const titleToUse = songTitle.trim() || 'Louvor Personalizado';
    const artistToUse = artistName.trim() || 'Adoração';

    const newSong: Song = {
      id: `pasted-${Date.now()}`,
      title: titleToUse,
      artist: artistToUse,
      category: 'ADORAÇÃO',
      coverGradient: 'from-amber-500 via-purple-700 to-indigo-950',
      audioUrl: '',
      duration: phrases[phrases.length - 1].end + 5,
      phrases,
      isCustom: true
    };

    storageService.saveCustomSong(newSong);
    onApplyLyrics(newSong);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-2 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-xl overflow-hidden transition-all">
      <button
        onClick={() => {
          soundService.playClick();
          setIsOpen(!isOpen);
        }}
        className="w-full p-4 flex items-center justify-between bg-purple-950/40 hover:bg-purple-950/60 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <FileText size={18} />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm md:text-base text-white flex items-center gap-2">
              <span>Colar Letra Completa do Louvor</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono uppercase">
                {currentSongTitle}
              </span>
            </h3>
            <p className="text-xs text-purple-300/70">
              Cole qualquer letra para gerar as peças do jogo instantaneamente
            </p>
          </div>
        </div>

        <div className="text-amber-400 p-1">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <form onSubmit={handleProcessLyrics} className="p-4 md:p-5 flex flex-col gap-3 border-t border-purple-500/20 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nome do Louvor (Opcional)"
              value={songTitle}
              onChange={e => setSongTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="Artista / Cantor (Opcional)"
              value={artistName}
              onChange={e => setArtistName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <textarea
            rows={4}
            required
            placeholder="Cole aqui a letra completa do louvor...&#10;Exemplo:&#10;Um milhar de gerações&#10;Prostrados em adoração&#10;Cantam o cântico ao Cordeiro"
            value={rawLyrics}
            onChange={e => setRawLyrics(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 transition-all"
          >
            <Sparkles size={16} />
            <span>GERAR PEÇAS DO JOGO</span>
          </button>
        </form>
      )}
    </div>
  );
};
