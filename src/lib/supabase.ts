import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for better TypeScript support
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number;
          title: string;
          description: string;
          challenge: string;
          solution: string;
          impact: string;
          technologies: string[];
          image: string;
          category: 'Power BI' | 'Machine Learning' | 'Data Engineering';
          video_url: string | null;
          live_url: string | null;
          github_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          challenge: string;
          solution: string;
          impact: string;
          technologies: string[];
          image: string;
          category: 'Power BI' | 'Machine Learning' | 'Data Engineering';
          video_url?: string | null;
          live_url?: string | null;
          github_url?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          challenge?: string;
          solution?: string;
          impact?: string;
          technologies?: string[];
          image?: string;
          category?: 'Power BI' | 'Machine Learning' | 'Data Engineering';
          video_url?: string | null;
          live_url?: string | null;
          github_url?: string | null;
        };
      };
      certifications: {
        Row: {
          id: number;
          title: string;
          organization: string;
          date: string;
          skills: string[];
          image: string | null;
          is_education: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          organization: string;
          date: string;
          skills: string[];
          image?: string | null;
          is_education?: boolean;
        };
        Update: {
          id?: number;
          title?: string;
          organization?: string;
          date?: string;
          skills?: string[];
          image?: string | null;
          is_education?: boolean;
        };
      };
      experiences: {
        Row: {
          id: number;
          title: string;
          company: string;
          period: string;
          location: string | null;
          description: string;
          responsibilities: string[];
          technologies: string[];
          achievements: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          company: string;
          period: string;
          location?: string | null;
          description: string;
          responsibilities: string[];
          technologies: string[];
          achievements: string[];
        };
        Update: {
          id?: number;
          title?: string;
          company?: string;
          period?: string;
          location?: string | null;
          description?: string;
          responsibilities?: string[];
          technologies?: string[];
          achievements?: string[];
        };
      };
      skill_categories: {
        Row: {
          id: number;
          title: string;
          icon: string;
          skills: { name: string; percentage: number }[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          icon: string;
          skills: { name: string; percentage: number }[];
        };
        Update: {
          id?: number;
          title?: string;
          icon?: string;
          skills?: { name: string; percentage: number }[];
        };
      };
      personal_info: {
        Row: {
          id: number;
          name: string;
          title: string;
          email: string;
          phone: string;
          location: string;
          profile_image: string;
          bio: string;
          resume: string;
          social: {
            linkedin: string;
            github: string;
            twitter: string;
          };
          about_description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          title: string;
          email: string;
          phone: string;
          location: string;
          profile_image: string;
          bio: string;
          resume: string;
          social: {
            linkedin: string;
            github: string;
            twitter: string;
          };
          about_description: string;
        };
        Update: {
          id?: number;
          name?: string;
          title?: string;
          email?: string;
          phone?: string;
          location?: string;
          profile_image?: string;
          bio?: string;
          resume?: string;
          social?: {
            linkedin: string;
            github: string;
            twitter: string;
          };
          about_description?: string;
        };
      };
      media: {
        Row: {
          id: string;
          name: string;
          url: string;
          type: 'image' | 'document';
          size: string;
          upload_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          url: string;
          type: 'image' | 'document';
          size: string;
          upload_date: string;
        };
        Update: {
          id?: string;
          name?: string;
          url?: string;
          type?: 'image' | 'document';
          size?: string;
          upload_date?: string;
        };
      };
    };
  };
}