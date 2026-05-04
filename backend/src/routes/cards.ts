import { Router } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { prisma } from '../config/database';

const router = Router();

// 取得所有卡片
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const cards = await prisma.card.findMany({
      where: { userId: req.userId },
      orderBy: { nextReviewDate: 'asc' }
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// 取得今日待複習卡片
router.get('/today', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cards = await prisma.card.findMany({
      where: {
        userId: req.userId,
        nextReviewDate: { lte: new Date() }
      },
      take: 20, // 每天最多 20 張
      orderBy: [
        { nextReviewDate: 'asc' },
        { difficulty: 'desc' }
      ]
    });

    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch today cards' });
  }
});

// 創建卡片（內部使用，來自同步）
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { sourceFile, chapter, domain, question, answer, type, difficulty, tags } = req.body;

    const card = await prisma.card.create({
      data: {
        userId: req.userId!,
        sourceFile,
        chapter,
        domain,
        question,
        answer,
        type,
        difficulty: difficulty || 'medium',
        tags: tags || []
      }
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// 更新卡片
router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { question, answer, difficulty, tags } = req.body;

    const card = await prisma.card.update({
      where: { id },
      data: {
        question: question || undefined,
        answer: answer || undefined,
        difficulty: difficulty || undefined,
        tags: tags || undefined
      }
    });

    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// 刪除卡片
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.card.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

export default router;
