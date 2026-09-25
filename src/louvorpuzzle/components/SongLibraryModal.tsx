import React, { useState } from 'react';
import type { Song, SongProgress } from '../types';
import { Music, Plus, Play, CheckCircle2, Search, X } from 'lucide-react';
import { soundService } from '../services/soundService';

interface SongLibraryModalProps {
  songs: Song[];
  activeSongId: string;
  progressMap: Record<string, SongProgress>;
  onSelectSong: (song: Song) => void;
  onOpenNewSongModal: () => void;
  onClose: () => void;
}

export const SongLibraryModal: React.FC<SongLibraryModalProps> = ({
  songs,
  activeSongId,
  progressMap,
  onSelectSong,
  onOpenNewSongModal,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredSongs = songs.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-950 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <Music size={24} />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Biblioteca de Louvores
            </h2>
            <p className="text-xs text-purple-300/70">
              Escolha uma música para praticar a memorização ou cadastre um novo louvor
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar louvor ou artista..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {['ALL', 'ADORAÇÃO', 'LOUVOR', 'HINO', 'POPULAR'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  soundService.playClick();
                  setCategoryFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  categoryFilter === cat
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'Todos' : cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onOpenNewSongModal();
            }}
            className="w-full md:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0 active:scale-95 transition-all"
          >
            <Plus size={16} /> <span>CADASTRAR LOUVOR</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredSongs.map(song => {
            const prog = progressMap[song.id];
            const isActive = song.id === activeSongId;

            return (
              <div
                key={song.id}
                onClick={() => {
                  soundService.playClick();
                  onSelectSong(song);
                  onClose();
                }}
                className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950/60 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${song.coverGradient} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    <Music size={26} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-purple-900/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                        {song.category}
                      </span>
                      {prog?.completed && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 size={12} /> Concluído
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-extrabold text-base text-white truncate mt-1">
                      {song.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">{song.artist}</p>

                    <div className="flex items-center gap-3 text-[11px] text-amber-400/80 font-mono mt-1">
                      <span>{song.phrases.length} Frases</span>
                      {prog && <span>• Recorde: {prog.bestXp} XP</span>}
                    </div>
                  </div>
                </div>

                <button className="w-10 h-10 rounded-2xl bg-amber-400 group-hover:bg-amber-300 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-md transition-colors">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
