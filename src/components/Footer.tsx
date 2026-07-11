import { useState } from 'react';
import { Mail, Phone, MapPin, Cpu, Send } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <footer id="contato" className={styles.footerSection}>
      <div className="container">
        {/* Upper Contact Area */}
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactTitle}>Vamos criar algo incrível juntos?</h2>
            <p className={styles.contactDesc}>
              Entre em contato conosco para discutir a sua ideia de projeto, alocação de squads ou integração de sistemas de Inteligência Artificial. Nossa equipe técnica responderá em menos de 24 horas.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={18} />
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>E-mail Comercial</span>
                  <span className={styles.infoValue}>contato@ggondimtecnologia.com.br</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={18} />
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>Telefone / WhatsApp</span>
                  <span className={styles.infoValue}>+55 (11) 99999-9999</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={18} />
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>Sede</span>
                  <span className={styles.infoValue}>São Paulo, SP - Brasil</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`glass-card ${styles.form}`}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Mensagem Enviada!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px' }}>
                  Agradecemos seu contato. Nossa equipe entrará em contato comercial muito em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Nome</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Seu nome"
                      className={styles.input} 
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>E-mail</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="seu@email.com"
                      className={styles.input} 
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Telefone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="(11) 99999-9999"
                      className={styles.input} 
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Empresa</label>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      placeholder="Nome da empresa"
                      className={styles.input} 
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Mensagem ou Resumo do Simulador</label>
                  <textarea 
                    name="message" 
                    required 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Fale um pouco do seu projeto ou cole o resumo do simulador aqui..."
                    className={`${styles.input} ${styles.textarea}`} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary" 
                  style={{ width: '100%', gap: '10px', marginTop: '8px' }}
                >
                  {loading ? 'Enviando...' : 'Enviar Solicitação'}
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Lower Links Grid */}
        <div className={styles.linksGrid}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <Cpu size={24} className={styles.logoIcon} />
              <span className={styles.logoText}>G&G <span className={styles.logoSpan}>Tecnologia</span></span>
            </div>
            <p className={styles.brandDesc}>
              Acelerando negócios com soluções digitais robustas, infraestrutura moderna e integração de Inteligência Artificial.
            </p>
          </div>

          <div className={styles.linksCol}>
            <span className={styles.colTitle}>Serviços</span>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}><a href="#solucoes">Software Sob Medida</a></li>
              <li className={styles.linkItem}><a href="#solucoes">Inteligência Artificial</a></li>
              <li className={styles.linkItem}><a href="#solucoes">DevOps & Cloud</a></li>
              <li className={styles.linkItem}><a href="#solucoes">Squads Dedicados</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <span className={styles.colTitle}>Navegação</span>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}><a href="#solucoes">Soluções</a></li>
              <li className={styles.linkItem}><a href="#widget">Simulador de Stack</a></li>
              <li className={styles.linkItem}><a href="#portfolio">Portfólio</a></li>
              <li className={styles.linkItem}><a href="#planos">Planos</a></li>
              <li className={styles.linkItem}><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <span className={styles.colTitle}>Empresa</span>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}><a href="#stats">Sobre Nós</a></li>
              <li className={styles.linkItem}><a href="#contato">Carreiras</a></li>
              <li className={styles.linkItem}><a href="#contato">Fale Conosco</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Socials */}
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            &copy; {new Date().getFullYear()} G&G Tecnologia. Todos os direitos reservados.
          </span>
          <div className={styles.socials}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
