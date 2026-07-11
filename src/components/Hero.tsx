import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, HandCoins } from 'lucide-react';
import styles from './Hero.module.css';

interface Slide {
  image: string;
  title: string;
  desc: string;
  badge: string;
  address: string;
}

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: Slide[] = [
    {
      image: '/menu_mockup.png',
      title: 'Cardápio Digital Interativo',
      desc: 'Pedidos direto no WhatsApp para restaurantes e deliverys eliminarem taxas abusivas de aplicativos terceiros.',
      badge: 'Restaurantes & Bares',
      address: 'ggondimtecnologia.com.br/cardapio-digital'
    },
    {
      image: '/chatbot_mockup.png',
      title: 'Chatbots de Atendimento 24h',
      desc: 'Inteligência Artificial treinada com dados da sua empresa para atender e qualificar leads sem descanso.',
      badge: 'Automação & Suporte',
      address: 'ggondimtecnologia.com.br/chatbot-ia'
    },
    {
      image: '/scheduler_mockup.png',
      title: 'Agendador Online de Salão / Clínica',
      desc: 'Agenda automatizada para salões de beleza, barbearias e clínicas médicas organizarem horários sem conflitos.',
      badge: 'Agendamento & Serviços',
      address: 'ggondimtecnologia.com.br/agendador-online'
    }
  ];

  // Auto-play slides every 4.5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles size={16} className={styles.badgeIcon} />
            <span>Foco em Pequenos Negócios</span>
          </div>
          
          <h1 className={styles.title}>
            Soluções digitais sob medida que cabem no <span className="gradient-text-accent">seu orçamento</span>.
          </h1>
          
          <p className={styles.description}>
            Estudo a realidade do seu negócio para criar a melhor estratégia digital. Desenvolvo soluções eficientes e com excelente custo-benefício para pequenas e médias empresas crescerem.
          </p>
          
          <div className={styles.ctas}>
            <a href="#widget" className="btn btn-primary">
              Simular Meu Projeto
              <ArrowRight size={18} />
            </a>
            <a href="#solucoes" className="btn btn-secondary">
              Ver Soluções
            </a>
          </div>
        </div>

        <div className={styles.mockupContainer}>
          {/* Floating Badges */}
          <div className={`${styles.floatingBadge} ${styles.badge1}`}>
            <div className={`${styles.iconWrapper} ${styles.iconWrapperPurple}`}>
              <HandCoins size={18} />
            </div>
            <div className={styles.badgeInfo}>
              <span className={styles.badgeTitle}>Preço Acessível</span>
              <span className={styles.badgeSub}>Soluções viáveis</span>
            </div>
          </div>

          <div className={`${styles.floatingBadge} ${styles.badge2}`}>
            <div className={styles.iconWrapper}>
              <TrendingUp size={18} />
            </div>
            <div className={styles.badgeInfo}>
              <span className={styles.badgeTitle}>Estratégia sob Medida</span>
              <span className={styles.badgeSub}>Estudamos seu negócio</span>
            </div>
          </div>

          {/* Core Browser Mockup with Slider */}
          <div className={styles.mockup}>
            <div className={styles.browserHeader}>
              <div className={styles.dots}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.browserAddress}>
                {slides[activeSlide].address}
              </div>
            </div>

            <div className={styles.mockupWrapper}>
              <img 
                src={slides[activeSlide].image} 
                alt={slides[activeSlide].title} 
                className={styles.mockupImage} 
              />
              
              <div className={styles.mockupContent}>
                <span className={styles.mockupBadge}>{slides[activeSlide].badge}</span>
                <h3 className={styles.mockupSlideTitle}>{slides[activeSlide].title}</h3>
                <p className={styles.mockupSlideDesc}>{slides[activeSlide].desc}</p>
              </div>

              <div className={styles.slideIndicators}>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`${styles.indicatorDot} ${activeSlide === index ? styles.indicatorDotActive : ''}`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
