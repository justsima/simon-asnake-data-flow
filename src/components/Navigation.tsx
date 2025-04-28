
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigationDelay } from '@/hooks/useNavigationDelay';

interface NavigationProps {
  sections: { id: string; title: string }[];
}

const Navigation = ({ sections }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const { delayedNavigate } = useNavigationDelay(150);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Logo animation on scroll
      if (logoRef.current) {
        if (window.scrollY > 100) {
          logoRef.current.classList.add('logo-scrolled');
        } else {
          logoRef.current.classList.remove('logo-scrolled');
        }
      }

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

  const handleNavigation = (sectionId: string) => {
    delayedNavigate(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    });
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'py-3 backdrop-blur-xl bg-black/30 border-b border-white/5 shadow-lg'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          ref={logoRef}
          href="#hero" 
          className="logo font-playfair font-semibold text-2xl text-white transition-all duration-500 hover:opacity-90"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('hero');
          }}
        >
          <div className="logo-inner">
            <span className="logo-text" style={{ letterSpacing: "1px" }}>SA</span>
          </div>
        </a>

        <div className="hidden md:flex space-x-6">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className={cn(
                'nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden',
                activeSection === section.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {section.title}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] transform scale-x-0 transition-transform duration-300 origin-left",
                  activeSection === section.id && "scale-x-100"
                )}
              />
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-xl py-4 px-4 flex flex-col space-y-4 border-t border-white/5">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className={cn(
                'px-4 py-2 text-left transition-all duration-300 rounded-lg',
                activeSection === section.id
                  ? 'text-white bg-white/5 backdrop-blur-lg'
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
