
import { useEffect, useRef } from 'react';
import ParticleBackground from './ParticleBackground';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Store list items in the ref array when the component mounts
    const listItems = document.querySelectorAll('.about-list-item');
    listRefs.current = Array.from(listItems).map(item => item as HTMLLIElement);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.classList.add('opacity-100');
              imageRef.current.classList.remove('translate-y-10', 'opacity-0');
            }
            
            if (textRef.current) {
              const paragraphs = textRef.current.querySelectorAll('p, h2, h3');
              paragraphs.forEach((p, index) => {
                setTimeout(() => {
                  p.classList.add('opacity-100');
                  p.classList.remove('translate-y-10', 'opacity-0');
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
      className="py-20 relative bg-[#0D1117]"
    >
      <ParticleBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div 
            ref={imageRef}
            className="w-full md:w-2/5 transition-all duration-700 transform translate-y-10 opacity-0"
          >
            <div className="glass-layer-3 h-[450px] rounded-lg overflow-hidden relative">
              <div className="glass-layer-2 m-2 h-[calc(100%-16px)] rounded-lg overflow-hidden">
                <div className="glass-layer-1 m-2 h-[calc(100%-16px)] rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="text-gray-300 text-center p-4">
                    <p className="text-sm font-inter">Professional headshot placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={textRef}
            className="w-full md:w-3/5 glass-layer-3 p-8 rounded-lg"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-white mb-6 transition-all duration-500 transform translate-y-10 opacity-0">About Me</h2>
            
            <p className="text-lg mb-4 transition-all duration-500 transform translate-y-10 opacity-0 text-gray-300 font-inter">
              As a Data Scientist and Power BI Expert, I specialize in transforming complex data into strategic business insights. With extensive experience across insurance, healthcare, fintech, automotive, and government sectors, I've helped Fortune 500 companies and public sector organizations leverage their data for informed decision-making.
            </p>
            
            <h3 className="text-xl font-medium text-[#9b87f5] mt-8 mb-4 transition-all duration-500 transform translate-y-10 opacity-0 font-montserrat">
              Core Focus Areas
            </h3>
            
            <ul className="space-y-4">
              <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] mr-3 flex-shrink-0"></span>
                <div>
                  <p className="font-medium text-white font-montserrat">Data Visualization</p>
                  <p className="text-gray-300 font-inter">Creating intuitive, interactive dashboards that translate complex data into actionable insights</p>
                </div>
              </li>
              
              <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] mr-3 flex-shrink-0"></span>
                <div>
                  <p className="font-medium text-white font-montserrat">Predictive Analytics</p>
                  <p className="text-gray-300 font-inter">Building machine learning models that anticipate business trends and customer behaviors</p>
                </div>
              </li>
              
              <li className="about-list-item transition-all duration-500 transform translate-x-10 opacity-0 flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] mr-3 flex-shrink-0"></span>
                <div>
                  <p className="font-medium text-white font-montserrat">Data Pipeline Development</p>
                  <p className="text-gray-300 font-inter">Streamlining data flow from diverse sources to enable real-time analytics</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
