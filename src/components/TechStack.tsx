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
    name: 'Next.js',
    category: 'Web Framework',
    hoverColor: 'rgba(255, 255, 255, 0.3)',
    hoverGlow: 'rgba(255, 255, 255, 0.1)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <circle cx="50" cy="50" r="45" fill="black" stroke="white" strokeWidth="2"/>
        <path d="M35 70 L65 30 M55 30 L55 70" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        <path d="M35 70 L55 45" stroke="white" strokeWidth="6" strokeLinecap="round"/>
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
    name: 'JavaScript',
    category: 'Linguagem Web',
    hoverColor: 'rgba(247, 223, 30, 0.4)',
    hoverGlow: 'rgba(247, 223, 30, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#f7df1e" rx="10"/>
        <text x="85" y="80" fill="black" fontSize="40" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">JS</text>
      </svg>
    )
  },
  {
    name: 'Firebase',
    category: 'Bancos Realtime',
    hoverColor: 'rgba(255, 160, 0, 0.4)',
    hoverGlow: 'rgba(255, 160, 0, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" className={styles.logoSvg}>
        <path d="M3.89 15.67L8.25 2.28c.06-.2.2-.35.4-.38.2-.03.4.05.5.21l2.25 4.22L3.89 15.67z" fill="#FFA000"/>
        <path d="M13.51 8.87l-2.03-3.8c-.1-.2-.3-.3-.51-.3-.2 0-.4.1-.51.3L3.89 15.67l9.62-6.8z" fill="#F4B400"/>
        <path d="M3.89 15.67c-.12.16-.17.37-.12.57.05.2.18.36.36.43l8.03 4.48c.2.1.4.1.6 0l8.03-4.48c.18-.07.3-.23.36-.43.05-.2 0-.4-.12-.57L12 3.22 3.89 15.67z" fill="#FFCA28"/>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    category: 'Banco Relacional',
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
    name: 'MySQL',
    category: 'Banco Relacional',
    hoverColor: 'rgba(0, 117, 143, 0.4)',
    hoverGlow: 'rgba(0, 117, 143, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#00758f" rx="10"/>
        <path d="M30 45 C30 30, 70 30, 70 45 C70 60, 30 60, 30 45 Z M30 55 C30 70, 70 70, 70 55 C70 55, 70 55, 70 55" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        <path d="M30 35 L30 65 M70 35 L70 65" fill="none" stroke="white" strokeWidth="6"/>
      </svg>
    )
  },
  {
    name: 'SQL Server',
    category: 'Banco Relacional',
    hoverColor: 'rgba(237, 28, 36, 0.4)',
    hoverGlow: 'rgba(237, 28, 36, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#cc292b" rx="10"/>
        <path d="M35 30 L65 30 M35 50 L65 50 M35 70 L65 70" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round"/>
        <path d="M50 20 L50 80" fill="none" stroke="white" strokeWidth="8"/>
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
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.954-2.172h2.118c.103 0 .187-.083.187-.185V6.733c0-.102-.084-.185-.187-.185h-2.118c-.103 0-.186.083-.186.185v1.988c0 .102.083.185.186.185" />
        <path d="M11.029 11.078h2.118c.103 0 .187-.083.187-.185V8.906c0-.102-.084-.186-.187-.186h-2.118c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.953 0h2.119c.102 0 .185-.083.185-.185V8.906c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m0-2.172h2.119c.102 0 .185-.083.185-.185V6.733c0-.102-.083-.185-.185-.185h-2.119c-.103 0-.186.083-.186.185v1.988c0 .102.083.185.186.185" />
        <path d="M8.076 11.078h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m0-2.172h2.119c.102 0 .186-.083.186-.185V6.733c0-.102-.084-.185-.186-.185h-2.119c-.103 0-.186.083-.186.185v1.988c0 .102.083.185.186.185m0-2.172h2.119c.102 0 .186-.083.186-.186V4.56c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.988c0 .102.083.186.186.186" />
        <path d="M5.123 11.078h2.119c.102 0 .186-.083.186-.185V8.906c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.953 0h2.119c.103 0 .186-.083.186-.185V8.906c0-.102-.083-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v1.987c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .185-.083.185-.185V8.906c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.987c0 .102.083.185.186.185m-2.953 0h2.119c.103 0 .186-.083.186-.185V8.906c0-.102-.083-.186-.186-.186H.186c-.102 0-.186.084-.186.186v1.987c0 .102.084.185.186.185" />
        <path d="M0 13.25h17.97c.102 0 .186-.083.186-.185v-1.987c0-.102-.084-.186-.186-.186H.186c-.102 0-.186.084-.186.186v1.987c0 .102.084.185.186.185M23.99 11.23c-.1-.137-.417-.384-.96-.543-.54-.158-1.127-.145-1.545-.09-.27.035-.55.088-.813.16-.035-.115-.078-.23-.13-.34-.515-1.11-1.464-1.92-2.585-2.222a3.83 3.83 0 0 0-1.85.083 4.417 4.417 0 0 0-.677-2.308c-.76-1.198-1.99-1.986-3.32-2.13a.18.18 0 0 0-.14.05.182.182 0 0 0-.05.14v2.793c0 .085.035.163.097.22.428.388.755.882.95 1.43a2.766 2.766 0 0 1 .05 1.76l-.16.57a.187.187 0 0 0 .045.18.183.183 0 0 0 .152.057 6.46 6.46 0 0 1 2.378.435c.87.352 1.558.98 1.95 1.776.28.583.393 1.228.33 1.868-.076.77-.386 1.488-.87 2.082a5.536 5.536 0 0 1-2.188 1.62c-.752.327-1.577.49-2.42.485H.187C.084 20.3 0 20.384 0 20.487v.678c0 1.41.97 2.637 2.35 2.81 7.234.908 14.52.88 21.72-.083a2.82 2.82 0 0 0 2.148-1.84c.833-2.613.33-5.328-2.228-10.82z" />
      </svg>
    )
  },
  {
    name: 'Linux',
    category: 'Sistemas Operacionais',
    hoverColor: 'rgba(255, 214, 0, 0.4)',
    hoverGlow: 'rgba(255, 214, 0, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#222" rx="10"/>
        <text x="15" y="60" fill="#ffd600" fontSize="38" fontWeight="bold" fontFamily="monospace">&gt;_</text>
      </svg>
    )
  },
  {
    name: 'Git',
    category: 'Controle de Versão',
    hoverColor: 'rgba(240, 80, 50, 0.4)',
    hoverGlow: 'rgba(240, 80, 50, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <path d="M89 44 L56 11 C53 8, 47 8, 44 11 L11 44 C8 47, 8 53, 11 56 L44 89 C47 92, 53 92, 56 89 L89 56 C92 53, 92 47, 89 44 Z" fill="#F05032"/>
        <circle cx="50" cy="50" r="7" fill="white"/>
        <circle cx="35" cy="50" r="7" fill="white"/>
        <circle cx="50" cy="68" r="7" fill="white"/>
        <path d="M35 50 L50 50 L50 68" fill="none" stroke="white" strokeWidth="5"/>
      </svg>
    )
  },
  {
    name: 'Android',
    category: 'Desenvolvimento Mobile',
    hoverColor: 'rgba(61, 220, 132, 0.4)',
    hoverGlow: 'rgba(61, 220, 132, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <circle cx="50" cy="50" r="45" fill="#3ddc84" />
        <path d="M30 45 C30 35, 70 35, 70 45" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="42" cy="40" r="3" fill="white"/>
        <circle cx="58" cy="40" r="3" fill="white"/>
        <path d="M35 30 L38 35 M65 30 L62 35" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: 'Java',
    category: 'Linguagem Backend',
    hoverColor: 'rgba(83, 130, 161, 0.4)',
    hoverGlow: 'rgba(83, 130, 161, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#5382a1" rx="10"/>
        {/* Stylized coffee cup */}
        <path d="M30 55 C30 70, 70 70, 70 55 L30 55 Z" fill="none" stroke="white" strokeWidth="5"/>
        <path d="M40 30 Q45 20 42 12 M50 32 Q55 22 52 14" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: '.NET',
    category: 'Linguagem/Framework',
    hoverColor: 'rgba(81, 43, 212, 0.4)',
    hoverGlow: 'rgba(81, 43, 212, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <circle cx="50" cy="50" r="45" fill="#512bd4"/>
        <text x="50" y="58" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">.NET</text>
      </svg>
    )
  },
  {
    name: 'Power BI',
    category: 'Business Intelligence',
    hoverColor: 'rgba(242, 197, 17, 0.4)',
    hoverGlow: 'rgba(242, 197, 17, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#f2c511" rx="10"/>
        <path d="M25 75 L25 55 M50 75 L50 40 M75 75 L75 25" stroke="black" strokeWidth="12" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: 'REST API',
    category: 'Protocolo Integração',
    hoverColor: 'rgba(74, 85, 104, 0.4)',
    hoverGlow: 'rgba(74, 85, 104, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        <rect width="100" height="100" fill="#4a5568" rx="10"/>
        <text x="50" y="45" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">REST</text>
        <text x="50" y="75" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">API</text>
      </svg>
    )
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Estruturação & Estilo',
    hoverColor: 'rgba(227, 79, 38, 0.4)',
    hoverGlow: 'rgba(227, 79, 38, 0.15)',
    svg: (
      <svg viewBox="0 0 100 100" className={styles.logoSvg}>
        {/* Overlapping HTML5 orange shield and CSS3 blue shield */}
        <path d="M20 15 L28 75 L50 82 L72 75 L80 15 Z" fill="#e34f26"/>
        <path d="M50 15 L50 82 L72 75 L80 15 Z" fill="#f06529"/>
        <text x="50" y="55" fill="white" fontSize="40" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">5</text>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling Otimizado',
    hoverColor: 'rgba(56, 189, 248, 0.4)',
    hoverGlow: 'rgba(56, 189, 248, 0.15)',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" className={styles.logoSvg}>
        <path d="M12 6.018C15.6 2.418 19.8 2.418 24 6.018c-3.6 3.6-7.8 3.6-12 0zm-12 6c3.6-3.6 7.8-3.6 12 0-3.6 3.6-7.8 3.6-12 0zm12 6c3.6-3.6 7.8-3.6 12 0-3.6 3.6-7.8 3.6-12 0z" fill="#38bdf8"/>
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
