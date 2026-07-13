import { Globe, Building2, Target, Briefcase, BookOpen, ShoppingBag, CheckCircle2 } from 'lucide-react';
import styles from './WebDev.module.css';

interface WebService {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const services: WebService[] = [
  {
    icon: <Globe size={20} />,
    title: 'Site Institucional',
    desc: 'Páginas otimizadas para apresentar a missão, serviços e valores da sua empresa de forma profissional e confiável na internet.'
  },
  {
    icon: <Building2 size={20} />,
    title: 'Site Corporativo',
    desc: 'Portais completos para grandes empresas, estruturados com áreas para setores, canais de contato, serviços e integrações específicas.'
  },
  {
    icon: <Target size={20} />,
    title: 'Landing Pages',
    desc: 'Páginas de vendas de alto impacto com foco exclusivo em conversão, perfeitas para lançar produtos ou captar novos clientes via anúncios.'
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Portfólios Digitais',
    desc: 'Vitrines modernas e interativas para exibir seus melhores projetos, trabalhos artísticos ou conquistas profissionais com alta qualidade visual.'
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Blogs Dinâmicos',
    desc: 'Plataformas completas de conteúdo integradas a gerenciadores amigáveis, ideais para nutrir seu público e gerar autoridade orgânica.'
  },
  {
    icon: <ShoppingBag size={20} />,
    title: 'E-commerce',
    desc: 'Lojas virtuais robustas com carrinhos de compra, gateways de pagamento seguros, cálculo de frete e painel simples de controle de produtos.'
  }
];

interface Benefit {
  name: string;
  desc: string;
}

const benefits: Benefit[] = [
  { name: 'Design Exclusivo & Moderno', desc: 'Interfaces personalizadas alinhadas perfeitamente com a identidade visual da sua marca.' },
  { name: 'Totalmente Responsivos', desc: 'Layouts testados e adaptados para funcionar com fluidez em celulares, tablets e PCs.' },
  { name: 'Otimizados para Google (SEO)', desc: 'Estruturação semântica avançada para posicionar seu site nos primeiros resultados orgânicos.' },
  { name: 'Velocidade & Alta Performance', desc: 'Carregamento extremamente rápido para prender a atenção do usuário e evitar abandonos.' },
  { name: 'Integração direta com WhatsApp', desc: 'Botões flutuantes e formulários conectados direto ao seu WhatsApp para agilizar conversões.' },
  { name: 'Painel Administrativo', desc: 'Autonomia para você editar textos, imagens e atualizar produtos sem depender de programadores.' },
  { name: 'Hospedagem & Domínio', desc: 'Configuração completa e ativação dos servidores mais estáveis e seguros do mercado.' }
];

export default function WebDev() {
  return (
    <section id="sites" className={styles.webDevSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Criação de Sites</span>
        <h2 className={styles.sectionTitle}>Desenvolvimento Web <span>Premium</span></h2>
        <p className={styles.sectionDesc}>
          Crio sites modernos, rápidos e focados em converter visitantes em clientes. Do design personalizado ao código otimizado para o Google.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        {services.map((service, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {service.icon}
            </div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Benefits Block */}
      <div className={`container ${styles.benefitsContainer}`}>
        <h3 className={styles.benefitsTitle}>Diferenciais Inclusos em Cada Site</h3>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, i) => (
            <div key={i} className={styles.benefitItem}>
              <CheckCircle2 size={18} className={styles.benefitIcon} />
              <div className={styles.benefitTextWrapper}>
                <span className={benefit.name}>{benefit.name}</span>
                <p className={styles.benefitDesc}>{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
