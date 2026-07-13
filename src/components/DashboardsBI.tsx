import { BarChart3, LineChart, PieChart, TrendingUp, Cpu, Eye } from 'lucide-react';
import styles from './DashboardsBI.module.css';

interface BICard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const biCards: BICard[] = [
  {
    icon: <BarChart3 size={22} />,
    title: 'Dashboards Personalizados',
    desc: 'Painéis interativos sob medida desenvolvidos para consolidar e ilustrar o andamento de vendas, finanças e metas em uma única tela.'
  },
  {
    icon: <LineChart size={22} />,
    title: 'Acompanhamento de KPIs',
    desc: 'Defina e monitore os Indicadores Chave de Performance (KPIs) essenciais do seu negócio para acompanhar o crescimento real.'
  },
  {
    icon: <PieChart size={22} />,
    title: 'Relatórios Gerenciais Dinâmicos',
    desc: 'Gere relatórios automatizados de faturamento, vendas e fluxo de caixa, prontos para exportar ou compartilhar em poucos cliques.'
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Indicadores Financeiros (DRE)',
    desc: 'Monitore margens de lucro de forma automática, custos fixos, custos operacionais e fluxo de caixa sem planilhas confusas.'
  },
  {
    icon: <Cpu size={22} />,
    title: 'Integração Power BI & Analytics',
    desc: 'Integre seus bancos de dados e sistemas locais diretamente ao Microsoft Power BI para gerar relatórios e análises profundas.'
  },
  {
    icon: <Eye size={22} />,
    title: 'Monitoramento em Tempo Real',
    desc: 'Acompanhe as atualizações de estoque, pedidos e vendas de forma instantânea, permitindo respostas ágeis a qualquer evento.'
  }
];

export default function DashboardsBI() {
  return (
    <section id="bi" className={styles.biSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Business Intelligence</span>
        <h2 className={styles.sectionTitle}>Dashboards & <span>Análise de Dados</span></h2>
        <p className={styles.sectionDesc}>
          Transformo os dados soltos da sua empresa em informações estratégicas e visuais que facilitam a tomada de decisões e aceleram o crescimento.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        {biCards.map((card, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {card.icon}
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
