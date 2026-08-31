import React, { useState } from 'react';
import { audioService } from '../services/audioService';
import { ArrowLeft, Check, AlertTriangle, Table } from 'lucide-react';

interface TruthTableToolProps {
  onBack: () => void;
}

interface FormulaDef {
  id: string;
  name: string;
  symbolic: string;
  calc: (p: boolean, q: boolean) => boolean;
  classification: string;
}

const FORMULAS: FormulaDef[] = [
  { id: 'f1', name: 'Conjunção (E)', symbolic: 'P ∧ Q', calc: (p, q) => p && q, classification: 'Contingência' },
  { id: 'f2', name: 'Disjunção (OU)', symbolic: 'P ∨ Q', calc: (p, q) => p || q, classification: 'Contingência' },
  { id: 'f3', name: 'Condicional (SE... ENTÃO)', symbolic: 'P → Q', calc: (p, q) => !p || q, classification: 'Contingência' },
  { id: 'f4', name: 'Bicondicional', symbolic: 'P ↔ Q', calc: (p, q) => p === q, classification: 'Contingência' },
  { id: 'f5', name: 'Tautologia Exemplo', symbolic: 'P ∨ ¬P', calc: (p, _) => p || !p, classification: 'Tautologia (Tudo V)' },
  { id: 'f6', name: 'De Morgan (Negação do E)', symbolic: '¬(P ∧ Q)', calc: (p, q) => !(p && q), classification: 'Contingência' }
];

export const TruthTableTool: React.FC<TruthTableToolProps> = ({ onBack }) => {
  const [selectedFormula, setSelectedFormula] = useState<FormulaDef>(FORMULAS[0]);
  const rows = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false }
  ];

  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([null, null, null, null]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleCellClick = (idx: number) => {
    if (isChecked) return;
    audioService.playClick();
    const updated = [...userAnswers];
    if (updated[idx] === null) updated[idx] = 'V';
    else if (updated[idx] === 'V') updated[idx] = 'F';
    else updated[idx] = null;
    setUserAnswers(updated);
  };

  const handleCheckTable = () => {
    audioService.playClick();
    const expected = rows.map(r => selectedFormula.calc(r.p, r.q) ? 'V' : 'F');
    const correct = userAnswers.every((ans, idx) => ans === expected[idx]);

    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      audioService.playCorrect();
    } else {
      audioService.playWrong();
    }
  };

  const handleSelectFormula = (formula: FormulaDef) => {
    audioService.playClick();
    setSelectedFormula(formula);
    setUserAnswers([null, null, null, null]);
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={() => { audioService.playClick(); onBack(); }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#9ca3af',
            padding: '8px 14px',
            borderRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <h3 style={{ fontFamily: 'Outfit, sans-serif', color: '#10b981', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Table size={20} /> Tabela-Verdade Interativa
        </h3>
      </div>

      {/* Formula Selector Buttons */}
      <div className="glass-card" style={{ padding: 20 }}>
        <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 700, marginBottom: 12 }}>
          ESCOLHA A FÓRMULA LÓGICA PARA PRATICAR:
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {FORMULAS.map(f => (
            <button
              key={f.id}
              onClick={() => handleSelectFormula(f)}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                border: selectedFormula.id === f.id ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                background: selectedFormula.id === f.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                color: selectedFormula.id === f.id ? '#34d399' : '#d1d5db',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {f.symbolic} ({f.name})
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Table Card */}
      <div className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
          {selectedFormula.symbolic}
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: 24 }}>
          Toque nas células com símbolo <span style={{ color: '#f59e0b', fontWeight: 700 }}>?</span> da última coluna para alternar entre V e F.
        </p>

        {/* Truth Table Grid */}
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 14,
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: 'rgba(16, 185, 129, 0.2)', borderBottom: '2px solid rgba(16, 185, 129, 0.4)' }}>
                <th style={{ padding: 14, color: '#ffffff', fontFamily: 'Fira Code, monospace', fontSize: '1.1rem' }}>P</th>
                <th style={{ padding: 14, color: '#ffffff', fontFamily: 'Fira Code, monospace', fontSize: '1.1rem' }}>Q</th>
                <th style={{ padding: 14, color: '#34d399', fontFamily: 'Fira Code, monospace', fontSize: '1.2rem', fontWeight: 800 }}>
                  {selectedFormula.symbolic}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const pVal = row.p ? 'V' : 'F';
                const qVal = row.q ? 'V' : 'F';
                const expected = selectedFormula.calc(row.p, row.q) ? 'V' : 'F';
                const userVal = userAnswers[idx];

                let cellBg = 'rgba(255,255,255,0.05)';
                let cellColor = '#ffffff';

                if (userVal === 'V') { cellBg = 'rgba(16, 185, 129, 0.25)'; cellColor = '#34d399'; }
                if (userVal === 'F') { cellBg = 'rgba(239, 68, 68, 0.25)'; cellColor = '#f87171'; }

                if (isChecked) {
                  if (userVal === expected) {
                    cellBg = 'rgba(16, 185, 129, 0.4)';
                    cellColor = '#34d399';
                  } else {
                    cellBg = 'rgba(239, 68, 68, 0.4)';
                    cellColor = '#f87171';
                  }
                }

                return (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: 12, color: '#d1d5db', fontFamily: 'Fira Code, monospace', fontWeight: 700 }}>{pVal}</td>
                    <td style={{ padding: 12, color: '#d1d5db', fontFamily: 'Fira Code, monospace', fontWeight: 700 }}>{qVal}</td>
                    <td style={{ padding: 8 }}>
                      <button
                        onClick={() => handleCellClick(idx)}
                        disabled={isChecked}
                        style={{
                          width: 60,
                          height: 40,
                          borderRadius: 8,
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: cellBg,
                          color: cellColor,
                          fontFamily: 'Fira Code, monospace',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          cursor: isChecked ? 'default' : 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {userVal === null ? '?' : userVal}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Feedback Banner */}
        {isChecked && (
          <div style={{
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
            background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: isCorrect ? '#34d399' : '#f87171', fontWeight: 800, fontSize: '1.1rem', marginBottom: 4 }}>
              {isCorrect ? <Check size={22} /> : <AlertTriangle size={22} />}
              {isCorrect ? 'Tabela preenchida perfeitamente!' : 'Existem valores incorretos.'}
            </div>
            <p style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
              Classificação desta fórmula: <strong>{selectedFormula.classification}</strong>
            </p>
          </div>
        )}

        {!isChecked ? (
          <button
            onClick={handleCheckTable}
            disabled={userAnswers.includes(null)}
            className="btn-3d emerald"
            style={{ width: '100%', opacity: userAnswers.includes(null) ? 0.5 : 1 }}
          >
            Verificar Tabela-Verdade
          </button>
        ) : (
          <button
            onClick={() => {
              setUserAnswers([null, null, null, null]);
              setIsChecked(false);
            }}
            className="btn-3d purple"
            style={{ width: '100%' }}
          >
            Refazer Tabela
          </button>
        )}
      </div>
    </div>
  );
};
