// Simplified data service for static portfolio - no backend required
import { Experience } from '@/components/experience/types';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import certificationsData from '@/data/certifications.json';
import personalData from '@/data/personal.json';
import { experiences } from '@/components/experience/experienceData';

export interface Project {
  id?: number;
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

class DataService {
  // Projects - load from local JSON
  async getProjects(): Promise<Project[]> {
    return projectsData.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      impact: project.impact,
      technologies: project.technologies,
      image: project.image,
      category: project.category,
      videoUrl: project.videoUrl,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    }));
  }

  // Skills - load from local JSON
  async getSkills(): Promise<SkillCategory[]> {
    return skillsData;
  }

  // Certifications - load from local JSON
  async getCertifications(): Promise<Certification[]> {
    return certificationsData.map(cert => ({
      title: cert.title,
      organization: cert.organization,
      date: cert.date,
      skills: cert.skills,
      image: cert.image,
      isEducation: cert.isEducation,
    }));
  }

  // Experience - load from local data
  async getExperience(): Promise<Experience[]> {
    return experiences;
  }

  // Personal Info - load from local JSON
  async getPersonalInfo(): Promise<PersonalInfo> {
    return {
      name: personalData.name,
      title: personalData.title,
      email: personalData.email,
      phone: personalData.phone,
      location: personalData.location,
      profileImage: personalData.profileImage,
      bio: personalData.bio,
      resume: personalData.resume,
      social: personalData.social,
      aboutDescription: personalData.aboutDescription,
    };
  }
}

export const dataService = new DataService();