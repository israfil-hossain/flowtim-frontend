# Production Authentication Fix Guide

## The Issue
Your frontend (`flowtim.com`) can't send cookies to your backend (`api.flowtim.com`) in production, causing 401 errors on `/api/current`.

## Frontend Changes (✅ Already Applied)
- Enhanced axios interceptors with better debugging
- Added authentication debugging utilities
- Improved error handling and logging

## Backend Changes (❗ CRITICAL - You Need to Fix These)

### 1. Cookie Configuration
Your backend must set cookies with proper domain configuration:

```javascript
// In your login endpoint
res.cookie('session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'lax', // Allow cross-subdomain
  domain: '.flowtim.com', // Allow all flowtim.com subdomains
  path: '/',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
```

### 2. CORS Configuration
Your backend must allow credentials from your frontend:

```javascript
app.use(cors({
  origin: ['https://flowtim.com', 'https://www.flowtim.com'], // Your frontend URLs
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3. Environment Variables
Ensure your backend has:
```
FRONTEND_URL=https://flowtim.com
NODE_ENV=production
```

## Testing Instructions

1. **Deploy the frontend changes** (already done)
2. **Check browser console** for new debug information
3. **Look for these log messages:**
   - `🔍 Authentication Debug Information`
   - `🏥 Diagnosing cookie issues`
   - `❌ 401 Error Details`

## How to Debug

1. **Open browser dev tools**
2. **Go to Network tab**
3. **Try to access a protected route**
4. **Check the console logs** - you'll see detailed debug info
5. **Look at the `/user/current` request**:
   - Does it have a `Cookie` header?
   - What's the response status?
   - Are there any CORS errors?

## Expected Debug Output
You should see logs like:
```
🔍 Authentication Debug Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 Environment:
  API Base URL: https://api.flowtim.com/api
  Origin: https://flowtim.com
🍪 Cookies: [cookie names will be listed here]
🏥 Diagnosing cookie issues...
🔍 Domain Analysis:
  Frontend domain: flowtim.com
  API domain: api.flowtim.com
  Same root domain: true
💡 Suggestion: Cookies should work with proper domain configuration
   Backend should set cookies with domain=.flowtim.com
```

## Most Likely Solutions

1. **Backend cookie domain issue** - cookies are set for wrong domain
2. **CORS misconfiguration** - backend not allowing credentials
3. **Cookie security flags** - secure flag not set properly for HTTPS

## Next Steps

1. Check your backend code for cookie and CORS settings
2. Apply the backend fixes above
3. Redeploy your backend
4. Test again and check the console logs

The enhanced debugging will tell you exactly what's wrong!