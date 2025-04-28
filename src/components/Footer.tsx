
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-portfolio-navy text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-2xl">Simon Asnake</h3>
            <p className="text-sm text-gray-300">Data Scientist & Power BI Expert</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" aria-label="LinkedIn" className="text-white hover:text-portfolio-purple transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="GitHub" className="text-white hover:text-portfolio-purple transition-colors">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Email" className="text-white hover:text-portfolio-purple transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Simon Asnake. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
