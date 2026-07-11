import { Check } from 'lucide-react';
import styles from './Pricing.module.css';

interface Plan {
  name: string;
  desc: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export default function Pricing() {
  const plans: Plan[] = [
    {
      name: 'Presença Digital',
      desc: 'Ideal para profissionais autônomos e pequenos comércios começarem a vender online e aparecer no Google.',
      price: 'R$ 1.490',
      period: '/único',
      features: [
        'Landing Page ou Site Institucional',
        'Design Responsivo (Mobile & PC)',
        'Otimização para o Google (SEO)',
        'Formulário de Contato no E-mail',
        'Hospedagem Super Barata (R$ 15/mês)',
        'Suporte por 15 dias pós-entrega'
      ],
      ctaText: 'Criar Meu Site'
    },
    {
      name: 'Sistemas Comerciais',
      desc: 'Perfeito para restaurantes, salões e clínicas que precisam automatizar pedidos ou reservas online.',
      price: 'R$ 3.490',
      period: '/único',
      features: [
        'Cardápio Digital ou Agendador Web',
        'Integração de Pedidos via WhatsApp',
        'Painel Administrativo para Cadastro',
        'Recebimento de Pagamentos (Pix/Cartão)',
        'Integração com Google Meu Negócio',
        'Suporte por 30 dias pós-entrega'
      ],
      ctaText: 'Criar Meu Sistema',
      popular: true
    },
    {
      name: 'IA & Automação Custom',
      desc: 'Para negócios que querem reduzir o trabalho manual usando robôs de atendimento e inteligência artificial.',
      price: 'Sob Consulta',
      period: '',
      features: [
        'Chatbot Inteligente no WhatsApp/Web',
        'Treinamento com Dados da sua Empresa',
        'Automação de Planilhas e Tarefas',
        'Integração com seu Banco de Dados',
        'Sistemas Integrados Sob Medida',
        'Suporte e Evolução Mensal'
      ],
      ctaText: 'Falar com Especialista'
    }
  ];

  return (
    <section id="planos" className={styles.pricing}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Planos & Serviços</span>
          <h2 className={styles.title}>Valores que cabem no seu orçamento</h2>
          <p className={styles.desc}>
            Trabalhamos com preços acessíveis e focados em gerar retorno rápido para pequenos negócios, estudando sua necessidade antes de iniciar.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`glass-card ${styles.card} ${plan.popular ? styles.cardPopular : ''}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Mais Escolhido</div>
              )}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDesc}>{plan.desc}</p>
              
              <div className={styles.priceWrapper}>
                <span className={styles.priceLabel}>a partir de</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.pricePeriod}>{plan.period}</span>
              </div>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className={styles.featureItem}>
                    <Check 
                      size={16} 
                      className={plan.popular ? styles.featureIconPurple : styles.featureIcon} 
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contato" 
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', marginTop: 'auto' }}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
