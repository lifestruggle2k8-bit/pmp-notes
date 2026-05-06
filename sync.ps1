cd "C:\Users\lifes\Documents\Obsidian Vault"
git add -A
$staged = git diff --cached --name-only
if ($staged) {
    git commit -m "auto: 自動同步筆記"
    git push origin main
}
