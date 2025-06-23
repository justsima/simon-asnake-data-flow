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
        {/* Section Title - Moved to top for better symmetry */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            <span className="text-gradient-primary">
              About Me
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-inter"
             style={{ color: 'var(--color-text-secondary)' }}>
            Transforming data into strategic insights that drive business growth
          </p>
        </div>

        {/* Main Content Container - Removed background for cleaner look */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Circular Image and Introduction */}
            <div 
              ref={imageContainerRef}
              onMouseMove={handleImageContainerMouseMove}
              onMouseLeave={resetImageTilt}
              className="transition-all duration-700 transform translate-y-10 opacity-0 text-center lg:text-left"
              style={{ 
                transform: `perspective(1000px) rotateX(${imageTilt.x}deg) rotateY(${imageTilt.y}deg) translateY(-10px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Circular Professional Image - Fixed sizing */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="w-48 h-48 rounded-full overflow-hidden relative shadow-xl transform transition-all duration-500 hover:scale-105">
                  <div style={{
                    background: 'rgba(138, 137, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(138, 137, 255, 0.3)',
                  }} className="w-full h-full rounded-full p-1">
                    <div className="w-full h-full bg-[#302E53]/70 rounded-full flex items-center justify-center">
                      <p className="text-gray-400 text-center text-sm px-4">Professional Photo</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Introduction Text */}
              <div ref={contentRef} className="space-y-6">
                <p className="text-lg leading-relaxed transition-all duration-500 transform translate-y-10 opacity-0 text-gray-300 font-inter">
                  As a Data Scientist and Power BI Expert, I specialize in transforming complex data into strategic business insights. With extensive experience across multiple industries, I've helped organizations leverage their data for informed decision-making.
                </p>

                {/* Key Skills Icons */}
                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
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
            
            {/* Right Column - Core Focus Areas - Removed background */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#8A89FF] mb-8 transition-all duration-500 transform translate-y-10 opacity-0 font-montserrat text-center lg:text-left">
                  Core Focus Areas
                </h3>
                
                <div className="space-y-6">
                  {/* Data Visualization */}
                  <div className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0">
                    <div style={{
                      background: 'rgba(138, 137, 255, 0.1)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(138, 137, 255, 0.2)',
                    }} className="p-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-white font-montserrat text-lg mb-2 group-hover:text-[#8A89FF] transition-colors">
                            Data Visualization
                          </h4>
                          <p className="text-gray-300 font-inter leading-relaxed">
                            Creating intuitive, interactive dashboards that translate complex data into actionable insights. Specializing in Power BI, Tableau, and custom visualization libraries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Predictive Analytics */}
                  <div className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0">
                    <div style={{
                      background: 'rgba(138, 137, 255, 0.1)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(138, 137, 255, 0.2)',
                    }} className="p-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-white font-montserrat text-lg mb-2 group-hover:text-[#8A89FF] transition-colors">
                            Predictive Analytics
                          </h4>
                          <p className="text-gray-300 font-inter leading-relaxed">
                            Building machine learning models that anticipate business trends and customer behaviors. Using advanced algorithms to forecast market changes and identify opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Pipeline Development */}
                  <div className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0">
                    <div style={{
                      background: 'rgba(138, 137, 255, 0.1)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(138, 137, 255, 0.2)',
                    }} className="p-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-white font-montserrat text-lg mb-2 group-hover:text-[#8A89FF] transition-colors">
                            Data Pipeline Development
                          </h4>
                          <p className="text-gray-300 font-inter leading-relaxed">
                            Streamlining data flow from diverse sources to enable real-time analytics. Creating robust ETL processes that ensure data quality and accessibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Data Consulting */}
                  <div className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0">
                    <div style={{
                      background: 'rgba(138, 137, 255, 0.1)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(138, 137, 255, 0.2)',
                    }} className="p-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF] flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-white font-montserrat text-lg mb-2 group-hover:text-[#8A89FF] transition-colors">
                            Strategic Data Consulting
                          </h4>
                          <p className="text-gray-300 font-inter leading-relaxed">
                            Advising organizations on data strategy and governance. Helping teams implement best practices for data management and derive maximum value from their information assets.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;