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

class DataService {
  // Projects
  async getProjects(): Promise<Project[]> {
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
      throw error;
    }
  }

  async saveProjects(projects: Project[]): Promise<void> {
    // This method is kept for compatibility but individual project operations are preferred
    console.warn('saveProjects is deprecated. Use saveProject for individual operations.');
  }

  async saveProject(project: Project): Promise<Project> {
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
      throw error;
    }
  }

  async saveCertifications(certifications: Certification[]): Promise<void> {
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
      throw error;
    }
  }

  async saveSkills(skills: SkillCategory[]): Promise<void> {
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
      throw error;
    }
  }

  async saveExperience(experience: Experience[]): Promise<void> {
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
      throw error;
    }
  }

  async uploadMedia(file: File): Promise<string> {
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