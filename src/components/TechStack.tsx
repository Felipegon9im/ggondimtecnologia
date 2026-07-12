import styles from './TechStack.module.css';

interface TechItem {
  name: string;
  category: string;
  hoverColor: string;
  hoverGlow: string;
  svg: React.ReactNode;
}

const techsData: TechItem[] = [
  {
    name: 'React.js',
    category: 'Desenvolvimento Web',
    hoverColor: 'rgba(97, 218, 251, 0.4)',
    hoverGlow: 'rgba(97, 218, 251, 0.15)',
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className={styles.logoSvg}>
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    category: 'Tipagem Estática',
    hoverColor: 'rgba(49, 120, 198, 0.4)',
    hoverGlow: 'rgba(49, 120, 198, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#3178c6" rx="10"/>
        <text x="75" y="80" fill="white" fontSize="40" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">TS</text>
      </svg>
    )
  },
  {
    name: 'Node.js',
    category: 'Backend Engine',
    hoverColor: 'rgba(51, 153, 51, 0.4)',
    hoverGlow: 'rgba(51, 153, 51, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <path d="M46 22 L24 35 C22 36, 21 39, 21 41 L21 66 C21 68, 22 70, 24 72 L46 85 C48 86, 51 86, 53 85 L75 72 C77 70, 78 68, 78 66 L78 41 C78 39, 77 36, 75 35 L53 22 C51 21, 48 21, 46 22 Z" fill="none" stroke="#339933" strokeWidth="6"/>
        <path d="M49 32 L34 41 C33 42, 32 43, 32 45 L32 60" fill="none" stroke="#339933" strokeWidth="5" strokeLinecap="round"/>
        <path d="M49 46 L64 37" fill="none" stroke="#339933" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="50" cy="53" r="7" fill="#339933"/>
      </svg>
    )
  },
  {
    name: 'Electron',
    category: 'App Desktop Nativo',
    hoverColor: 'rgba(71, 132, 143, 0.4)',
    hoverGlow: 'rgba(71, 132, 143, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#47848F" strokeWidth="3" />
        <ellipse cx="50" cy="50" rx="36" ry="12" fill="none" stroke="#47848F" strokeWidth="3" transform="rotate(30, 50, 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="12" fill="none" stroke="#47848F" strokeWidth="3" transform="rotate(90, 50, 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="12" fill="none" stroke="#47848F" strokeWidth="3" transform="rotate(150, 50, 50)" />
        <circle cx="50" cy="50" r="5" fill="#47848F" />
        <circle cx="20" cy="33" r="3.5" fill="#47848F" />
        <circle cx="80" cy="67" r="3.5" fill="#47848F" />
        <circle cx="50" cy="14" r="3.5" fill="#47848F" />
      </svg>
    )
  },
  {
    name: 'Docker',
    category: 'Containers & DevOps',
    hoverColor: 'rgba(36, 150, 237, 0.4)',
    hoverGlow: 'rgba(36, 150, 237, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#2496ED" className={styles.logoSvg}>
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.954-2.172h2.118c.103 0 .187-.083.187-.185V6.733c0-.102-.084-.185-.187-.185h-2.118c-.103 0-.186.083-.186.185v1.988c0 .102.083.185.186.185m0 2.172h2.118c.103 0 .187-.083.187-.185V8.906c0-.102-.084-.186-.187-.186h-2.118c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.953 0h2.119c.102 0 .185-.083.185-.185V8.906c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m0-2.172h2.119c.102 0 .185-.083.185-.185V6.733c0-.102-.083-.185-.185-.185h-2.119c-.103 0-.186.083-.186.185v1.988c0 .102.083.185.186.185m-2.955 2.172h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m0-2.172h2.119c.102 0 .186-.083.186-.185V6.733c0-.102-.084-.185-.186-.185h-2.119c-.103 0-.186.083-.186.185v1.988c0 .102.083.185.186.185m0-2.172h2.119c.102 0 .186-.083.186-.186V4.56c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.988c0 .102.083.186.186.186m-2.953 6.516h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.953 0h2.119c.103 0 .186-.083.186-.185V8.906c0-.102-.083-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v1.987c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .185-.083.185-.185V8.906c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.953 0h2.119c.103 0 .186-.083.186-.185V8.906c0-.102-.083-.186-.186-.186H.186c-.102 0-.186.084-.186.186v1.987c0 .102.084.185.186.185m0 2.172h17.97c.102 0 .186-.083.186-.185v-1.987c0-.102-.084-.186-.186-.186H.186c-.102 0-.186.084-.186.186v1.987c0 .102.084.185.186.185M23.99 11.23c-.1-.137-.417-.384-.96-.543-.54-.158-1.127-.145-1.545-.09-.27.035-.55.088-.813.16-.035-.115-.078-.23-.13-.34-.515-1.11-1.464-1.92-2.585-2.222a3.83 3.83 0 0 0-1.85.083 4.417 4.417 0 0 0-.677-2.308c-.76-1.198-1.99-1.986-3.32-2.13a.18.18 0 0 0-.14.05.182.182 0 0 0-.05.14v2.793c0 .085.035.163.097.22.428.388.755.882.95 1.43a2.766 2.766 0 0 1 .05 1.76l-.16.57a.187.187 0 0 0 .045.18.183.183 0 0 0 .152.057 6.46 6.46 0 0 1 2.378.435c.87.352 1.558.98 1.95 1.776.28.583.393 1.228.33 1.868-.076.77-.386 1.488-.87 2.082a5.536 5.536 0 0 1-2.188 1.62c-.752.327-1.577.49-2.42.485H.187C.084 20.3 0 20.384 0 20.487v.678c0 1.41.97 2.637 2.35 2.81 7.234.908 14.52.88 21.72-.083a2.82 2.82 0 0 0 2.148-1.84c.833-2.613.33-5.328-2.228-10.82z"/>
      </svg>
    )
  },
  {
    name: 'Google Cloud',
    category: 'Infraestrutura Cloud',
    hoverColor: 'rgba(66, 133, 244, 0.4)',
    hoverGlow: 'rgba(66, 133, 244, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" className={styles.logoSvg}>
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/>
        <path d="M19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" fill="#34A853"/>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    category: 'Banco de Dados',
    hoverColor: 'rgba(65, 105, 225, 0.4)',
    hoverGlow: 'rgba(65, 105, 225, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <path d="M50 15 C30 15, 20 28, 20 48 C20 68, 32 75, 45 75 C42 70, 42 65, 44 60 C38 60, 32 58, 30 50 C36 53, 42 51, 46 47 C43 42, 43 36, 45 32 C49 37, 54 39, 60 38 C58 32, 60 25, 65 20 C60 17, 55 15, 50 15 Z" fill="#4169E1"/>
        <path d="M65 20 C72 25, 78 35, 78 48 C78 62, 70 72, 58 75 C60 70, 60 62, 57 56 C64 56, 70 52, 72 45 C66 48, 60 46, 56 42 C58 37, 58 32, 56 28 C60 32, 65 30, 68 25 C67 23, 66 22, 65 20 Z" fill="#4169E1" opacity="0.85"/>
      </svg>
    )
  },
  {
    name: 'Firebase',
    category: 'Database Realtime',
    hoverColor: 'rgba(255, 160, 0, 0.4)',
    hoverGlow: 'rgba(255, 160, 0, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" className={styles.logoSvg}>
        <path d="M3.89 15.67L8.25 2.28c.06-.2.2-.35.4-.38.2-.03.4.05.5.21l2.25 4.22L3.89 15.67z" fill="#FFA000"/>
        <path d="M13.51 8.87l-2.03-3.8c-.1-.2-.3-.3-.51-.3-.2 0-.4.1-.51.3L3.89 15.67l9.62-6.8z" fill="#F4B400"/>
        <path d="M3.89 15.67c-.12.16-.17.37-.12.57.05.2.18.36.36.43l8.03 4.48c.2.1.4.1.6 0l8.03-4.48c.18-.07.3-.23.36-.43.05-.2 0-.4-.12-.57L12 3.22 3.89 15.67z" fill="#FFCA28"/>
        <path d="M12.16 21.05c-.1 0-.2 0-.3 0L4.13 16.7c-.1-.05-.18-.15-.2-.25-.03-.1-.01-.22.05-.3l7.98-12.1c.1-.15.26-.22.44-.2.17.02.32.14.37.3l2.22 4.14-2.83 2.87-2 1.1-2.12-.5c.2-.14.4-.23.6-.28l2.06 1.05 1.5-.8 2.03-2.05L12.16 21.05z" fill="#DE5246"/>
      </svg>
    )
  },
  {
    name: 'Gemini / OpenAI',
    category: 'Inteligência Artificial',
    hoverColor: 'rgba(155, 114, 203, 0.4)',
    hoverGlow: 'rgba(155, 114, 203, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.logoSvg}>
        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="url(#geminiGradient)" stroke="none"/>
        <path d="M18 18L19.2 21L21 21.8L19.2 22.6L18 25.6L16.8 22.6L15 21.8L16.8 21.1L18 18Z" fill="url(#geminiGradient)" stroke="none" transform="translate(-10, -10) scale(0.6)"/>
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#FF4D00" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

export default function TechStack() {
  return (
    <section id="tecnologias" className={styles.techSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Stack de Alta Performance</span>
        <h2 className={styles.sectionTitle}>Tecnologias de Ponta Atualizadas</h2>
        <p className={styles.sectionDesc}>
          Utilizo as ferramentas mais consolidadas e modernas do mercado mundial para entregar sistemas rápidos, seguros, com código limpo e prontos para crescer.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        {techsData.map((tech, i) => (
          <div 
            key={i} 
            className={`glass-card ${styles.card}`}
            style={{ 
              ['--hover-color' as any]: tech.hoverColor,
              ['--hover-glow' as any]: tech.hoverGlow
            }}
          >
            <div className={styles.logoWrapper}>
              {tech.svg}
            </div>
            <h3 className={styles.techName}>{tech.name}</h3>
            <span className={styles.techCategory}>{tech.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
