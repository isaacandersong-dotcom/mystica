# Mystica Setup Guide

## 1. Supabase Database Setup

### Create the Profiles Table

Go to your Supabase dashboard → SQL Editor and run this:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  time_of_birth TIME,
  place_of_birth TEXT,
  gender TEXT,
  subscription_status TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user access
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Enable Email Auth

In Supabase Dashboard:
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Disable email confirmations for testing (optional): **Authentication** → **Settings** → Disable "Confirm email"

---

## 2. Vercel Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these variables:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://lcjmzuikzgrtghcecoxw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Get these from: **Supabase Dashboard** → **Settings** → **API**

### Stripe
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### OpenAI (Optional - for enhanced chat)
```
OPENAI_API_KEY=sk-...
```

---

## 3. Stripe Setup

### Create Products

1. Go to **Stripe Dashboard** → **Products**
2. Create two products:

**Product 1: Seeker Monthly**
- Name: Mystica Seeker Monthly
- Price: $12/month
- Recurring: Monthly
- Copy the **Price ID** (starts with `price_...`)

**Product 2: Mystic Yearly**
- Name: Mystica Mystic Yearly
- Price: $99/year
- Recurring: Yearly
- Copy the **Price ID**

### Set Up Webhook

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://mystica-gamma.vercel.app/api/stripe/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_...`)

---

## 4. Testing the Flow

### Test User Registration
1. Go to https://mystica-gamma.vercel.app/signup
2. Create an account with email/password
3. You should be redirected to `/profile`
4. Fill in your birth details
5. Save - you should be redirected to `/dashboard`

### Test Features
- **Dashboard**: Should show your name, life path number, zodiac sign
- **Numerology**: Calculate your core numbers
- **Astrology**: See your zodiac sign details
- **Guidance**: Chat with spiritual AI

### Test Subscriptions (Use Stripe Test Mode)
1. Click subscribe on landing page
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date, any CVC
4. Complete checkout
5. Webhook should update your subscription status in Supabase

---

## 5. Going Live

When ready for production:

1. **Supabase**:
   - Enable email confirmations
   - Set up custom SMTP (optional)
   - Configure custom domain

2. **Stripe**:
   - Switch to Live mode
   - Create live products
   - Update webhook with live endpoint
   - Update environment variables with live keys

3. **Vercel**:
   - Add custom domain
   - Update all env vars to production values
   - Redeploy

---

## Troubleshooting

### Supabase Connection Issues
- Verify URL and keys are correct
- Check if RLS policies are enabled
- Ensure profiles table exists

### Stripe Webhook Not Working
- Verify webhook secret is correct
- Check Stripe dashboard for failed webhook attempts
- Ensure webhook URL is accessible

### Chat Not Responding
- Without OpenAI key, chat uses fallback responses (keyword-based)
- Add `OPENAI_API_KEY` for AI-powered responses

---

## Support

For issues, check:
- Vercel deployment logs
- Supabase logs
- Stripe webhook logs
- Browser console for client errors
