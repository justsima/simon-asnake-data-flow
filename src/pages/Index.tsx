
import { useEffect } from 'react';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WaveDotBackground from '@/components/WaveDotBackground';

const sections = [
  { id: 'hero', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'certifications', title: 'Certifications' },
  { id: 'contact', title: 'Contact' },
];

const Index = () => {
  useEffect(() => {
    document.title = 'Simon Asnake | Data Scientist & Power BI Expert';
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-black', 'text-white');
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      console.log('Reduced motion preference detected. Simplified animations will be used.');
      document.body.classList.add('reduced-motion');
    }
    
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-black', 'text-white', 'reduced-motion');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#08080D]">
      <WaveDotBackground />
      <Navigation sections={sections} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
