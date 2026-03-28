# 🚀 Mystica Deployment Checklist

Your Mystica spiritual wellness platform is ready to deploy! Follow this checklist to get it fully live.

---

## ✅ Completed Setup

- [x] Next.js application built and tested
- [x] Supabase database configured with profiles table
- [x] Supabase connection verified
- [x] Stripe products created ($12/month, $99/year)
- [x] All code pushed to GitHub
- [x] Local `.env.local` file configured with all credentials

---

## 📋 Deployment Steps

### 1. Add Environment Variables to Vercel (5 minutes)

Go to **Vercel Dashboard** → **mystica** → **Settings** → **Environment Variables**

Copy values from your local `.env.local` file and add:

**Supabase (3 variables):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Stripe (5 variables for now):**
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_MONTHLY_PRICE_ID`
- `STRIPE_YEARLY_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET` ← Leave as placeholder for now

**Optional:**
- `OPENAI_API_KEY` (for enhanced chat)

**After adding variables:** Vercel will auto-redeploy (1-2 min)

---

### 2. Enable Email Auth in Supabase (1 minute)

Go to **Supabase Dashboard** → **Authentication** → **Providers**
- ✅ Enable **Email** provider
- (Optional for testing) Disable email confirmation: **Authentication** → **Settings** → Uncheck "Confirm email"

---

### 3. Set Up Stripe Webhook (2 minutes)

**3a. Create Webhook**
1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. URL: `https://mystica-gamma.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)

**3b. Add Webhook Secret to Vercel**
1. Back to **Vercel** → **Settings** → **Environment Variables**
2. Update `STRIPE_WEBHOOK_SECRET` with the signing secret
3. Save (triggers redeploy)

---

## 🧪 Testing (10 minutes)

Once deployed, test each feature:

### Authentication Flow
1. Go to https://mystica-gamma.vercel.app/signup
2. Create account with email/password
3. Should redirect to `/profile`
4. Fill in name, birth date, birth place
5. Save → should redirect to `/dashboard`

### Dashboard Features
6. Check that your name appears
7. Verify life path number is calculated
8. Verify zodiac sign is shown
9. Check moon phase displays
10. Check Schumann resonance displays

### Feature Pages
11. **Numerology** (`/numerology`) - Calculate your numbers
12. **Astrology** (`/astrology`) - Get zodiac details
13. **Chat** (`/chat`) - Ask a spiritual question

### Payment Flow (Use Stripe Test Mode)
14. Go to homepage, click "Subscribe Monthly"
15. Use test card: `4242 4242 4242 4242`
16. Any future expiry, any CVC
17. Complete checkout
18. Should redirect to dashboard
19. Check Supabase → profiles table → subscription_status should be "active"

---

## 🎉 Launch Checklist

Once everything works:

- [ ] Test user signup flow
- [ ] Test profile creation
- [ ] Test dashboard loads with data
- [ ] Test numerology calculator
- [ ] Test astrology finder
- [ ] Test chat interface
- [ ] Test Stripe checkout (with test card)
- [ ] Verify webhook updates Supabase
- [ ] Share with friends to test!

---

## 🔧 Optional Enhancements

### Add OpenAI for Better Chat
- Get OpenAI API key from https://platform.openai.com
- Add `OPENAI_API_KEY` to Vercel env vars
- Chat will use GPT-4o-mini for intelligent responses

### Add Custom Domain
- Vercel → Settings → Domains
- Add your custom domain
- Update Stripe webhook URL to new domain

### Go to Production (Stripe)
- Switch Stripe to Live mode
- Create live products
- Update all Stripe env vars with live keys
- Update webhook to use live endpoint

---

## 📚 Documentation

- **SETUP.md** - Full setup instructions
- **STRIPE-WEBHOOK-SETUP.md** - Webhook configuration details
- **VERCEL-ENV-VARS.md** - Environment variables reference
- **supabase-setup.sql** - Database setup SQL
- **verify-supabase.js** - Connection verification script

---

## 🆘 Troubleshooting

### "Cannot sign up"
- Check Vercel env vars are set
- Verify email auth is enabled in Supabase
- Check Vercel deployment logs

### "Profile not saving"
- Verify Supabase env vars in Vercel
- Check Supabase logs
- Ensure profiles table exists

### "Stripe checkout not working"
- Verify all Stripe env vars are correct
- Check Stripe test mode is active
- Ensure price IDs match your products

### "Webhook failing"
- Check webhook secret is correct in Vercel
- Verify webhook events are selected
- Check Stripe webhook logs for details

---

## 🎊 You're Done!

Your Mystica spiritual wellness platform is now live and fully functional!

**Live URL:** https://mystica-gamma.vercel.app

Users can:
- ✨ Sign up and create profiles
- 🔢 Calculate numerology numbers
- ⭐ Explore astrology insights
- 🌙 Track moon phases
- 📊 Monitor Schumann resonance
- 💬 Chat with spiritual guidance
- 💳 Subscribe for premium features

**Congratulations!** 🎉
