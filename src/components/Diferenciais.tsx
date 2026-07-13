import { ShieldCheck, Code, Zap, Key, Server, Link, Database, Search, UserCheck, RefreshCcw } from 'lucide-react';
import styles from './Diferenciais.module.css';

interface Differentiator {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const differentiators: Differentiator[] = [
  {
    icon: <UserCheck size={20} />,
    title: 'Desenvolvimento Personalizado',
    desc: 'Sistemas criados sob medida para o seu negócio, sem módulos genéricos inúteis ou mensalidades eternas.'
  },
  {
    icon: <Code size={20} />,
    title: 'Código Limpo & Organizado',
    desc: 'Uso das melhores práticas de programação globais para manter o código leve e pronto para atualizações.'
  },
  {
    icon: <Zap size={20} />,
    title: 'Alta Performance Nativa',
    desc: 'Softwares leves e velozes que reduzem o consumo de dados, o tempo de carregamento e evitam travamentos.'
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Segurança da Informação',
    desc: 'Modelagem rigorosa de acessos, criptografia de senhas e proteção ativa contra invasões ou vazamentos.'
  },
  {
    icon: <Server size={20} />,
    title: 'Arquitetura Moderna',
    desc: 'Infraestruturas escaláveis que suportam o crescimento acelerado de dados e requisições da sua empresa.'
  },
  {
    icon: <Link size={20} />,
    title: 'Integração Simples de APIs',
    desc: 'Conexão nativa com Bling ERP, meios de pagamentos (Stripe/Pix) e inteligências artificiais.'
  },
  {
    icon: <Database size={20} />,
    title: 'Bancos de Dados Robustos',
    desc: 'Estruturação avançada de bancos SQL (Postgres/MySQL) e NoSQL em tempo real para consistência total de estoque e caixa.'
  },
  {
    icon: <Search size={20} />,
    title: 'SEO Otimizado de Raiz',
    desc: 'Construção semântica e velocidade otimizadas para posicionar seu site no topo das buscas locais do Google.'
  },
  {
    icon: <Key size={20} />,
    title: 'Suporte Direto Especializado',
    desc: 'Fale diretamente com o programador responsável por desenvolver a sua solução, sem atendentes ou filas de espera.'
  },
  {
    icon: <RefreshCcw size={20} />,
    title: 'Atualizações Contínuas',
    desc: 'Facilidade para modificar regras de negócio ou adicionar funcionalidades à medida que sua empresa cresce.'
  }
];

export default function Diferenciais() {
  return (
    <section id="diferenciais" className={styles.diferenciaisSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Meus Pilares</span>
        <h2 className={styles.sectionTitle}>Nossos <span>Diferenciais</span></h2>
        <p className={styles.sectionDesc}>
          Entregas pautadas em excelência técnica, clareza contratual e soluções robustas de engenharia que geram valor comercial de verdade.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        {differentiators.map((diff, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {diff.icon}
            </div>
            <h3 className={styles.cardTitle}>{diff.title}</h3>
            <p className={styles.cardDesc}>{diff.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
