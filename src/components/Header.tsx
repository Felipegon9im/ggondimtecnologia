import { useState, useEffect } from 'react';
import { Cpu, Menu, X, MessageSquare } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.container}`}>
          <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Cpu size={28} className={styles.logoIcon} />
            <span className={styles.logoText}>
              G&G <span className={styles.logoSpan}>Tecnologia</span>
            </span>
          </div>

          <nav className={styles.nav}>
            <a href="#sobre" className={styles.navLink}>Sobre</a>
            <a href="#sites" className={styles.navLink}>Sites</a>
            <a href="#sistemas" className={styles.navLink}>Sistemas</a>
            <a href="#bi" className={styles.navLink}>BI</a>
            <a href="#automacoes" className={styles.navLink}>Automações</a>
            <a href="#tecnologias" className={styles.navLink}>Tecnologias</a>
            <a href="#processo" className={styles.navLink}>Processo</a>
            <a href="#portfolio" className={styles.navLink}>Portfólio</a>
          </nav>

          <div className={styles.actions}>
            <a href="#contato" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              <MessageSquare size={16} />
              Fale Comigo
            </a>
          </div>

          <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu} aria-label="Abrir Menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={toggleMobileMenu} />
      )}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <button className={styles.mobileCloseBtn} onClick={toggleMobileMenu} aria-label="Fechar Menu">
          <X size={24} />
        </button>
        <div className={styles.logo} style={{ marginBottom: '20px' }}>
          <Cpu size={28} className={styles.logoIcon} />
          <span className={styles.logoText}>G&G <span className={styles.logoSpan}>Tecnologia</span></span>
        </div>
        <nav className={styles.mobileNav}>
          <a href="#sobre" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Sobre</a>
          <a href="#sites" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Sites</a>
          <a href="#sistemas" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Sistemas</a>
          <a href="#bi" className={styles.mobileNavLink} onClick={toggleMobileMenu}>BI</a>
          <a href="#automacoes" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Automações</a>
          <a href="#tecnologias" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Tecnologias</a>
          <a href="#processo" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Processo</a>
          <a href="#portfolio" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Portfólio</a>
        </nav>
        <a href="#contato" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={toggleMobileMenu}>
          <MessageSquare size={18} />
          Fale Comigo
        </a>
      </div>
    </>
  );
}
