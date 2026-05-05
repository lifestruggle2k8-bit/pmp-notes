@echo off
REM 設置自動同步任務
REM 每5分鐘自動同步一次

setlocal enabledelayedexpansion

set VAULT_PATH=C:\Users\lifes\Documents\Obsidian Vault
set SCRIPT_PATH=%VAULT_PATH%\sync-vault.ps1

echo.
echo ========================================
echo Obsidian Vault 自動同步設置
echo ========================================
echo.

REM 檢查是否是管理員
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ 需要管理員權限！
    echo 請右鍵點擊此檔案，選擇"以管理員身份運行"
    pause
    exit /b 1
)

echo ✓ 已確認管理員權限

REM 刪除舊的任務（如果存在）
echo.
echo 移除舊的同步任務...
schtasks /delete /tn "ObsidianVaultSync" /f >nul 2>&1

REM 創建新的任務
echo 創建新的同步任務...
schtasks /create /tn "ObsidianVaultSync" ^
    /tr "powershell -NoProfile -ExecutionPolicy Bypass -File \"%SCRIPT_PATH%\" -Watch -IntervalSeconds 300" ^
    /sc onlogon ^
    /ru %username% ^
    /f

if %errorLevel% equ 0 (
    echo.
    echo ✓ 成功！已設置自動同步任務
    echo.
    echo 任務詳情:
    echo   • 任務名稱: ObsidianVaultSync
    echo   • 觸發方式: 使用者登入時自動啟動
    echo   • 同步頻率: 每5分鐘檢查一次
    echo   • 同步位置: %VAULT_PATH%
    echo.
    echo 如要手動測試，執行:
    echo   powershell -File "%SCRIPT_PATH%"
    echo.
    echo 查看同步日誌: %VAULT_PATH%\.vault-sync.log
) else (
    echo.
    echo ❌ 設置失敗，請檢查錯誤信息
)

echo.
pause
