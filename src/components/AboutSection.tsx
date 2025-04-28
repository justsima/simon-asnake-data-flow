
import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.classList.add('opacity-100');
              imageRef.current.classList.remove('translate-y-10', 'opacity-0');
            }
            
            if (textRef.current) {
              const paragraphs = textRef.current.querySelectorAll('p, ul');
              paragraphs.forEach((p, index) => {
                setTimeout(() => {
                  p.classList.add('opacity-100');
                  p.classList.remove('translate-y-10', 'opacity-0');
                }, 200 * (index + 1));
              });
            }
            
            // Unobserve after animation
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
      className="py-20 bg-portfolio-gray"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image column */}
          <div 
            ref={imageRef}
            className="w-full md:w-2/5 transition-all duration-700 transform translate-y-10 opacity-0"
          >
            <div className="bg-portfolio-navy/10 h-[450px] rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-portfolio-navy">
                <p className="text-sm">Professional headshot placeholder</p>
              </div>
            </div>
          </div>
          
          {/* Text column */}
          <div 
            ref={textRef}
            className="w-full md:w-3/5"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-portfolio-navy mb-6">About Me</h2>
            
            <p className="text-lg mb-4 transition-all duration-500 transform translate-y-10 opacity-0">
              As a Data Scientist and Power BI Expert, I specialize in transforming complex data into strategic business insights. With extensive experience across insurance, healthcare, fintech, automotive, and government sectors, I've helped Fortune 500 companies and public sector organizations leverage their data for informed decision-making. My expertise spans custom dashboard development, machine learning implementation, and ETL pipeline optimization using Azure-based solutions.
            </p>
            
            <h3 className="text-xl font-medium text-portfolio-purple mt-8 mb-4 transition-all duration-500 transform translate-y-10 opacity-0">
              Core Focus Areas
            </h3>
            
            <ul className="space-y-4">
              <li className="transition-all duration-500 transform translate-y-10 opacity-0">
                <p className="font-medium text-portfolio-navy">Data Visualization</p>
                <p className="text-gray-600">Creating intuitive, interactive dashboards that translate complex data into actionable insights</p>
              </li>
              
              <li className="transition-all duration-500 transform translate-y-10 opacity-0">
                <p className="font-medium text-portfolio-navy">Predictive Analytics</p>
                <p className="text-gray-600">Building machine learning models that anticipate business trends and customer behaviors</p>
              </li>
              
              <li className="transition-all duration-500 transform translate-y-10 opacity-0">
                <p className="font-medium text-portfolio-navy">Data Pipeline Development</p>
                <p className="text-gray-600">Streamlining data flow from diverse sources to enable real-time analytics</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
