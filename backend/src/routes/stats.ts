import { Router } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import {
  calculateUserStats,
  getStatsByDomain,
  getStatsByChapter,
  getTrends
} from '../services/statsCalculator';

const router = Router();

// 获取总体统计
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const stats = await calculateUserStats(req.userId!);
    res.json(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// 获取按 Domain 的分布
router.get('/domain', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const stats = await getStatsByDomain(req.userId!);
    res.json(stats);
  } catch (error) {
    console.error('Failed to fetch domain stats:', error);
    res.status(500).json({ error: 'Failed to fetch domain stats' });
  }
});

// 获取按 Chapter 的分布
router.get('/chapter', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const stats = await getStatsByChapter(req.userId!);
    res.json(stats);
  } catch (error) {
    console.error('Failed to fetch chapter stats:', error);
    res.status(500).json({ error: 'Failed to fetch chapter stats' });
  }
});

// 获取趋势数据
router.get('/trends', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const trends = await getTrends(req.userId!);
    res.json(trends);
  } catch (error) {
    console.error('Failed to fetch trends:', error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

export default router;
