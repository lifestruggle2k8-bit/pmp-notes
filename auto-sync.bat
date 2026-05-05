@echo off
cd /d "C:\Users\lifes\Documents\Obsidian Vault"
powershell -NoProfile -ExecutionPolicy Bypass -Command "git add -A; if ((git diff --cached --name-only) -ne $null) { git commit -m 'auto: ??????'; git push origin main }"
