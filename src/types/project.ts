
export interface Project {
  id: number;
  title: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  image: string;
  category: string;
  videoUrl?: string;
  imageGallery?: string[];
  reportUrl?: string;
}
