export interface Card {
  id: string;
  question: string;
  answer: string;
  chapter: string;
  domain: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  totalReviews: number;
  correctCount: number;
  nextReviewDate: string;
  interval: number;
  easeFactor: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewSession {
  cardId: string;
  quality: number; // 0-3
  timeSpent: number; // seconds
}

export interface ReviewResponse {
  id: string;
  cardId: string;
  quality: number;
  timeSpent: number;
  createdAt: string;
  cardUpdated: boolean;
  nextReviewDate: string;
}

export interface Stats {
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  newCards: number;
  overdueCards: number;
  totalReviews: number;
  correctReviews: number;
  masteryPercentage: number;
  byDomain?: Record<string, any>;
  byChapter?: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}
export type ReviewInput = ReviewSession;
