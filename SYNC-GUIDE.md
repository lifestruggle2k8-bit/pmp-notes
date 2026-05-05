# 📱 Obsidian Vault 多設備同步完整指南

## ✅ 已完成的設置

你的 Vault 已經配置完成：
- ✓ GitHub 倉庫連接：`https://github.com/lifestruggle2k8-bit/pmp-notes.git`
- ✓ .gitignore 配置：排除系統文件，保留筆記內容
- ✓ 自動同步腳本：`sync-vault.ps1`
- ✓ 初始提交完成

---

## 📝 第1部分：筆電端自動同步設置

### 選項 A：使用 Windows 定時任務（推薦 ⭐）

最簡單、最可靠的方式。

**設置步驟：**

1. **以管理員身份運行設置腳本**
   ```
   右鍵點擊: setup-auto-sync.bat → 選擇 "以管理員身份運行"
   ```

2. **驗證任務已創建**
   ```
   Windows 搜索 → "工作排程器"
   找到: ObsidianVaultSync 任務
   ```

3. **手動測試同步**
   ```powershell
   powershell -ExecutionPolicy Bypass -File "C:\Users\lifes\Documents\Obsidian Vault\sync-vault.ps1"
   ```

4. **查看同步日誌**
   ```
   文件路徑: C:\Users\lifes\Documents\Obsidian Vault\.vault-sync.log
   ```

**自動同步參數：**
- ⏱️ 同步頻率：每 5 分鐘
- 🎯 觸發時機：用戶登入時啟動 → 持續運行
- 📤 自動推送：Git 有新增/修改時自動上傳

### 選項 B：手動同步命令

如果不想設定自動任務，可以手動運行：

```powershell
# 進入 Vault 資料夾
cd "C:\Users\lifes\Documents\Obsidian Vault"

# 方式1：一次性同步
powershell -File .\sync-vault.ps1

# 方式2：進入監視模式（持續同步）
powershell -File .\sync-vault.ps1 -Watch -IntervalSeconds 300
```

---

## 📱 第2部分：手機端同步方案

### 🍎 iOS / iPad 方案

#### 方案1：Working Copy + iCloud Drive（推薦 ⭐⭐⭐）
**最佳整合方案，無需第三方同步服務**

1. **在 App Store 下載** `Working Copy` 
   - App Store 連結：https://apps.apple.com/app/working-copy/id896694807

2. **設置 Working Copy**
   - 打開 Working Copy
   - 點擊 `+` → 選擇 `Clone Repository`
   - 複製倉庫 URL：
     ```
     https://github.com/lifestruggle2k8-bit/pmp-notes.git
     ```
   - 選擇保存位置：iCloud Drive 中的某個資料夾

3. **在 Obsidian 中打開 Vault**
   - 打開 Obsidian for iOS
   - 在檔案管理中選擇 Working Copy 資料夾
   - 或使用 iCloud Drive 同步文件夾

4. **同步流程**
   - 在 Obsidian 中編輯筆記
   - 打開 Working Copy app
   - 點擊倉庫 → `Commit` → `Push`
   - 完成！📤

#### 方案2：Obsidian Sync（官方同步，最簡單）
- 訂閱 Obsidian Sync（官方服務）
- 所有設備自動同步
- 缺點：需要月費（$4-5/月）
- 優點：無縫體驗，無需管理 Git

#### 方案3：Git + Shortcuts（進階）
使用 iOS Shortcuts 自動執行 Git 命令
- 需要較多設置時間
- 詳細教程：[Obsidian Git iOS Setup](https://github.com/denolehov/obsidian-git)

---

### 🤖 Android 方案

#### 方案1：MGit / Gittyup（推薦 ⭐⭐⭐）
**Android 上最好用的 Git 客戶端**

1. **下載 MGit**
   - Play Store：https://play.google.com/store/apps/details?id=com.manichord.mgit

2. **設置倉庫**
   - 打開 MGit
   - 點擊 `Clone` → 輸入倉庫 URL
   - 選擇本地路徑（如 `/storage/emulated/0/Obsidian/pmp-notes`）

3. **在 Obsidian 中打開**
   - Obsidian Android → 開啟 Vault
   - 指向 MGit 克隆的資料夾

4. **同步步驟**
   ```
   編輯筆記 → 返回 MGit → Commit → Push
   ```

#### 方案2：Termux + Git（進階用戶）
- 使用 Termux 終端運行 Git 命令
- 更靈活，但需要 Linux 基礎知識

#### 方案3：Synology / NAS 同步
- 如果有 NAS 設備，可配置 WebDAV
- Obsidian 支援 WebDAV 同步

---

## 🔄 第3部分：多設備同步工作流程

### 日常使用流程

```
筆電 (Obsidian)
  ↓ 編輯筆記，自動同步（5 分鐘間隔）
  ↓
GitHub 倉庫 (remote)
  ↓
手機 (Working Copy / MGit)
  ↓ 拉取最新更新（git pull）
  ↓
手機 Obsidian (查看/編輯)
  ↓ 編輯完成後提交推送
  ↓
GitHub ← Push
  ↓
筆電 ← 下次自動同步時拉取 (git pull)
```

### 衝突解決

**如果多設備同時編輯同一個文件：**

1. **優先讓一個設備完成編輯**
   - 在 Obsidian 中編輯完成 → 保存
   - 等待筆電自動同步完成（看 `.vault-sync.log`）

2. **手機再進行編輯**
   - 先 `git pull` 獲取最新版本
   - 再進行編輯和推送

3. **遇到合併衝突**
   - Working Copy / MGit 會提示
   - 選擇保留新的版本或自動合併
   - 必要時手動編輯衝突標記

---

## 🚀 第4部分：進階設置

### 自動化進階選項

#### 選項 1：GitHub Actions 自動推送（雲端自動化）
如果筆電不總是開著，可以用 GitHub Actions 定期拉取更新

**在 GitHub 倉庫中設置：**
1. 建立 `.github/workflows/sync.yml`
2. 配置定時任務（如每小時同步一次）
3. 好處：即使筆電關閉也能保持同步

#### 選項 2：使用 Dropbox / Google Drive 同步
- 將 Vault 資料夾放在雲端磁碟
- 手機和筆電都通過雲端同步
- 缺點：檔案衝突風險更高

### 敏感信息管理

**不要在 GitHub 上存放：**
- 密碼
- API Keys
- 個人隱私信息

**解決方案：**
```
# 在 .gitignore 中添加
secrets/
.env
private-notes/
```

---

## 🔍 故障排除

### 問題1：筆電同步後，手機看不到更新

**解決：**
```
手機 → Working Copy / MGit → 點擊倉庫 → "Pull" (拉取最新)
```

### 問題2：遇到 Git 衝突

**查看衝突文件：**
```powershell
cd "C:\Users\lifes\Documents\Obsidian Vault"
git status  # 顯示有衝突的文件
```

**解決衝突：**
1. 手動編輯有衝突的 .md 文件
2. 移除衝突標記 `<<<<<<`, `======`, `>>>>>>`
3. 重新提交：
```powershell
git add .
git commit -m "resolve: 解決衝突"
git push origin main
```

### 問題3：自動同步沒有運行

**檢查項目：**
```
1. 工作排程器中是否有 "ObsidianVaultSync" 任務
2. 查看日誌: .vault-sync.log
3. 確認 git 已安裝並可在 PowerShell 中使用
```

**手動測試：**
```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\lifes\Documents\Obsidian Vault\sync-vault.ps1"
```

### 問題4：GitHub 連接被拒

**檢查 GitHub 權限：**
```powershell
# 測試連接
git clone https://github.com/lifestruggle2k8-bit/pmp-notes.git test-clone
```

**如果需要重新認證：**
- Windows 認證管理器
- 更新 GitHub Personal Token（如已過期）

---

## 📊 同步狀態檢查清單

在開始使用前，確認以下項目：

- [ ] 筆電已提交並推送第一次更改到 GitHub
- [ ] `.gitignore` 已更新（排除系統文件）
- [ ] `sync-vault.ps1` 腳本已複製到 Vault 資料夾
- [ ] Windows 定時任務已創建（ObsidianVaultSync）
- [ ] 手機已克隆倉庫（Working Copy / MGit）
- [ ] 手機 Obsidian 已指向克隆位置
- [ ] 測試一次完整同步流程
- [ ] 查看 `.vault-sync.log` 日誌確認正常運行

---

## 💡 最佳實踐

### ✅ 建議做法
- ✓ 定期檢查 `.vault-sync.log` 確認同步
- ✓ 在多設備編輯前先同步一次
- ✓ 編輯後留給自動同步時間（5分鐘）
- ✓ 定期 Pull 手機端最新更新

### ❌ 避免做法
- ✗ 同時在筆電和手機編輯同一文件
- ✗ 關閉定時任務而忘記手動同步
- ✗ 存放敏感信息到公開倉庫
- ✗ 直接在 GitHub 網頁修改（容易造成衝突）

---

## 📞 快速命令參考

```powershell
# 進入 Vault 資料夾
cd "C:\Users\lifes\Documents\Obsidian Vault"

# 檢查 git 狀態
git status

# 查看同步日誌
Get-Content .vault-sync.log -Tail 20

# 手動同步
git add -A
git commit -m "manual: 手動同步"
git push origin main

# 從 GitHub 拉取最新（手機更新後）
git pull origin main

# 查看同步歷史
git log --oneline -10

# 查看近期更改
git diff HEAD~1
```

---

## 🎯 總結

你現在有：

✅ **筆電端：** 自動同步（每5分鐘）
✅ **手機端：** Working Copy (iOS) / MGit (Android) 隨時手動同步
✅ **雲端備份：** GitHub 倉庫作為中央同步點
✅ **衝突管理：** .gitignore 防止系統文件衝突

**立即開始：**
1. 確認 Windows 定時任務已運行
2. 在手機上設置 Working Copy / MGit
3. 開始編輯筆記 - 自動同步將處理其餘部分！

祝同步順利！🚀
