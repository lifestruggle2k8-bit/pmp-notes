# MVP 部署和測試指南

## 1. 本地環境設置

### 後端設置

```bash
# 進入後端目錄
cd backend

# 安裝依賴
npm install

# 配置環境變量
cp .env.example .env
# 編輯 .env 文件，設置本地 PostgreSQL 連接字符串

# 運行數據庫遷移
npx prisma migrate dev --name init

# 啟動後端服務
npm run dev
```

預期輸出：
```
✓ Database connected
✓ Server running on port 3000
```

### 前端設置

```bash
# 進入前端目錄
cd frontend

# 安裝依賴
npm install

# 配置環境變量
cp .env.example .env
# REACT_APP_API_URL 應該是 http://localhost:3000

# 啟動前端開發服務器
npm start
```

預期：React 應用在 http://localhost:3000 打開

## 2. 驗證健康檢查端點

```bash
curl http://localhost:3000/health
```

預期響應：
```json
{
  "status": "ok",
  "timestamp": "2026-05-05T12:00:00.000Z"
}
```

## 3. 完整流程測試

### 3.1 後端 API 測試

#### 測試卡片 API

```bash
# 假設您有一個有效的 JWT token
TOKEN="your_jwt_token"

# 創建卡片
curl -X POST http://localhost:3000/api/cards \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceFile": "test.md",
    "chapter": "CH.1",
    "domain": "Domain I",
    "question": "What is PMP?",
    "answer": "Project Management Professional",
    "type": "definition",
    "difficulty": "easy"
  }'

# 取得所有卡片
curl http://localhost:3000/api/cards \
  -H "Authorization: Bearer $TOKEN"

# 取得今日卡片
curl http://localhost:3000/api/cards/today \
  -H "Authorization: Bearer $TOKEN"
```

#### 測試複習 API

```bash
# 提交複習結果
curl -X POST http://localhost:3000/api/review/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cardId": "card_id_here",
    "quality": 2,
    "timeSpent": 30
  }'

# 取得複習統計
curl http://localhost:3000/api/review/stats \
  -H "Authorization: Bearer $TOKEN"
```

#### 測試同步 API（無認證）

```bash
# 手動觸發同步
curl -X POST http://localhost:3000/webhook/manual \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "PMP備考/UDEMY CH.1 PMP TERMS/何謂專案.md",
    "userId": "test_user_id"
  }'

# 取得同步日誌
curl http://localhost:3000/webhook/logs
```

### 3.2 前端完整流程測試

1. 打開 http://localhost:3000
2. 看到主頁統計卡片
3. 點擊「開始複習」按鈕
4. 看到卡片翻轉界面
5. 點擊卡片翻轉以顯示答案
6. 點擊評分按鈕（不會/半會/會）
7. 卡片自動移到下一張
8. 完成所有卡片後，顯示完成提示

## 4. 部署到 Vercel（前端）

### 4.1 準備

1. 在 GitHub 上創建倉庫
2. 推送代碼到 GitHub

```bash
git add .
git commit -m "feat: complete MVP implementation"
git push origin main
```

### 4.2 部署

1. 進入 [Vercel.com](https://vercel.com)
2. 點擊「New Project」
3. 選擇 GitHub 倉庫
4. 設置 build 和 start 命令：
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/build`
5. 設置環境變量：
   - `REACT_APP_API_URL`: 您的後端 API URL（例如：https://pmp-backend.railway.app）
6. 點擊「Deploy」

部署成功後，您將獲得一個 Vercel URL。

## 5. 部署到 Railway（後端）

### 5.1 準備

確保您的 GitHub 倉庫已推送。

### 5.2 部署

1. 進入 [Railway.app](https://railway.app)
2. 點擊「New Project」
3. 選擇「Deploy from GitHub repo」
4. 選擇您的倉庫
5. Railway 將自動檢測 Node.js 應用
6. 在「Variables」標籤中設置環境變量：
   - `DATABASE_URL`: PostgreSQL 連接字符串
   - `JWT_SECRET`: 隨機密鑰（例如：使用 `openssl rand -hex 32` 生成）
   - `GITHUB_TOKEN`: GitHub PAT（如需要）
   - `GITHUB_WEBHOOK_SECRET`: 隨機密鑰
   - `NODE_ENV`: production
   - `PORT`: 3000（Railway 會自動配置）

7. 完成部署

Railway 會自動從 package.json 檢測啟動命令。

## 6. 環境變量配置

### 後端（Railway）

| 變數名 | 說明 | 示例 |
|--------|------|------|
| DATABASE_URL | PostgreSQL 連接字符串 | postgresql://user:pass@host:5432/db |
| JWT_SECRET | JWT 簽名密鑰 | `openssl rand -hex 32` |
| GITHUB_TOKEN | GitHub 個人訪問令牌 | ghp_xxxxxxxxxxxx |
| GITHUB_REPO | 倉庫名稱 | username/repo |
| GITHUB_WEBHOOK_SECRET | Webhook 驗證密鑰 | `openssl rand -hex 32` |
| NODE_ENV | 環境 | production |
| PORT | 端口號 | 3000 |

### 前端（Vercel）

| 變數名 | 說明 | 示例 |
|--------|------|------|
| REACT_APP_API_URL | 後端 API URL | https://api.example.com |
| REACT_APP_GITHUB_REPO | GitHub 倉庫 | username/repo |

## 7. 測試部署版本

### 前端測試

1. 訪問 Vercel 部署的 URL
2. 驗證主頁加載
3. 點擊「開始複習」
4. 驗證 API 請求到達後端

### 後端測試

```bash
curl https://your-railway-url.railway.app/health
```

應返回：
```json
{
  "status": "ok",
  "timestamp": "2026-05-05T12:00:00.000Z"
}
```

## 8. 故障排除

### 前端連不上後端 API

- 檢查 `REACT_APP_API_URL` 環境變量
- 確認後端已部署並運行
- 檢查 CORS 配置

### 數據庫連接失敗

- 驗證 `DATABASE_URL` 正確
- 檢查防火牆規則允許連接
- 運行 `npx prisma migrate deploy` 應用遷移

### GitHub 同步失敗

- 驗證 `GITHUB_TOKEN` 有效
- 驗證 `GITHUB_REPO` 格式正確
- 檢查 webhook 簽名驗證（`GITHUB_WEBHOOK_SECRET`）

## 9. 性能監控

### Vercel

- 在 Vercel 儀表板查看部署日誌
- 檢查 Function 性能指標

### Railway

- 在 Railway 儀表板查看日誌
- 監控資源使用情況

## 10. 下一步

- 配置自動部署（GitHub 自動觸發部署）
- 設置監控和告警
- 配置自定義域名
- 設置 SSL 證書
- 實施 CI/CD 流程

---

**部署完成檢查清單**

- [ ] 後端在 Railway 上部署並運行
- [ ] 前端在 Vercel 上部署並運行
- [ ] 數據庫連接正常
- [ ] 環境變量配置完整
- [ ] 健康檢查端點正常
- [ ] 前端可以成功調用後端 API
- [ ] 複習流程從端到端運作
- [ ] 日誌輸出無錯誤

