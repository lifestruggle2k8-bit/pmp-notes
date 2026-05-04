import React, { useState } from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onRate: (quality: number) => void;
  isLoading?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onRate, isLoading = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Card */}
      <div
        className="bg-white rounded-lg shadow-lg p-8 min-h-64 cursor-pointer transform transition-transform duration-500"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)'
        }}
      >
        <div className="text-center">
          {!isFlipped ? (
            <>
              <p className="text-sm text-gray-500 mb-4">Question</p>
              <p className="text-xl font-semibold text-gray-900">{card.question}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">Answer</p>
              <p className="text-lg text-gray-900 whitespace-pre-wrap">{card.answer}</p>
            </>
          )}
        </div>
      </div>

      {/* Rating buttons */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        <button
          onClick={() => onRate(0)}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Incorrect (0)
        </button>
        <button
          onClick={() => onRate(1)}
          disabled={isLoading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Difficult (1)
        </button>
        <button
          onClick={() => onRate(2)}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Good (2)
        </button>
        <button
          onClick={() => onRate(3)}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Easy (3)
        </button>
      </div>

      {/* Card metadata */}
      <div className="mt-6 text-xs text-gray-500 text-center space-y-1">
        <div>
          <span className="font-semibold">{card.chapter}</span> ·
          <span className="font-semibold ml-1">{card.domain}</span>
        </div>
        <div>
          Difficulty: <span className="font-semibold">{card.difficulty}</span> ·
          Reviews: <span className="font-semibold">{card.totalReviews}</span>
        </div>
        {card.lastReviewDate && (
          <div>
            Next review: <span className="font-semibold">{new Date(card.nextReviewDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
