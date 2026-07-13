import { Settings2, GitBranch, MessageSquareCode, MessageCircle, RefreshCw, FileSpreadsheet } from 'lucide-react';
import styles from './Automations.module.css';

interface AutomationCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const cards: AutomationCard[] = [
  {
    icon: <Settings2 size={22} />,
    title: 'Automação de Processos',
    desc: 'Mapeamento e desenvolvimento de robôs para executar tarefas operacionais repetitivas, como conciliação de faturas ou envio de ordens.'
  },
  {
    icon: <GitBranch size={22} />,
    title: 'Integrações via API',
    desc: 'Conexão segura e estável entre sistemas diferentes (ERPs, e-commerces, bancos, CRM de vendas) para compartilhamento automático de dados.'
  },
  {
    icon: <MessageCircle size={22} />,
    title: 'WhatsApp Business',
    desc: 'Integração de mensagens automáticas de confirmação de compra, status de entrega, segundas vias de boletos ou lembretes de horários.'
  },
  {
    icon: <MessageSquareCode size={22} />,
    title: 'Bots de Atendimento',
    desc: 'Desenvolvimento de menus de triagem inteligente e respostas automáticas 24/7 para qualificar leads e resolver dúvidas comuns de clientes.'
  },
  {
    icon: <RefreshCw size={22} />,
    title: 'Fluxos de Dados Automatizados',
    desc: 'Criação de gatilhos automáticos para que a venda realizada em um canal acione instantaneamente ações em outros setores da empresa.'
  },
  {
    icon: <FileSpreadsheet size={22} />,
    title: 'Importação & Exportação',
    desc: 'Desenvolvimento de conversores de arquivos XML de notas fiscais, relatórios Excel e sincronização rápida de dados legados.'
  }
];

export default function Automations() {
  return (
    <section id="automacoes" className={styles.automationsSection}>
      <div className={`container ${styles.sectionHeader}`}>
        <span className={styles.sectionSubtitle}>Produtividade & Escala</span>
        <h2 className={styles.sectionTitle}>Automações & <span>Integrações</span></h2>
        <p className={styles.sectionDesc}>
          Reduza o trabalho manual, evite erros humanos e aumente a produtividade da sua equipe com sistemas integrados e fluxos inteligentes.
        </p>
      </div>

      <div className={`container ${styles.grid}`}>
        {cards.map((card, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {card.icon}
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
