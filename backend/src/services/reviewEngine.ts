/**
 * Review Engine - SM-2 Spaced Repetition Algorithm Implementation
 */

export interface ReviewResult {
  quality: number; // 0-3
  timeSpent: number; // seconds
}

/**
 * Calculate next interval and ease factor based on SM-2 algorithm
 *
 * @param previousInterval - Current interval in days
 * @param previousFactor - Current ease factor
 * @param quality - User's quality response (0-3)
 *   0 = wrong (incorrect)
 *   1 = hard (barely correct)
 *   2 = ok (correct)
 *   3 = easy (very easy)
 * @returns New interval and ease factor
 */
export function calculateNextInterval(
  previousInterval: number,
  previousFactor: number,
  quality: number
): { interval: number; factor: number } {
  let newFactor = previousFactor;
  let newInterval = previousInterval;

  if (quality >= 3) {
    // 答對簡單：增加間隔和 factor
    newInterval = previousInterval * 2.5;
    newFactor = Math.max(1.3, previousFactor + 0.1);
  } else if (quality === 2) {
    // 答對 OK：中等增加
    newInterval = previousInterval * 1.3;
    newFactor = previousFactor;
  } else if (quality === 1) {
    // 勉強答對：輕微增加
    newInterval = previousInterval * 1.1;
    newFactor = Math.max(1.3, previousFactor - 0.1);
  } else {
    // 答錯：重置
    newInterval = 1;
    newFactor = 2.5;
  }

  return { interval: newInterval, factor: newFactor };
}

/**
 * Calculate next review date based on interval
 *
 * @param interval - Interval in days
 * @returns Next review date at midnight UTC
 */
export function getNextReviewDate(interval: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + Math.ceil(interval));
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Determine if a card is overdue for review
 */
export function isCardOverdue(nextReviewDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return nextReviewDate <= today;
}

/**
 * Calculate days until next review
 */
export function daysUntilReview(nextReviewDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDate = new Date(nextReviewDate);
  nextDate.setHours(0, 0, 0, 0);

  const diffTime = nextDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return Math.ceil(diffDays);
}

/**
 * Get quality score from user input
 * Maps user rating to quality value
 */
export function getQualityFromRating(
  rating: 'wrong' | 'hard' | 'ok' | 'easy'
): number {
  const qualityMap: Record<string, number> = {
    'wrong': 0,
    'hard': 1,
    'ok': 2,
    'easy': 3
  };

  return qualityMap[rating] ?? 0;
}
