# Stripe Webhook Setup Guide

## Step 1: Set Up Webhook in Stripe Dashboard

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint** (top right)
3. Enter endpoint URL:
   ```
   https://mystica-gamma.vercel.app/api/stripe/webhook
   ```

4. Click **Select events** and add these three events:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`

5. Click **Add endpoint**

6. Copy the **Signing secret** (starts with `whsec_...`)

## Step 2: Add Webhook Secret to Vercel

1. Go to **Vercel Dashboard** → **mystica** → **Settings** → **Environment Variables**
2. Add a new variable:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_...` (the secret you just copied)
3. Click **Save**

## Step 3: Test the Webhook

After deploying, you can test it:

1. In Stripe Dashboard, go to **Webhooks**
2. Click on your webhook endpoint
3. Click **Send test webhook**
4. Select `checkout.session.completed`
5. Click **Send test webhook**

You should see a success response (200 OK).

## What the Webhook Does

When a customer:
- **Completes checkout** → Updates their subscription status to "active" in Supabase
- **Subscription updates** → Syncs the new status to Supabase
- **Cancels subscription** → Changes status back to "free" in Supabase

This keeps your Supabase database in sync with Stripe subscription statuses!

## Troubleshooting

If webhook fails:
- Check Vercel deployment logs
- Verify webhook secret is correct in Vercel env vars
- Make sure Supabase env vars are also set in Vercel
- Check Stripe webhook logs for detailed error messages
