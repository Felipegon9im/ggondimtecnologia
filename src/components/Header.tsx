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
            <a href="#solucoes" className={styles.navLink}>Serviços</a>
            <a href="#widget" className={styles.navLink}>Simulador de IA</a>
            <a href="#stats" className={styles.navLink}>Sobre</a>
            <a href="#portfolio" className={styles.navLink}>Portfólio</a>
            <a href="#faq" className={styles.navLink}>FAQ</a>
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
          <a href="#solucoes" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Serviços</a>
          <a href="#widget" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Simulador de IA</a>
          <a href="#stats" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Sobre</a>
          <a href="#portfolio" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Portfólio</a>
          <a href="#faq" className={styles.mobileNavLink} onClick={toggleMobileMenu}>FAQ</a>
        </nav>
        <a href="#contato" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={toggleMobileMenu}>
          <MessageSquare size={18} />
          Fale Comigo
        </a>
      </div>
    </>
  );
}
