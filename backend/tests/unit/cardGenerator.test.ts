/**
 * Unit Tests for Card Generator and Markdown Parser
 * Tests card extraction from markdown notes
 */

import { parseMarkdown, ParsedCard } from '../../src/services/markdownParser';

describe('Markdown Parser', () => {
  describe('parseMarkdown', () => {
    it('should extract cards from summary bullet points', () => {
      const markdown = `---
chapter: "基礎概念"
domain: "Domain I"
---

# PMP 基礎概念

### 🎯 重點摘要

- 專案管理的定義和目標
- 項目生命週期的五個階段
- 風險管理的重要性

### 其他內容
`;

      const cards = parseMarkdown(markdown, 'ch1-basics.md');

      // Should have 3 cards from summary
      expect(cards.length).toBe(3);

      // All should be 'summary' type
      expect(cards.every(c => c.type === 'summary')).toBe(true);

      // Should have correct structure
      expect(cards[0]).toMatchObject({
        question: '[PMP 基礎概念] 專案管理的定義和目標',
        answer: '專案管理的定義和目標',
        type: 'summary',
        sourceFile: 'ch1-basics.md',
        chapter: '基礎概念',
        domain: 'Domain I'
      });

      // All should have sourceFile set
      expect(cards.every(c => c.sourceFile === 'ch1-basics.md')).toBe(true);
    });

    it('should extract cards from exam questions section', () => {
      const markdown = `---
chapter: "進度管理"
domain: "Domain II"
difficulty: "hard"
---

# PMP 進度管理

### 📋 考試要點

- ✅ 定義題：「關鍵路徑的定義」
- ✅ 應用題：「如何使用甘特圖進行進度控制」
- ❌ 錯誤示例：「不應該這樣做」
`;

      const cards = parseMarkdown(markdown, 'ch2-scheduling.md');

      // Should have 3 cards from exam section
      expect(cards.length).toBe(3);

      // All should be 'exam' type
      expect(cards.every(c => c.type === 'exam')).toBe(true);

      // Should have hard difficulty from frontmatter
      expect(cards.every(c => c.difficulty === 'hard')).toBe(true);

      // Check first exam question
      expect(cards[0]).toMatchObject({
        type: 'exam',
        sourceFile: 'ch2-scheduling.md',
        chapter: '進度管理',
        domain: 'Domain II'
      });
    });

    it('should handle markdown without card sections', () => {
      const markdown = `---
chapter: "測試"
---

# 沒有卡片的筆記

這是一個沒有重點摘要或考試要點的筆記。

只有普通文本內容。
`;

      const cards = parseMarkdown(markdown, 'no-cards.md');

      // Should return empty array
      expect(cards.length).toBe(0);
    });

    it('should correctly set card types', () => {
      const markdown = `---
chapter: "風險管理"
---

# 風險管理

### 🎯 重點摘要

- 風險識別流程
- 定性分析方法

### 📋 考試要點

- ✅ 定義題：「風險管理計劃的組成」
`;

      const cards = parseMarkdown(markdown, 'ch3-risk.md');

      expect(cards.length).toBe(3);

      // First 2 should be summary
      expect(cards[0].type).toBe('summary');
      expect(cards[1].type).toBe('summary');

      // Last one should be exam
      expect(cards[2].type).toBe('exam');
    });

    it('should extract frontmatter fields correctly', () => {
      const markdown = `---
chapter: "範圍管理"
domain: "Domain III"
difficulty: "medium"
---

# 範圍

### 🎯 重點摘要

- WBS 結構
`;

      const cards = parseMarkdown(markdown, 'scope.md');

      expect(cards.length).toBe(1);
      expect(cards[0].chapter).toBe('範圍管理');
      expect(cards[0].domain).toBe('Domain III');
      expect(cards[0].difficulty).toBe('medium');
    });

    it('should handle missing frontmatter gracefully', () => {
      const markdown = `# 沒有 Frontmatter 的筆記

### 🎯 重點摘要

- 內容1
`;

      const cards = parseMarkdown(markdown, 'no-frontmatter.md');

      expect(cards.length).toBe(1);
      expect(cards[0].chapter).toBe('Unknown');
      // domain should be undefined if not in frontmatter
      expect(cards[0].domain).toBeUndefined();
    });

    it('should handle special characters in bullets', () => {
      const markdown = `---
chapter: "特殊字符"
---

# 測試特殊字符

### 🎯 重點摘要

- 使用 @, #, $, % 等特殊字符
- 「引號」處理測試
- 多行文本的展示
`;

      const cards = parseMarkdown(markdown, 'special.md');

      expect(cards.length).toBe(3);
      expect(cards[0].answer).toBe('使用 @, #, $, % 等特殊字符');
      expect(cards[1].answer).toBe('「引號」處理測試');
    });

    it('should set appropriate default difficulty levels', () => {
      const markdown = `---
chapter: "測試"
---

# 測試

### 🎯 重點摘要

- 摘要項目

### 📋 考試要點

- ✅ 考試題：「問題」
`;

      const cards = parseMarkdown(markdown, 'test.md');

      // Summary cards should default to 'medium'
      const summaryCard = cards.find(c => c.type === 'summary');
      expect(summaryCard?.difficulty).toBe('medium');

      // Exam cards should default to 'hard'
      const examCard = cards.find(c => c.type === 'exam');
      expect(examCard?.difficulty).toBe('hard');
    });

    it('should preserve question format with title prefix', () => {
      const markdown = `---
chapter: "題目格式"
---

# 我的筆記標題

### 🎯 重點摘要

- 第一個項目
`;

      const cards = parseMarkdown(markdown, 'test.md');

      // Question should include title prefix
      expect(cards[0].question).toContain('[我的筆記標題]');
      expect(cards[0].question).toBe('[我的筆記標題] 第一個項目');
    });

    it('should handle multiple sections correctly', () => {
      const markdown = `---
chapter: "多部分"
---

# 多部分筆記

### 🎯 重點摘要

- 摘要1
- 摘要2

### 📋 考試要點

- ✅ 題1：「內容1」
- ✅ 題2：「內容2」
- ✅ 題3：「內容3」

### 其他章節

不應該被解析
`;

      const cards = parseMarkdown(markdown, 'multi.md');

      expect(cards.length).toBe(5);

      const summaryCards = cards.filter(c => c.type === 'summary');
      const examCards = cards.filter(c => c.type === 'exam');

      expect(summaryCards.length).toBe(2);
      expect(examCards.length).toBe(3);
    });

    it('should handle empty sections gracefully', () => {
      const markdown = `---
chapter: "空部分"
---

# 空部分測試

### 🎯 重點摘要

### 📋 考試要點

- ✅ 題：「內容」
`;

      const cards = parseMarkdown(markdown, 'empty.md');

      // Should only have the exam question
      expect(cards.length).toBe(1);
      expect(cards[0].type).toBe('exam');
    });
  });
});

describe('Card Generation Result Format', () => {
  it('should have correct interface for ParsedCard', () => {
    const card: ParsedCard = {
      question: 'Test?',
      answer: 'Test answer',
      type: 'summary',
      sourceFile: 'test.md',
      chapter: 'Test Chapter',
      domain: 'Domain I',
      difficulty: 'medium'
    };

    expect(card.question).toBeDefined();
    expect(card.answer).toBeDefined();
    expect(card.type).toMatch(/summary|exam/);
    expect(['easy', 'medium', 'hard']).toContain(card.difficulty);
  });
});
