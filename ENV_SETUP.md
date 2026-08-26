# Environment Variables Setup

## Before Running Locally or Deploying

### Step 1: Create `.env.local` File

In the project root directory, create a file named `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Get Your Values from Supabase

1. Log in to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings → API**
4. Copy values:
   - **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Verify Setup

Run locally:
```bash
npm run dev
```

Open http://localhost:3000 and test:
- [ ] Home page loads
- [ ] /participar loads
- [ ] Form submission works (check console for any API errors)
- [ ] /mapa loads with stats
- [ ] Yellow "MODO DEMONSTRAÇÃO" banner should NOT appear

If banner appears = Supabase not connecting, check:
- Environment variables correct
- Supabase project is NOT paused
- Network can reach Supabase domain

## Important Notes

### NEXT_PUBLIC Variables

- `NEXT_PUBLIC_*` variables are **exposed to browser** (this is intentional)
- They're considered public (like API public keys)
- Used for Supabase anon key which is restricted by Row Level Security
- Safe to expose - database access controlled by RLS policies

### Never Expose

- Service Role Key (never put in code or browser)
- Database password
- Admin API keys
- JWT secrets

### For Each Environment

**Local Development:**
```
.env.local (gitignored, create manually)
```

**Vercel/Production:**
- Go to Vercel Project Settings
- Environment Variables section
- Add same two variables
- Redeploy to apply

## Testing Configuration

Quick test to verify working:

```bash
# From project root
curl https://your-project.supabase.co/rest/v1/mapa_contribuicoes \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key"
```

Should return:
- `[]` if table exists (empty array)
- `401` error if key wrong
- Connection error if Supabase paused

## Troubleshooting

### "Database connection failed"
- [ ] `.env.local` file exists
- [ ] Values copied exactly (no spaces before/after)
- [ ] Supabase project not paused (check dashboard)
- [ ] Network can reach Supabase (test in browser dev console)

### "Cannot read properties of undefined"
- [ ] `NEXT_PUBLIC_SUPABASE_URL` needs `https://` prefix
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` copied completely

### Form submits but data doesn't appear
- [ ] RLS policies might be blocking writes
- [ ] Check Supabase logs for policy violations
- [ ] Anon key should have INSERT permission via RLS
- [ ] See `supabase/migrations/001_create_base_tables.sql` for policies

### Local works but production shows "MODO DEMONSTRAÇÃO"
- [ ] Environment variables NOT set in deployment platform
- [ ] Verify in Vercel/Railway/etc settings
- [ ] Redeploy after adding environment variables

## Security Checklist

Before sharing repository or deploying:

- [ ] `.env.local` is in `.gitignore` (never committed)
- [ ] No credentials in code files
- [ ] No API keys in commits (check git log)
- [ ] `.env.local` file is local-only

## For CI/CD Pipelines

If using GitHub Actions or similar:

1. Add secrets to repository settings:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

2. Create `.env.local` in workflow:
   ```yaml
   - name: Setup environment
     run: |
       echo "NEXT_PUBLIC_SUPABASE_URL=${{ secrets.SUPABASE_URL }}" >> .env.local
       echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=${{ secrets.SUPABASE_ANON_KEY }}" >> .env.local
   ```

3. Then build normally:
   ```yaml
   - run: npm run build
   ```

---

**Version:** 1.0  
**Last Updated:** 2026-08-26
