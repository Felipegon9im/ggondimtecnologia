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
                Esqueça o trabalho manual de atualizar preços e estoques em vários painéis diferentes. Desenvolvo o seu e-commerce integrado diretamente com o <strong>Bling ERP API</strong>. 
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
              <img 
                src="/bling_integration.jpg" 
                alt="Integração Bling ERP com Marketplaces" 
                className={styles.diagramImage} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
