import React, { useState } from 'react';
import { useTodayCards, useSubmitReview } from '../hooks/useCards';
import { Card as CardType } from '../types';
import { Card } from '../components/Card';

export const ReviewPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  const { cards, isLoading } = useTodayCards();
  const submitReview = useSubmitReview();

  const handleRate = async (quality: number) => {
    if (cards.length === 0 || isLoading) return;

    const currentCard = cards[currentIndex];

    try {
      await submitReview.mutateAsync({
        cardId: currentCard.id,
        quality,
        timeSpent: 0
      });

      setReviewCount(reviewCount + 1);

      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setReviewCompleted(true);
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setReviewCompleted(false);
    setReviewCount(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading cards...</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">No Cards Available</p>
          <p className="text-gray-600 mb-8">There are no cards to review at the moment.</p>
          <a
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  if (reviewCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-md text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Review Complete!</h1>
          <p className="text-lg text-gray-600 mb-8">
            You reviewed <span className="font-bold text-blue-600">{reviewCount}</span> card
            {reviewCount !== 1 ? 's' : ''} today.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleReset}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Review Again
            </button>
            <a
              href="/"
              className="block px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
          >
            ← Back to Home
          </a>
          <h1 className="text-3xl font-bold text-gray-900">Review Session</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-700">
              Progress: {currentIndex + 1} / {cards.length}
            </p>
            <p className="text-sm font-semibold text-gray-700">{Math.round(progress)}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Card Component */}
        <Card
          card={currentCard}
          onRate={handleRate}
          isLoading={submitReview.isPending}
        />

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Reviewed today: {reviewCount}</p>
        </div>
      </div>
    </div>
  );
};
