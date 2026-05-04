import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { syncCardsFromGitHub, filterMarkdownFiles, extractGitHubUser } from '../services/githubSync';
import { prisma } from '../config/database';

const router = Router();

/**
 * Verify GitHub webhook signature
 */
function verifyGitHubSignature(req: Request): boolean {
  const signature = req.headers['x-hub-signature-256'] as string;
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return false;
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  return signature === `sha256=${hash}`;
}

/**
 * GitHub push event webhook
 * Triggered when files are pushed to GitHub
 */
router.post('/github', async (req: Request, res: Response) => {
  try {
    // 驗證簽名
    if (!verifyGitHubSignature(req)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { ref, repository, commits } = req.body;

    // 只處理 main 分支
    if (ref !== 'refs/heads/main') {
      return res.json({ skipped: 'not main branch' });
    }

    // 查找被修改的筆記文件
    const allFiles = commits
      .flatMap((c: any) => [...(c.added || []), ...(c.modified || [])])
      .filter((f: string) => typeof f === 'string');

    const modifiedFiles = filterMarkdownFiles(allFiles);

    if (modifiedFiles.length === 0) {
      return res.json({ processed: 0 });
    }

    // 查找或創建用戶（使用倉庫擁有者作為用戶）
    const { email: ownerEmail, username: ownerUsername } = extractGitHubUser(
      repository.owner.login
    );

    let user = await prisma.user.findUnique({
      where: { email: ownerEmail }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: ownerEmail,
          username: ownerUsername
        }
      });
    }

    // 同步每個文件
    let totalGenerated = 0;
    let totalUpdated = 0;
    const errors: Array<{ file: string; error: string }> = [];

    for (const file of modifiedFiles) {
      try {
        const result = await syncCardsFromGitHub(file, user.id);
        totalGenerated += result.created;
        totalUpdated += result.updated;
      } catch (error: any) {
        console.error(`Failed to sync ${file}:`, error);
        errors.push({
          file,
          error: error.message || 'Unknown error'
        });
      }
    }

    res.json({
      processed: modifiedFiles.length,
      cardsGenerated: totalGenerated,
      cardsUpdated: totalUpdated,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Manual sync endpoint (for testing)
 */
router.post('/manual', async (req: Request, res: Response) => {
  try {
    const { fileName, userId } = req.body;

    if (!fileName || !userId) {
      return res.status(400).json({ error: 'Missing fileName or userId' });
    }

    const result = await syncCardsFromGitHub(fileName, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Sync failed' });
  }
});

/**
 * Get sync logs
 */
router.get('/logs', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;

    const logs = await prisma.syncLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sync logs' });
  }
});

export default router;
