import { Laptop, Bot, Cloud, CheckCircle2, HeartHandshake } from 'lucide-react';
import styles from './Services.module.css';

interface StoryItem {
  title: string;
  text: string;
}

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  story: StoryItem;
  span2?: boolean;
}

export default function Services() {
  const servicesData: ServiceItem[] = [
    {
      icon: <Laptop size={24} />,
      title: 'Sistemas & Apps sob Medida',
      desc: 'Desenvolvemos sistemas web e painéis administrativos enxutos focados em organizar as vendas, estoques e finanças da sua empresa sem complicações técnicas.',
      features: ['Controle Financeiro de Caixa', 'Sistemas de Pedidos', 'Agendadores Digitais', 'Painéis de Vendas'],
      story: {
        title: 'O Prejuízo de R$ 15 Mil no Caixa',
        text: 'Um pequeno comércio controlava estoques e fluxo de caixa em cadernos físicos. Sem controle rígido de entradas e saídas de peças e recebimentos atrasados, mercadorias sumiam e faturas venciam sem controle, acumulando R$ 15.000 de prejuízo líquido. Criamos um sistema financeiro web direto no celular. Em 2 meses, o prejuízo zerou.'
      },
      span2: true
    },
    {
      icon: <Cloud size={24} />,
      title: 'Criação de Sites & Landing Pages',
      desc: 'Desenvolvemos páginas de vendas, sites institucionais otimizados para busca orgânica do Google (SEO) e hospedagem de baixo custo.',
      features: ['Landing Pages de Alta Conversão', 'SEO Local para Buscas no Google', 'Sites Institucionais Responsivos', 'Servidores Econômicos & Estáveis'],
      story: {
        title: 'A Floricultura sem Visibilidade',
        text: 'Uma floricultura de Florianópolis dependia apenas de indicação. Comprou anúncios caros nas redes sociais direcionando para um WhatsApp lotado e não obteve retorno. Desenvolvemos uma Landing Page profissional e configuramos SEO local. Hoje ela capta clientes direto na pesquisa do Google organicamente.'
      }
    },
    {
      icon: <Bot size={24} />,
      title: 'Chatbots & WhatsApp IA',
      desc: 'Integramos robôs com Inteligência Artificial no seu WhatsApp Business para qualificar leads, responder perguntas frequentes e agendar horários automáticos.',
      features: ['Atendimento Automático 24/7', 'IA Conversacional no WhatsApp', 'Agendamentos e Captação de Leads', 'Redução de Tempo de Resposta'],
      story: {
        title: 'Clínica com Mensagens no Vácuo',
        text: 'Uma clínica de estética perdia 30% dos leads porque a recepcionista demorava até 1h para responder orçamentos no WhatsApp durante os horários de pico. Integramos um chatbot inteligente de pré-atendimento que qualifica as clientes em 2 segundos e agenda sessões automaticamente. A agenda da clínica lotou.'
      }
    },
    {
      icon: <HeartHandshake size={24} />,
      title: 'Consultoria de Tecnologia sob Medida',
      desc: 'Analisamos o seu comércio de perto para mapear gargalos e automatizar tarefas repetitivas, implementando soluções econômicas de altíssimo retorno.',
      features: ['Estudo Individual de Viabilidade', 'Orçamento Flexível e Planejado', 'Automação de Tarefas Manuais', 'Eliminação de Taxas Abusivas'],
      story: {
        title: 'O Delivery Livre de Comissões de 27%',
        text: 'Um restaurante de bairro pagava até 27% de taxas por cada pedido em aplicativos de delivery tradicionais, mal conseguindo pagar as contas. Fizemos uma consultoria e criamos um sistema próprio de cardápio integrado ao WhatsApp, eliminando as taxas abusivas. O lucro líquido cresceu R$ 4.200 no primeiro mês de uso.'
      },
      span2: true
    }
  ];

  return (
    <section id="solucoes" className={styles.services}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>O que fazemos</span>
          <h2 className={styles.title}>Criações de sites, sistemas e automações</h2>
          <p className={styles.desc}>
            Mais do que programar, estudamos o modelo de negócio de cada cliente para desenhar soluções eficientes que evitam prejuízos, organizam o caixa e vendem no piloto automático.
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
              
              {/* Estudo de caso fictício */}
              <div className={styles.storyBox}>
                <div className={styles.storyHeader}>
                  <span className={styles.storyTag}>Caso Fictício</span>
                  <strong className={styles.storyTitle}>{service.story.title}</strong>
                </div>
                <p className={styles.storyText}>"{service.story.text}"</p>
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
