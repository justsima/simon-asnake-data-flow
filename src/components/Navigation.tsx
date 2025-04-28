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
      setIsScrolled(window.scrollY > 10);

      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

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

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'py-4 backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-lg'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#hero" 
          className="font-montserrat font-semibold text-xl text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          SA
        </a>

        <div className="hidden md:flex space-x-8">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 relative',
                activeSection === section.id
                  ? 'text-white bg-white/5 backdrop-blur-lg'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {section.title}
              {activeSection === section.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] transform scale-x-100 transition-transform duration-300" />
              )}
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-lg p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl py-4 px-4 flex flex-col space-y-4 border-t border-white/10">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                'px-4 py-2 text-left transition-all duration-300 rounded-lg',
                activeSection === section.id
                  ? 'text-white bg-white/10 backdrop-blur-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
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
