# 🚀 Supabase Setup Instructions

Your portfolio is ready! Follow these simple steps to connect your Supabase database:

## Step 1: Run Database Migrations

1. **Go to your Supabase Dashboard**
   - Open [supabase.com](https://supabase.com)
   - Navigate to your project

2. **Create the Database Tables**
   - Go to **SQL Editor** in your Supabase dashboard
   - Click "New query"
   - Copy the entire content from `supabase/migrations/create_portfolio_tables.sql`
   - Paste it and click "Run"

3. **Add Sample Data**
   - Create another new query
   - Copy the entire content from `supabase/migrations/seed_initial_data.sql`
   - Paste it and click "Run"

## Step 2: Set Up Storage (Optional - for file uploads)

1. **Create Storage Bucket**
   - Go to **Storage** in your Supabase dashboard
   - Click "Create a new bucket"
   - Name it: `portfolio-media`
   - Make it **Public**
   - Click "Create bucket"

## Step 3: Verify Setup

After running the migrations:
- Refresh your portfolio application
- The errors should disappear
- Projects should load from the database
- Visit `/admin` to manage your content

## ✅ What You Get

- **Full Database Integration**: All content stored in Supabase
- **Admin Panel**: Complete content management at `/admin`
- **File Uploads**: Media management with cloud storage
- **Real-time Updates**: Changes reflect immediately
- **Secure Access**: Row-level security enabled

## 🔧 Troubleshooting

If you still see errors:
1. Check that both SQL files ran without errors
2. Verify your `.env` file has correct Supabase credentials
3. Ensure your Supabase project is active

## 🎯 Next Steps

1. Visit `/admin` to customize your portfolio
2. Upload your professional photos
3. Add your real projects and experience
4. Update your personal information

Your portfolio management system is now fully functional!