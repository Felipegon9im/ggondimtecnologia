import type { LevelInfo } from '../types';

export const LEVELS: LevelInfo[] = [
  {
    id: 1,
    name: 'Semente',
    concept: 'Receber',
    evolutionDesc: 'Início da caminhada. O primeiro germinar da Palavra no coração.',
    avatarVisual: 'Roupa simples + Celular na mão',
    resourcesUnlocked: ['Devocionais Diários', 'Compartilhamento em 1 clique', 'Quiz de Fixação'],
    color: '#10b981', // Emerald
    icon: '🌱',
    minXP: 0
  },
  {
    id: 2,
    name: 'Discípulo',
    concept: 'Conhecer',
    evolutionDesc: 'Aprofundamento no conhecimento bíblico e constância diária.',
    avatarVisual: 'Celular + Bíblia Sagrada nos braços',
    resourcesUnlocked: ['Acesso à Bíblia Sagrada Completa', 'Destaques de Versículos', 'Marcador de Leitura Diária'],
    color: '#84cc16', // Lime
    icon: '🌿',
    minXP: 100
  },
  {
    id: 3,
    name: 'Evangelista',
    concept: 'Compartilhar',
    evolutionDesc: 'Transbordando a Palavra através de vídeos e testemunhos.',
    avatarVisual: 'Visual de Pregador com microfone ou celular em transmissão',
    resourcesUnlocked: ['Feed de Vídeos Bíblicos Curtos', 'Histórias Animadas da Bíblia', 'Cartões de Frases Ilustrados'],
    earlyAccessPrice: 'R$ 9,90',
    color: '#f59e0b', // Amber
    icon: '🔥',
    minXP: 250
  },
  {
    id: 4,
    name: 'Missionário',
    concept: 'Alcançar',
    evolutionDesc: 'Atravessando fronteiras e acessando a Palavra em múltiplos idiomas.',
    avatarVisual: 'Pregador Itinerante Antigo ou Missionário Moderno com mochila',
    resourcesUnlocked: ['Bíblia em Espanhol & Inglês', 'Comparação de Versões Bíblicas', 'Modo Leitura Offline'],
    earlyAccessPrice: 'R$ 19,90',
    color: '#06b6d4', // Cyan
    icon: '🕊️',
    minXP: 500
  },
  {
    id: 5,
    name: 'Mensageiro',
    concept: 'Preparar',
    evolutionDesc: 'Mestre nas Escrituras capaz de estudar e preparar mensagens profundas.',
    avatarVisual: 'Escriba com pergaminho antigo ou Teólogo Moderno com tablet',
    resourcesUnlocked: ['Gerador de Esboços de Pregação', 'Dicionário Bíblico Integrado', 'Busca Avançada de Temas'],
    earlyAccessPrice: 'R$ 29,90',
    color: '#3b82f6', // Blue
    icon: '📜',
    minXP: 1000
  },
  {
    id: 6,
    name: 'Cooperador',
    concept: 'Servir',
    evolutionDesc: 'Foco nos resultados e no impacto espiritual de pessoas alcançadas.',
    avatarVisual: 'Referência ao serviço cristão (pastor/líder moderno de comunidade)',
    resourcesUnlocked: ['Painel de Impacto de Pessoas Alcançadas', 'Métricas de Devocionais Concluídos na Comunidade', 'Estatísticas de Alcance'],
    earlyAccessPrice: 'R$ 49,90',
    color: '#8b5cf6', // Violet
    icon: '🤝',
    minXP: 2000
  },
  {
    id: 7,
    name: 'Mordomo',
    concept: 'Cuidar',
    evolutionDesc: 'Gestor fiel com sabedoria para cuidar de equipes e vidas com consentimento.',
    avatarVisual: 'Administrador responsável com manto de sabedoria e gestão',
    resourcesUnlocked: ['Criação de Grupos de Cuidado com Consentimento', 'Acompanhamento Voluntário de Leitura', 'Materiais de Orientação'],
    color: '#ec4899', // Pink
    icon: '💎',
    minXP: 3500
  },
  {
    id: 8,
    name: 'Embaixador da Palavra',
    concept: 'Representar',
    evolutionDesc: 'Representante oficial da Palavra em sua comunidade, cidade ou país.',
    avatarVisual: 'Traje de Gala / Representante Oficial com Selo Dourado',
    resourcesUnlocked: ['Selo Oficial de Embaixador da Palavra', 'Kit Digital de Divulgação', 'Painel de Representação Territorial'],
    color: '#fbbf24', // Gold
    icon: '👑',
    minXP: 5000
  }
];
