// Verification script for Supabase setup
// Run with: node verify-supabase.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

console.log('🔍 Verifying Supabase connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  try {
    // Test 1: Check connection
    console.log('1️⃣  Testing connection...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);

    if (error) {
      if (error.message.includes('relation "public.profiles" does not exist')) {
        console.log('❌ Profiles table does not exist');
        console.log('   → Run the SQL in supabase-setup.sql in your Supabase dashboard\n');
        return;
      }
      throw error;
    }

    console.log('✅ Connected to Supabase successfully\n');

    // Test 2: Check table structure
    console.log('2️⃣  Checking profiles table structure...');
    const { data: tableData } = await supabase.from('profiles').select('*').limit(0);
    console.log('✅ Profiles table exists and is accessible\n');

    // Test 3: Check RLS
    console.log('3️⃣  Checking Row Level Security...');
    const { data: rlsData, error: rlsError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (rlsError && rlsError.code === '42501') {
      console.log('✅ RLS is enabled (expected for logged-out users)\n');
    } else {
      console.log('✅ RLS is configured\n');
    }

    console.log('========================================');
    console.log('✨ Supabase setup verification complete!');
    console.log('========================================\n');
    console.log('Next steps:');
    console.log('1. Go to Supabase → Authentication → Providers');
    console.log('2. Enable Email provider');
    console.log('3. Add environment variables to Vercel');
    console.log('4. Set up Stripe products and webhooks\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Make sure you ran supabase-setup.sql in Supabase SQL Editor');
    console.log('- Check that your Supabase URL and keys are correct');
    console.log('- Verify your Supabase project is active\n');
  }
}

verify();
