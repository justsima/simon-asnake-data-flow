// Data service for managing portfolio content with Supabase integration
import { supabase } from '@/lib/supabase';
import { Experience } from '@/components/experience/types';

export interface Project {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  image: string;
  category: 'Power BI' | 'Machine Learning' | 'Data Engineering';
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Certification {
  title: string;
  organization: string;
  date: string;
  skills: string[];
  image?: string;
  isEducation?: boolean;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  bio: string;
  resume: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  aboutDescription: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document';
  size: string;
  uploadDate: string;
}

// Fallback data for when Supabase is not configured
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Executive Sales Intelligence Dashboard",
    description: "Interactive Power BI dashboard providing executive insights on sales trends, store performance, and inventory management across 200+ retail locations.",
    challenge: "Fortune 500 retailer needed real-time sales performance visibility across 200+ stores",
    solution: "Developed interactive Power BI dashboard integrating multiple data sources with advanced DAX measures to provide executive insights on sales trends, store performance, and inventory management.",
    impact: "32% reduction in reporting time, $1.2M identified in revenue opportunities, and improved decision-making across regional management teams.",
    technologies: ["Power BI", "SQL", "DAX", "Azure Data Factory"],
    image: "/placeholder.svg",
    category: "Power BI",
    liveUrl: "https://app.powerbi.com/links/sample-executive-dashboard",
  },
  {
    id: 2,
    title: "Customer Churn Prediction Model",
    description: "Machine learning model predicting customer churn 60 days in advance using random forest algorithm with 24% reduction in churn rate.",
    challenge: "Financial services company experiencing unexpected customer attrition",
    solution: "Developed ML model predicting likely churners 60 days in advance using random forest algorithm with feature engineering on transactional and demographic data points.",
    impact: "24% reduction in churn rate, $850K annual savings in retention costs, and improved customer satisfaction metrics across targeted segments.",
    technologies: ["Python", "scikit-learn", "Azure ML", "SQL"],
    image: "/placeholder.svg",
    category: "Machine Learning",
    videoUrl: "https://www.example.com/demos/churn-prediction",
  },
  {
    id: 3,
    title: "Healthcare Claims ETL Pipeline",
    description: "Automated ETL pipeline with data quality frameworks integrating 12 healthcare systems, reducing claim processing time from 72 hours to 4 hours.",
    challenge: "Healthcare provider struggling with data integration from 12 systems",
    solution: "Designed automated ETL pipeline with validation rules and data quality frameworks to standardize inputs from disparate healthcare systems.",
    impact: "95% reduction in manual data processing, 99.8% data accuracy achievement, and reduced claim processing time from 72 hours to 4 hours.",
    technologies: ["Azure Data Factory", "SQL", "Python", "Power BI"],
    image: "/placeholder.svg",
    category: "Data Engineering",
    videoUrl: "https://www.example.com/demos/healthcare-pipeline",
  },
];

class DataService {
  private isSupabaseConfigured(): boolean {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return !!(url && key && url !== 'your-supabase-project-url' && key !== 'your-supabase-anon-key');
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Using fallback data. Please configure Supabase to use the database.');
      return fallbackProjects;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        challenge: project.challenge,
        solution: project.solution,
        impact: project.impact,
        technologies: project.technologies,
        image: project.image,
        category: project.category,
        videoUrl: project.video_url,
        liveUrl: project.live_url,
        githubUrl: project.github_url,
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      console.warn('Falling back to local data');
      return fallbackProjects;
    }
  }

  async saveProjects(projects: Project[]): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return;
    }
    // This method is kept for compatibility but individual project operations are preferred
    console.warn('saveProjects is deprecated. Use saveProject for individual operations.');
  }

  async saveProject(project: Project): Promise<Project> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return project;
    }

    try {
      const projectData = {
        title: project.title,
        description: project.description,
        challenge: project.challenge,
        solution: project.solution,
        impact: project.impact,
        technologies: project.technologies,
        image: project.image,
        category: project.category,
        video_url: project.videoUrl || null,
        live_url: project.liveUrl || null,
        github_url: project.githubUrl || null,
      };

      let result;
      if (project.id) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      return {
        id: result.id,
        title: result.title,
        description: result.description,
        challenge: result.challenge,
        solution: result.solution,
        impact: result.impact,
        technologies: result.technologies,
        image: result.image,
        category: result.category,
        videoUrl: result.video_url,
        liveUrl: result.live_url,
        githubUrl: result.github_url,
      };
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }

  async deleteProject(id: number): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Certifications
  async getCertifications(): Promise<Certification[]> {
    if (!this.isSupabaseConfigured()) {
      // Return fallback data from local JSON
      try {
        const response = await fetch('/src/data/certifications.json');
        const data = await response.json();
        return data;
      } catch {
        return [];
      }
    }

    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      return data.map(cert => ({
        title: cert.title,
        organization: cert.organization,
        date: cert.date,
        skills: cert.skills,
        image: cert.image,
        isEducation: cert.is_education,
      }));
    } catch (error) {
      console.error('Error fetching certifications:', error);
      return [];
    }
  }

  async saveCertifications(certifications: Certification[]): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return;
    }

    try {
      // Clear existing certifications and insert new ones
      const { error: deleteError } = await supabase
        .from('certifications')
        .delete()
        .neq('id', 0); // Delete all

      if (deleteError) throw deleteError;

      if (certifications.length > 0) {
        const certData = certifications.map(cert => ({
          title: cert.title,
          organization: cert.organization,
          date: cert.date,
          skills: cert.skills,
          image: cert.image || null,
          is_education: cert.isEducation || false,
        }));

        const { error: insertError } = await supabase
          .from('certifications')
          .insert(certData);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving certifications:', error);
      throw error;
    }
  }

  // Skills
  async getSkills(): Promise<SkillCategory[]> {
    if (!this.isSupabaseConfigured()) {
      // Return fallback data from local JSON
      try {
        const response = await fetch('/src/data/skills.json');
        const data = await response.json();
        return data;
      } catch {
        return [];
      }
    }

    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(category => ({
        title: category.title,
        icon: category.icon,
        skills: category.skills as Skill[],
      }));
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  }

  async saveSkills(skills: SkillCategory[]): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return;
    }

    try {
      // Clear existing skills and insert new ones
      const { error: deleteError } = await supabase
        .from('skill_categories')
        .delete()
        .neq('id', 0); // Delete all

      if (deleteError) throw deleteError;

      if (skills.length > 0) {
        const skillData = skills.map(category => ({
          title: category.title,
          icon: category.icon,
          skills: category.skills,
        }));

        const { error: insertError } = await supabase
          .from('skill_categories')
          .insert(skillData);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving skills:', error);
      throw error;
    }
  }

  // Experience
  async getExperience(): Promise<Experience[]> {
    if (!this.isSupabaseConfigured()) {
      // Return existing experience data
      const { experiences } = await import('@/components/experience/experienceData');
      return experiences;
    }

    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(exp => ({
        title: exp.title,
        company: exp.company,
        period: exp.period,
        location: exp.location,
        description: exp.description,
        responsibilities: exp.responsibilities,
        technologies: exp.technologies,
        achievements: exp.achievements,
      }));
    } catch (error) {
      console.error('Error fetching experience:', error);
      const { experiences } = await import('@/components/experience/experienceData');
      return experiences;
    }
  }

  async saveExperience(experience: Experience[]): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return;
    }

    try {
      // Clear existing experiences and insert new ones
      const { error: deleteError } = await supabase
        .from('experiences')
        .delete()
        .neq('id', 0); // Delete all

      if (deleteError) throw deleteError;

      if (experience.length > 0) {
        const expData = experience.map(exp => ({
          title: exp.title,
          company: exp.company,
          period: exp.period,
          location: exp.location || null,
          description: exp.description,
          responsibilities: exp.responsibilities,
          technologies: exp.technologies,
          achievements: exp.achievements || [],
        }));

        const { error: insertError } = await supabase
          .from('experiences')
          .insert(expData);

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      throw error;
    }
  }

  // Personal Info
  async getPersonalInfo(): Promise<PersonalInfo> {
    if (!this.isSupabaseConfigured()) {
      // Return fallback data from local JSON
      try {
        const response = await fetch('/src/data/personal.json');
        const data = await response.json();
        return {
          name: data.name,
          title: data.title,
          email: data.email,
          phone: data.phone,
          location: data.location,
          profileImage: data.profileImage,
          bio: data.bio,
          resume: data.resume,
          social: data.social,
          aboutDescription: data.aboutDescription,
        };
      } catch {
        return {
          name: "Simon Asnake",
          title: "Data Scientist & Power BI Expert",
          email: "simon.asnake@example.com",
          phone: "+251 911 123 456",
          location: "Addis Ababa, Ethiopia",
          profileImage: "/placeholder.svg",
          bio: "Passionate data scientist specializing in machine learning, business intelligence, and data-driven solutions.",
          resume: "/simon-asnake-resume.pdf",
          social: {
            linkedin: "https://linkedin.com/in/simon-asnake",
            github: "https://github.com/simon-asnake",
            twitter: "https://twitter.com/simon_asnake"
          },
          aboutDescription: "I am a data scientist with extensive experience in developing machine learning models, creating interactive dashboards, and driving data-driven decision making across various industries."
        };
      }
    }

    try {
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;

      return {
        name: data.name,
        title: data.title,
        email: data.email,
        phone: data.phone,
        location: data.location,
        profileImage: data.profile_image,
        bio: data.bio,
        resume: data.resume,
        social: data.social as PersonalInfo['social'],
        aboutDescription: data.about_description,
      };
    } catch (error) {
      console.error('Error fetching personal info:', error);
      throw error;
    }
  }

  async savePersonalInfo(personal: PersonalInfo): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Changes will not be persisted.');
      return;
    }

    try {
      const personalData = {
        name: personal.name,
        title: personal.title,
        email: personal.email,
        phone: personal.phone,
        location: personal.location,
        profile_image: personal.profileImage,
        bio: personal.bio,
        resume: personal.resume,
        social: personal.social,
        about_description: personal.aboutDescription,
      };

      // Check if personal info exists
      const { data: existing } = await supabase
        .from('personal_info')
        .select('id')
        .limit(1)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('personal_info')
          .update(personalData)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('personal_info')
          .insert(personalData);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving personal info:', error);
      throw error;
    }
  }

  // Media Management
  async getMedia(): Promise<MediaFile[]> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Media management requires database setup.');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(media => ({
        id: media.id,
        name: media.name,
        url: media.url,
        type: media.type,
        size: media.size,
        uploadDate: media.upload_date,
      }));
    } catch (error) {
      console.error('Error fetching media:', error);
      return [];
    }
  }

  async uploadMedia(file: File): Promise<string> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Media upload requires database setup.');
      throw new Error('Supabase not configured');
    }

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `portfolio-media/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Save media record to database
      const mediaData = {
        name: file.name,
        url: publicUrl,
        type: file.type.startsWith('image/') ? 'image' as const : 'document' as const,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        upload_date: new Date().toISOString().split('T')[0],
      };

      const { error: dbError } = await supabase
        .from('media')
        .insert(mediaData);

      if (dbError) throw dbError;

      return publicUrl;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  }

  async deleteMedia(id: string): Promise<void> {
    if (!this.isSupabaseConfigured()) {
      console.warn('Supabase not configured. Media management requires database setup.');
      return;
    }

    try {
      // Get media info first
      const { data: media, error: fetchError } = await supabase
        .from('media')
        .select('url')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Extract file path from URL
      const url = new URL(media.url);
      const filePath = url.pathname.split('/').slice(-2).join('/'); // Get last two parts

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('portfolio-media')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  }
}

export const dataService = new DataService();