/**
 * Flashcard Input/Request Types
 */

/**
 * Input type for creating/updating a flashcard
 * Contains the question and answer content
 */
export interface CardInput {
  /** The question/front of the card */
  question: string;
  /** The answer/back of the card */
  answer: string;
  /** Optional category tag for organizing cards */
  category?: string;
  /** Optional difficulty level (1-3) */
  difficulty?: number;
}

/**
 * Response type for a flashcard
 * Includes metadata and timestamps
 */
export interface CardResponse {
  /** Unique identifier for the card */
  id: string;
  /** The question/front of the card */
  question: string;
  /** The answer/back of the card */
  answer: string;
  /** Category tag */
  category?: string;
  /** Difficulty level (1-3) */
  difficulty?: number;
  /** User ID who owns this card */
  userId: string;
  /** ISO 8601 creation timestamp */
  createdAt: string;
  /** ISO 8601 last update timestamp */
  updatedAt: string;
}

/**
 * Input type for recording a review/study session
 * Used to track spaced repetition progress
 */
export interface ReviewInput {
  /** The card ID being reviewed */
  cardId: string;
  /** Quality of recall (0-3)
   * 0: Incorrect, completely forgot
   * 1: Incorrect, significant effort to recall
   * 2: Correct, some hesitation
   * 3: Correct, easy recall
   */
  quality: number;
  /** Time spent on this card in seconds */
  timeSpent: number;
}

/**
 * Response type for a review record
 * Contains the result of a study session
 */
export interface ReviewResponse {
  /** Unique identifier for the review record */
  id: string;
  /** The card ID being reviewed */
  cardId: string;
  /** User ID who performed the review */
  userId: string;
  /** Quality of recall (0-3) */
  quality: number;
  /** Time spent in seconds */
  timeSpent: number;
  /** Ease factor after this review */
  easeFactor?: number;
  /** Interval (days) until next review */
  nextInterval?: number;
  /** ISO 8601 review timestamp */
  reviewedAt: string;
}

/**
 * Response type for user statistics
 * Provides aggregated learning metrics
 */
export interface StatsResponse {
  /** Total number of cards */
  totalCards: number;
  /** Number of cards learned (reviewed at least once) */
  learnedCards: number;
  /** Number of cards due for review today */
  dueToday: number;
  /** Average success rate (0-100) */
  successRate: number;
  /** Average ease factor across all cards */
  averageEase: number;
  /** Total review time in seconds */
  totalReviewTime: number;
  /** Longest current study streak (days) */
  currentStreak: number;
  /** ISO 8601 timestamp of statistics calculation */
  calculatedAt: string;
  /** Breakdown by category */
  byCategory?: {
    [category: string]: {
      total: number;
      learned: number;
      dueToday: number;
      successRate: number;
    };
  };
}

/**
 * Standard API error response
 */
export interface ErrorResponse {
  /** Error message */
  error: string;
  /** Optional error code or type */
  code?: string;
  /** Optional additional details */
  details?: Record<string, any>;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  data: T[];
  /** Total count of items */
  total: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
}

export default {
  CardInput,
  CardResponse,
  ReviewInput,
  ReviewResponse,
  StatsResponse,
  ErrorResponse,
  PaginatedResponse
};
