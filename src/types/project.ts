
export interface Project {
  id: number;
  title: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  image: string;
  category: 'Power BI' | 'Machine Learning' | 'Data Engineering';
  videoUrl?: string; // Optional video URL for project demo
  liveUrl?: string; // Optional URL for live Power BI report
}
