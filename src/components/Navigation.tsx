
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  sections: { id: string; title: string }[];
}

const Navigation = ({ sections }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      // Find the last section that is above the viewport threshold
      let currentSection = null;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section;
          break;
        }
      }

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-portfolio-navy font-semibold text-xl"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          Simon Asnake
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'px-2 py-1 text-sm transition-colors duration-300',
                activeSection === section.id
                  ? 'text-portfolio-purple font-medium'
                  : 'text-portfolio-darkText hover:text-portfolio-purple'
              )}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-portfolio-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4 flex flex-col space-y-4 animate-fade-in">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'px-2 py-2 text-left transition-colors duration-300',
                activeSection === section.id
                  ? 'text-portfolio-purple font-medium'
                  : 'text-portfolio-darkText'
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
