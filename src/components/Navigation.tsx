import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  sections: { id: string; title: string }[];
}

const Navigation = ({ sections }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

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
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }, 150);
  };

  const handleHoverEnter = (id: string) => {
    setHoveredItem(id);
  };

  const handleHoverExit = () => {
    setHoveredItem(null);
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'py-3 backdrop-blur-xl border-b shadow-lg'
          : 'py-6 bg-transparent'
      )}
      style={{
        background: isScrolled ? 'rgba(8, 8, 13, 0.8)' : 'transparent',
        borderColor: isScrolled ? 'var(--color-border-primary)' : 'transparent'
      }}
    >
      <div className="mobile-container flex justify-between items-center">
        {/* Minimalistic Elegant Logo */}
        <a 
          ref={logoRef}
          href="#hero" 
          className="unique-logo group relative"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('hero');
          }}
        >
          <div className="logo-container">
            {/* Minimalistic S Letter */}
            <div className="minimalistic-s-container">
              <span className="elegant-s">S</span>
              <div className="logo-dot"></div>
              <div className="elegant-underline"></div>
            </div>
            
            {/* Brand Text */}
            <div className="brand-text">
              Simon
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className={cn(
                'nav-link px-5 py-2 rounded-lg text-sm font-medium transition-all duration-500 relative overflow-hidden',
                activeSection === section.id
                  ? 'text-white'
                  : 'hover:text-white'
              )}
              style={{ 
                color: activeSection === section.id 
                  ? 'var(--color-text-primary)' 
                  : 'var(--color-text-muted)' 
              }}
              onMouseEnter={() => handleHoverEnter(section.id)}
              onMouseLeave={handleHoverExit}
            >
              {section.title}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-500 origin-left",
                  activeSection === section.id && "scale-x-100"
                )}
                style={{ background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-primary-700))' }}
              />
              {hoveredItem === section.id && (
                <span className="absolute inset-0 bg-white/5 animate-pulse rounded-lg backdrop-blur-sm -z-10"></span>
              )}
              <span 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300" 
                style={{ 
                  background: 'var(--color-primary-500)',
                  opacity: hoveredItem === section.id ? 1 : 0 
                }} 
              />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-lg p-2 rounded-lg touch-target"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 py-4 px-4 flex flex-col space-y-4 border-t"
             style={{ 
               background: 'rgba(8, 8, 13, 0.95)',
               backdropFilter: 'blur(12px)',
               borderColor: 'var(--color-border-primary)'
             }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className={cn(
                'px-4 py-2 text-left transition-all duration-500 rounded-lg touch-target',
                activeSection === section.id
                  ? 'bg-white/5 backdrop-blur-lg'
                  : 'hover:bg-white/5'
              )}
              style={{ 
                color: activeSection === section.id 
                  ? 'var(--color-text-primary)' 
                  : 'var(--color-text-muted)' 
              }}
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