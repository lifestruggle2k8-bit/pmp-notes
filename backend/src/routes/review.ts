import { Router } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { prisma } from '../config/database';
import { calculateNextInterval, getNextReviewDate } from '../services/reviewEngine';

const router = Router();

// 提交複習結果
router.post('/submit', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { cardId, quality, timeSpent } = req.body;

    // 驗證 quality 值
    if (quality < 0 || quality > 3) {
      return res.status(400).json({ error: 'Invalid quality value (must be 0-3)' });
    }

    if (!cardId) {
      return res.status(400).json({ error: 'Missing cardId' });
    }

    // 記錄複習
    const review = await prisma.reviewRecord.create({
      data: {
        userId: req.userId!,
        cardId,
        quality,
        timeSpent: timeSpent || 0
      }
    });

    // 查詢卡片
    const card = await prisma.card.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // 驗證卡片屬於該用戶
    if (card.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // 計算新的間隔和 factor
    const { interval, factor } = calculateNextInterval(
      card.interval,
      card.easeFactor,
      quality
    );

    const nextReviewDate = getNextReviewDate(interval);

    // 更新卡片
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: {
        totalReviews: card.totalReviews + 1,
        correctCount: quality > 0 ? card.correctCount + 1 : card.correctCount,
        lastReviewDate: new Date(),
        nextReviewDate,
        interval,
        easeFactor: factor
      }
    });

    res.json({
      review,
      card: updatedCard
    });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// 取得複習歷史
router.get('/history/:cardId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { cardId } = req.params;

    // 驗證卡片屬於該用戶
    const card = await prisma.card.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    if (card.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // 取得複習歷史
    const reviews = await prisma.reviewRecord.findMany({
      where: {
        userId: req.userId,
        cardId
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    res.json(reviews);
  } catch (error) {
    console.error('Review history error:', error);
    res.status(500).json({ error: 'Failed to fetch review history' });
  }
});

// 取得用戶複習統計
router.get('/stats', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 今日複習數
    const todayReviews = await prisma.reviewRecord.count({
      where: {
        userId: req.userId,
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    // 總複習數
    const totalReviews = await prisma.reviewRecord.count({
      where: { userId: req.userId }
    });

    // 正確複習數
    const correctReviews = await prisma.reviewRecord.count({
      where: {
        userId: req.userId,
        quality: { gt: 0 }
      }
    });

    res.json({
      todayReviews,
      totalReviews,
      correctReviews,
      accuracy: totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0
    });
  } catch (error) {
    console.error('Review stats error:', error);
    res.status(500).json({ error: 'Failed to fetch review stats' });
  }
});

export default router;
