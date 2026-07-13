import styles from './HowWeWork.module.css';

interface Step {
  num: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    num: '1',
    title: 'Levantamento de Requisitos',
    desc: 'Alinhamento inicial detalhado para entender as reais dores, rotinas e gargalos do seu comércio. Mapeamos as regras de negócio antes de começar a codificar.'
  },
  {
    num: '2',
    title: 'Planejamento & Escopo',
    desc: 'Desenho da arquitetura técnica do sistema, especificação de recursos essenciais, escolha da infraestrutura estável e definição de prazos com orçamento planejado.'
  },
  {
    num: '3',
    title: 'Protótipo Visual',
    desc: 'Construção da interface visual do sistema (telas e fluxos) para sua aprovação. Isso garante que o produto final tenha a usabilidade e visual que você espera.'
  },
  {
    num: '4',
    title: 'Desenvolvimento Ágil',
    desc: 'Programação de alto desempenho focada em código limpo, modular, responsivo e entrega incremental de módulos funcionais para acompanhamento em tempo real.'
  },
  {
    num: '5',
    title: 'Testes Rigorosos',
    desc: 'Fase detalhada de auditoria técnica para validação de fluxos, segurança da informação, velocidade sob carga e estabilidade geral em múltiplos dispositivos.'
  },
  {
    num: '6',
    title: 'Implantação Assistida',
    desc: 'Publicação do sistema em nuvem ou instalação direta das versões nativas (.msi) em computadores locais, com suporte e auxílio na carga inicial de dados.'
  },
  {
    num: '7',
    title: 'Suporte & Evolução',
    desc: 'Monitoramento contínuo dos servidores locais ou remotos, correção ágil de intercorrências e suporte direto ao desenvolvedor para implementação de melhorias futuras.'
  }
];

export default function HowWeWork() {
  return (
    <section id="processo" className={styles.timelineSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Como Trabalho</span>
        <h2 className={styles.sectionTitle}>Etapas do <span>Desenvolvimento</span></h2>
        <p className={styles.sectionDesc}>
          Um processo estruturado de ponta a ponta, focado em clareza, alinhamento técnico e entrega de sistemas robustos sem surpresas no meio do caminho.
        </p>
      </div>

      <div className={`container ${styles.timeline}`}>
        {steps.map((step, i) => (
          <div key={i} className={styles.timelineStep}>
            <div className={styles.numberIcon}>{step.num}</div>
            <div className={`glass-card ${styles.card}`}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
