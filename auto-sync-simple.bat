@echo off
cd /d "C:\Users\lifes\Documents\Obsidian Vault"
git add -A
git commit -m "auto: ??????" 2>nul
if errorlevel 0 git push origin main 2>nul
