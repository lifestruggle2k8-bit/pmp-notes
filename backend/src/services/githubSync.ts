import axios from 'axios';
import { prisma } from '../config/database';
import { generateCardsFromMarkdown } from './cardGenerator';

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Sync cards from GitHub repository
 */
export async function syncCardsFromGitHub(fileName: string, userId: string) {
  try {
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;

    if (!repo || !token) {
      throw new Error('GitHub credentials not configured');
    }

    // 從 GitHub 取得文件內容
    const response = await axios.get(
      `${GITHUB_API_BASE}/repos/${repo}/contents/${fileName}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3.raw'
        }
      }
    );

    const content = response.data;

    // 提取章節和 domain（從檔案路徑）
    // 例如：PMP備考/UDEMY CH.1 PMP TERMS/何謂專案.md
    const chapterMatch = fileName.match(/UDEMY\s+CH\.(\d+)/i);
    const chapter = chapterMatch ? `CH.${chapterMatch[1]}` : 'Unknown';

    // 嘗試從文件內容提取 domain
    const domainMatch = content.match(/domain:\s*"([^"]+)"/i);
    const domain = domainMatch ? domainMatch[1] : 'Unknown';

    // 生成卡片
    const result = await generateCardsFromMarkdown(
      userId,
      content,
      fileName
    );

    // 記錄同步
    await prisma.syncLog.create({
      data: {
        fileName,
        status: 'success',
        cardsGenerated: result.created
      }
    });

    return result;
  } catch (error: any) {
    console.error(`Failed to sync ${fileName}:`, error.message);

    // 記錄失敗
    await prisma.syncLog.create({
      data: {
        fileName,
        status: 'failed',
        error: error.message || 'Unknown error'
      }
    });

    throw error;
  }
}

/**
 * Extract GitHub user from repository owner
 */
export function extractGitHubUser(repoOwner: string): { email: string; username: string } {
  return {
    email: `${repoOwner}@github.com`,
    username: repoOwner
  };
}

/**
 * Filter Markdown files from commit
 */
export function filterMarkdownFiles(files: string[]): string[] {
  return files.filter((f) => {
    // 只包含 UDEMY 資料夾中的 Markdown 檔案
    return /UDEMY.*\.md$/i.test(f);
  });
}
