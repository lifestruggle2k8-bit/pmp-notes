/**
 * Card Generator Service
 * Generates and manages flashcards from markdown files
 */

import { PrismaClient } from '@prisma/client';
import { parseMarkdown, ParsedCard } from './markdownParser';

const prisma = new PrismaClient();

/**
 * Result of card generation from a markdown file
 */
export interface CardGenerationResult {
  /** Number of new cards created */
  created: number;
  /** Number of existing cards updated */
  updated: number;
  /** Total cards processed */
  total: number;
}

/**
 * Generates cards from markdown content for a user
 *
 * @param userId - The user ID who owns these cards
 * @param markdownContent - The markdown content to parse
 * @param fileName - The source filename
 * @returns Result with counts of created/updated cards
 *
 * @example
 * const result = await generateCardsFromMarkdown(
 *   'user123',
 *   markdownContent,
 *   'ch1-basics.md'
 * );
 * console.log(`Created ${result.created}, Updated ${result.updated}`);
 */
export async function generateCardsFromMarkdown(
  userId: string,
  markdownContent: string,
  fileName: string
): Promise<CardGenerationResult> {
  // Parse the markdown to extract cards
  const parsedCards = parseMarkdown(markdownContent, fileName);

  let created = 0;
  let updated = 0;

  // Process each parsed card
  for (const parsed of parsedCards) {
    try {
      // Check if a card with the same sourceFile and question already exists
      const existingCard = await prisma.card.findFirst({
        where: {
          userId,
          sourceFile: parsed.sourceFile,
          question: parsed.question
        }
      });

      if (existingCard) {
        // Update existing card
        await prisma.card.update({
          where: { id: existingCard.id },
          data: {
            answer: parsed.answer,
            type: parsed.type,
            chapter: parsed.chapter,
            domain: parsed.domain || existingCard.domain,
            difficulty: parsed.difficulty || 'medium',
            updatedAt: new Date()
          }
        });
        updated++;
      } else {
        // Create new card
        await prisma.card.create({
          data: {
            userId,
            sourceFile: parsed.sourceFile,
            question: parsed.question,
            answer: parsed.answer,
            type: parsed.type,
            chapter: parsed.chapter,
            domain: parsed.domain || 'Unknown',
            difficulty: parsed.difficulty || 'medium',
            tags: parsed.chapter || ""
          }
        });
        created++;
      }
    } catch (error) {
      console.error(`Error processing card "${parsed.question}":`, error);
      // Continue processing other cards even if one fails
      throw error;
    }
  }

  return {
    created,
    updated,
    total: parsedCards.length
  };
}

/**
 * Deletes all cards associated with a specific markdown file
 *
 * @param userId - The user ID who owns the cards
 * @param sourceFile - The source filename to delete cards for
 * @returns Number of cards deleted
 *
 * @example
 * const deleted = await deleteCardsForFile('user123', 'ch1-basics.md');
 * console.log(`Deleted ${deleted} cards`);
 */
export async function deleteCardsForFile(
  userId: string,
  sourceFile: string
): Promise<number> {
  const result = await prisma.card.deleteMany({
    where: {
      userId,
      sourceFile
    }
  });

  return result.count;
}

/**
 * Gets all cards for a user organized by source file
 *
 * @param userId - The user ID
 * @returns Object mapping filename to cards
 */
export async function getCardsByFile(userId: string): Promise<Record<string, any[]>> {
  const cards = await prisma.card.findMany({
    where: { userId },
    orderBy: { sourceFile: 'asc' }
  });

  const cardsByFile: Record<string, any[]> = {};

  for (const card of cards) {
    if (!cardsByFile[card.sourceFile]) {
      cardsByFile[card.sourceFile] = [];
    }
    cardsByFile[card.sourceFile].push(card);
  }

  return cardsByFile;
}

/**
 * Gets cards by type (summary or exam)
 *
 * @param userId - The user ID
 * @param type - The card type ('summary' or 'exam')
 * @returns Array of cards of the specified type
 */
export async function getCardsByType(
  userId: string,
  type: 'summary' | 'exam'
): Promise<any[]> {
  return prisma.card.findMany({
    where: {
      userId,
      type
    },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * Gets statistics about cards
 *
 * @param userId - The user ID
 * @returns Card statistics
 */
export async function getCardStats(userId: string): Promise<{
  total: number;
  byType: Record<string, number>;
  byChapter: Record<string, number>;
  byDifficulty: Record<string, number>;
}> {
  const cards = await prisma.card.findMany({
    where: { userId }
  });

  const stats = {
    total: cards.length,
    byType: { summary: 0, exam: 0 },
    byChapter: {} as Record<string, number>,
    byDifficulty: { easy: 0, medium: 0, hard: 0 }
  };

  for (const card of cards) {
    // Count by type
    if (card.type === 'summary' || card.type === 'exam') {
      stats.byType[card.type as keyof typeof stats.byType]++;
    }

    // Count by chapter
    if (!stats.byChapter[card.chapter]) {
      stats.byChapter[card.chapter] = 0;
    }
    stats.byChapter[card.chapter]++;

    // Count by difficulty
    if (card.difficulty in stats.byDifficulty) {
      stats.byDifficulty[card.difficulty as keyof typeof stats.byDifficulty]++;
    }
  }

  return stats;
}

export default {
  generateCardsFromMarkdown,
  deleteCardsForFile,
  getCardsByFile,
  getCardsByType,
  getCardStats
};
