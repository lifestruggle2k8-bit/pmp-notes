# Obsidian Vault 自動同步腳本
# 用途: 定期檢查並上傳最新的筆記到 GitHub

param(
    [switch]$Watch = $false,  # 持續監視模式
    [int]$IntervalSeconds = 300  # 同步間隔（秒），預設5分鐘
)

$VaultPath = "$PSScriptRoot"
$logFile = "$VaultPath\.vault-sync.log"

function Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Output $logMessage
    Add-Content -Path $logFile -Value $logMessage -ErrorAction SilentlyContinue
}

function Sync-Vault {
    try {
        Push-Location $VaultPath

        # 檢查是否有更改
        $status = git status --porcelain
        if (-not $status) {
            Log "✓ 無新增更改"
            return
        }

        Log "📝 檢測到更改，開始同步..."
        Log "變更文件:"
        foreach ($line in $status) {
            Log "  $line"
        }

        # 添加所有變更（排除 .gitignore 中的文件）
        git add -A

        # 檢查是否有暫存更改
        $staged = git diff --cached --name-only
        if (-not $staged) {
            Log "✗ 沒有可提交的文件"
            return
        }

        # 提交更改
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $commitMsg = "auto: 自動同步筆記 [$timestamp]"
        git commit -m $commitMsg
        Log "✓ 已提交: $commitMsg"

        # 推送到遠程
        git push origin main
        Log "✓ 已推送到 GitHub (origin/main)"

    }
    catch {
        Log "✗ 同步失敗: $_"
    }
    finally {
        Pop-Location
    }
}

# 主程序
Log "════════════════════════════════════════"
Log "Obsidian Vault 自動同步 - 開始"
Log "位置: $VaultPath"
Log "════════════════════════════════════════"

if ($Watch) {
    Log "⏱️  進入監視模式，每 $IntervalSeconds 秒同步一次"
    while ($true) {
        Sync-Vault
        Start-Sleep -Seconds $IntervalSeconds
    }
}
else {
    Sync-Vault
    Log "════════════════════════════════════════"
}
