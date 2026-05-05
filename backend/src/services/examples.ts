/**
 * Usage Examples for Markdown Parser and Card Generator
 * Demonstrates how to use the card generation services
 */

import { parseMarkdown } from './markdownParser';
import { generateCardsFromMarkdown, deleteCardsForFile } from './cardGenerator';

/**
 * Example 1: Basic Markdown Parsing
 * Shows how to extract cards from a markdown note
 */
export function exampleParseMarkdown() {
  const markdownNote = `---
chapter: "範圍管理"
domain: "Domain I"
difficulty: "medium"
---

# 專案範圍管理

### 🎯 重點摘要

- 定義、確認和控制專案工作範圍
- WBS（工作分解結構）的建立和維護
- 管理範圍變更的流程

### 📋 考試要點

- ✅ 定義題：「什麼是工作分解結構？」
- ✅ 應用題：「如何使用WBS進行專案規劃」
- ✅ 情景題：「面對範圍蠻變時的應對方案」
`;

  // Parse the markdown
  const cards = parseMarkdown(markdownNote, 'scope-management.md');

  console.log(`Extracted ${cards.length} cards:`);
  cards.forEach((card, index) => {
    console.log(`
Card ${index + 1}:
- Type: ${card.type}
- Question: ${card.question}
- Answer: ${card.answer}
- Chapter: ${card.chapter}
- Difficulty: ${card.difficulty}
`);
  });

  return cards;
}

/**
 * Example 2: Card Generation with Database Integration
 * Shows the full workflow with create/update
 */
export async function exampleGenerateCards() {
  const userId = 'user-123';
  const markdownContent = `---
chapter: "成本管理"
domain: "Domain II"
---

# 專案成本管理

### 🎯 重點摘要

- 成本估算和預算編制
- 成本控制技術

### 📋 考試要點

- ✅ 定義題：「掙值管理的三個關鍵指標是什麼？」
`;

  // Generate cards from markdown
  // In a real app, this would interact with the database
  // const result = await generateCardsFromMarkdown(userId, markdownContent, 'cost-mgmt.md');
  // console.log(`Created: ${result.created}, Updated: ${result.updated}`);

  // For demo, just show the parsing
  const cards = parseMarkdown(markdownContent, 'cost-mgmt.md');
  return {
    created: cards.length,
    updated: 0,
    total: cards.length
  };
}

/**
 * Example 3: Handling Different Card Types
 * Demonstrates summary vs exam cards
 */
export function exampleDifferentCardTypes() {
  const markdown = `---
chapter: "品質管理"
domain: "Domain III"
---

# 品質管理

### 🎯 重點摘要

- 計劃品質管理流程
- 品質保證和控制的區別

### 📋 考試要點

- ✅ 定義題：「品質和等級有什麼差別？」
`;

  const cards = parseMarkdown(markdown, 'quality.md');

  const summaryCards = cards.filter(c => c.type === 'summary');
  const examCards = cards.filter(c => c.type === 'exam');

  console.log(`Summary Cards: ${summaryCards.length}`);
  summaryCards.forEach(c => console.log(`  - ${c.question}`));

  console.log(`Exam Cards: ${examCards.length}`);
  examCards.forEach(c => console.log(`  - ${c.question}`));

  return { summaryCards, examCards };
}

/**
 * Example 4: Edge Cases
 * Shows how parser handles edge cases
 */
export function exampleEdgeCases() {
  // Case 1: Markdown without frontmatter
  const noFrontmatter = `# 風險管理

### 🎯 重點摘要

- 風險識別
`;
  const cards1 = parseMarkdown(noFrontmatter, 'no-fm.md');
  console.log('No frontmatter - Chapter:', cards1[0]?.chapter); // Will be 'Unknown'

  // Case 2: Markdown without sections
  const noSections = `---
chapter: "測試"
---

# 普通筆記

只有文本內容。
`;
  const cards2 = parseMarkdown(noSections, 'no-sections.md');
  console.log('No sections - Cards extracted:', cards2.length); // Will be 0

  // Case 3: Empty sections
  const emptySections = `---
chapter: "測試"
---

# 測試

### 🎯 重點摘要

### 📋 考試要點

- ✅ 只有考試題
`;
  const cards3 = parseMarkdown(emptySections, 'empty.md');
  console.log('Empty summary section - Total cards:', cards3.length); // Will be 1

  return { cards1, cards2, cards3 };
}
