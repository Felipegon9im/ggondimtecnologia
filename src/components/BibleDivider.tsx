import { BookOpen } from 'lucide-react';
import styles from './BibleDivider.module.css';

interface BibleDividerProps {
  verse: string;
  reference: string;
}

export default function BibleDivider({ verse, reference }: BibleDividerProps) {
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.lineLeft}></div>
      <div className={styles.content}>
        <BookOpen size={16} className={styles.icon} />
        <p className={styles.verse}>"{verse}"</p>
        <span className={styles.reference}>{reference}</span>
      </div>
      <div className={styles.lineRight}></div>
    </div>
  );
}
