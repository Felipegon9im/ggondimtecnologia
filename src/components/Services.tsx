import { Laptop, Bot, Cloud, CheckCircle2, HeartHandshake } from 'lucide-react';
import styles from './Services.module.css';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  caseImage: string;
  storyTitle: string;
  span2?: boolean;
}

export default function Services() {
  const servicesData: ServiceItem[] = [
    {
      icon: <Laptop size={24} />,
      title: 'Sistemas & Apps sob Medida',
      desc: 'Desenvolvo sistemas web e painéis administrativos enxutos focados em organizar as vendas, estoques e finanças da sua empresa sem complicações técnicas.',
      features: ['Controle Financeiro de Caixa', 'Sistemas de Pedidos', 'Agendadores Digitais', 'Painéis de Vendas'],
      caseImage: '/case_finance.png',
      storyTitle: 'R$ 15 Mil no Caixa Recuperados',
      span2: true
    },
    {
      icon: <Cloud size={24} />,
      title: 'Criação de Sites & Landing Pages',
      desc: 'Desenvolvo páginas de vendas, sites institucionais otimizados para busca orgânica do Google (SEO) e hospedagem de baixo custo.',
      features: ['Landing Pages de Alta Conversão', 'SEO Local para Buscas no Google', 'Sites Institucionais Responsivos', 'Servidores Econômicos & Estáveis'],
      caseImage: '/case_florist.png',
      storyTitle: 'Captação no Google Local'
    },
    {
      icon: <Bot size={24} />,
      title: 'Chatbots & WhatsApp IA',
      desc: 'Integro robôs com Inteligência Artificial no seu WhatsApp Business para qualificar leads, responder perguntas frequentes e agendar horários automáticos.',
      features: ['Atendimento Automático 24/7', 'IA Conversacional no WhatsApp', 'Agendamentos e Captação de Leads', 'Redução de Tempo de Resposta'],
      caseImage: '/case_chatbot.png',
      storyTitle: 'Agenda Lotada sem Vácuo'
    },
    {
      icon: <HeartHandshake size={24} />,
      title: 'Consultoria de Tecnologia sob Medida',
      desc: 'Analiso o seu comércio de perto para mapear gargalos e automatizar tarefas repetitivas, implementando soluções econômicas de altíssimo retorno.',
      features: ['Estudo Individual de Viabilidade', 'Orçamento Flexível e Planejado', 'Automação de Tarefas Manuais', 'Eliminação de Taxas Abusivas'],
      caseImage: '/case_delivery.png',
      storyTitle: 'Delivery Livre de Taxas de 27%',
      span2: true
    }
  ];

  return (
    <section id="solucoes" className={styles.services}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>O que faço</span>
          <h2 className={styles.title}>Criações de sites, sistemas e automações</h2>
          <p className={styles.desc}>
            Mais do que programar, estudo o modelo de negócio de cada cliente para desenhar soluções eficientes que evitam prejuízos, organizam o caixa e vendem no piloto automático.
          </p>
        </div>

        <div className={styles.grid}>
          {servicesData.map((service, i) => (
            <div key={i} className={`glass-card ${styles.card} ${service.span2 ? styles.span2 : ''}`}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              
              {/* Estudo de caso visual com texto embutido na imagem */}
              <div className={styles.caseImageWrapper}>
                <span className={styles.storyTag}>Estudo de Caso: {service.storyTitle}</span>
                <img 
                  src={service.caseImage} 
                  alt={service.storyTitle} 
                  className={styles.caseImage} 
                />
              </div>

              <ul className={styles.featuresList}>
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className={styles.featureItem}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
