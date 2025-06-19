export interface Project {
  id?: number; // Make id optional for new projects
  title: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  image: string;
  category: 'Power BI' | 'Machine Learning' | 'Data Engineering';
  videoUrl?: string; // Optional video URL for project demo
  liveUrl?: string; // Optional URL for live Power BI report
  githubUrl?: string; // Optional GitHub repository URL
}