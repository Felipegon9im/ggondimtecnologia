import React, { useState, useRef, useEffect } from 'react';
import type { Song, LyricPhrase } from '../types';
import { storageService } from '../services/storageService';
import { soundService } from '../services/soundService';
import { Play, Pause, Clock, Sparkles, X, Save } from 'lucide-react';

interface SyncEditorModalProps {
  song: Song;
  onSongUpdated: (updatedSong: Song) => void;
  onClose: () => void;
}

export const SyncEditorModal: React.FC<SyncEditorModalProps> = ({
  song,
  onSongUpdated,
  onClose
}) => {
  const [phrases, setPhrases] = useState<LyricPhrase[]>(song.phrases);
  const [activePhraseIdx, setActivePhraseIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleMarkTimestamp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhraseIdx, currentTime, phrases]);

  const handleMarkTimestamp = () => {
    soundService.playClick();
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;

    setPhrases(prev => {
      const copy = [...prev];
      if (copy[activePhraseIdx]) {
        copy[activePhraseIdx] = {
          ...copy[activePhraseIdx],
          start: parseFloat(cur.toFixed(2)),
          end: parseFloat((cur + 4.5).toFixed(2))
        };
        if (activePhraseIdx > 0 && copy[activePhraseIdx - 1]) {
          copy[activePhraseIdx - 1].end = parseFloat(cur.toFixed(2));
        }
      }
      return copy;
    });

    if (activePhraseIdx < phrases.length - 1) {
      setActivePhraseIdx(prev => prev + 1);
    }
  };

  const handlePlayPause = () => {
    soundService.playClick();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSave = () => {
    soundService.playClick();
    const updated: Song = {
      ...song,
      phrases
    };
    storageService.saveCustomSong(updated);
    onSongUpdated(updated);
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = (secs % 60).toFixed(2);
    return `${m.toString().padStart(2, '0')}:${parseFloat(s) < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-950 border border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-lg">
            <Clock size={24} />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Editor de Sincronização
            </h2>
            <p className="text-xs text-purple-300/70">
              Pressione <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-mono">ESPAÇO</kbd> para marcar o início de cada frase em tempo real
            </p>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={song.audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
        />

        <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center justify-center shadow-lg active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
            </button>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 block">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-slate-400">
                Frase Atual #{activePhraseIdx + 1}: "{phrases[activePhraseIdx]?.text}"
              </span>
            </div>
          </div>

          <button
            onClick={handleMarkTimestamp}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] active:scale-95 transition-all"
          >
            <Sparkles size={16} /> <span>[MARCAR FRASE (ESPAÇO)]</span>
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2.5 mb-6">
          {phrases.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setActivePhraseIdx(idx)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                idx === activePhraseIdx
                  ? 'bg-purple-950/80 border-amber-400 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 ${
                  idx === activePhraseIdx ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-sm text-white font-semibold truncate">
                  {p.text}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 shrink-0">
                <input
                  type="number"
                  step="0.1"
                  value={p.start}
                  onChange={e => {
                    const val = parseFloat(e.target.value) || 0;
                    setPhrases(prev =>
                      prev.map((item, i) => (i === idx ? { ...item, start: val } : item))
                    );
                  }}
                  className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-center font-mono text-amber-300"
                />
                <span>s -</span>
                <input
                  type="number"
                  step="0.1"
                  value={p.end}
                  onChange={e => {
                    const val = parseFloat(e.target.value) || 0;
                    setPhrases(prev =>
                      prev.map((item, i) => (i === idx ? { ...item, end: val } : item))
                    );
                  }}
                  className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-center font-mono text-amber-300"
                />
                <span>s</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 active:scale-95 transition-all"
          >
            <Save size={16} /> <span>SALVAR SINCRONIZAÇÃO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
