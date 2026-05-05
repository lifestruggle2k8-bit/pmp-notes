/**
 * Markdown Parser Service
 * Extracts flashcards from Markdown notes with frontmatter
 */

/**
 * Represents a parsed card extracted from markdown
 */
export interface ParsedCard {
  /** The question/prompt text */
  question: string;
  /** The answer/content text */
  answer: string;
  /** Card type: 'summary' for bullet points, 'exam' for exam questions */
  type: 'summary' | 'exam';
  /** Source file name (from filename parameter) */
  sourceFile: string;
  /** Chapter/topic from frontmatter (e.g., "基礎概念") */
  chapter: string;
  /** Domain classification (e.g., "Domain I") */
  domain?: string;
  /** Optional difficulty level */
  difficulty?: string;
}

/**
 * Extracts frontmatter from markdown content
 * Frontmatter is YAML between --- delimiters at the start of the file
 */
function extractFrontmatter(markdown: string): Record<string, any> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(frontmatterRegex);

  if (!match || !match[1]) {
    return {};
  }

  const frontmatterContent = match[1];
  const result: Record<string, any> = {};

  // Simple YAML parser for basic key: value pairs
  const lines = frontmatterContent.split('\n');
  for (const line of lines) {
    if (!line.trim() || line.startsWith('#')) continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    // Remove quotes if present
    let cleanValue = value;
    if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
      cleanValue = cleanValue.slice(1, -1);
    }

    result[key] = cleanValue;
  }

  return result;
}

/**
 * Extracts the main title from markdown
 * Uses the first H1 heading (# Title)
 */
function extractTitle(markdown: string): string {
  const titleRegex = /^# (.+)$/m;
  const match = markdown.match(titleRegex);
  return match ? match[1].trim() : 'Untitled';
}

/**
 * Extracts bullet points from a specific section
 * Looks for section headers like "### 🎯 重點摘要"
 */
function extractSectionBullets(markdown: string, sectionPattern: RegExp): string[] {
  // Find the section start
  const sectionMatch = markdown.match(sectionPattern);
  if (!sectionMatch) {
    return [];
  }

  const sectionStart = sectionMatch.index || 0;
  const sectionHeader = sectionMatch[0];
  const startIndex = sectionStart + sectionHeader.length;

  // Find the end of the section (next heading or end of file)
  const remainingContent = markdown.substring(startIndex);
  const nextHeadingRegex = /\n(#+\s)/; // Matches next heading
  const nextHeadingMatch = remainingContent.match(nextHeadingRegex);

  let sectionContent: string;
  if (nextHeadingMatch) {
    sectionContent = remainingContent.substring(0, nextHeadingMatch.index);
  } else {
    sectionContent = remainingContent;
  }

  // Extract bullet points (lines starting with "- ")
  const bulletRegex = /^- (.+)$/gm;
  const bullets: string[] = [];
  let match;

  while ((match = bulletRegex.exec(sectionContent)) !== null) {
    const bullet = match[1].trim();
    if (bullet) {
      bullets.push(bullet);
    }
  }

  return bullets;
}

/**
 * Extracts exam questions from the "考試要點" section
 * Looks for patterns like "- ✅ 定義題：「XXX」"
 */
function extractExamQuestions(markdown: string): string[] {
  const examPattern = /### 📋\s*考試要點/i;
  const bullets = extractSectionBullets(markdown, examPattern);

  // Filter and clean exam questions
  const questions: string[] = [];

  for (const bullet of bullets) {
    // Remove emoji prefixes and type markers
    // Format: "✅ 定義題：「XXX」" -> "定義題：XXX"
    const cleaned = bullet
      .replace(/^✅\s*/i, '') // Remove checkmark emoji
      .replace(/^❌\s*/i, '') // Remove cross emoji
      .replace(/「(.+?)」/g, '$1') // Convert 「」 to plain text
      .trim();

    if (cleaned) {
      questions.push(cleaned);
    }
  }

  return questions;
}

/**
 * Parses markdown content and extracts flashcards
 *
 * @param markdown - The markdown content to parse
 * @param fileName - The source filename (used in sourceFile field)
 * @returns Array of parsed cards
 *
 * @example
 * const cards = parseMarkdown(markdownContent, 'ch1-basics.md');
 * // Returns cards with type 'summary' and 'exam'
 */
export function parseMarkdown(markdown: string, fileName: string): ParsedCard[] {
  const cards: ParsedCard[] = [];

  // Extract frontmatter
  const frontmatter = extractFrontmatter(markdown);
  const chapter = frontmatter.chapter || 'Unknown';
  const domain = frontmatter.domain || undefined;
  const difficulty = frontmatter.difficulty || undefined;

  // Extract title to use as base question
  const title = extractTitle(markdown);

  // Extract summary bullet points
  const summaryPattern = /### 🎯\s*重點摘要/i;
  const summaryBullets = extractSectionBullets(markdown, summaryPattern);

  for (const bullet of summaryBullets) {
    cards.push({
      question: `[${title}] ${bullet}`,
      answer: bullet,
      type: 'summary',
      sourceFile: fileName,
      chapter,
      domain,
      difficulty: difficulty || 'medium'
    });
  }

  // Extract exam questions
  const examQuestions = extractExamQuestions(markdown);

  for (const question of examQuestions) {
    cards.push({
      question: `[${title}] ${question}`,
      answer: question,
      type: 'exam',
      sourceFile: fileName,
      chapter,
      domain,
      difficulty: difficulty || 'hard'
    });
  }

  return cards;
}

export default {
  parseMarkdown,
  extractFrontmatter,
  extractTitle,
  extractSectionBullets,
  extractExamQuestions
};
