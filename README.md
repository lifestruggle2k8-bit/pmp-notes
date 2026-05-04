# PMP 智能閃卡學習系統

跨平台智能閲卡複習系統，支援 GitHub 自動同步、間隔重複演算法、實時統計。

## 🎯 核心功能

### MVP 版本（第 1 週）

- ✅ **卡片管理** - 創建、編輯、刪除卡片
- ✅ **複習系統** - 互動式卡片翻轉複習
- ✅ **SM-2 演算法** - 智能間隔重複
- ✅ **GitHub 自動同步** - 從 Markdown 筆記自動生成卡片
- ✅ **REST API** - 完整的後端 API
- ✅ **狀態管理** - Zustand + React Query
- ✅ **響應式設計** - Tailwind CSS

## 🏗️ 項目結構

```
project/
├── frontend/          # React 前端應用
├── backend/           # Node.js/Express 後端
├── DEPLOYMENT.md      # 部署指南
└── README.md          # 本文件
```

## 🚀 快速開始

### 後端

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

後端運行在 http://localhost:3000

### 前端

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

前端運行在 http://localhost:3000

## 📚 API 文檔

### 卡片 API

```
GET    /api/cards           # 取得所有卡片
GET    /api/cards/today     # 取得今日待複習卡片
POST   /api/cards           # 創建卡片
PUT    /api/cards/:id       # 更新卡片
DELETE /api/cards/:id       # 刪除卡片
```

### 複習 API

```
POST   /api/review/submit       # 提交複習結果
GET    /api/review/history/:id  # 取得複習歷史
GET    /api/review/stats        # 取得複習統計
```

## 🔧 技術棧

| 層級 | 技術 |
|------|------|
| **前端框架** | React 18 + TypeScript |
| **UI 庫** | Tailwind CSS |
| **狀態管理** | Zustand + React Query |
| **後端框架** | Node.js + Express |
| **數據庫** | PostgreSQL |
| **ORM** | Prisma |
| **認證** | JWT |
| **部署** | Vercel (前端) + Railway (後端) |

## 📝 環境變量

### 後端

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pmp_flashcards
GITHUB_TOKEN=your_github_token
GITHUB_REPO=username/repo
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### 前端

```env
REACT_APP_API_URL=http://localhost:3000
```

## 📖 詳細部署指南

請參考 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解完整的部署步驟。

## 📄 許可證

MIT License

