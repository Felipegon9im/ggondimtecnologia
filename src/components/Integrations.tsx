import { CheckCircle2, Link2 } from 'lucide-react';
import styles from './Integrations.module.css';

export default function Integrations() {
  return (
    <section id="integracoes" className={styles.integrations}>
      <div className="container">
        <div className={`glass-card ${styles.card}`}>
          <div className={styles.grid}>
            {/* Left Content */}
            <div className={styles.content}>
              <div className={styles.badge}>
                <Link2 size={14} style={{ marginRight: '6px' }} />
                <span>Integração de Canais</span>
              </div>
              
              <h2 className={styles.title}>
                Sua Loja Conectada com <span className="gradient-text-accent">+100 Marketplaces</span>
              </h2>
              
              <p className={styles.desc}>
                Esqueça o trabalho manual de atualizar preços e estoques em vários painéis diferentes. Desenvolvemos o seu e-commerce integrado diretamente com o <strong>Bling ERP API</strong>. 
                Venda em massa em todos os grandes canais digitais do país e gerencie tudo a partir de um único estoque unificado.
              </p>
              
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  <CheckCircle2 size={18} className={styles.bulletIcon} />
                  <div>
                    <strong>Sincronização Automática de Estoque:</strong> Vendeu um produto na Shopee? O estoque é atualizado instantaneamente no Mercado Livre e na sua loja própria, evitando vendas sem estoque.
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <CheckCircle2 size={18} className={styles.bulletIcon} />
                  <div>
                    <strong>Integração via Bling API:</strong> Comunicação rápida e estável para importação de pedidos, controle de notas fiscais (NFe), gerenciamento de contas a receber e emissão de etiquetas em lote.
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <CheckCircle2 size={18} className={styles.bulletIcon} />
                  <div>
                    <strong>Gestão de Preços em Massa:</strong> Atualize a tabela de preços de dezenas de anúncios ou marketplaces simultaneamente com apenas um clique.
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <CheckCircle2 size={18} className={styles.bulletIcon} />
                  <div>
                    <strong>Agilidade operacional:</strong> Centralize o cadastro de novos produtos no ERP e distribua para todas as contas conectadas de forma automatizada.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hub Diagram */}
            <div className={styles.diagramWrapper}>
              <div className={styles.hubContainer}>
                {/* SVG Connections */}
                <svg className={styles.connectionsSvg}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#55B938" />
                      <stop offset="100%" stopColor="var(--primary)" />
                    </linearGradient>
                  </defs>
                  <line x1="50%" y1="50%" x2="20%" y2="15%" className={styles.connectionLineActive} />
                  <line x1="50%" y1="50%" x2="80%" y2="15%" className={styles.connectionLineActive} />
                  <line x1="50%" y1="50%" x2="95%" y2="50%" className={styles.connectionLineActive} />
                  <line x1="50%" y1="50%" x2="80%" y2="85%" className={styles.connectionLineActive} />
                  <line x1="50%" y1="50%" x2="20%" y2="85%" className={styles.connectionLineActive} />
                  <line x1="50%" y1="50%" x2="5%" y2="50%" className={styles.connectionLineActive} />
                </svg>

                {/* Central Bling Node */}
                <div className={styles.centralNode}>
                  <div className={styles.blingLogo}>
                    bling<span className={styles.blingDot}>.</span>
                  </div>
                  <span className={styles.blingLabel}>Bling ERP API</span>
                </div>

                {/* Satellites */}
                {/* 1. Mercado Livre */}
                <div className={`${styles.satellite} ${styles.satMercadoLivre}`} title="Mercado Livre">
                  <svg viewBox="0 0 100 100" className={styles.logoImage}>
                    <circle cx="50" cy="50" r="45" fill="#FFE600" />
                    {/* Handshake representation */}
                    <path d="M25 60 C30 50, 45 42, 50 50 C55 42, 70 50, 75 60" stroke="#2D3277" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <path d="M35 48 C40 38, 60 38, 65 48" stroke="#2D3277" strokeWidth="5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>

                {/* 2. Shopee */}
                <div className={`${styles.satellite} ${styles.satShopee}`} title="Shopee">
                  <svg viewBox="0 0 100 100" className={styles.logoImage}>
                    <circle cx="50" cy="50" r="45" fill="#EE4D2D" />
                    {/* Shopping bag with S */}
                    <path d="M35 40 L35 75 C35 78, 38 80, 41 80 L59 80 C62 80, 65 78, 65 75 L65 40 Z" fill="white" />
                    <path d="M42 40 C42 32, 58 32, 58 40" stroke="#EE4D2D" strokeWidth="6" fill="none" />
                    <path d="M50 48 C46 48, 44 50, 44 53 C44 57, 56 56, 56 61 C56 65, 52 67, 48 67 C44 67, 43 64, 43 64" stroke="#EE4D2D" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </div>

                {/* 3. Amazon */}
                <div className={`${styles.satellite} ${styles.satAmazon}`} title="Amazon">
                  <svg viewBox="0 0 100 100" className={styles.logoImage}>
                    <circle cx="50" cy="50" r="45" fill="#111" />
                    {/* Smile arrow */}
                    <path d="M30 60 Q50 72 70 60" fill="none" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" />
                    <path d="M66 57 L72 61 L70 54" fill="#FF9900" stroke="#FF9900" strokeWidth="2" strokeLinejoin="round" />
                    {/* A logo */}
                    <text x="50" y="48" fill="white" fontSize="26" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">a</text>
                  </svg>
                </div>

                {/* 4. Magazine Luiza (Magalu) */}
                <div className={`${styles.satellite} ${styles.satMagalu}`} title="Magazine Luiza (Magalu)">
                  <svg viewBox="0 0 100 100" className={styles.logoImage}>
                    <circle cx="50" cy="50" r="45" fill="#0086FF" />
                    {/* Big M */}
                    <text x="50" y="65" fill="white" fontSize="48" fontWeight="800" textAnchor="middle" fontFamily="var(--font-heading)">M</text>
                  </svg>
                </div>

                {/* 5. Americanas */}
                <div className={`${styles.satellite} ${styles.satAmericanas}`} title="Americanas">
                  <svg viewBox="0 0 100 100" className={styles.logoImage}>
                    <circle cx="50" cy="50" r="45" fill="#E01C24" />
                    {/* red-white typography */}
                    <text x="50" y="58" fill="white" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="-1">Lojas</text>
                    <text x="50" y="74" fill="white" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0">americanas</text>
                  </svg>
                </div>

                {/* 6. Shein */}
                <div className={`${styles.satellite} ${styles.satShein}`} title="Shein">
                  <svg viewBox="0 0 100 100" className={styles.logoImage}>
                    <circle cx="50" cy="50" r="45" fill="black" />
                    <text x="50" y="60" fill="white" fontSize="30" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-heading)">S</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
