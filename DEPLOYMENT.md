# Deployment Guide - Mapa do Cuidado MVP

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests from TESTING.md checklist completed ✓
- [ ] `npm run lint` returns 0 errors ✓
- [ ] `npm run build` succeeds ✓
- [ ] No secrets or API keys in code
- [ ] Environment variables configured
- [ ] Supabase database initialized with migrations
- [ ] RLS policies verified in Supabase
- [ ] Demo data clearly marked (DemoBanner displays when in fallback mode)

## Environment Configuration

### Required Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:**
- Never commit `.env.local` to git
- Use `.env.example` template in repository if present
- Anon key is safe to expose (public), it's restricted by RLS policies
- Project URL and anon key are available in Supabase → Settings → API

### Verify Secrets Not Exposed

```bash
# Check for hardcoded credentials
git grep -i "password\|token\|key\|secret" -- '*.ts' '*.tsx' '*.js'

# Should return no results in app code
```

## Deployment to Vercel

### Option 1: From GitHub (Recommended)

1. Connect repository to Vercel account
2. Select `feature/mapa-cuidado-merco-2026` branch for deployment
3. In Vercel project settings:
   - Add environment variables from `.env.local`
   - Set Build Command: `npm run build`
   - Set Output Directory: `.next`
4. Deploy

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel --prod --env-file .env.local
```

### Option 3: Manual Deploy to Other Platforms

#### For Heroku/Railway/Render:

1. Build production bundle:
   ```bash
   npm run build
   ```

2. Start server:
   ```bash
   npm start
   ```

3. Ensure port is configurable via PORT environment variable
   (Next.js handles this automatically)

## Post-Deployment Verification

After deployment, verify in production:

1. **Home Page** (`/`) loads and displays correctly
2. **Participation Form** (`/participar`):
   - Form loads with 13 municipalities
   - Can submit responses
   - Success confirmation displays
3. **Dashboard** (`/mapa`):
   - Stats display (real or demo data)
   - Updates every 30 seconds
   - No demo banner if using real Supabase
   - Demo banner visible if Supabase unavailable
4. **Expansion Page** (`/expansao`):
   - Form loads and submits
   - Consent checkbox required
5. **Error Handling**:
   - Temporarily block network and test form submission
   - Error contingency modal should appear
   - "Tentar Novamente" button should allow retry
   - Data should be recovered from localStorage

## Database Setup

### Prerequisites

- Supabase project created
- `supabase` CLI installed (optional)

### Initialize Database

1. **Via Supabase Dashboard** (Recommended for production):
   - Go to Supabase → SQL Editor
   - Copy-paste content from `supabase/migrations/001_create_base_tables.sql`
   - Execute

2. **Via CLI** (if installed):
   ```bash
   supabase db push
   ```

### Verify Tables and RLS

Check in Supabase Dashboard:

```sql
-- List tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema='public';

-- Should return:
-- mapa_contribuicoes
-- mapa_expansao

-- Check RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('mapa_contribuicoes', 'mapa_expansao');

-- Should show rls = true for both
```

## Contingency & Fallback

### Demo Mode Activation

When Supabase is unavailable:

1. **Dashboard** (`/mapa`):
   - Shows yellow "MODO DEMONSTRAÇÃO" banner
   - Displays DEMO_STATS (247 fictional participants)
   - Displays DEMO_EXPANSION stats
   - Updates proceed normally but with demo data

2. **Participation Form** (`/participar`):
   - Shows error contingency modal
   - User can retry submission
   - Form data persisted to localStorage
   - Once recovered, data submitted to real Supabase

### Enable Demo Data

Demo data automatically activates when:
- API fetch fails with network error
- Supabase unavailable
- Cors/connection issues

No manual configuration needed. Demo data clearly marked with banner so users know they're viewing demonstration.

## Monitoring & Logs

### Vercel

- View logs: Vercel Dashboard → Project → Deployments → Details
- Monitor performance: Vercel Analytics (if enabled)
- Check function logs: Vercel Dashboard → Functions

### Supabase

- Query logs: Supabase Dashboard → Logs
- Database usage: Settings → Usage
- RLS violations: Logs (search for "policy")

### Local Debugging

```bash
# View build logs
npm run build 2>&1 | tee build.log

# View runtime logs
node -e "console.log(process.env)"

# Test API endpoints
curl -X GET https://your-deployment.vercel.app/api/contribuicoes
curl -X GET https://your-deployment.vercel.app/api/expansao-stats
```

## Rollback Procedure

If issues detected after deployment:

### Vercel Rollback
1. Vercel Dashboard → Deployments
2. Select previous successful deployment
3. Click "Promote to Production"

### Git Rollback (if needed)
```bash
git revert <commit-hash>
git push origin feature/mapa-cuidado-merco-2026
```

## Performance & Optimization

Current build size: ~400KB (Next.js default)

### Monitor:
- Vercel Analytics for Core Web Vitals
- Lighthouse scores (target: >90)
- Bundle size tracking

### Optimize if needed:
- Image optimization (already handled by Next.js)
- Font optimization (Tailwind CSS default)
- Code splitting (automatic)

## Security Best Practices

1. **Never expose secrets:**
   - NEXT_PUBLIC_* variables are exposed (by design, public keys)
   - All other environment variables are private
   - Verify `.gitignore` includes `.env.local`

2. **Supabase RLS:**
   - Policies configured in `001_create_base_tables.sql`
   - No personal data exposed in public APIs
   - Contribution data: aggregated only (city/state/count)
   - Expansion data: contact info in separate table

3. **CORS & Security Headers:**
   - Vercel automatically adds secure headers
   - Next.js handles CORS for `/api` routes
   - No third-party API calls (self-contained)

## Support & Troubleshooting

### Issue: "Cannot find module" after deploy

Solution:
```bash
npm ci  # Use exact versions from package-lock.json
npm run build
```

### Issue: Supabase connection fails

Check:
1. Environment variables set in deployment platform
2. Supabase project URL format: `https://xxxxx.supabase.co`
3. Anon key is not the service role key
4. Database not in paused state

### Issue: Form submission always fails

Check:
1. `/api/contribuicoes` endpoint returns 200 status
2. Database tables exist and RLS policies correct
3. Network logs in browser DevTools
4. Error message in browser console

## Rollout Timeline

Recommended timeline for Merco Noroeste 2026 event:

1. **T-1 week**: Deploy to staging/test environment
2. **T-3 days**: Final testing and verification
3. **T-1 day**: Deploy to production, smoke test
4. **T-day**: Monitor actively during event
5. **T+1 day**: Review stats and feedback

## Contact & Escalation

For production issues during event:

1. Check browser console for errors (F12)
2. Verify network connectivity
3. Check Vercel Dashboard status
4. Check Supabase Dashboard status
5. Review error logs in deployment platform

---

**Version:** 1.0 - CARD 8 MVP  
**Last Updated:** 2026-08-26  
**Maintainer:** SyVtek Care
