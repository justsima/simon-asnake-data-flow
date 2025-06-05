
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-portfolio-teal" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-portfolio-teal" },
    { icon: Mail, href: "#", label: "Email", color: "hover:text-portfolio-teal" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Addis Ababa, Ethiopia" },
    { icon: Phone, text: "+251 XXX XXX XXX" },
    { icon: Mail, text: "simon@example.com" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#08080D] via-portfolio-navy/20 to-[#08080D]">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-portfolio-teal/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-portfolio-deepTeal/10 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Glass overlay */}
      <div className="relative backdrop-blur-sm bg-white/[0.02] border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-3xl text-white font-micuale">
                Simon Asnake
              </h3>
              <p className="text-portfolio-teal font-medium font-kiak">
                Data Scientist & Power BI Expert
              </p>
              <p className="text-gray-300 leading-relaxed font-welland">
                Transforming data into actionable insights and building innovative solutions 
                that drive business growth and decision-making.
              </p>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg text-white font-charis">Get In Touch</h4>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-gray-300 hover:text-portfolio-teal transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <item.icon 
                      size={16} 
                      className="text-portfolio-teal group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="font-welland">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg text-white font-charis">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="group relative"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white hover:border-portfolio-teal/50 hover:bg-portfolio-teal/10 transition-all duration-300">
                      <link.icon size={20} className="group-hover:text-portfolio-teal transition-colors duration-300" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-portfolio-teal text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-welland">
                      {link.label}
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Quick links */}
              <div className="pt-4">
                <h5 className="text-sm uppercase text-portfolio-teal mb-3 font-charis tracking-wide">Quick Navigation</h5>
                <div className="flex flex-wrap gap-2">
                  {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
                    <motion.a
                      key={index}
                      href={`#${item.toLowerCase()}`}
                      className="px-3 py-1 text-xs text-gray-300 hover:text-portfolio-teal border border-white/10 rounded-full hover:border-portfolio-teal/50 transition-all duration-300 font-shunsine"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom section */}
          <motion.div 
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-sm text-gray-400 font-welland">
                  © {new Date().getFullYear()} Simon Asnake. All rights reserved.
                </p>
                <p className="text-sm text-gray-400 font-welland">
                  Built with React, TypeScript & Tailwind CSS
                </p>
              </div>
              
              <motion.a
                href="#hero"
                className="group flex items-center space-x-2 px-4 py-2 bg-portfolio-teal/10 hover:bg-portfolio-teal/20 border border-portfolio-teal/30 rounded-lg text-portfolio-teal hover:text-white transition-all duration-300 font-welland"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm">Back to Top</span>
                <ExternalLink size={14} className="group-hover:rotate-45 transition-transform duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
