import { useQuery } from '@tanstack/react-query';
import { reviewAPI } from '../api/client';
import client from '../api/client';

export interface ReviewStats {
  todayReviews: number;
  totalReviews: number;
  correctReviews: number;
  accuracy: number;
}

export interface StatsData {
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  newCards: number;
  overdueCards: number;
  totalReviews: number;
  correctReviews: number;
  masteryPercentage: number;
  avgTimePerCard: number;
  reviewsPerDay: number;
  byDomain: Record<string, any>;
  byChapter: Record<string, any>;
  trends: any[];
}

/**
 * Hook to fetch complete review statistics
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
 * Hook to fetch comprehensive statistics
 */
export function useStats() {
  const query = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await client.get('/stats');
      return res.data as StatsData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 10 // 10 minutes
  });

  return {
    stats: query.data,
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch
  };
}

/**
 * Hook to fetch statistics by domain
 */
export function useStatsByDomain() {
  const query = useQuery({
    queryKey: ['stats:domain'],
    queryFn: async () => {
      const res = await client.get('/stats/domain');
      return res.data;
    },
    staleTime: 1000 * 60 * 5
  });

  return {
    stats: query.data || [],
    isLoading: query.isLoading,
    error: query.error as Error | null
  };
}

/**
 * Hook to fetch statistics by chapter
 */
export function useStatsByChapter() {
  const query = useQuery({
    queryKey: ['stats:chapter'],
    queryFn: async () => {
      const res = await client.get('/stats/chapter');
      return res.data;
    },
    staleTime: 1000 * 60 * 5
  });

  return {
    stats: query.data || [],
    isLoading: query.isLoading,
    error: query.error as Error | null
  };
}

/**
 * Hook to fetch trends data
 */
export function useTrends() {
  const query = useQuery({
    queryKey: ['stats:trends'],
    queryFn: async () => {
      const res = await client.get('/stats/trends');
      return res.data;
    },
    staleTime: 1000 * 60 * 5
  });

  return {
    trends: query.data || [],
    isLoading: query.isLoading,
    error: query.error as Error | null
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
