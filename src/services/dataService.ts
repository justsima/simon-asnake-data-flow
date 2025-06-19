// Data service for managing portfolio content
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

export interface Experience {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
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
  // Projects
  async getProjects(): Promise<Project[]> {
    const response = await fetch('/src/data/projects.json');
    return response.json();
  }

  async saveProjects(projects: Project[]): Promise<void> {
    // In a real app, this would save to a backend API
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }

  // Certifications
  async getCertifications(): Promise<Certification[]> {
    const response = await fetch('/src/data/certifications.json');
    return response.json();
  }

  async saveCertifications(certifications: Certification[]): Promise<void> {
    localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
  }

  // Skills
  async getSkills(): Promise<SkillCategory[]> {
    const response = await fetch('/src/data/skills.json');
    return response.json();
  }

  async saveSkills(skills: SkillCategory[]): Promise<void> {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }

  // Experience
  async getExperience(): Promise<Experience[]> {
    const { experiences } = await import('../components/experience/experienceData');
    return experiences;
  }

  async saveExperience(experience: Experience[]): Promise<void> {
    localStorage.setItem('portfolio_experience', JSON.stringify(experience));
  }

  // Personal Info
  async getPersonalInfo(): Promise<PersonalInfo> {
    const response = await fetch('/src/data/personal.json');
    return response.json();
  }

  async savePersonalInfo(personal: PersonalInfo): Promise<void> {
    localStorage.setItem('portfolio_personal', JSON.stringify(personal));
  }

  // Media upload simulation
  async uploadMedia(file: File): Promise<string> {
    // In a real app, this would upload to cloud storage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  }
}

export const dataService = new DataService();