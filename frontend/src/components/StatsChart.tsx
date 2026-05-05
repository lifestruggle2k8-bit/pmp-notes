import React, { useMemo } from 'react';

interface TrendData {
  date: string;
  reviewCount: number;
  correctCount: number;
  masteryPercentage: number;
}

interface StatsChartProps {
  data: TrendData[];
  title?: string;
  height?: number;
}

/**
 * Simple line chart component for stats visualization
 */
export const TrendChart: React.FC<StatsChartProps> = ({
  data,
  title = 'Mastery Trend',
  height = 300
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.slice(-30); // Last 30 days
  }, [data]);

  const maxValue = useMemo(() => {
    return Math.max(...chartData.map((d) => d.reviewCount), 10);
  }, [chartData]);

  const maxMastery = 100;

  if (chartData.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-center text-gray-500 py-12">No data available</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <svg width="100%" height={height} className="mt-4">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={`grid-${i}`}
            x1="50"
            y1={height - ratio * (height - 60)}
            x2="100%"
            y2={height - ratio * (height - 60)}
            stroke="#e5e7eb"
            strokeDasharray="5,5"
          />
        ))}

        {/* Y-axis */}
        <line x1="50" y1="20" x2="50" y2={height - 40} stroke="#d1d5db" />

        {/* X-axis */}
        <line x1="50" y1={height - 40} x2="100%" y2={height - 40} stroke="#d1d5db" />

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <text
            key={`y-label-${i}`}
            x="40"
            y={height - ratio * (height - 60) + 5}
            fontSize="12"
            fill="#6b7280"
            textAnchor="end"
          >
            {Math.round(maxValue * ratio)}
          </text>
        ))}

        {/* Data visualization */}
        {chartData.length > 1 && (
          <>
            {/* Review count line (blue) */}
            <polyline
              points={chartData
                .map((d, i) => {
                  const x = 50 + (i / (chartData.length - 1)) * (100 - 60) + '%';
                  const y = height - 40 - (d.reviewCount / maxValue) * (height - 60);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {/* Mastery percentage line (green) */}
            <polyline
              points={chartData
                .map((d, i) => {
                  const x = 50 + (i / (chartData.length - 1)) * (100 - 60) + '%';
                  const y = height - 40 - (d.masteryPercentage / maxMastery) * (height - 60);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />

            {/* Data points for review count */}
            {chartData.map((d, i) => (
              <circle
                key={`point-${i}`}
                cx={50 + (i / (chartData.length - 1)) * (100 - 60) + '%'}
                cy={height - 40 - (d.reviewCount / maxValue) * (height - 60)}
                r="3"
                fill="#3b82f6"
              />
            ))}
          </>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500" />
          <span className="text-sm text-gray-600">Reviews</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500" />
          <span className="text-sm text-gray-600">Mastery %</span>
        </div>
      </div>
    </div>
  );
};

interface DistributionChartProps {
  data: Record<string, any>;
  title: string;
  valueKey: string;
  height?: number;
}

/**
 * Bar chart component for domain/chapter distribution
 */
export const DistributionChart: React.FC<DistributionChartProps> = ({
  data,
  title,
  valueKey,
  height = 300
}) => {
  const chartData = useMemo(() => {
    return Object.values(data).sort((a: any, b: any) => b[valueKey] - a[valueKey]);
  }, [data, valueKey]);

  const maxValue = useMemo(() => {
    return Math.max(...chartData.map((d: any) => d[valueKey]), 1);
  }, [chartData, valueKey]);

  if (chartData.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-center text-gray-500 py-12">No data available</div>
      </div>
    );
  }

  const barWidth = Math.max(20, (100 - 15) / chartData.length);

  return (
    <div className="w-full bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <svg width="100%" height={height} className="mt-4">
        {/* Y-axis */}
        <line x1="50" y1="20" x2="50" y2={height - 40} stroke="#d1d5db" />

        {/* X-axis */}
        <line x1="50" y1={height - 40} x2="100%" y2={height - 40} stroke="#d1d5db" />

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <text
            key={`y-label-${i}`}
            x="45"
            y={height - ratio * (height - 60) + 5}
            fontSize="12"
            fill="#6b7280"
            textAnchor="end"
          >
            {Math.round(maxValue * ratio)}
          </text>
        ))}

        {/* Bars */}
        {chartData.map((d: any, i: number) => {
          const barHeight = (d[valueKey] / maxValue) * (height - 60);
          const x = 50 + (i * barWidth + 5) + '%';
          const y = height - 40 - barHeight;

          return (
            <g key={`bar-${i}`}>
              <rect
                x={x}
                y={y}
                width={`${barWidth - 2}%`}
                height={barHeight}
                fill="#3b82f6"
                rx="2"
              />
              {/* Label */}
              <text
                x={`calc(${x} + ${(barWidth - 2) / 2}%)`}
                y={height - 20}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
              >
                {d.domain || d.chapter}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Summary */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {chartData.slice(0, 4).map((d: any) => (
          <div key={d.domain || d.chapter} className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">{d.domain || d.chapter}</p>
            <p className="text-lg font-semibold text-gray-900">{d[valueKey]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
