import React, { useState, useCallback, useMemo } from 'react';
import { Card as CardType } from '../types';

interface OptimizedCardProps {
  card: CardType;
  onRate: (quality: number) => void | Promise<void>;
  isLoading?: boolean;
}

/**
 * Optimized card component with memoization and callback optimization
 */
export const OptimizedCard = React.memo<OptimizedCardProps>(
  ({ card, onRate, isLoading = false }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Memoize flip handler
    const handleFlip = useCallback(() => {
      setIsFlipped((prev) => !prev);
    }, []);

    // Memoize rating handlers
    const handleRate0 = useCallback(() => onRate(0), [onRate]);
    const handleRate1 = useCallback(() => onRate(1), [onRate]);
    const handleRate2 = useCallback(() => onRate(2), [onRate]);
    const handleRate3 = useCallback(() => onRate(3), [onRate]);

    // Memoize metadata calculation
    const metadata = useMemo(
      () => ({
        accuracy:
          card.totalReviews > 0
            ? Math.round((card.correctCount / card.totalReviews) * 100)
            : 0,
        daysUntilReview: Math.ceil(
          (new Date(card.nextReviewDate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      }),
      [card]
    );

    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        {/* Card */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 min-h-64 cursor-pointer transition-all duration-300"
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFlip();
            }
          }}
          aria-pressed={isFlipped}
        >
          <div className="text-center">
            {!isFlipped ? (
              <>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  Question
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {card.question}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  Answer
                </p>
                <p className="text-lg text-gray-900 whitespace-pre-wrap">
                  {card.answer}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Rating Buttons */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <RatingButton
            label="Again"
            sublabel="(0)"
            onClick={handleRate0}
            disabled={isLoading}
            color="red"
          />
          <RatingButton
            label="Hard"
            sublabel="(1)"
            onClick={handleRate1}
            disabled={isLoading}
            color="yellow"
          />
          <RatingButton
            label="Good"
            sublabel="(2)"
            onClick={handleRate2}
            disabled={isLoading}
            color="green"
          />
          <RatingButton
            label="Easy"
            sublabel="(3)"
            onClick={handleRate3}
            disabled={isLoading}
            color="blue"
          />
        </div>

        {/* Metadata */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-gray-600">Chapter</p>
              <p className="font-semibold text-gray-900">{card.chapter}</p>
            </div>
            <div>
              <p className="text-gray-600">Domain</p>
              <p className="font-semibold text-gray-900">{card.domain}</p>
            </div>
            <div>
              <p className="text-gray-600">Reviews</p>
              <p className="font-semibold text-gray-900">{card.totalReviews}</p>
            </div>
            <div>
              <p className="text-gray-600">Accuracy</p>
              <p className="font-semibold text-gray-900">
                {metadata.accuracy}%
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              card.difficulty === 'easy'
                ? 'bg-green-100 text-green-800'
                : card.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {card.difficulty.charAt(0).toUpperCase() +
              card.difficulty.slice(1)}{' '}
            Difficulty
          </span>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for deep equality
    return (
      prevProps.card.id === nextProps.card.id &&
      prevProps.isLoading === nextProps.isLoading
    );
  }
);

OptimizedCard.displayName = 'OptimizedCard';

/**
 * Memoized rating button component
 */
interface RatingButtonProps {
  label: string;
  sublabel: string;
  onClick: () => void;
  disabled: boolean;
  color: 'red' | 'yellow' | 'green' | 'blue';
}

const RatingButton = React.memo<RatingButtonProps>(
  ({ label, sublabel, onClick, disabled, color }) => {
    const colorClasses = {
      red: 'bg-red-500 hover:bg-red-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      green: 'bg-green-500 hover:bg-green-600',
      blue: 'bg-blue-500 hover:bg-blue-600'
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-3 ${colorClasses[color]} text-white rounded-lg disabled:opacity-50 transition-colors font-medium text-sm`}
        aria-label={`${label} ${sublabel}`}
      >
        <div>{label}</div>
        <div className="text-xs opacity-75">{sublabel}</div>
      </button>
    );
  }
);

RatingButton.displayName = 'RatingButton';
