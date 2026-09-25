import React, { useState } from 'react';
import type { Song } from '../types';
import { aiSongService } from '../services/aiSongService';
import { soundService } from '../services/soundService';
import { Sparkles, Search, Music, Wand2, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AiSongModalProps {
  onSongGenerated: (song: Song) => void;
  onClose: () => void;
}

export const AiSongModal: React.FC<AiSongModalProps> = ({
  onSongGenerated,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewSong, setPreviewSong] = useState<Song | null>(null);

  const handleAiSearch = async (queryText?: string) => {
    const textToSearch = queryText || searchQuery;
    if (!textToSearch.trim()) return;

    soundService.playClick();
    setIsGenerating(true);

    try {
      const generated = await aiSongService.generateSongWithAi(textToSearch);
      setPreviewSong(generated);
    } catch (e) {
      console.error('AI generation error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmPlay = () => {
    if (!previewSong) return;
    soundService.playClick();
    onSongGenerated(previewSong);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-950 border border-amber-400/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-purple-600 to-indigo-900 flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <Sparkles size={24} className="text-amber-300" />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Buscar Louvor com IA
            </h2>
            <p className="text-xs text-purple-300/70">
              Digite qualquer louvor e a IA irá encontrar e estruturar as frases para você jogar
            </p>
          </div>
        </div>

        {/* AI Input Form */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          <div className="relative w-full">
            <Search size={18} className="absolute left-4 top-3.5 text-amber-400" />
            <input
              type="text"
              placeholder="Digite o nome do louvor... (Ex: Bondade de Deus, Santo Espírito)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAiSearch()}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          <button
            onClick={() => handleAiSearch()}
            disabled={isGenerating || !searchQuery.trim()}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shrink-0 disabled:opacity-50 active:scale-95 transition-all"
          >
            <Wand2 size={16} />
            <span>{isGenerating ? 'GERANDO...' : 'ESTRUTURAR COM IA'}</span>
          </button>
        </div>

        {/* Suggestions Chips */}
        <div className="mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Sugestões Rápidas de Louvores:
          </span>
          <div className="flex flex-wrap gap-2">
            {['Bondade de Deus', 'Santo Espírito', 'Ousado Amor', 'A Bênção', 'Eu Me Rendo'].map(sug => (
              <button
                key={sug}
                onClick={() => {
                  setSearchQuery(sug);
                  handleAiSearch(sug);
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 hover:border-amber-400 text-purple-200 hover:text-white text-xs font-semibold transition-all"
              >
                🎵 {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Song Preview */}
        {previewSong && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950/60 border border-amber-400/50 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Music size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-black text-lg text-white">
                    {previewSong.title}
                  </h4>
                  <p className="text-xs text-amber-300/80">{previewSong.artist}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> {previewSong.phrases.length} Frases Prontas
              </span>
            </div>

            <div className="max-h-[140px] overflow-y-auto custom-scrollbar flex flex-col gap-1.5 p-2 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-slate-300 font-mono">
              {previewSong.phrases.slice(0, 5).map((p, idx) => (
                <div key={p.id} className="flex justify-between">
                  <span>#{idx + 1} {p.text}</span>
                  <span className="text-amber-400/80">{p.start}s - {p.end}s</span>
                </div>
              ))}
              {previewSong.phrases.length > 5 && (
                <span className="text-slate-500 italic text-[11px]">+ {previewSong.phrases.length - 5} frases mais...</span>
              )}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
          >
            Cancelar
          </button>
          {previewSong && (
            <button
              onClick={handleConfirmPlay}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>JOGAR ESTE LOUVOR</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
