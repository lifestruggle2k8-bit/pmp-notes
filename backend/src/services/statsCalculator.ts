import { prisma } from '../config/database';

export interface StatsResponse {
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
  byDomain: Record<string, DomainStats>;
  byChapter: Record<string, ChapterStats>;
  trends: TrendData[];
}

export interface DomainStats {
  domain: string;
  totalCards: number;
  masteredCards: number;
  masteryPercentage: number;
  averageInterval: number;
}

export interface ChapterStats {
  chapter: string;
  totalCards: number;
  masteredCards: number;
  masteryPercentage: number;
}

export interface TrendData {
  date: string;
  reviewCount: number;
  correctCount: number;
  masteryPercentage: number;
}

// 卡片分类定义
function categorizeCard(card: any): 'mastered' | 'learning' | 'new' | 'overdue' {
  const now = new Date();

  // 超期：nextReviewDate 已过
  if (card.nextReviewDate < now) {
    return 'overdue';
  }

  // 已掌握：correctCount >= totalReviews * 0.7 且总复习 >= 10
  if (card.totalReviews >= 10 && card.correctCount >= card.totalReviews * 0.7) {
    return 'mastered';
  }

  // 新卡片：0 次复习
  if (card.totalReviews === 0) {
    return 'new';
  }

  // 学习中：其他情况
  return 'learning';
}

export async function calculateUserStats(userId: string): Promise<StatsResponse> {
  // 获取所有卡片
  const cards = await prisma.card.findMany({
    where: { userId },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 100
      }
    }
  });

  // 基础计数
  let masteredCards = 0;
  let learningCards = 0;
  let newCards = 0;
  let overdueCards = 0;

  const domainStats: Record<string, any> = {};
  const chapterStats: Record<string, any> = {};

  // 分类卡片
  for (const card of cards) {
    const category = categorizeCard(card);

    if (category === 'mastered') {
      masteredCards++;
    } else if (category === 'learning') {
      learningCards++;
    } else if (category === 'new') {
      newCards++;
    } else if (category === 'overdue') {
      overdueCards++;
    }

    // 按 Domain 统计
    if (!domainStats[card.domain]) {
      domainStats[card.domain] = {
        domain: card.domain,
        totalCards: 0,
        masteredCards: 0,
        avgInterval: 0
      };
    }
    domainStats[card.domain].totalCards++;
    if (category === 'mastered') {
      domainStats[card.domain].masteredCards++;
    }
    domainStats[card.domain].avgInterval += card.interval;

    // 按 Chapter 统计
    if (!chapterStats[card.chapter]) {
      chapterStats[card.chapter] = {
        chapter: card.chapter,
        totalCards: 0,
        masteredCards: 0
      };
    }
    chapterStats[card.chapter].totalCards++;
    if (category === 'mastered') {
      chapterStats[card.chapter].masteredCards++;
    }
  }

  // 计算百分比
  for (const domain of Object.values(domainStats)) {
    (domain as any).avgInterval =
      (domain as any).avgInterval / (domain as any).totalCards;
    (domain as any).masteryPercentage = Math.round(
      ((domain as any).masteredCards / (domain as any).totalCards) * 100
    );
  }

  for (const chapter of Object.values(chapterStats)) {
    (chapter as any).masteryPercentage = Math.round(
      ((chapter as any).masteredCards / (chapter as any).totalCards) * 100
    );
  }

  // 复习统计
  const allReviews = await prisma.reviewRecord.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  const totalReviews = allReviews.length;
  const correctReviews = allReviews.filter((r: any) => r.quality > 0).length;
  const masteryPercentage =
    totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0;

  // 计算平均复习时间
  const avgTimePerCard =
    totalReviews > 0
      ? Math.round(
          allReviews.reduce((sum: number, r: any) => sum + r.timeSpent, 0) / totalReviews
        )
      : 0;

  // 计算每日复习次数（最近7天平均）
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const reviewsLast7Days = allReviews.filter(
    (r: any) => new Date(r.createdAt) > sevenDaysAgo
  ).length;
  const reviewsPerDay = Math.round(reviewsLast7Days / 7);

  // 趋势数据（最近30天）
  const trends = calculateTrends(userId, allReviews);

  return {
    totalCards: cards.length,
    masteredCards,
    learningCards,
    newCards,
    overdueCards,
    totalReviews,
    correctReviews,
    masteryPercentage,
    avgTimePerCard,
    reviewsPerDay,
    byDomain: domainStats as Record<string, DomainStats>,
    byChapter: chapterStats as Record<string, ChapterStats>,
    trends
  };
}

function calculateTrends(userId: string, reviews: any[]): TrendData[] {
  const trends: Record<string, TrendData> = {};
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // 初始化30天的数据
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    if (!trends[dateStr]) {
      trends[dateStr] = {
        date: dateStr,
        reviewCount: 0,
        correctCount: 0,
        masteryPercentage: 0
      };
    }
  }

  // 统计每日复习
  for (const review of reviews) {
    if (new Date(review.createdAt) < thirtyDaysAgo) break;

    const dateStr = new Date(review.createdAt).toISOString().split('T')[0];
    if (trends[dateStr]) {
      trends[dateStr].reviewCount++;
      if (review.quality > 0) {
        trends[dateStr].correctCount++;
      }
    }
  }

  // 计算每日掌握率
  for (const trend of Object.values(trends)) {
    if (trend.reviewCount > 0) {
      trend.masteryPercentage = Math.round(
        (trend.correctCount / trend.reviewCount) * 100
      );
    }
  }

  // 返回按日期排序的趋势
  return Object.values(trends)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30); // 最近30天
}

// 获取按 Domain 分布的统计
export async function getStatsByDomain(
  userId: string
): Promise<DomainStats[]> {
  const stats = await calculateUserStats(userId);
  return Object.values(stats.byDomain);
}

// 获取按 Chapter 分布的统计
export async function getStatsByChapter(
  userId: string
): Promise<ChapterStats[]> {
  const stats = await calculateUserStats(userId);
  return Object.values(stats.byChapter);
}

// 获取趋势数据
export async function getTrends(userId: string): Promise<TrendData[]> {
  const allReviews = await prisma.reviewRecord.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  return calculateTrends(userId, allReviews);
}
