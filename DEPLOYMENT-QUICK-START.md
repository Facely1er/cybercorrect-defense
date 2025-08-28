# Quick Deployment Guide

## 🚀 Deploy in 5 Minutes

### 1. Choose Your Platform

#### Option A: Netlify (Recommended)
1. Fork/clone this repository
2. Connect to Netlify dashboard
3. Import your repository
4. Set environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```
5. Deploy!

#### Option B: Vercel
1. Fork/clone this repository
2. Connect to Vercel dashboard
3. Import your repository
4. Set environment variables (same as above)
5. Deploy!

### 2. Setup Database (Supabase)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key to environment variables
4. Run migrations from `supabase/migrations/`

### 3. Verify Deployment
```bash
# Run production check locally first
npm run production:check

# After deployment, test:
✅ Landing page loads
✅ Assessment tools work
✅ Navigation functions
✅ Mobile responsive
✅ Forms submit properly
```

## 🔧 Environment Variables

### Required
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Optional  
```env
VITE_ANALYTICS_ID=your_analytics_id
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT_SUPPORT=true
```

## 🔐 Security Features (Pre-configured)
✅ Security headers configured  
✅ XSS protection enabled  
✅ Content type validation  
✅ Frame protection  
✅ HTTPS enforcement  

## 📊 Performance Optimizations (Built-in)
✅ Code splitting optimized  
✅ Modern ES2020 build  
✅ Asset optimization  
✅ CSS code splitting  
✅ Lazy loading implemented  

---

**Total Time: ~5 minutes** (assuming Supabase account exists)

For detailed instructions, see `DEPLOYMENT.md`  
For production checklist, see `PRODUCTION-CHECKLIST.md`