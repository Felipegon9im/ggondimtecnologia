import { Check } from 'lucide-react';
import styles from './About.module.css';
import florianopolisImg from '../assets/florianopolis.jpg';
import diretorImg from '../assets/diretor.jpg';

export default function About() {
  return (
    <section id="sobre" className={styles.aboutSection}>
      <div className={`container ${styles.introGrid}`}>
        {/* Left Intro Text */}
        <div className={styles.introContent}>
          <span className={styles.sectionSubtitle}>Quem Somos</span>
          <h2 className={styles.sectionTitle}>
            Soluções Digitais <span>sob Medida</span> para Impulsionar seu Negócio
          </h2>
          <p className={styles.introText}>
            A <strong>Gurjão & Gondim Tecnologia</strong> é especializada no desenvolvimento de soluções digitais sob medida para empresas. Focada em aliar qualidade, inovação, segurança e alto desempenho, atuo de forma próxima a cada cliente para entregar resultados reais de alto retorno, simplificando processos e eliminando custos desnecessários.
          </p>
          <div className={styles.bullets}>
            <div className={styles.bullet}>
              <Check size={16} className={styles.bulletIcon} />
              <span>Desenvolvimento personalizado</span>
            </div>
            <div className={styles.bullet}>
              <Check size={16} className={styles.bulletIcon} />
              <span>Qualidade e inovação</span>
            </div>
            <div className={styles.bullet}>
              <Check size={16} className={styles.bulletIcon} />
              <span>Segurança e privacidade</span>
            </div>
            <div className={styles.bullet}>
              <Check size={16} className={styles.bulletIcon} />
              <span>Alto desempenho nativo</span>
            </div>
            <div className={styles.bullet}>
              <Check size={16} className={styles.bulletIcon} />
              <span>Compromisso com resultados</span>
            </div>
            <div className={styles.bullet}>
              <Check size={16} className={styles.bulletIcon} />
              <span>Atendimento ágil e próximo</span>
            </div>
          </div>
        </div>

        {/* Right Indicators/Counters */}
        <div className={styles.indicatorsGrid}>
          <div className={`glass-card ${styles.indicatorCard}`}>
            <div className={styles.indicatorVal}>+50</div>
            <div className={styles.indicatorLabel}>Projetos Desenvolvidos</div>
          </div>
          <div className={`glass-card ${styles.indicatorCard}`}>
            <div className={styles.indicatorVal}>+35</div>
            <div className={styles.indicatorLabel}>Clientes Atendidos</div>
          </div>
          <div className={`glass-card ${styles.indicatorCard}`}>
            <div className={styles.indicatorVal}>4</div>
            <div className={styles.indicatorLabel}>Sistemas em Produção</div>
          </div>
          <div className={`glass-card ${styles.indicatorCard}`}>
            <div className={styles.indicatorVal}>+8</div>
            <div className={styles.indicatorLabel}>Anos de Experiência</div>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className={`container ${styles.aboutCardsGrid}`}>
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
    </section>
  );
}
