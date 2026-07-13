import { Monitor, Cpu, Smartphone, Cloud, Layers, DollarSign, Archive, Calendar, FileText, Settings } from 'lucide-react';
import styles from './CustomSystems.module.css';

interface SystemCategory {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const categories: SystemCategory[] = [
  {
    icon: <Monitor size={20} />,
    title: 'Sistemas Web',
    desc: 'Plataformas seguras acessíveis de qualquer navegador, integrando sua equipe em tempo real.'
  },
  {
    icon: <Cpu size={20} />,
    title: 'Sistemas Windows',
    desc: 'Softwares locais nativos (.msi) com alto desempenho e comunicação direta com periféricos.'
  },
  {
    icon: <Smartphone size={20} />,
    title: 'Aplicativos Android',
    desc: 'Soluções móveis rápidas e sob medida para sua equipe ou clientes usarem em movimento.'
  },
  {
    icon: <Cloud size={20} />,
    title: 'Sistemas em Nuvem',
    desc: 'Bancos de dados e microsserviços centralizados de alta performance e redundância.'
  },
  {
    icon: <Layers size={20} />,
    title: 'ERP & CRM Personalizados',
    desc: 'Centralizadores de dados para gestão integrada de recursos e relacionamento com clientes.'
  },
  {
    icon: <DollarSign size={20} />,
    title: 'Controle Financeiro',
    desc: 'Frentes de caixa, controle de fluxo e emissão de notas fiscais desenhados para o seu fluxo.'
  },
  {
    icon: <Archive size={20} />,
    title: 'Gestão de Estoque',
    desc: 'Rastreamento inteligente de inventário, validades, alertas de estoque mínimo e reposição.'
  },
  {
    icon: <Calendar size={20} />,
    title: 'Agendas & Consultas',
    desc: 'Calendários de horários inteligentes com lembretes automáticos e controle de atendimentos.'
  },
  {
    icon: <FileText size={20} />,
    title: 'Ordens de Serviço (O.S.)',
    desc: 'Controle completo sobre abertura, status, peças utilizadas e encerramento de chamados.'
  },
  {
    icon: <Settings size={20} />,
    title: 'Gestão Empresarial',
    desc: 'Automações internas desenhadas especificamente para eliminar tarefas repetitivas.'
  }
];

export default function CustomSystems() {
  return (
    <section id="sistemas" className={styles.systemsSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Sistemas sob Medida</span>
        <h2 className={styles.sectionTitle}>Softwares e Sistemas <span>Personalizados</span></h2>
        <p className={styles.sectionDesc}>
          Desenvolvo sistemas corporativos adaptados exatamente ao fluxo de trabalho e regras de negócio da sua empresa, focando em simplicidade e usabilidade.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        {categories.map((cat, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {cat.icon}
            </div>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardDesc}>{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`container ${styles.highlightBanner}`}>
        <p className={styles.bannerText}>
          ⚠️ <strong>Diferencial G&G:</strong> Não vendo sistemas engessados com mensalidades eternas sobre módulos que você não usa. Cada sistema é projetado <strong>100% sob medida</strong> para resolver os seus gargalos reais, otimizando o seu tempo e o orçamento da sua empresa.
        </p>
      </div>
    </section>
  );
}
