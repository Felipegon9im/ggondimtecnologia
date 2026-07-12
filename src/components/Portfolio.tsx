import { useState } from 'react';
import styles from './Portfolio.module.css';

type FilterType = 'all' | 'systems' | 'chatbots';

interface Project {
  id: number;
  title: string;
  category: FilterType;
  categoryLabel: string;
  desc: string;
  image: string;
  techs: string[];
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'MercadoPDV',
      category: 'systems',
      categoryLabel: 'Sistemas Comerciais',
      desc: 'Sistema de Frente de Caixa (PDV) e controle de estoque completo para mercados, mercearias e comércios locais, com foco em usabilidade e controle de caixa rápido.',
      image: '/mercadopdv_screenshot.png',
      techs: ['React', 'TypeScript', 'Node.js', 'SQL Local']
    },
    {
      id: 2,
      title: 'Sophia Painel',
      category: 'systems',
      categoryLabel: 'Painéis Administrativos',
      desc: 'Painel administrativo customizado e intuitivo para controle de faturamento, monitoramento de vendas internas e gestão financeira de pequenos negócios.',
      image: '/sophiapainel_screenshot.png',
      techs: ['React / Vite', 'CSS Modules', 'Firebase Firestore']
    },
    {
      id: 3,
      title: 'Zap Flow',
      category: 'chatbots',
      categoryLabel: 'Automações WhatsApp',
      desc: 'Plataforma inteligente de disparos automáticos e integração de chatbots no WhatsApp para automatizar o funil de vendas, responder dúvidas e qualificar contatos.',
      image: '/chatbot_mockup.png',
      techs: ['Node.js', 'WhatsApp API', 'FastAPI', 'Gemini IA']
    },
    {
      id: 4,
      title: 'Agenda Flow',
      category: 'systems',
      categoryLabel: 'Agendadores Digitais',
      desc: 'Sistema inteligente de agendamento online com calendário dinâmico em tempo real e envio de lembretes automáticos de confirmação de horários por WhatsApp.',
      image: '/scheduler_mockup.png',
      techs: ['React.js', 'Notificações ZAP', 'Node.js', 'Firebase']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'systems', label: 'Sistemas & Painéis' },
    { value: 'chatbots', label: 'Automações ZAP' }
  ];

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Portfólio</span>
          <h2 className={styles.title}>Soluções Entregues</h2>
          <p className={styles.desc}>
            Veja exemplos práticos de projetos que desenvolvi com foco em impulsionar o faturamento e automatizar a rotina de pequenos e médios negócios.
          </p>
        </div>

        {/* Filters Tabs */}
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.filterBtnActive : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={`glass-card ${styles.card}`}>
              <div className={styles.imageWrapper}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={styles.projectImage} 
                />
              </div>
              <div className={styles.cardContent} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 200px)' }}>
                <span className={styles.projectBadge}>{project.categoryLabel}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc} style={{ flexGrow: 1 }}>{project.desc}</p>
                <div className={styles.techList} style={{ marginBottom: '16px' }}>
                  {project.techs.map((tech, idx) => (
                    <span key={idx} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
                <a 
                  href={`/${project.title.toLowerCase().replace(/\s+/g, '')}.html`} 
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.85rem', padding: '10px 0', textAlign: 'center' }}
                >
                  Testar Agora
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
