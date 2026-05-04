# PMP 智能閃卡學習系統 - 設計文檔

**文檔日期**：2026-05-05  
**項目名稱**：PMP Flashcard Learning Platform  
**狀態**：Design Approved ✅

---

## 1. 項目概述

### 1.1 目標
構建一個跨平台（Web + PWA + 手機）的智能閃卡複習系統，支援：
- 自動從 Obsidian 筆記生成閲卡
- 間隔重複 + 簡單複習雙模式
- GitHub 雲同步
- 實時統計和進度追蹤
- 完全離線可用

### 1.2 使用場景

**日常工作流**：
1. Miguel 在 Obsidian 中新增/修改 PMP 筆記（PMP備考/UDEMY CH.*/）
2. git push 到 GitHub
3. GitHub Actions 自動觸發，檢測新筆記
4. 後端自動解析筆記，生成卡片
5. 打開 Web 應用，複習新卡片
6. 複習進度自動同步到後端
7. 統計儀表板實時更新

### 1.3 成功標準

- ✅ 第 1 週末：MVP 上線（基礎複習 + 自動同步）
- ✅ 第 2 週末：完整功能版本（統計 + PWA + 優化）
- ✅ 自動化腳本可靠運行，0 手動干預
- ✅ 可支援 100+ 個 UDEMY 資料夾、1000+ 張卡片
- ✅ 手機體驗流暢（PWA 離線可用）

---

## 2. 技術架構

### 2.1 系統圖

```
┌─ 本地開發 ─────────────────────────────────┐
│  Obsidian Vault                            │
│  └─ PMP備考/UDEMY CH.*/                    │
│     └─ *.md 筆記                           │
└────────────────┬────────────────────────────┘
                 │ git push
                 ▼
┌─ 版本控制 ─────────────────────────────────┐
│  GitHub Repository                         │
│  ├─ /frontend (React + PWA)               │
│  ├─ /backend (Node.js + Express)          │
│  ├─ /automation (GitHub Actions)          │
│  ├─ /data (卡片 JSON)                     │
│  └─ /notebooks (原始 UDEMY 筆記)          │
└────────────────┬────────────────────────────┘
                 │ Webhook + Actions
                 ▼
┌─ 自動化處理 ───────────────────────────────┐
│  GitHub Actions                            │
│  - 監控 /notebooks 變化                    │
│  - 調用後端 API                            │
│  - 觸發卡片生成                            │
└────────────────┬────────────────────────────┘
                 │ REST API
                 ▼
┌─ 後端服務 ─────────────────────────────────┐
│  Backend API (Node.js + Express)           │
│  ├─ 卡片生成引擎                           │
│  ├─ 複習算法引擎                           │
│  ├─ 統計計算                               │
│  └─ 用戶數據管理                           │
└────────────────┬────────────────────────────┘
                 │ PostgreSQL
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌─────────┐ ┌─────────┐ ┌──────────────┐
│ 卡片庫   │ │ 複習進度 │ │ 統計數據     │
│ (JSON)  │ │ (DB)    │ │ (DB)        │
└─────────┘ └─────────┘ └──────────────┘
    │            │            │
    └────────────┼────────────┘
                 │ API
                 ▼
┌─ 前端應用 ─────────────────────────────────┐
│  Web Application (React + TypeScript)      │
│  ├─ 複習頁面（卡片翻轉）                   │
│  ├─ 統計儀表板（圖表）                     │
│  ├─ 卡片編輯器                             │
│  └─ 設置頁面                               │
└────────────────┬────────────────────────────┘
                 │ PWA
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌─────────┐ ┌─────────┐ ┌──────────────┐
│ 桌面瀏覽器│ │ 手機 PWA │ │ 離線緩存     │
│ (Chrome) │ │(Safari)  │ │ (IndexedDB) │
└─────────┘ └─────────┘ └──────────────┘
```

### 2.2 技術棧

| 層級 | 技術 | 原因 |
|------|------|------|
| **前端框架** | React 18 + TypeScript | 類型安全、組件化、高效 |
| **UI 組件** | Shadcn/ui + Tailwind CSS | 美觀、快速、可定製 |
| **狀態管理** | Zustand | 輕量、簡單、高性能 |
| **數據同步** | React Query + Axios | 自動重試、緩存、離線支援 |
| **PWA** | Workbox | 離線支援、背景同步、安裝 |
| **後端框架** | Node.js + Express | 輕量、快速、生態完善 |
| **數據庫** | PostgreSQL | 可靠、功能強大、免費託管可用 |
| **ORM** | Prisma | 類型安全、遷移簡單 |
| **自動化** | GitHub Actions + Node.js | 零成本、深度整合、觸發快速 |
| **部署** | Vercel (前端) + Railway (後端) | 免費、自動化、無縫部署 |

---

## 3. 核心功能設計

### 3.1 卡片生成引擎

#### 3.1.1 輸入格式（Markdown）

```markdown
---
tags: [PMP, Domain I, 人員管理]
source: "PMBOK & PMP 2026 考試綱要"
chapter: "基礎概念"
date: 2026-05-02
---

# 筆記標題

## 📖 原文內容
[詳細內容...]

## 🎯 重點摘要
- 重點 1
- 重點 2
- 重點 3

## 📋 考試要點
**常見題型：**
- ✅ 定義題：「問題 1」
- ✅ 應用題：「問題 2」

## 🔑 關鍵詞連結
[[相關筆記]]
```

#### 3.1.2 卡片提取邏輯

```javascript
// 偽代碼
function extractCards(markdown) {
  const cards = [];
  
  // 提取 1：從「🎯 重點摘要」
  const summary = extractSection('🎯 重點摘要', markdown);
  summary.bulletPoints.forEach(point => {
    cards.push({
      question: `${title} 的重點是什麼？`,
      answer: point,
      type: 'summary',
      difficulty: 'medium'
    });
  });
  
  // 提取 2：從「📋 考試要點」
  const examPoints = extractSection('📋 考試要點', markdown);
  examPoints.questions.forEach(q => {
    cards.push({
      question: q,
      answer: findAnswerInContent(q, markdown),
      type: 'exam',
      difficulty: 'hard'
    });
  });
  
  return cards;
}
```

#### 3.1.3 卡片結構（JSON）

```json
{
  "id": "card-uuid",
  "sourceFile": "何謂專案.md",
  "chapter": "CH.1",
  "domain": "Domain I",
  "question": "什麼是專案？",
  "answer": "臨時性、獨特的、為了達成特定目標的一次性工作...",
  "tags": ["PMP", "基礎概念", "定義"],
  "type": "definition",
  "difficulty": "easy",
  "createdAt": "2026-05-05",
  "updatedAt": "2026-05-05",
  "reviewStats": {
    "totalReviews": 5,
    "correctCount": 4,
    "lastReviewDate": "2026-05-05",
    "nextReviewDate": "2026-05-10"
  }
}
```

### 3.2 複習引擎

#### 3.2.1 間隔重複算法（SM-2 簡化版）

```
初始狀態：
- 新卡片：interval = 1 day, factor = 2.5

複習後更新：
if (correct) {
  if (quality >= 3) { // 答對
    interval = interval × factor;
    factor = max(1.3, factor + 0.1);
  } else { // 勉強答對
    interval = interval × 1.3;
  }
} else { // 答錯
  interval = 1; // 重置
  factor = 2.5;
}

nextReviewDate = today + interval days;
```

**舉例**：
```
Day 1: 新卡片 (interval=1)
Day 2: 答對簡單 → interval = 1 × 2.5 = 2.5 → 下次 Day 4
Day 4: 答對 OK → interval = 2.5 × 1.3 = 3.25 → 下次 Day 7
Day 7: 答錯 → interval = 1 → 下次 Day 8
Day 8: 答對簡單 → interval = 1 × 2.5 = 2.5 → 下次 Day 10
...
```

#### 3.2.2 簡單模式

```
用戶評價：
- 不會 (0 分) → 明天複習
- 半會 (1 分) → 3 天后複習
- 會 (2 分) → 7 天后複習

複習優先級：
1. 逾期卡片（超過複習日期）
2. 不會的卡片
3. 半會的卡片
4. 其他卡片
```

#### 3.2.3 每日複習隊列

```javascript
// 計算今日要複習的卡片
function getTodayCards() {
  const all = await getCards();
  
  const overdue = all.filter(c => c.nextReviewDate <= today);
  const scheduled = all.filter(c => c.nextReviewDate === today);
  const new = all.filter(c => !c.firstReviewDate);
  
  // 配比：40% 逾期、40% 新卡、20% 計劃內
  return [
    ...overdue.slice(0, 40),
    ...new.slice(0, 20),
    ...scheduled.slice(0, 10)
  ];
}
```

### 3.3 統計儀表板

#### 3.3.1 簡易模式

```
今日進度：
├─ 已複習：15 張
├─ 掌握度：78%
└─ 學習時間：32 分鐘

總體進度：
├─ 總卡片數：856
├─ 已掌握：312 (36%)
├─ 半會：284 (33%)
└─ 待學習：260 (31%)
```

#### 3.3.2 詳細模式

```
按 Domain 分布：
├─ Domain I (People): 280 卡片，掌握度 42%
├─ Domain II (Process): 356 卡片，掌握度 38%
└─ Domain III (Business): 220 卡片，掌握度 35%

按 Chapter 進度：
├─ CH.1 PMP TERMS: 24 筆記，240 卡片，完成 50%
├─ CH.2 PMP PRINCIPLES: 18 筆記，180 卡片，完成 20%
└─ ...

長期趨勢：
├─ 過去 7 天平均複習：42 張/天
├─ 掌握度趨勢：↑ +5%
└─ 平均複習耗時：2.1 分鐘/張

錯誤分析：
├─ 最容易出錯：Domain II > Domain III > Domain I
├─ 熱點章節：計劃管理、EVM、衝突管理
└─ 建議重點：EVM（掌握度 25%）
```

### 3.4 用戶界面設計

#### 3.4.1 頁面架構

```
App
├─ /dashboard
│  ├─ 簡易統計卡片
│  ├─ 詳細統計（可展開）
│  └─ 快速開始複習按鈕
├─ /review
│  ├─ 卡片翻轉界面
│  ├─ 評分按鈕（不會/半會/會）
│  └─ 進度條
├─ /cards
│  ├─ 卡片列表（可搜索、篩選）
│  ├─ 批量編輯
│  └─ 卡片詳情
├─ /settings
│  ├─ 複習模式選擇
│  ├─ 每日複習目標
│  └─ 導出/導入數據
└─ /stats (詳細統計)
   ├─ Domain 分布圖
   ├─ 長期趨勢圖
   └─ 錯誤熱力圖
```

---

## 4. 自動化流程

### 4.1 GitHub Actions 工作流

#### 4.1.1 觸發條件

```yaml
# 當以下文件改變時觸發
on:
  push:
    paths:
      - 'PMP備考/UDEMY*/**.md'  # 任何 UDEMY 資料夾中的筆記
    branches:
      - main

jobs:
  sync-cards:
    runs-on: ubuntu-latest
    steps:
      - 檢出代碼
      - 檢測改變的文件
      - 調用後端 API 生成卡片
      - 提交卡片 JSON 到 repo
```

#### 4.1.2 自動化流程

```
Push 到 GitHub
    ↓
檢測 UDEMY*/*.md 文件變化
    ↓
發送 Webhook 到後端
    ↓
後端收到，檢查文件內容
    ↓
解析 Markdown，提取卡片
    ↓
檢查是否已存在（防重複）
    ↓
插入到 PostgreSQL
    ↓
更新前端應用
    ↓
用戶打開應用，看到新卡片
```

### 4.2 數據一致性

- **來源**：GitHub 上的 .md 筆記是唯一源
- **衍生**：後端生成的卡片數據依賴筆記
- **緩存**：前端可緩存卡片，但 24h 內應同步
- **衝突處理**：若卡片被手動編輯，優先保留用戶編輯

---

## 5. 部署架構

### 5.1 部署清單

| 組件 | 部署目標 | 配置 |
|------|--------|------|
| **前端** | Vercel | React App，自動部署 |
| **後端** | Railway | Node.js API，自動部署 |
| **數據庫** | Railway PostgreSQL | 免費 10GB 額度 |
| **存儲** | GitHub (JSON) | 卡片備份 |
| **自動化** | GitHub Actions | 免費額度充足 |

### 5.2 環境變量

```env
# 後端 (.env.production)
DATABASE_URL=postgresql://...
GITHUB_TOKEN=ghp_...
PORT=3000
NODE_ENV=production
JWT_SECRET=...

# 前端 (.env.production)
REACT_APP_API_URL=https://api.example.com
REACT_APP_GITHUB_REPO=user/pmp-cards
```

### 5.3 成本預估

| 服務 | 免費額度 | 預期成本 |
|------|---------|--------|
| Vercel | ✅ 無限制 | $0 |
| Railway | ✅ $5/月 free tier | $0 |
| GitHub Actions | ✅ 2000 分鐘/月 | $0 |
| PostgreSQL | ✅ 10GB 免費 | $0 |
| **合計** | | **$0** |

---

## 6. 開發時間表

### 第 1 週：MVP 基礎

```
Day 1-2: 項目設置
├─ Vercel + Railway 配置
├─ GitHub 倉庫設置
└─ 開發環境搭建

Day 3-4: 前端基礎
├─ React 項目骨架
├─ 路由設置
├─ 基礎 UI 組件（React Query、Zustand）
└─ 登錄/認證

Day 5: 後端基礎
├─ Express 服務器
├─ PostgreSQL 連接
├─ Prisma Schema
└─ API 路由框架

Day 6-7: 核心功能
├─ 卡片生成引擎
├─ 複習頁面實現
├─ 基礎同步
└─ MVP 部署
```

**里程碑**：Week 1 末 → MVP 可用（基礎複習+同步）

### 第 2 週：完整功能

```
Day 1-2: 複習算法
├─ 間隔重複實現
├─ 簡單模式實現
└─ 算法測試

Day 3-4: 統計儀表板
├─ 簡易統計卡片
├─ 詳細圖表（Chart.js）
└─ 長期統計存儲

Day 5: PWA + 離線
├─ Workbox 集成
├─ Service Worker 配置
├─ IndexedDB 離線緩存
└─ 離線複習支援

Day 6-7: 優化 + 上線
├─ 性能優化
├─ Bug 修復
├─ UI 打磨
├─ 完整部署
└─ 文檔編寫
```

**里程碑**：Week 2 末 → 完整功能上線

---

## 7. 風險與緩解

| 風險 | 概率 | 影響 | 緩解方案 |
|------|------|------|--------|
| 卡片生成邏輯失誤 | 中 | 高 | 建立測試套件，手動驗證前 5 個章節 |
| 數據庫性能問題 | 低 | 中 | 預先建立索引，使用查詢緩存 |
| 同步延遲 | 中 | 低 | 使用消息隊列（Bull），異步處理 |
| 用戶認證問題 | 低 | 高 | 使用 OAuth（GitHub），簡化流程 |
| 前端 bug | 高 | 低 | 編寫單元測試，測試覆蓋率 >80% |

---

## 8. 測試策略

### 8.1 單元測試
- 卡片生成邏輯（提取、格式轉換）
- 複習算法（間隔計算、排序）
- 統計計算（聚合、趨勢）

### 8.2 集成測試
- API 完整流程（生成 → 複習 → 同步）
- 數據庫操作（CRUD）
- GitHub 自動化觸發

### 8.3 端對端測試
- 完整用戶流程（新增筆記 → 看到卡片 → 複習 → 統計更新）
- 離線模式測試
- 跨瀏覽器兼容性

---

## 9. 後續擴展方向

- 📊 更多統計維度（分時段複習分析、預測考試成績）
- 🤖 AI 生成卡片（GPT 自動提煉要點）
- 📱 原生移動應用（React Native）
- 👥 協作複習（分享卡片、組隊學習）
- 🎙️ 語音複習（播放問題、口頭回答）
- 📤 導出功能（Anki、Quizlet 格式）

---

## 10. 成功指標

- ✅ 自動化運行無誤，0 次手動干預
- ✅ 新筆記到卡片生成 <5 分鐘
- ✅ Web 應用首屏加載 <2 秒
- ✅ PWA 離線可用，同步成功率 >99%
- ✅ 複習進度準確追蹤
- ✅ 日活用戶 >1（Miguel），每日複習 >30 分鐘

---

**設計文檔完成日期**：2026-05-05  
**下一步**：用戶審查 → 實現計劃生成 → 開發開始
