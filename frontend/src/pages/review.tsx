import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TestCard {
  id: string;
  question: string;
  answer: string;
  difficulty: string;
}

const SAMPLE_CARDS: TestCard[] = [
  {
    id: '1',
    question: '什麼是專案？',
    answer: '專案是一個臨時性的工作，為了創造獨特的產品、服務或成果而進行。',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: '項目經理的三大責任是什麼？',
    answer: '1. 計畫和安排  2. 執行和監督  3. 控制和收尾',
    difficulty: 'medium'
  },
  {
    id: '3',
    question: '何謂項目價值？',
    answer: '項目價值是指項目為利害關係人帶來的持久的、積極的影響。不限於財務收益，還包括戰略、社會和環境方面。',
    difficulty: 'hard'
  },
  {
    id: '4',
    question: 'PMP 代表什麼？',
    answer: 'Project Management Professional - 項目管理專業人士認證',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: '間隔重複是什麼？',
    answer: '一種記憶技術，根據遺忘曲線在最優時間重複復習內容，以最大化長期記憶保留。',
    difficulty: 'medium'
  }
];

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [ratings, setRatings] = useState<number[]>([]);

  const currentCard = SAMPLE_CARDS[currentIndex];
  const progress = ((currentIndex + 1) / SAMPLE_CARDS.length) * 100;

  const handleRate = (quality: number) => {
    setReviewCount(reviewCount + 1);
    setRatings([...ratings, quality]);

    if (currentIndex < SAMPLE_CARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setReviewCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewCompleted(false);
    setReviewCount(0);
    setRatings([]);
  };

  if (reviewCompleted) {
    const correctCount = ratings.filter(r => r >= 2).length;
    const accuracy = Math.round((correctCount / ratings.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">複習完成！</h1>
          <div className="space-y-4 mb-8">
            <div>
              <p className="text-gray-600">複習卡片數</p>
              <p className="text-4xl font-bold text-blue-600">{reviewCount}</p>
            </div>
            <div>
              <p className="text-gray-600">正確率</p>
              <p className="text-4xl font-bold text-green-600">{accuracy}%</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleReset}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              再複習一次
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              返回首頁
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← 返回首頁
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">複習模式</h1>
          <p className="text-gray-600">
            卡片 {currentIndex + 1} / {SAMPLE_CARDS.length}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div
          className="perspective"
          style={{
            perspective: '1000px',
            cursor: 'pointer'
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className="relative w-full h-96 bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center text-center transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            <div
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              <p className="text-sm text-gray-500 mb-4">問題</p>
              <p className="text-3xl font-bold text-gray-900">{currentCard.question}</p>
              <p className="text-sm text-gray-400 mt-8">按一下翻轉查看答案</p>
            </div>

            <div
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              <div>
                <p className="text-sm text-gray-500 mb-4">答案</p>
                <p className="text-2xl text-gray-900">{currentCard.answer}</p>
                <p className="text-sm text-gray-400 mt-8">按一下翻轉返回問題</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-center text-gray-600 mb-6">你對這個答案的滿意度如何？</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleRate(0)}
              className="py-4 px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              ❌ 不懂
            </button>
            <button
              onClick={() => handleRate(1)}
              className="py-4 px-6 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              😕 勉強
            </button>
            <button
              onClick={() => handleRate(2)}
              className="py-4 px-6 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              😐 可以
            </button>
            <button
              onClick={() => handleRate(3)}
              className="py-4 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              ✅ 很好
            </button>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow">
          <p className="text-sm text-gray-600 mb-2">難度</p>
          <div className="flex gap-2">
            {currentCard.difficulty === 'easy' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                簡單
              </span>
            )}
            {currentCard.difficulty === 'medium' && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                中等
              </span>
            )}
            {currentCard.difficulty === 'hard' && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                困難
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
