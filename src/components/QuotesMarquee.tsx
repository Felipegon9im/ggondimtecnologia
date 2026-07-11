import { Sparkle } from 'lucide-react';
import styles from './QuotesMarquee.module.css';

export default function QuotesMarquee() {
  const quotes: string[] = [
    "A persistência é o caminho do êxito.",
    "Não espere por oportunidades, crie-as.",
    "O sucesso começa com a decisão de tentar.",
    "Grandes conquistas exigem grandes riscos.",
    "Acredite que você pode e você já está no meio do caminho.",
    "O fracasso é apenas uma oportunidade de começar de novo, com mais experiência.",
    "Foco no progresso, não na perfeição.",
    "Você é mais forte do que imagina.",
    "Cada dia é uma nova chance de mudar sua história.",
    "O impossível é apenas uma questão de opinião.",
    "Faça hoje o que os outros não fazem, para ter amanhã o que os outros não terão.",
    "A disciplina é a ponte entre metas e conquistas.",
    "Não conte os dias, faça os dias contarem.",
    "Sonhe grande e ouse falhar.",
    "O único limite para as suas conquistas é a sua mente.",
    "Comece onde você está, use o que você tem, faça o que você pode.",
    "A dúvida mata mais sonhos do que o fracasso jamais poderá.",
    "Transforme obstáculos em degraus.",
    "Quem tem um porquê para viver, suporta quase todo o como.",
    "A jornada de mil quilômetros começa com um único passo."
  ];

  // Double the quotes array to ensure seamless infinite looping scroll
  const repeatedQuotes = [...quotes, ...quotes];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {repeatedQuotes.map((quote, index) => (
          <div key={index} className={styles.quoteItem}>
            <Sparkle size={12} className={styles.starIcon} />
            <span className={styles.quoteText}>{quote}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
