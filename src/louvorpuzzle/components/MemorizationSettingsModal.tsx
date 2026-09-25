import React from 'react';
import type { DifficultyLevel, GameModeType } from '../types';
import { soundService } from '../services/soundService';
import { Settings, Zap, Brain, X } from 'lucide-react';

interface MemorizationSettingsModalProps {
  difficulty: DifficultyLevel;
  gameMode: GameModeType;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  onChangeGameMode: (mode: GameModeType) => void;
  onClose: () => void;
}

export const MemorizationSettingsModal: React.FC<MemorizationSettingsModalProps> = ({
  difficulty,
  gameMode,
  onChangeDifficulty,
  onChangeGameMode,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-950 border border-purple-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white">
              Configurações de Jogo
            </h2>
            <p className="text-xs text-purple-300/70">
              Ajuste a dificuldade e o modo de treino
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Nível de Dificuldade
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'EASY', label: 'FÁCIL', desc: 'Destaque visual na frase correta' },
              { id: 'NORMAL', label: 'NORMAL', desc: 'Frases misturadas sem dicas' },
              { id: 'HARD', label: 'DIFÍCIL', desc: 'Mais peças e armadilhas' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  soundService.playClick();
                  onChangeDifficulty(item.id as DifficultyLevel);
                }}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 ${
                  difficulty === item.id
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="font-heading font-black text-sm">{item.label}</span>
                <span className="text-[10px] text-slate-400 leading-tight">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Modo de Jogo
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundService.playClick();
                onChangeGameMode('STANDARD');
              }}
              className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 ${
                gameMode === 'STANDARD'
                  ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Modo Padrão</h4>
                <p className="text-xs text-slate-400 mt-1">Frases completas para arrastar e encaixar</p>
              </div>
            </button>

            <button
              onClick={() => {
                soundService.playClick();
                onChangeGameMode('MEMORIZATION');
              }}
              className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 ${
                gameMode === 'MEMORIZATION'
                  ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Brain size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Modo Memorização</h4>
                <p className="text-xs text-slate-400 mt-1">Palavras ocultas para testar a memória avançada</p>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
        >
          CONFIRMAR CONFIGURAÇÕES
        </button>
      </div>
    </div>
  );
};
