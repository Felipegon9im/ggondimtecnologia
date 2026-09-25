import React, { useState } from 'react';
import type { Song, LyricPhrase } from '../types';
import { storageService } from '../services/storageService';
import { soundService } from '../services/soundService';
import { Plus, Upload, Sparkles, X, Check } from 'lucide-react';

interface NewSongModalProps {
  onSongCreated: (song: Song) => void;
  onClose: () => void;
}

export const NewSongModal: React.FC<NewSongModalProps> = ({
  onSongCreated,
  onClose
}) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState<'ADORAÇÃO' | 'LOUVOR' | 'HINO' | 'POPULAR'>('ADORAÇÃO');
  const [audioUrl, setAudioUrl] = useState('');
  const [lyricsText, setLyricsText] = useState('');
  const [generatedPhrases, setGeneratedPhrases] = useState<LyricPhrase[]>([]);

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const handleGeneratePhrases = () => {
    soundService.playClick();
    if (!lyricsText.trim()) return;

    const lines = lyricsText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    const phrases: LyricPhrase[] = lines.map((line, idx) => ({
      id: `custom-p-${idx + 1}`,
      text: line,
      start: idx * 4.5,
      end: (idx + 1) * 4.5,
      clozeText: line.replace(/(\b\w{4,}\b)/g, '_____')
    }));

    setGeneratedPhrases(phrases);
  };

  const handleSaveSong = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playClick();

    if (!title.trim() || !artist.trim()) {
      alert('Por favor, preencha o Título e o Artista do louvor.');
      return;
    }

    const phrasesToSave = generatedPhrases.length > 0 ? generatedPhrases : [
      { id: 'c-1', text: 'Tu és Santo, Tu és Digno', start: 0, end: 5.0 }
    ];

    const newSong: Song = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim(),
      category,
      coverGradient: 'from-purple-600 via-pink-600 to-indigo-900',
      audioUrl: audioUrl || '',
      duration: phrasesToSave[phrasesToSave.length - 1].end + 5,
      phrases: phrasesToSave,
      isCustom: true
    };

    storageService.saveCustomSong(newSong);
    onSongCreated(newSong);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-950 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <Plus size={24} />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Cadastrar Novo Louvor
            </h2>
            <p className="text-xs text-amber-300/70">
              Adicione suas músicas preferidas e personalize a letra
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSong} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Nome do Louvor *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Santo Pra Sempre"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Artista / Ministério *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Fernandinho"
                value={artist}
                onChange={e => setArtist(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Categoria
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="ADORAÇÃO">Adoração</option>
                <option value="LOUVOR">Louvor</option>
                <option value="HINO">Hino</option>
                <option value="POPULAR">Popular</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Áudio (MP3 / WAV)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileUpload}
                  className="hidden"
                  id="audio-upload-input"
                />
                <label
                  htmlFor="audio-upload-input"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-dashed border-purple-500/40 hover:border-amber-400 text-xs font-bold text-purple-200 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Upload size={16} />
                  <span className="truncate">{audioUrl ? 'Áudio Carregado ✓' : 'Selecionar Arquivo de Áudio'}</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Letra do Louvor (linha por linha)
              </label>
              <button
                type="button"
                onClick={handleGeneratePhrases}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Sparkles size={14} /> GERAR FRASES
              </button>
            </div>
            <textarea
              rows={5}
              placeholder="Cole aqui a letra do louvor...&#10;Exemplo:&#10;Um milhar de gerações&#10;Prostrados em adoração&#10;Cantam o cântico ao Cordeiro"
              value={lyricsText}
              onChange={e => setLyricsText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
            />
          </div>

          {generatedPhrases.length > 0 && (
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check size={16} />
              <span>{generatedPhrases.length} frases geradas com sucesso! Você poderá ajustar o tempo no Editor.</span>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition-all"
            >
              SALVAR LOUVOR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
