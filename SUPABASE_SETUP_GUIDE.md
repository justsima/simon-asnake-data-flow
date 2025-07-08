# 🚀 Complete Supabase Setup Guide

Your portfolio is ready! Follow these steps to connect your Supabase database:

## Step 1: Create Supabase Project

1. **Go to Supabase**
   - Visit [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign up/login (GitHub recommended)

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `simon-portfolio` (or any name)
     - **Database Password**: Create a strong password (save this!)
     - **Region**: Choose closest to your location
   - Click "Create new project"
   - Wait 2-3 minutes for setup

## Step 2: Get Your Credentials

1. **In your Supabase dashboard**:
   - Go to **Settings** → **API**
   - Copy these values:
     - **Project URL** (like: `https://abcdefgh.supabase.co`)
     - **anon public key** (long string starting with `eyJ...`)

## Step 3: Update Environment Variables

1. **Update your `.env` file**:
   ```env
   VITE_SUPABASE_URL="https://your-actual-project-id.supabase.co"
   VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```

## Step 4: Run Database Migrations

1. **Create Tables**:
   - In Supabase dashboard → **SQL Editor**
   - Click "New query"
   - Copy ALL content from `supabase/migrations/create_portfolio_tables.sql`
   - Paste and click "Run"

2. **Add Sample Data**:
   - Create another new query
   - Copy ALL content from `supabase/migrations/seed_initial_data.sql`
   - Paste and click "Run"

## Step 5: Set Up Storage (Optional)

1. **Create Storage Bucket**:
   - Go to **Storage** in Supabase dashboard
   - Click "Create a new bucket"
   - Name: `portfolio-media`
   - Make it **Public**
   - Click "Create bucket"

## Step 6: Test Your Setup

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Check your portfolio**:
   - Visit your portfolio - projects should load from database
   - Visit `/admin` - you should be able to manage content
   - Try adding/editing a project to test database connection

## ✅ What You Should See

After successful setup:
- ✅ Projects load from Supabase (not fallback data)
- ✅ Admin panel works without warnings
- ✅ Changes persist when you refresh the page
- ✅ File uploads work (if storage configured)

## 🔧 Troubleshooting

### "Missing Supabase environment variables"
- Check your `.env` file has correct values
- Restart dev server after updating `.env`

### Database connection errors
- Verify project URL and API key are correct
- Check if Supabase project is active

### Migration errors
- Run both SQL files in correct order
- Check SQL Editor for error messages
- Make sure you copied the ENTIRE file content

### Admin panel shows warnings
- Verify both migration files ran successfully
- Check browser console for errors
- Ensure environment variables are set

## 🎯 Next Steps

Once working:
1. Visit `/admin` to customize your content
2. Upload your professional photos
3. Add your real projects and experience
4. Update personal information

Your portfolio is now fully functional with cloud database!