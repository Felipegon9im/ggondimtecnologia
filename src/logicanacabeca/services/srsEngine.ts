import type { SRSItem, MasteryLevel, UserProgress } from '../types';

// SRS Intervals in milliseconds: 5 min, 1 day, 3 days, 7 days, 14 days, 30 days
const SRS_INTERVALS_MS = [
  5 * 60 * 1000,              // 5 min (Index 0)
  1 * 24 * 60 * 60 * 1000,     // 1 day (Index 1)
  3 * 24 * 60 * 60 * 1000,     // 3 days (Index 2)
  7 * 24 * 60 * 60 * 1000,     // 7 days (Index 3)
  14 * 24 * 60 * 60 * 1000,    // 14 days (Index 4)
  30 * 24 * 60 * 60 * 1000     // 30 days (Index 5)
];

export class SRSEngine {
  public static processAnswer(
    currentSRS: SRSItem | undefined,
    questionId: string,
    isCorrect: boolean
  ): SRSItem {
    const now = Date.now();
    let consecutive = currentSRS ? currentSRS.consecutiveCorrect : 0;
    let stage = currentSRS ? currentSRS.intervalDays : 0;

    if (isCorrect) {
      consecutive += 1;
      stage = Math.min(stage + 1, SRS_INTERVALS_MS.length - 1);
    } else {
      consecutive = 0;
      stage = 0; // Reset back to immediate review (5 min)
    }

    const intervalMs = SRS_INTERVALS_MS[stage];
    const nextReviewTimestamp = now + intervalMs;

    return {
      questionId,
      nextReviewTimestamp,
      intervalDays: stage,
      consecutiveCorrect: consecutive,
      lastTestedTimestamp: now
    };
  }

  public static getDueReviewQuestionIds(srsItems: Record<string, SRSItem>): string[] {
    const now = Date.now();
    return Object.values(srsItems)
      .filter(item => item.nextReviewTimestamp <= now)
      .map(item => item.questionId);
  }

  public static calculateModuleMastery(
    _moduleId: number,
    moduleTotalQuestionsCount: number,
    answeredQuestionsForModule: { isCorrect: boolean; consecutive: number }[]
  ): MasteryLevel {
    if (answeredQuestionsForModule.length === 0) {
      return 'NOT_STARTED'; // 🔴
    }

    const answeredCount = answeredQuestionsForModule.length;
    const correctCount = answeredQuestionsForModule.filter(q => q.isCorrect).length;
    const accuracy = correctCount / Math.max(1, answeredCount);
    const completionRate = answeredCount / Math.max(1, moduleTotalQuestionsCount);
    const streakMasters = answeredQuestionsForModule.filter(q => q.consecutive >= 3).length;

    if (completionRate >= 0.8 && accuracy >= 0.9 && streakMasters >= 3) {
      return 'EXAM_MASTER'; // 🔥 Domínio de concurso
    }
    if (completionRate >= 0.6 && accuracy >= 0.8) {
      return 'MASTERED'; // 🟢 Domino
    }
    if (completionRate >= 0.4 && accuracy >= 0.6) {
      return 'EASY'; // 🟡 Consigo resolver fácil
    }
    return 'LEARNING'; // 🟠 Estou aprendendo
  }

  public static calculateOverallProgress(progress: UserProgress, totalModulesCount: number): number {
    const masteries = Object.values(progress.moduleMastery);
    if (masteries.length === 0) return 0;

    let points = 0;
    masteries.forEach(m => {
      if (m === 'LEARNING') points += 25;
      if (m === 'EASY') points += 50;
      if (m === 'MASTERED') points += 75;
      if (m === 'EXAM_MASTER') points += 100;
    });

    const maxPoints = totalModulesCount * 100;
    return Math.min(100, Math.round((points / maxPoints) * 100));
  }
}
