# Backend CORS Configuration for Cross-Domain Cookies

## Issue
Frontend (flowtim.com) → Backend API (api.flowtim.com) cross-domain cookie authentication is failing.

## Required Backend Changes

### 1. CORS Configuration
```javascript
// In your Express.js backend
const corsOptions = {
  origin: [
    'https://flowtim.com',
    'https://www.flowtim.com',
    'http://localhost:3000', // for development
    'http://localhost:5173', // for Vite development
  ],
  credentials: true, // ✅ CRITICAL: Enable credentials
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
};

app.use(cors(corsOptions));
```

### 2. Session Cookie Configuration
```javascript
// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ✅ CRITICAL for cross-domain
    domain: process.env.NODE_ENV === 'production' ? '.flowtim.com' : undefined, // ✅ CRITICAL: Share cookies across subdomains
  },
}));
```

### 3. Environment Variables
```bash
# In your backend .env
SESSION_SECRET=your-super-secure-session-secret
CORS_ORIGIN=https://flowtim.com,https://www.flowtim.com
COOKIE_DOMAIN=.flowtim.com
```

### 4. Express Trust Proxy (if behind reverse proxy)
```javascript
// If you're using nginx or similar reverse proxy
app.set('trust proxy', 1);
```

## Verification Steps

1. **Check Response Headers**: Your API should include:
   ```
   Access-Control-Allow-Origin: https://flowtim.com
   Access-Control-Allow-Credentials: true
   Set-Cookie: connect.sid=...; Domain=.flowtim.com; Path=/; HttpOnly; Secure; SameSite=None
   ```

2. **Test Cookie Setting**: After login, verify cookies are set with:
   - Domain: `.flowtim.com` 
   - SameSite: `None`
   - Secure: `true` (production only)

3. **Debug Request**: Check that browser sends cookies in requests to api.flowtim.com

## Common Issues & Solutions

### Issue: "Can't set SameSite=None without Secure"
- Solution: Ensure `secure: true` in production with HTTPS

### Issue: Cookies not shared between subdomains
- Solution: Set `domain: '.flowtim.com'` (note the leading dot)

### Issue: CORS preflight failures
- Solution: Ensure OPTIONS requests are handled and return proper CORS headers

### Issue: Session not persisting
- Solution: Verify `credentials: true` in both frontend and backend CORS