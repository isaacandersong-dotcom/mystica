# Vercel Environment Variables Setup

Go to **Vercel Dashboard** → **mystica project** → **Settings** → **Environment Variables**

Add all of these variables (click "Add" for each one):

---

## Supabase Variables

### NEXT_PUBLIC_SUPABASE_URL
```
https://lcjmzuikzgrtghcecoxw.supabase.co
```

### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
[Copy from Supabase Dashboard → Settings → API]
```

### SUPABASE_SERVICE_ROLE_KEY
```
[Copy from Supabase Dashboard → Settings → API]
```

---

## Stripe Variables

### STRIPE_SECRET_KEY
```
sk_test_... [Copy from Stripe Dashboard → Developers → API keys]
```

### NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```
pk_test_... [Copy from Stripe Dashboard → Developers → API keys]
```

### STRIPE_MONTHLY_PRICE_ID
```
price_... [From your Monthly product in Stripe Dashboard]
```

### STRIPE_YEARLY_PRICE_ID
```
price_... [From your Yearly product in Stripe Dashboard]
```

### STRIPE_WEBHOOK_SECRET
```
whsec_... [Get this AFTER creating the webhook - see STRIPE-WEBHOOK-SETUP.md]
```

---

## Optional: OpenAI (for Enhanced Chat)

### OPENAI_API_KEY
```
sk-... [Your OpenAI API key if you have one]
```
🔹 Without this, chat uses fallback keyword-based responses
🔹 With this, chat uses GPT-4o-mini for intelligent responses

---

## After Adding All Variables

1. Click **Save** for each variable
2. Vercel will automatically **redeploy** your site
3. Wait 1-2 minutes for deployment to complete
4. Your site will be fully functional!

---

## Testing Checklist

Once deployed, test:

✅ **Sign Up** - Create account at /signup
✅ **Profile** - Fill in birth details at /profile
✅ **Dashboard** - See personalized insights at /dashboard
✅ **Numerology** - Calculate numbers at /numerology
✅ **Astrology** - Get zodiac info at /astrology
✅ **Chat** - Ask spiritual questions at /chat
✅ **Payments** - Try subscribing (use test card: 4242 4242 4242 4242)

---

## Security Note

🔒 All these variables are encrypted by Vercel
🔒 Never commit `.env.local` to git (it's in .gitignore)
🔒 Service role key should only be used server-side (✅ done correctly)

---

## Quick Reference: Your Actual Values

⚠️ **For your reference only - don't share these publicly!**

See your local `.env.local` file for the actual values to copy/paste into Vercel.
The file is git-ignored and contains all your real keys.
