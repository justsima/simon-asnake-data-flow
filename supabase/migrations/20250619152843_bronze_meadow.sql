/*
  # Create Portfolio Management Tables

  1. New Tables
    - `projects`
      - `id` (int8, primary key)
      - `title` (text)
      - `description` (text)
      - `challenge` (text)
      - `solution` (text)
      - `impact` (text)
      - `technologies` (text[])
      - `image` (text)
      - `category` (text)
      - `video_url` (text, nullable)
      - `live_url` (text, nullable)
      - `github_url` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `certifications`
      - `id` (int8, primary key)
      - `title` (text)
      - `organization` (text)
      - `date` (text)
      - `skills` (text[])
      - `image` (text, nullable)
      - `is_education` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `experiences`
      - `id` (int8, primary key)
      - `title` (text)
      - `company` (text)
      - `period` (text)
      - `location` (text, nullable)
      - `description` (text)
      - `responsibilities` (text[])
      - `technologies` (text[])
      - `achievements` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `skill_categories`
      - `id` (int8, primary key)
      - `title` (text)
      - `icon` (text)
      - `skills` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `personal_info`
      - `id` (int8, primary key)
      - `name` (text)
      - `title` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `profile_image` (text)
      - `bio` (text)
      - `resume` (text)
      - `social` (jsonb)
      - `about_description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `media`
      - `id` (text, primary key)
      - `name` (text)
      - `url` (text)
      - `type` (text)
      - `size` (text)
      - `upload_date` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is a portfolio)
    - Add policies for authenticated write access (for admin management)
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

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

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

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