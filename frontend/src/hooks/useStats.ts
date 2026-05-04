import { useQuery } from '@tanstack/react-query';
import { reviewAPI } from '../api/client';

export interface ReviewStats {
  todayReviews: number;
  totalReviews: number;
  correctReviews: number;
  accuracy: number;
}

/**
 * Hook to fetch review statistics
 */
export function useReviewStats() {
  const query = useQuery({
    queryKey: ['reviewStats'],
    queryFn: async () => {
      return reviewAPI.getStats();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    stats: query.data as ReviewStats | undefined,
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch
  };
}

/**
 * Calculate card statistics from card list
 */
export function calculateCardStats(cards: any[]) {
  const total = cards.length;
  const mastered = cards.filter((c) => c.correctCount >= c.totalReviews * 0.8).length;
  const learning = cards.filter((c) => c.totalReviews > 0 && c.totalReviews <= 5).length;
  const newCards = cards.filter((c) => c.totalReviews === 0).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = cards.filter((c) => new Date(c.nextReviewDate) <= today).length;

  return {
    totalCards: total,
    masteredCards: mastered,
    learningCards: learning,
    newCards,
    overdueCards: overdue,
    masteryPercentage: total > 0 ? Math.round((mastered / total) * 100) : 0
  };
}
