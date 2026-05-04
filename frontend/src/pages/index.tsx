import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stats } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Load statistics from API
    setLoading(false);
    setStats({
      totalCards: 856,
      masteredCards: 312,
      learningCards: 284,
      newCards: 260,
      overdueCards: 45,
      totalReviews: 1245,
      correctReviews: 987,
      masteryPercentage: 36
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">PMP Flashcard System</h1>
          <p className="text-lg text-gray-600">
            Intelligent spaced-repetition learning for PMP certification
          </p>
        </div>

        {/* Statistics Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Cards */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">Total Cards</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalCards}</p>
            </div>

            {/* Mastery Percentage */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">Mastery</p>
              <p className="text-3xl font-bold text-green-600">{stats.masteryPercentage}%</p>
            </div>

            {/* Overdue Cards */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{stats.overdueCards}</p>
            </div>

            {/* Total Reviews */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">Reviews</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalReviews}</p>
            </div>
          </div>
        )}

        {/* Card Status Breakdown */}
        {stats && (
          <div className="bg-white rounded-lg p-8 shadow mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Card Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.newCards}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Learning</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.learningCards}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Mastered</p>
                <p className="text-2xl font-bold text-green-600">{stats.masteredCards}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalReviews > 0
                    ? Math.round((stats.correctReviews / stats.totalReviews) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/review')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Start Review Session
          </button>
          <button
            className="px-8 py-4 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-lg"
            disabled
          >
            View Statistics (Coming Soon)
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>✓ System Status:</strong> Backend initialized and ready. Frontend connected.
            Use the "Start Review Session" button to begin your learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};
