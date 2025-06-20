/*
  # Portfolio Database Schema - Safe Migration

  This migration safely creates or updates the portfolio database schema,
  handling cases where some objects may already exist.

  1. New Tables (with IF NOT EXISTS)
    - `projects` - Portfolio projects with technologies, links, and details
    - `certifications` - Education and professional certifications  
    - `experiences` - Work experience with responsibilities and achievements
    - `skill_categories` - Organized skills with proficiency percentages
    - `personal_info` - Personal details, bio, and social links
    - `media` - Uploaded files with metadata

  2. Security (safe policy creation)
    - Enable RLS on all tables
    - Drop existing policies if they exist
    - Create new policies for public read access (portfolio display)
    - Create new policies for authenticated write access (admin management)

  3. Features
    - Auto-updating timestamps
    - UUID generation for media files
    - JSON support for complex data structures
    - Array support for technologies and skills
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  impact TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL DEFAULT '/placeholder.svg',
  category TEXT NOT NULL CHECK (category IN ('Power BI', 'Machine Learning', 'Data Engineering')),
  video_url TEXT,
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  date TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  image TEXT,
  is_education BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  achievements TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create skill_categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  skills JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create personal_info table
CREATE TABLE IF NOT EXISTS personal_info (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  profile_image TEXT NOT NULL DEFAULT '/placeholder.svg',
  bio TEXT NOT NULL,
  resume TEXT NOT NULL,
  social JSONB NOT NULL DEFAULT '{"linkedin": "", "github": "", "twitter": ""}',
  about_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'document')),
  size TEXT NOT NULL,
  upload_date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access on projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access on certifications" ON certifications;
DROP POLICY IF EXISTS "Allow public read access on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read access on skill_categories" ON skill_categories;
DROP POLICY IF EXISTS "Allow public read access on personal_info" ON personal_info;
DROP POLICY IF EXISTS "Allow public read access on media" ON media;

DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to manage certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated users to manage experiences" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated users to manage skill_categories" ON skill_categories;
DROP POLICY IF EXISTS "Allow authenticated users to manage personal_info" ON personal_info;
DROP POLICY IF EXISTS "Allow authenticated users to manage media" ON media;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Allow public read access on projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access on certifications"
  ON certifications
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access on experiences"
  ON experiences
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access on skill_categories"
  ON skill_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access on personal_info"
  ON personal_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access on media"
  ON media
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for authenticated write access (admin management)
CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage certifications"
  ON certifications
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage experiences"
  ON experiences
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage skill_categories"
  ON skill_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage personal_info"
  ON personal_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage media"
  ON media
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function (safe to run multiple times)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist (to avoid conflicts)
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_certifications_updated_at ON certifications;
DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;
DROP TRIGGER IF EXISTS update_skill_categories_updated_at ON skill_categories;
DROP TRIGGER IF EXISTS update_personal_info_updated_at ON personal_info;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_categories_updated_at
  BEFORE UPDATE ON skill_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personal_info_updated_at
  BEFORE UPDATE ON personal_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();