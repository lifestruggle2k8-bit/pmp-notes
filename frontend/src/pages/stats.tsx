import React from 'react';
import { useStats, useStatsByDomain, useStatsByChapter, useTrends } from '../hooks/useStats';
import { TrendChart, DistributionChart } from '../components/StatsChart';

export const StatsPage: React.FC = () => {
  const { stats, isLoading: statsLoading } = useStats();
  const { stats: domainStats } = useStatsByDomain();
  const { stats: chapterStats } = useStatsByChapter();
  const { trends } = useTrends();

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading statistics...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Failed to load statistics</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Statistics & Analytics
          </h1>
          <p className="text-gray-600">
            Track your learning progress and identify areas for improvement
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">
              Total Cards
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalCards}
            </div>
            <div className="text-xs text-gray-500">
              Across all chapters
            </div>
          </div>

          {/* Mastered Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">
              Mastered Cards
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.masteredCards}
            </div>
            <div className="text-xs text-gray-500">
              {stats.masteryPercentage}% mastery rate
            </div>
          </div>

          {/* Overdue Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">
              Overdue Cards
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {stats.overdueCards}
            </div>
            <div className="text-xs text-gray-500">
              Need review soon
            </div>
          </div>

          {/* Review Accuracy */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">
              Review Accuracy
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalReviews > 0
                ? Math.round((stats.correctReviews / stats.totalReviews) * 100)
                : 0}
              %
            </div>
            <div className="text-xs text-gray-500">
              {stats.totalReviews} total reviews
            </div>
          </div>
        </div>

        {/* Progress Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Learning Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Learning Status
            </h2>
            <div className="space-y-4">
              {/* Mastered */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Mastered
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {stats.masteredCards} cards
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.totalCards > 0
                          ? (stats.masteredCards / stats.totalCards) * 100
                          : 0
                      }%`
                    }}
                  />
                </div>
              </div>

              {/* Learning */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Learning
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {stats.learningCards} cards
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.totalCards > 0
                          ? (stats.learningCards / stats.totalCards) * 100
                          : 0
                      }%`
                    }}
                  />
                </div>
              </div>

              {/* New */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    New
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {stats.newCards} cards
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-400 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.totalCards > 0
                          ? (stats.newCards / stats.totalCards) * 100
                          : 0
                      }%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Review Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Review Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Reviews</span>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.totalReviews}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Correct Reviews</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.correctReviews}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Avg Time per Card</span>
                <span className="text-2xl font-bold text-blue-600">
                  {stats.avgTimePerCard}s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Reviews per Day</span>
                <span className="text-2xl font-bold text-purple-600">
                  {stats.reviewsPerDay}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-8">
          <TrendChart data={trends} title="Learning Trend (Last 30 Days)" />
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DistributionChart
            data={Object.fromEntries(
              domainStats.map((d: any) => [d.domain, d])
            )}
            title="Mastery by Domain"
            valueKey="masteredCards"
          />
          <DistributionChart
            data={Object.fromEntries(
              chapterStats.map((c: any) => [c.chapter, c])
            )}
            title="Mastery by Chapter"
            valueKey="masteredCards"
          />
        </div>

        {/* Detailed Stats Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Domain Stats Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Statistics by Domain
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Domain
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Cards
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Mastery
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {domainStats.map((domain: any) => (
                  <tr key={domain.domain} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {domain.domain}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {domain.totalCards}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${domain.masteryPercentage}%`
                            }}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          {domain.masteryPercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chapter Stats Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Statistics by Chapter
              </h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Chapter
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Cards
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Mastery
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {chapterStats.map((chapter: any) => (
                  <tr key={chapter.chapter} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {chapter.chapter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {chapter.totalCards}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${chapter.masteryPercentage}%`
                            }}
                          />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          {chapter.masteryPercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
