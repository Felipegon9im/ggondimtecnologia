import { useState } from 'react';
import styles from './Portfolio.module.css';
import florianopolisImg from '../assets/florianopolis.jpg';

type FilterType = 'all' | 'systems' | 'chatbots' | 'pages';

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
      title: 'SaborOn - Cardápio Digital WhatsApp',
      category: 'systems',
      categoryLabel: 'Sistemas Comerciais',
      desc: 'Plataforma completa de cardápio interativo e carrinho de compras para hamburguerias e pizzarias, enviando pedidos já formatados direto no WhatsApp do estabelecimento.',
      image: '/menu_mockup.png',
      techs: ['React.js', 'Node.js', 'WhatsApp API', 'MongoDB']
    },
    {
      id: 2,
      title: 'AtendeZAP - Chatbot WhatsApp com IA',
      category: 'chatbots',
      categoryLabel: 'Inteligência Artificial',
      desc: 'Robô de atendimento inteligente integrado à API oficial do WhatsApp. Responde FAQs, agenda consultas para clínicas e qualifica leads comerciais de forma natural.',
      image: '/chatbot_mockup.png',
      techs: ['Python', 'FastAPI', 'Gemini API', 'WhatsApp Cloud API']
    },
    {
      id: 3,
      title: 'Agendador Online - BeautyCalendar',
      category: 'systems',
      categoryLabel: 'Sistemas Comerciais',
      desc: 'Sistema de agendamento online com grade de horários interativa em tempo real para salões de beleza, estéticas e estúdios. Conta com lembretes automáticos de agendamento.',
      image: '/scheduler_mockup.png',
      techs: ['React', 'TypeScript', 'Notificações ZAP', 'Firebase']
    },
    {
      id: 4,
      title: 'Floripa Imóveis - Landing Page de Alta Conversão',
      category: 'pages',
      categoryLabel: 'Landing Pages',
      desc: 'Landing page premium projetada para captar leads qualificados de alto padrão, otimizada com técnicas avançadas de SEO e Google Ads para atração de tráfego local.',
      image: florianopolisImg,
      techs: ['React / Vite', 'CSS Modules', 'SEO Meta', 'Google Analytics']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'systems', label: 'Sistemas' },
    { value: 'chatbots', label: 'Chatbots IA' },
    { value: 'pages', label: 'Landing Pages' }
  ];

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Portfólio</span>
          <h2 className={styles.title}>Nossas Soluções Entregues</h2>
          <p className={styles.desc}>
            Veja exemplos práticos de projetos que desenvolvemos com foco em impulsionar o faturamento e automatizar a rotina de pequenos e médios negócios.
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
              <div className={styles.cardContent}>
                <span className={styles.projectBadge}>{project.categoryLabel}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.desc}</p>
                <div className={styles.techList}>
                  {project.techs.map((tech, idx) => (
                    <span key={idx} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
