# Troubleshooting Guide

This guide helps you resolve common issues with the PMP Intelligent Flashcard System.

## Table of Contents

1. [Connection Issues](#connection-issues)
2. [Authentication Problems](#authentication-problems)
3. [Data Sync Issues](#data-sync-issues)
4. [Performance Problems](#performance-problems)
5. [Offline Mode Issues](#offline-mode-issues)
6. [Browser Compatibility](#browser-compatibility)
7. [Service Worker Issues](#service-worker-issues)
8. [Database Issues](#database-issues)
9. [Getting Help](#getting-help)

---

## Connection Issues

### API Connection Failed

**Problem**: "Failed to connect to API" error when opening app.

**Solutions**:

1. **Check internet connection**
   ```bash
   # Test connectivity
   ping api.pmp-flashcards.com
   ```

2. **Check API status**
   - Visit https://status.pmp-flashcards.com
   - Check if API is down for maintenance

3. **Clear browser cache**
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Develop > Empty Web Storage

4. **Try different network**
   - Switch to mobile hotspot
   - Try different WiFi network
   - Verify firewall/proxy settings

5. **Check CORS settings**
   - API should allow requests from your domain
   - Check browser console for CORS errors

### Slow Connection

**Problem**: App is very slow to load or respond.

**Solutions**:

1. **Check internet speed**
   - Use https://speedtest.net
   - Ensure minimum 1 Mbps connection

2. **Check backend status**
   ```bash
   curl https://api.pmp-flashcards.com/health
   # Should return: { "status": "ok" }
   ```

3. **Use network tab to diagnose**
   - Open DevTools (F12)
   - Go to Network tab
   - Look for slow requests
   - Identify bottleneck

4. **Enable compression**
   - Ensure GZIP is enabled on server
   - Check response headers

5. **Optimize queries**
   - Load fewer cards initially
   - Enable pagination
   - Cache responses locally

---

## Authentication Problems

### Can't Login

**Problem**: Login fails or stuck at login screen.

**Solutions**:

1. **Verify credentials**
   - Check email address is correct
   - Confirm password is correct
   - Try resetting password

2. **Clear auth tokens**
   ```javascript
   // In browser console:
   localStorage.removeItem('auth_token');
   sessionStorage.clear();
   // Refresh page
   ```

3. **Check email verification**
   - Some accounts require email confirmation
   - Check spam folder for verification email
   - Request new verification email

4. **Browser storage issues**
   - Disable browser privacy mode
   - Allow cookies for the domain
   - Check storage limits

5. **Try different browser**
   - Test in Chrome, Firefox, Safari
   - Rules out browser-specific issues

### Token Expired

**Problem**: "Unauthorized - Invalid token" error.

**Solutions**:

1. **Refresh page**
   - Often automatically re-authenticates
   - Token may be valid in new session

2. **Logout and login again**
   ```javascript
   // Clear auth
   localStorage.removeItem('auth_token');
   // Reload page
   location.reload();
   ```

3. **Check token expiration**
   - Tokens typically expire after 7 days
   - Login again to get new token

4. **Check system time**
   - Token validation uses server time
   - Sync computer clock if significantly off

---

## Data Sync Issues

### Cards Not Syncing from GitHub

**Problem**: Updated markdown files not generating new cards.

**Solutions**:

1. **Verify webhook is set up**
   - Go to GitHub repo settings
   - Check Webhooks section
   - URL should be: `https://api.pmp-flashcards.com/webhook/sync/github`
   - Secret should match server config

2. **Check webhook delivery**
   - GitHub > Settings > Webhooks
   - Click on webhook
   - Check "Recent Deliveries"
   - Look for any errors

3. **Verify file naming**
   - Files should match pattern: `UDEMY CH.* .md`
   - Example: `UDEMY CH.1 Intro.md`

4. **Check file format**
   - Use proper Markdown syntax
   - Ensure frontmatter includes chapter
   - Check for special characters

5. **Manual sync**
   ```bash
   # Trigger manual sync
   curl -X POST \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"fileName":"UDEMY CH.1 File.md","userId":"your_id"}' \
     https://api.pmp-flashcards.com/webhook/sync/manual
   ```

### Cards Updated But Stats Don't Change

**Problem**: Statistics not reflecting new cards or reviews.

**Solutions**:

1. **Refresh stats cache**
   - Go to Settings > Stats
   - Click "Refresh" button

2. **Clear local cache**
   ```javascript
   // In console:
   localStorage.removeItem('stats_cache');
   ```

3. **Wait for sync**
   - Stats may cache for 5 minutes
   - Check back in a few minutes

4. **Verify cards were created**
   - Go to Manage Cards
   - Search for recent cards
   - Confirm they exist

5. **Check API response**
   ```bash
   # Get stats directly
   curl -H "Authorization: Bearer <token>" \
     https://api.pmp-flashcards.com/api/stats
   ```

---

## Performance Problems

### App Runs Slowly

**Problem**: Slow UI interactions, lag when flipping cards.

**Solutions**:

1. **Check device resources**
   - Open Task Manager (Windows) or Activity Monitor (Mac)
   - Look for high CPU or memory usage
   - Close unnecessary apps

2. **Clear browser cache and cookies**
   - DevTools > Application > Clear site data
   - Reload page

3. **Disable extensions**
   - Try in incognito/private mode
   - Disable browser extensions one by one

4. **Reduce page complexity**
   - Go to settings
   - Disable analytics tracking
   - Disable auto-refresh

5. **Update browser**
   - Chrome/Firefox/Safari latest versions
   - Performance improvements in new versions

6. **Check network tab**
   - DevTools > Network
   - Look for slow API calls
   - Check image sizes

### High Memory Usage

**Problem**: Browser tab uses excessive memory.

**Solutions**:

1. **Clear offline cache**
   - Settings > Offline Storage > Clear Cache
   - May contain large amounts of data

2. **Limit card count**
   - Archive completed cards
   - Delete unnecessary cards
   - Keep active deck focused

3. **Reduce session duration**
   - Take breaks during review
   - Reload page after 1 hour of use

4. **Monitor memory in DevTools**
   - DevTools > Memory
   - Take heap snapshots
   - Look for memory leaks

---

## Offline Mode Issues

### Offline Mode Not Working

**Problem**: App requires internet even after enabling offline mode.

**Solutions**:

1. **Register Service Worker**
   - Settings > Offline Storage > "Enable Offline Mode"
   - Browser should display "Active" status

2. **Verify browser support**
   - Ensure using modern browser (Chrome, Firefox, Safari, Edge)
   - Service Workers require HTTPS (or localhost)

3. **Check browser permissions**
   - Browser may block service workers
   - Check settings > Privacy > Permissions

4. **Clear old service workers**
   ```javascript
   // In console:
   navigator.serviceWorker.getRegistrations()
     .then(registrations => {
       registrations.forEach(r => r.unregister());
     });
   ```

5. **Re-register service worker**
   - Reload page
   - Go to settings
   - Enable offline mode again

### Cache Full

**Problem**: Offline cache is full, can't add more cards.

**Solutions**:

1. **Clear old cache**
   - Settings > Offline Storage > Clear Cache
   - This frees up space

2. **Export and backup data**
   - Settings > Export Data
   - Save JSON file
   - Protects your progress

3. **Archive old cards**
   - Delete completed cards
   - Focus on active learning

4. **Check cache size**
   - DevTools > Application > Storage
   - See breakdown by cache

### Offline Changes Not Syncing

**Problem**: Changes made offline aren't showing after going online.

**Solutions**:

1. **Check online status**
   - Settings shows connection status
   - Verify you're actually online

2. **Manual sync**
   - Open app to any page
   - App should auto-sync after 30 seconds

3. **Check pending reviews**
   - Settings > Offline Storage
   - See pending items to sync

4. **Force refresh**
   - Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - May trigger manual sync

5. **Check server logs**
   - Backend may have issues receiving sync
   - Contact support with details

---

## Browser Compatibility

### Not Working in Specific Browser

**Problem**: App works in Chrome but not Firefox/Safari/Edge.

**Supported Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Solutions**:

1. **Update browser to latest version**
   - Each browser has different feature support
   - Older versions may lack required APIs

2. **Check console errors**
   - DevTools > Console
   - Look for error messages
   - May indicate missing feature

3. **Try another browser**
   - Helps identify browser-specific issue
   - Feature may not be supported

4. **Report incompatibility**
   - File issue on GitHub
   - Include browser version
   - Describe exact problem

---

## Service Worker Issues

### Service Worker Registration Failed

**Problem**: "Service Worker registration failed" error.

**Solutions**:

1. **Check HTTPS requirement**
   - Service Workers require HTTPS
   - Exception: localhost (development)
   - If using HTTP, upgrade to HTTPS

2. **Check browser security settings**
   - Some browsers block service workers
   - Check privacy/security settings
   - Whitelist the domain

3. **Verify service-worker.js exists**
   - Should be in `public/` folder
   - Accessible at `https://domain.com/service-worker.js`

4. **Clear old workers**
   ```javascript
   navigator.serviceWorker.getRegistrations()
     .then(regs => regs.forEach(r => r.unregister()));
   ```

5. **Check DevTools**
   - Application > Service Workers
   - See registration status
   - Check for errors

### Service Worker Stuck in Updating

**Problem**: Service Worker shows "waiting to activate" forever.

**Solutions**:

1. **Skip waiting**
   ```javascript
   navigator.serviceWorker.getRegistrations()
     .then(regs => regs.forEach(r => r.waiting?.postMessage({type: 'SKIP_WAITING'})));
   ```

2. **Unregister and re-register**
   - Close all app tabs
   - Settings > Enable Offline Mode
   - Should register fresh copy

3. **Check for active tab**
   - Close all other tabs of the app
   - Service Worker can't update while active
   - Then refresh

---

## Database Issues

### Database Connection Error (Backend Only)

**Problem**: Backend showing "Database connection failed".

**For Developers**:

```bash
# Test database connection
psql $DATABASE_URL

# Check migrations
npx prisma migrate status

# Apply pending migrations
npx prisma migrate deploy

# Check connection string
echo $DATABASE_URL
```

### Data Inconsistency

**Problem**: Stats don't match card count, data seems inconsistent.

**Solutions**:

1. **Recalculate stats** (contact support)
2. **Check for duplicate cards**
3. **Verify data integrity**

---

## Getting Help

### Where to Find Help

1. **Documentation**
   - [User Guide](./USER_GUIDE.md)
   - [Developer Guide](./DEVELOPER.md)
   - [API Documentation](./API_DOCUMENTATION.md)

2. **Community**
   - GitHub Discussions
   - Stack Overflow (tag: pmp-flashcards)

3. **Support**
   - Email: support@pmp-flashcards.com
   - GitHub Issues: https://github.com/pmp-flashcards/issues

### Reporting Issues

**Include in bug report**:
- Browser and version
- Operating system
- Exact steps to reproduce
- Expected vs actual behavior
- Error messages (from console)
- Screenshots/video if helpful

**Example**:
```
Title: Cards not loading in Safari on macOS

Browser: Safari 15.2 on macOS 12.2
Steps:
1. Go to review page
2. Wait 5+ seconds
3. Cards never appear

Error: "TypeError: Cannot read property 'map' of undefined"

Expected: Cards should load within 2 seconds
Actual: Cards never load, endless loading state
```

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-05  
**Still need help?** Contact support@pmp-flashcards.com
