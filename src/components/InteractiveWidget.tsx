import { useState, useEffect } from 'react';
import { Check, Clipboard, ClipboardCheck, ArrowRight, Laptop, Bot, Calendar, Globe } from 'lucide-react';
import styles from './InteractiveWidget.module.css';

type ProjectType = 'web' | 'mobile' | 'ai' | 'cloud';

interface Feature {
  id: string;
  name: string;
  desc: string;
  hours: number;
}

export default function InteractiveWidget() {
  const [projectType, setProjectType] = useState<ProjectType>('web');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [devsCount, setDevsCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const featuresList: Record<ProjectType, Feature[]> = {
    web: [
      { id: 'orders', name: 'Painel de Pedidos', desc: 'Gerenciador para a cozinha receber e alterar status do pedido', hours: 30 },
      { id: 'payments', name: 'Integração Pix & Cartão', desc: 'Receba pagamentos na hora de forma segura', hours: 25 },
      { id: 'delivery', name: 'Cálculo de Entrega', desc: 'Frete automático integrado por distância ou bairro', hours: 20 },
      { id: 'whatsapp', name: 'Envio Automático no WhatsApp', desc: 'Envia o pedido formatado direto para o WhatsApp do seu comércio', hours: 20 },
      { id: 'admin', name: 'Gerenciador de Pratos/Produtos', desc: 'Painel simples para você alterar preços e fotos sozinho', hours: 20 }
    ],
    mobile: [
      { id: 'calendar', name: 'Calendário Interativo', desc: 'Grade visual de horários disponíveis para o cliente marcar', hours: 25 },
      { id: 'notify', name: 'Lembretes automáticos no ZAP', desc: 'Reduza faltas enviando avisos de agendamento automáticos', hours: 30 },
      { id: 'staff', name: 'Perfis de Profissionais', desc: 'Permite selecionar com qual cabeleireiro, médico ou manicure agendar', hours: 20 },
      { id: 'coupon', name: 'Cupons & Descontos', desc: 'Criação de códigos promocionais para dias menos movimentados', hours: 15 },
      { id: 'history', name: 'Histórico do Cliente', desc: 'Painel para o cliente ver e remarcar seus horários', hours: 20 }
    ],
    ai: [
      { id: 'faq', name: 'Respostas Automáticas de Dúvidas', desc: 'O bot responde horários, preços e cardápio de imediato', hours: 40 },
      { id: 'lead', name: 'Qualificação de Lead', desc: 'Coleta de dados (nome, telefone, serviço) antes de chamar o atendente', hours: 25 },
      { id: 'handover', name: 'Transferência para Humano', desc: 'O robô aciona sua equipe comercial quando não souber responder', hours: 25 },
      { id: 'doc', name: 'Treinamento de Catálogo/PDF', desc: 'O bot aprende as informações de um catálogo de produtos ou serviços', hours: 40 },
      { id: 'dashboard', name: 'Histórico de Conversas', desc: 'Acesse tudo o que os clientes conversaram com a inteligência', hours: 25 }
    ],
    cloud: [
      { id: 'responsive', name: 'Responsivo Premium', desc: 'Site rápido e perfeito no celular, tablet e computador', hours: 15 },
      { id: 'seo', name: 'SEO & Google Meu Negócio', desc: 'Site preparado para aparecer em buscas locais no Google', hours: 20 },
      { id: 'analytics', name: 'Google Analytics & Pixel Meta', desc: 'Rastreie visitas e saiba de onde vêm os seus clientes', hours: 15 },
      { id: 'cheap_host', name: 'Hospedagem Super Econômica', desc: 'Configuração em servidores de R$ 15/mês para manter custos baixos', hours: 15 },
      { id: 'contact_form', name: 'Formulário Integrado', desc: 'Receba solicitações direto no seu e-mail comercial', hours: 15 }
    ]
  };

  // Reset selected features when changing project type
  useEffect(() => {
    setSelectedFeatures([]);
  }, [projectType]);

  const handleFeatureToggle = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(fId => fId !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate stats
  const baseHours: Record<ProjectType, number> = {
    web: 40,
    mobile: 50,
    ai: 60,
    cloud: 30
  };

  const featureHours = selectedFeatures.reduce((acc, fId) => {
    const feature = featuresList[projectType].find(f => f.id === fId);
    return acc + (feature ? feature.hours : 0);
  }, 0);

  const totalHours = baseHours[projectType] + featureHours;
  const weeksNeeded = Math.ceil(totalHours / (devsCount * 30)); // 30h/week per dev

  const getTechStack = (): string[] => {
    switch (projectType) {
      case 'web':
        return ['React.js', 'Node.js', 'PostgreSQL', 'API WhatsApp', 'Hospedagem VPS'];
      case 'mobile':
        return ['React', 'TypeScript', 'Calendar API', 'Notificações ZAP', 'Firebase'];
      case 'ai':
        return ['Python', 'FastAPI', 'Gemini API', 'WhatsApp Cloud API', 'Banco de Dados Vetorial'];
      case 'cloud':
        return ['React / Vite', 'Vanilla CSS', 'SEO Otimizado', 'Google Analytics', 'Hospedagem Hostinger'];
      default:
        return [];
    }
  };

  const getSetupSummary = () => {
    const typeLabel = { web: 'Cardápio Digital', mobile: 'Agendador de Horários', ai: 'Chatbot WhatsApp IA', cloud: 'Landing Page / Site' }[projectType];
    const activeFeats = selectedFeatures.map(fId => featuresList[projectType].find(f => f.id === fId)?.name).join(', ');
    return `Projeto: ${typeLabel}\nFuncionalidades: ${activeFeats || 'Básico'}\nEquipe Estimada: ${devsCount} Dev\nTempo Estimado: ~${weeksNeeded} semanas (${totalHours} horas totais)`;
  };

  const handleCopySetup = () => {
    navigator.clipboard.writeText(getSetupSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="widget" className={styles.widgetSection}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Monte seu Projeto</span>
          <h2 className={styles.title}>Tem uma ideia? Eu tiro do papel pra você</h2>
          <p className={styles.desc}>
            Veja abaixo como transformo o seu plano em realidade estruturada e, em seguida, simule as funcionalidades do seu projeto.
          </p>
        </div>

        {/* Process Flow */}
        <div className={styles.flowGrid}>
          <div className={`glass-card ${styles.flowStep}`}>
            <div className={styles.stepNum}>01</div>
            <h4 className={styles.stepTitle}>Estudo & Alinhamento</h4>
            <p className={styles.stepDesc}>Entendemos a rotina do seu negócio e desenhamos um escopo sob medida que cabe no seu bolso.</p>
          </div>
          <div className={`glass-card ${styles.flowStep}`}>
            <div className={styles.stepNum}>02</div>
            <h4 className={styles.stepTitle}>Design & Protótipo</h4>
            <p className={styles.stepDesc}>Criamos o desenho das telas focando em facilidade e rapidez extrema de cliques no celular.</p>
          </div>
          <div className={`glass-card ${styles.flowStep}`}>
            <div className={styles.stepNum}>03</div>
            <h4 className={styles.stepTitle}>Desenvolvimento</h4>
            <p className={styles.stepDesc}>Programamos seu software com integrações oficiais (WhatsApp, Bling ERP) e inteligências artificiais.</p>
          </div>
          <div className={`glass-card ${styles.flowStep}`}>
            <div className={styles.stepNum}>04</div>
            <h4 className={styles.stepTitle}>Entrega & Suporte</h4>
            <p className={styles.stepDesc}>Colocamos o seu sistema no ar de forma estável e oferecemos suporte contínuo de pós-lançamento.</p>
          </div>
        </div>

        <div className={styles.container}>
          {/* Form Side */}
          <div className={styles.formArea}>
            {/* Project Type */}
            <div>
              <h3 className={styles.groupTitle}>1. Qual solução você precisa?</h3>
              <div className={styles.optionsGrid}>
                <div 
                  className={`${styles.optionCard} ${projectType === 'web' ? styles.optionCardActive : ''}`}
                  onClick={() => setProjectType('web')}
                >
                  <Laptop size={20} color={projectType === 'web' ? 'var(--primary)' : 'var(--text-secondary)'} />
                  <span className={styles.optionTitle}>Cardápio Digital</span>
                  <span className={styles.optionDesc}>Pedidos no WhatsApp</span>
                </div>
                <div 
                  className={`${styles.optionCard} ${projectType === 'mobile' ? styles.optionCardActive : ''}`}
                  onClick={() => setProjectType('mobile')}
                >
                  <Calendar size={20} color={projectType === 'mobile' ? 'var(--primary)' : 'var(--text-secondary)'} />
                  <span className={styles.optionTitle}>Agendador de Salão</span>
                  <span className={styles.optionDesc}>Reserva online & ZAP</span>
                </div>
                <div 
                  className={`${styles.optionCard} ${projectType === 'ai' ? styles.optionCardActive : ''}`}
                  onClick={() => setProjectType('ai')}
                >
                  <Bot size={20} color={projectType === 'ai' ? 'var(--primary)' : 'var(--text-secondary)'} />
                  <span className={styles.optionTitle}>Chatbot IA WhatsApp</span>
                  <span className={styles.optionDesc}>Atendimento automático 24h</span>
                </div>
                <div 
                  className={`${styles.optionCard} ${projectType === 'cloud' ? styles.optionCardActive : ''}`}
                  onClick={() => setProjectType('cloud')}
                >
                  <Globe size={20} color={projectType === 'cloud' ? 'var(--primary)' : 'var(--text-secondary)'} />
                  <span className={styles.optionTitle}>Landing Page / Site</span>
                  <span className={styles.optionDesc}>Presença digital rápida</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className={styles.groupTitle}>2. Recursos Adicionais</h3>
              <div className={styles.featuresGrid}>
                {featuresList[projectType].map(feature => {
                  const isActive = selectedFeatures.includes(feature.id);
                  return (
                    <div 
                      key={feature.id}
                      className={`${styles.featureCheckbox} ${isActive ? styles.featureCheckboxActive : ''}`}
                      onClick={() => handleFeatureToggle(feature.id)}
                    >
                      <div className={`${styles.checkbox} ${isActive ? styles.checkboxActive : ''}`}>
                        {isActive && <Check size={10} strokeWidth={3} />}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                        <span style={{ fontWeight: 600, color: 'white', fontSize: '0.85rem' }}>{feature.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{feature.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Developer Slider */}
            <div className={styles.sliderWrapper}>
              <div className={styles.sliderHeader}>
                <span className={styles.groupTitle}>3. Desenvolvedores no Projeto</span>
                <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{devsCount} Profissional</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="3" 
                value={devsCount} 
                onChange={(e) => setDevsCount(parseInt(e.target.value))} 
                className={styles.slider}
              />
            </div>
          </div>

          {/* Results Side */}
          <div className={styles.resultsArea}>
            <div className={styles.resultHeader}>
              <span className={styles.resultTitle}>Escopo Estimado</span>
              <span className={styles.resultDesc}>Arquitetura planejada com o menor custo possível</span>
            </div>

            <div className={styles.metricsList}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Horas de Trabalho</span>
                <span className={styles.metricValue}>{totalHours}h</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Tempo de Entrega</span>
                <span className={`${styles.metricValue} ${styles.metricValueHighlight}`}>
                  ~{weeksNeeded} {weeksNeeded === 1 ? 'semana' : 'semanas'}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Tamanho da Solução</span>
                <span className={styles.metricValue}>
                  {totalHours < 60 ? 'Rápida (Baixo Custo)' : totalHours < 110 ? 'Intermediária (Completa)' : 'Robusta (Avançada)'}
                </span>
              </div>
            </div>

            <div className={styles.stackSection}>
              <span className={styles.stackTitle}>Tecnologias Recomendadas</span>
              <div className={styles.stackBadges}>
                {getTechStack().map((tech, idx) => (
                  <span key={idx} className={styles.stackBadge}>{tech}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <button 
                onClick={handleCopySetup} 
                className="btn btn-secondary" 
                style={{ width: '100%', gap: '8px', padding: '10px 16px', fontSize: '0.9rem' }}
              >
                {copied ? <ClipboardCheck size={16} color="#10b981" /> : <Clipboard size={16} />}
                {copied ? 'Copiado para o Clipboard!' : 'Copiar Resumo da Ideia'}
              </button>
              
              <a 
                href="#contato" 
                className="btn btn-primary" 
                style={{ width: '100%', gap: '8px', padding: '12px 16px', fontSize: '0.95rem' }}
              >
                Conversar Sobre Esta Ideia
                <ArrowRight size={16} />
              </a>
            </div>

            <span className={styles.disclaimer}>
              * Nosso foco é estudar o seu comércio para enxugar custos, propondo a solução que cabe no seu bolso. Fale conosco para uma análise personalizada!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
