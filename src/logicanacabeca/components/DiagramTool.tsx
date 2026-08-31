import React, { useState } from 'react';
import { audioService } from '../services/audioService';
import { ArrowLeft, CircleDot, Info } from 'lucide-react';

interface DiagramToolProps {
  onBack: () => void;
}

type DiagramType = 'TODO' | 'NENHUM' | 'ALGUM' | 'ALGUM_NAO';

interface DiagramDef {
  type: DiagramType;
  title: string;
  simplePhrase: string;
  explanation: string;
  examTrick: string;
}

const DIAGRAM_DEFS: DiagramDef[] = [
  {
    type: 'TODO',
    title: 'Todo A é B (Inclusão Total)',
    simplePhrase: '"Todo carioca é brasileiro"',
    explanation: 'O conjunto A (Cariocas) fica COMPLETAMENTE contido dentro do conjunto B (Brasileiros). Não existe nenhum elemento de A fora de B.',
    examTrick: 'Atenção: "Todo A é B" NÃO significa que "Todo B é A"! Nem todo brasileiro é carioca.'
  },
  {
    type: 'NENHUM',
    title: 'Nenhum A é B (Exclusão Total)',
    simplePhrase: '"Nenhum réptil é mamífero"',
    explanation: 'Os dois conjuntos A e B são completamente DISJUNTOS (separados). A interseção entre eles é vazia (A ∩ B = ∅).',
    examTrick: '"Nenhum A é B" é o mesmo que "Nenhum B é A". A relação é simétrica.'
  },
  {
    type: 'ALGUM',
    title: 'Algum A é B (Interseção)',
    simplePhrase: '"Algum médico é músico"',
    explanation: 'Existe pelo menos um elemento que pertence SIMULTANEAMENTE ao conjunto A e ao conjunto B (Interseção).',
    examTrick: '"Algum" significa "Pelo menos um, existencial". Pode ser 1 ou todos.'
  },
  {
    type: 'ALGUM_NAO',
    title: 'Algum A NÃO é B (Diferença de Conjuntos)',
    simplePhrase: '"Algum aluno não é estudioso"',
    explanation: 'Existe pelo menos um elemento do conjunto A que está FORA do conjunto B.',
    examTrick: '"Algum A não é B" é a negação exata de "Todo A é B"!'
  }
];

export const DiagramTool: React.FC<DiagramToolProps> = ({ onBack }) => {
  const [selectedDiagram, setSelectedDiagram] = useState<DiagramDef>(DIAGRAM_DEFS[0]);

  const handleSelectDiagram = (def: DiagramDef) => {
    audioService.playClick();
    setSelectedDiagram(def);
  };

  return (
    <div style={{ maxWidth: 750, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
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

        <h3 style={{ fontFamily: 'Outfit, sans-serif', color: '#06b6d4', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CircleDot size={20} /> Diagramas Lógicos Visuais
        </h3>
      </div>

      {/* Type Selector Buttons */}
      <div className="glass-card" style={{ padding: 20 }}>
        <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 700, marginBottom: 12 }}>
          SELECIONE A RELAÇÃO DE CONJUNTOS:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          {DIAGRAM_DEFS.map(d => (
            <button
              key={d.type}
              onClick={() => handleSelectDiagram(d)}
              style={{
                padding: '12px 14px',
                borderRadius: 12,
                border: selectedDiagram.type === d.type ? '2px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
                background: selectedDiagram.type === d.type ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                color: selectedDiagram.type === d.type ? '#22d3ee' : '#d1d5db',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {d.type === 'TODO' && '⭕ Todo A é B'}
              {d.type === 'NENHUM' && '🚫 Nenhum A é B'}
              {d.type === 'ALGUM' && '🔀 Algum A é B'}
              {d.type === 'ALGUM_NAO' && '❌ Algum A não é B'}
            </button>
          ))}
        </div>
      </div>

      {/* Diagram Visual Canvas Box */}
      <div className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
          {selectedDiagram.title}
        </h3>
        <p style={{ color: '#06b6d4', fontSize: '1rem', fontStyle: 'italic', fontWeight: 600, marginBottom: 24 }}>
          {selectedDiagram.simplePhrase}
        </p>

        {/* SVG Visual Renderer */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 20,
          padding: 24,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <svg width="340" height="200" viewBox="0 0 340 200">
            {selectedDiagram.type === 'TODO' && (
              <g>
                <circle cx="170" cy="100" r="85" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="3" />
                <text x="170" y="40" fill="#22d3ee" fontFamily="Outfit" fontWeight="800" fontSize="16" textAnchor="middle">Conjunto B</text>

                <circle cx="170" cy="115" r="45" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="3" />
                <text x="170" y="120" fill="#ffffff" fontFamily="Outfit" fontWeight="800" fontSize="14" textAnchor="middle">Conjunto A</text>
              </g>
            )}

            {selectedDiagram.type === 'NENHUM' && (
              <g>
                <circle cx="95" cy="100" r="65" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="3" />
                <text x="95" y="105" fill="#f87171" fontFamily="Outfit" fontWeight="800" fontSize="16" textAnchor="middle">Conjunto A</text>

                <circle cx="245" cy="100" r="65" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="3" />
                <text x="245" y="105" fill="#60a5fa" fontFamily="Outfit" fontWeight="800" fontSize="16" textAnchor="middle">Conjunto B</text>

                <text x="170" y="105" fill="#6b7280" fontSize="24" textAnchor="middle">∅</text>
              </g>
            )}

            {selectedDiagram.type === 'ALGUM' && (
              <g>
                <circle cx="120" cy="100" r="65" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="3" />
                <text x="90" y="105" fill="#ffffff" fontFamily="Outfit" fontWeight="800" fontSize="14" textAnchor="middle">A</text>

                <circle cx="220" cy="100" r="65" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="3" />
                <text x="250" y="105" fill="#ffffff" fontFamily="Outfit" fontWeight="800" fontSize="14" textAnchor="middle">B</text>

                <circle cx="170" cy="100" r="14" fill="#f59e0b" />
                <text x="170" y="105" fill="#000000" fontFamily="Outfit" fontWeight="900" fontSize="12" textAnchor="middle">★</text>
              </g>
            )}

            {selectedDiagram.type === 'ALGUM_NAO' && (
              <g>
                <circle cx="120" cy="100" r="65" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="3" />
                <text x="80" y="105" fill="#ffffff" fontFamily="Outfit" fontWeight="800" fontSize="14" textAnchor="middle">A</text>
                
                <circle cx="220" cy="100" r="65" fill="rgba(255, 255, 255, 0.05)" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
                <text x="250" y="105" fill="#9ca3af" fontFamily="Outfit" fontWeight="800" fontSize="14" textAnchor="middle">B</text>

                <circle cx="85" cy="100" r="12" fill="#ef4444" />
                <text x="85" y="104" fill="#ffffff" fontWeight="900" fontSize="10" textAnchor="middle">x</text>
              </g>
            )}
          </svg>
        </div>

        {/* Explanation Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 16,
          borderRadius: 12,
          textAlign: 'left',
          marginBottom: 16
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>
            COMO INTERPRETAR
          </div>
          <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {selectedDiagram.explanation}
          </p>
        </div>

        {/* Pegadinha de Prova */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: 16,
          borderRadius: 12,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12
        }}>
          <Info size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 2 }}>
              PEGADINHA RECORRENTE EM PROVAS:
            </div>
            <p style={{ color: '#ffffff', fontSize: '0.9rem', lineHeight: 1.4, fontWeight: 600 }}>
              {selectedDiagram.examTrick}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
