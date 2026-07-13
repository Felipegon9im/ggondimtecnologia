import { useState } from 'react';
import styles from './Portfolio.module.css';

type FilterType = 'all' | 'restaurantes' | 'clinicas' | 'homecare' | 'erp' | 'dashboards' | 'financeiro' | 'logistica' | 'android';

interface Project {
  id: number;
  title: string;
  categories: FilterType[];
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
      categories: ['erp', 'financeiro'],
      categoryLabel: 'Sistemas Comerciais',
      desc: 'Frente de Caixa (PDV) ultra veloz e retaguarda de estoque completo para mercados e mercearias locais, com funcionamento offline e integração com balanças.',
      image: '/mercadopdv_screenshot.png',
      techs: ['React', 'TypeScript', 'Node.js', 'SQL Local']
    },
    {
      id: 2,
      title: 'Sophia Painel',
      categories: ['dashboards', 'financeiro', 'erp'],
      categoryLabel: 'Painéis Admin & Bling',
      desc: 'Painel administrativo integrado ao Bling ERP para gestão centralizada de catálogo de peças, sincronização automática de estoques e faturamento de vendas.',
      image: '/sophiapainel_screenshot.png',
      techs: ['React', 'CSS Modules', 'Bling ERP API']
    },
    {
      id: 3,
      title: 'Zap Flow',
      categories: ['erp'],
      categoryLabel: 'Automações WhatsApp',
      desc: 'Plataforma inteligente de disparos automáticos e integração de chatbots no WhatsApp para automatizar o funil de vendas, responder dúvidas e qualificar contatos.',
      image: '/chatbot_mockup.png',
      techs: ['Node.js', 'WhatsApp API', 'FastAPI', 'Gemini IA']
    },
    {
      id: 4,
      title: 'Agenda Flow',
      categories: ['clinicas', 'homecare'],
      categoryLabel: 'Agendadores Digitais',
      desc: 'Grade de agendamento online em tempo real para clínicas e consultórios, integrada a disparador automático de lembretes de confirmação por WhatsApp.',
      image: '/scheduler_mockup.png',
      techs: ['React.js', 'Notificações ZAP', 'Node.js', 'Firebase']
    },
    {
      id: 5,
      title: 'Gourmet Flow',
      categories: ['restaurantes'],
      categoryLabel: 'Cardápio & Pedidos',
      desc: 'Cardápio interativo via web e sistema administrativo para restaurantes, pizzarias e delivery, integrado a painel de pedidos ao vivo na cozinha.',
      image: '/case_delivery.png',
      techs: ['React Native', 'Node.js', 'PostgreSQL', 'WebSockets']
    },
    {
      id: 6,
      title: 'Care Flow',
      categories: ['homecare', 'clinicas'],
      categoryLabel: 'Gestão de Saúde',
      desc: 'Painel de monitoramento e controle de escalas de plantões médicos e de enfermagem para clínicas de atendimento domiciliar (Home Care).',
      image: '/case_florist.png',
      techs: ['React', 'TypeScript', 'Tailwind', 'Firebase']
    },
    {
      id: 7,
      title: 'Logistics Flow',
      categories: ['logistica'],
      categoryLabel: 'Rastreamento & Frota',
      desc: 'Rastreador de frotas e despachador de entregas com cálculo de rotas inteligentes e notificação automática de chegada aos destinatários.',
      image: '/case_chatbot.png',
      techs: ['React Native', 'Express.js', 'MongoDB', 'Maps API']
    },
    {
      id: 8,
      title: 'Sophia Mobile',
      categories: ['android'],
      categoryLabel: 'Aplicativos Android',
      desc: 'Aplicativo Android nativo integrado ao Sophia Painel para que o lojista consulte o faturamento consolidado, vendas e estoque do celular.',
      image: '/case_finance.png',
      techs: ['React Native', 'TypeScript', 'SQLite', 'Rest API']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(activeFilter));

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'erp', label: 'ERP' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'dashboards', label: 'Dashboards' },
    { value: 'clinicas', label: 'Clínicas' },
    { value: 'homecare', label: 'Home Care' },
    { value: 'restaurantes', label: 'Restaurantes' },
    { value: 'logistica', label: 'Logística' },
    { value: 'android', label: 'Apps Android' }
  ];

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Sistemas em Produção</span>
          <h2 className={styles.title}>Vitrine de Soluções</h2>
          <p className={styles.desc}>
            Explore os sistemas reais e aplicativos de alta performance desenvolvidos sob medida para organizar a operação de diversas áreas do mercado.
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
          {filteredProjects.map((project) => {
            const hasPage = ['MercadoPDV', 'Sophia Painel', 'Zap Flow', 'Agenda Flow'].includes(project.title);
            const linkUrl = hasPage 
              ? `/${project.title.toLowerCase().replace(/\s+/g, '')}.html`
              : `https://wa.me/5548988628030?text=Olá Felipe, tenho interesse no sistema ${project.title} e gostaria de saber mais informações.`;

            return (
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
                    href={linkUrl} 
                    target={hasPage ? '_self' : '_blank'}
                    rel={hasPage ? undefined : 'noopener noreferrer'}
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '10px 0', textAlign: 'center' }}
                  >
                    Saiba Mais
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
