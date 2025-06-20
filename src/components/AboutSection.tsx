
import { useEffect, useRef, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Simplified icon component with subtle 3D effect
const Icon3D = ({ icon, title, description }: { icon: string, title: string, description: string }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconRef.current) return;
    
    const rect = iconRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduce tilt effect significantly for subtlety
    const tiltX = (y - centerY) / 25;
    const tiltY = (centerX - x) / 25;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          ref={iconRef}
          className="w-12 h-12 glass-layer-1 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{ 
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            boxShadow: '0 8px 20px -12px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="glass-layer-3">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Simplified subtle tilt effect for image container
  const [imageTilt, setImageTilt] = useState({ x: 0, y: 0 });
  
  const handleImageContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Significantly reduce tilt for subtlety
    const tiltX = (y - centerY) / 40;
    const tiltY = (centerX - x) / 40;
    
    setImageTilt({ x: tiltX, y: tiltY });
  };
  
  const resetImageTilt = () => {
    setImageTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    // Store list items in the ref array when the component mounts
    const listItems = document.querySelectorAll('.about-list-item');
    listRefs.current = Array.from(listItems).map(item => item as HTMLLIElement);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageContainerRef.current) {
              imageContainerRef.current.classList.add('opacity-100');
              imageContainerRef.current.classList.remove('translate-y-10', 'opacity-0');
            }
            
            if (contentRef.current) {
              const elements = contentRef.current.querySelectorAll('p, h2, h3');
              elements.forEach((element, index) => {
                setTimeout(() => {
                  element.classList.add('opacity-100');
                  element.classList.remove('translate-y-10', 'opacity-0');
                }, 200 * (index + 1));
              });
              
              // Animate list items with staggered delay
              listRefs.current.forEach((item, index) => {
                if (item) {
                  setTimeout(() => {
                    item.classList.add('opacity-100', 'translate-x-0');
                    item.classList.remove('opacity-0', 'translate-x-10');
                  }, 800 + (index * 150));
                }
              });
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="rounded-xl overflow-hidden" style={{
          background: 'rgba(32, 30, 67, 0.4)', // Main theme: #201E43
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(50, 48, 90, 0.6)',
        }}>
          {/* Main content container */}
          <div className="flex flex-col lg:flex-row">
            {/* Left column - Image and main text */}
            <div 
              ref={imageContainerRef}
              onMouseMove={handleImageContainerMouseMove}
              onMouseLeave={resetImageTilt}
              className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 transition-all duration-700 transform translate-y-10 opacity-0"
              style={{ 
                transform: `perspective(1000px) rotateX(${imageTilt.x}deg) rotateY(${imageTilt.y}deg) translateY(-10px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Image with simplified 3D layered glass effect - mobile optimized */}
              <div className="rounded-lg overflow-hidden relative mb-4 md:mb-6 shadow-xl transform transition-all duration-500 hover:scale-[1.01] max-w-[200px] sm:max-w-[250px] md:max-w-xs mx-auto lg:mx-0">
                <div style={{
                  background: 'rgba(40, 38, 70, 0.7)', // Second layer: lighter than main theme
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(60, 58, 100, 0.6)',
                }} className="p-1 rounded-lg">
                  <div className="bg-[#302E53]/70 rounded-lg aspect-[3/4] flex items-center justify-center">
                    <p className="text-gray-400 text-center text-xs sm:text-sm px-2 md:px-4">Professional headshot placeholder</p>
                  </div>
                </div>
              </div>
              
              {/* Main introduction text - mobile optimized */}
              <div ref={contentRef} className="space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-semibold text-white transition-all duration-500 transform translate-y-10 opacity-0 text-center lg:text-left">
                  About Me
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg transition-all duration-500 transform translate-y-10 opacity-0 text-gray-300 font-inter text-center lg:text-left">
                  As a Data Scientist and Power BI Expert, I specialize in transforming complex data into strategic business insights. With extensive experience across multiple industries, I've helped organizations leverage their data for informed decision-making.
                </p>

                <div className="flex flex-wrap gap-2 md:gap-4 pt-2 justify-center lg:justify-start">
                  <Icon3D 
                    icon="📊" 
                    title="Data Visualization" 
                    description="Creating interactive dashboards that translate complex data into actionable insights" 
                  />
                  <Icon3D 
                    icon="🧠" 
                    title="Machine Learning" 
                    description="Building predictive models that anticipate business trends and customer behaviors" 
                  />
                  <Icon3D 
                    icon="⚙️" 
                    title="ETL Pipelines" 
                    description="Streamlining data flow from diverse sources for real-time analytics" 
                  />
                </div>
              </div>
            </div>
            
            {/* Right column - Bullet points */}
            <div className="w-full lg:w-1/2 backdrop-blur-lg p-4 md:p-6 lg:p-8" style={{
              background: 'rgba(32, 30, 67, 0.3)', // Main theme with lower opacity
              backdropFilter: 'blur(10px)',
            }}>
              <h3 className="text-lg sm:text-xl font-medium text-[#8A89FF] mb-4 md:mb-6 transition-all duration-500 transform translate-y-10 opacity-0 font-montserrat text-center lg:text-left">
                Core Focus Areas
              </h3>
              
              <ul className="space-y-3 md:space-y-4 lg:space-y-6">
                <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                  <span className="w-2 h-2 mt-1.5 md:mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] mr-2 md:mr-3 flex-shrink-0"></span>
                  <div style={{
                    background: 'rgba(40, 38, 70, 0.5)', // Second layer
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(50, 48, 90, 0.6)',
                  }} className="p-3 md:p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full">
                    <p className="font-medium text-white font-montserrat text-sm md:text-base">Data Visualization</p>
                    <p className="text-gray-300 font-inter text-xs md:text-sm">Creating intuitive, interactive dashboards that translate complex data into actionable insights. Specializing in Power BI, Tableau, and custom visualization libraries.</p>
                  </div>
                </li>
                
                <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                  <span className="w-2 h-2 mt-1.5 md:mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] mr-2 md:mr-3 flex-shrink-0"></span>
                  <div style={{
                    background: 'rgba(40, 38, 70, 0.5)', // Second layer
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(50, 48, 90, 0.6)',
                  }} className="p-3 md:p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full">
                    <p className="font-medium text-white font-montserrat text-sm md:text-base">Predictive Analytics</p>
                    <p className="text-gray-300 font-inter text-xs md:text-sm">Building machine learning models that anticipate business trends and customer behaviors. Using advanced algorithms to forecast market changes and identify opportunities.</p>
                  </div>
                </li>
                
                <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                  <span className="w-2 h-2 mt-1.5 md:mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] mr-2 md:mr-3 flex-shrink-0"></span>
                  <div style={{
                    background: 'rgba(40, 38, 70, 0.5)', // Second layer
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(50, 48, 90, 0.6)',
                  }} className="p-3 md:p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full">
                    <p className="font-medium text-white font-montserrat text-sm md:text-base">Data Pipeline Development</p>
                    <p className="text-gray-300 font-inter text-xs md:text-sm">Streamlining data flow from diverse sources to enable real-time analytics. Creating robust ETL processes that ensure data quality and accessibility.</p>
                  </div>
                </li>
                
                <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                  <span className="w-2 h-2 mt-1.5 md:mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] mr-2 md:mr-3 flex-shrink-0"></span>
                  <div style={{
                    background: 'rgba(40, 38, 70, 0.5)', // Second layer
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(50, 48, 90, 0.6)',
                  }} className="p-3 md:p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full">
                    <p className="font-medium text-white font-montserrat text-sm md:text-base">Strategic Data Consulting</p>
                    <p className="text-gray-300 font-inter text-xs md:text-sm">Advising organizations on data strategy and governance. Helping teams implement best practices for data management and derive maximum value from their information assets.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
