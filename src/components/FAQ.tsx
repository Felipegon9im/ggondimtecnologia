import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: 'Vocês criam sistemas menores como cardápios digitais e agendadores de salão?',
      answer: 'Sim! Um dos nossos grandes focos é justamente ajudar pequenos comércios e prestadores de serviço a se digitalizarem. Criamos cardápios digitais para restaurantes (com envio de pedido direto no WhatsApp), sistemas de agendamento online para salões e clínicas, e catálogos de produtos sob medida.'
    },
    {
      question: 'Como a G&G consegue manter valores acessíveis para pequenos negócios?',
      answer: 'Nós estudamos a realidade do seu comércio antes de escrever qualquer linha de código. Em vez de te empurrar sistemas complexos e caros que você não vai usar, focamos no que realmente traz vendas e organização. Além disso, configuramos servidores de hospedagem super econômicos (a partir de R$ 15/mês) para que você não sofra com custos fixos altos.'
    },
    {
      question: 'Não entendo nada de tecnologia. Vocês entregam tudo configurado?',
      answer: 'Sim, entregamos a solução 100% pronta! Cuidamos de toda a burocracia: registro de domínio, configuração do servidor, integração com o seu WhatsApp e meios de pagamento (Pix e cartão). Além disso, damos um treinamento simples em vídeo para você aprender a cadastrar produtos, alterar preços e visualizar os pedidos sozinho.'
    },
    {
      question: 'Como funciona o atendimento automático por Inteligência Artificial (Chatbot)?',
      answer: 'Nós criamos um assistente inteligente e o conectamos ao WhatsApp da sua empresa. Treinamos essa Inteligência Artificial com as informações do seu negócio (horários, catálogo, preços, regras). O robô conversa com os clientes tirando dúvidas em segundos. Se a conversa exigir um atendimento humano, ele transfere o chat de forma automática para o seu celular.'
    },
    {
      question: 'Quais são as formas de pagamento e prazos de entrega?',
      answer: 'Buscamos flexibilidade absoluta para viabilizar o projeto dentro das suas possibilidades. Facilitamos o pagamento por Pix ou cartão de crédito. Quanto aos prazos, soluções rápidas como Landing Pages e Sites ficam prontas em 1 a 2 semanas; já sistemas comerciais (como cardápios e agendadores) levam de 3 a 4 semanas.'
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>FAQ</span>
          <h2 className={styles.title}>Dúvidas Frequentes</h2>
          <p className={styles.desc}>
            Tem dúvidas sobre como podemos ajudar o seu comércio? Reunimos as respostas para as perguntas mais comuns dos nossos clientes.
          </p>
        </div>

        <div className={styles.accordion}>
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button 
                  className={styles.questionButton} 
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`${styles.icon} ${isOpen ? styles.iconRotated : ''}`} 
                  />
                </button>
                <div 
                  className={styles.answerWrapper}
                  style={{ maxHeight: isOpen ? '250px' : '0' }}
                >
                  <div className={styles.answer}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
