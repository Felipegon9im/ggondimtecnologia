import styles from './Stats.module.css';
import florianopolisImg from '../assets/florianopolis.jpg';
import diretorImg from '../assets/diretor.jpg';

interface StatItem {
  number: string;
  label: string;
}

const statsData: StatItem[] = [
  { number: 'MercadoPDV', label: 'Sistema de Vendas & PDV' },
  { number: 'Sophia Painel', label: 'Painel Admin sob Medida' },
  { number: 'Zap Flow', label: 'Automação & API WhatsApp' },
  { number: 'Agenda Flow', label: 'Agendamento Online & ZAP' }
];

export default function Stats() {
  return (
    <section id="stats" className={styles.statsSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Projetos Reais</span>
        <h2 className={styles.sectionTitle}>Sistemas Ativos em Produção</h2>
      </div>

      <div className={`container ${styles.grid}`} style={{ marginBottom: '60px' }}>
        {statsData.map((stat, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.glow} />
            <div className={styles.number}>{stat.number}</div>
            <div className={styles.label}>{stat.label}</div>
            <a 
              href={`/${stat.number.toLowerCase().replace(/\s+/g, '')}.html`}
              style={{
                display: 'inline-block',
                marginTop: '16px',
                fontSize: '0.85rem',
                color: 'var(--secondary)',
                textDecoration: 'none',
                fontWeight: 600,
                borderBottom: '1px dashed rgba(255, 160, 0, 0.4)',
                paddingBottom: '2px',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Testar Agora →
            </a>
          </div>
        ))}
      </div>

      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.aboutCardsGrid}>
          {/* Card 1: Diretor Criativo */}
          <div className={`glass-card ${styles.aboutCard}`}>
            <div className={styles.cardFlex}>
              <div className={`${styles.imageCol} ${styles.imageColContain}`}>
                <img 
                  src={diretorImg} 
                  alt="Felipe Gondim - Diretor Criativo" 
                  className={styles.containImage} 
                />
              </div>
              <div className={styles.textCol}>
                <span className={styles.aboutSubtitle}>Liderança</span>
                <h3 className={styles.aboutTitle}>Felipe Gondim</h3>
                <p className={styles.aboutRole}>Diretor Criativo & Fundador</p>
                <p className={styles.aboutDesc}>
                  Com olhar focado em usabilidade e viabilidade técnica, Felipe lidera os projetos na G&G. Seu compromisso é estudar de perto o modelo de negócio de cada cliente para desenhar soluções digitais e automações que caibam no orçamento real de pequenas empresas, eliminando custos desnecessários.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Minha Origem */}
          <div className={`glass-card ${styles.aboutCard}`}>
            <div className={styles.cardFlex}>
              <div className={styles.imageCol}>
                <img 
                  src={florianopolisImg} 
                  alt="Florianópolis - Polo Tecnológico" 
                  className={styles.hqImage} 
                />
              </div>
              <div className={styles.textCol}>
                <span className={styles.aboutSubtitle}>Minha Origem</span>
                <h3 className={styles.aboutTitle}>Ilha do Silício</h3>
                <p className={styles.aboutRole}>Florianópolis - SC</p>
                <p className={styles.aboutDesc}>
                  Minhas raízes estão em Florianópolis, um dos principais polos de tecnologia e inovação do Brasil. Daqui, atuo de forma totalmente remota, combinando a cultura criativa catarinense com engenharia de software de ponta para atender e digitalizar empresas em todo o país.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
