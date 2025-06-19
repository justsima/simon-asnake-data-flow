const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please ensure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');

  try {
    // Read migration files
    const createTablesSQL = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/20250619153921_calm_bush.sql'),
      'utf8'
    );
    
    const seedDataSQL = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/20250619153942_peaceful_brook.sql'),
      'utf8'
    );

    console.log('📋 Creating database tables...');
    
    // Execute table creation
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: createTablesSQL
    });

    if (createError) {
      // Try alternative method - execute SQL directly
      const { error: altError } = await supabase
        .from('_migrations')
        .select('*')
        .limit(1);
      
      if (altError && altError.code === '42P01') {
        console.log('⚠️  Direct SQL execution not available. Please run migrations manually.');
        console.log('\n📝 Manual Setup Instructions:');
        console.log('1. Go to your Supabase Dashboard → SQL Editor');
        console.log('2. Copy and run the content from: supabase/migrations/20250619153921_calm_bush.sql');
        console.log('3. Then copy and run: supabase/migrations/20250619153942_peaceful_brook.sql');
        return;
      }
      
      throw createError;
    }

    console.log('✅ Database tables created successfully!');
    console.log('📊 Adding sample data...');

    // Execute data seeding
    const { error: seedError } = await supabase.rpc('exec_sql', {
      sql: seedDataSQL
    });

    if (seedError) {
      throw seedError;
    }

    console.log('✅ Sample data added successfully!');
    
    // Verify setup by checking if data exists
    console.log('🔍 Verifying setup...');
    
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('id, title')
      .limit(3);

    if (projectError) {
      throw projectError;
    }

    console.log(`✅ Found ${projects.length} projects in database`);
    
    const { data: personal, error: personalError } = await supabase
      .from('personal_info')
      .select('name')
      .limit(1);

    if (personalError) {
      throw personalError;
    }

    console.log(`✅ Personal info configured: ${personal[0]?.name || 'Not found'}`);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📱 Next steps:');
    console.log('1. Restart your development server: npm run dev');
    console.log('2. Visit your portfolio to see the changes');
    console.log('3. Go to /admin to manage your content');
    console.log('4. Upload your own photos and customize your information');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n📝 Manual Setup Required:');
    console.log('Please run the SQL migrations manually in your Supabase dashboard:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Run: supabase/migrations/20250619153921_calm_bush.sql');
    console.log('3. Run: supabase/migrations/20250619153942_peaceful_brook.sql');
  }
}

// Check if storage bucket exists and create if needed
async function setupStorage() {
  console.log('🗄️  Setting up storage...');
  
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.log('⚠️  Storage setup requires manual configuration');
      console.log('Please create a "portfolio-media" bucket in your Supabase dashboard');
      return;
    }

    const portfolioBucket = buckets.find(bucket => bucket.name === 'portfolio-media');
    
    if (!portfolioBucket) {
      const { error: createError } = await supabase.storage.createBucket('portfolio-media', {
        public: true
      });
      
      if (createError) {
        console.log('⚠️  Could not create storage bucket automatically');
        console.log('Please create a "portfolio-media" bucket manually in your Supabase dashboard');
      } else {
        console.log('✅ Storage bucket created successfully!');
      }
    } else {
      console.log('✅ Storage bucket already exists!');
    }
  } catch (error) {
    console.log('⚠️  Storage setup skipped - please configure manually if needed');
  }
}

async function main() {
  await setupDatabase();
  await setupStorage();
}

main().catch(console.error);