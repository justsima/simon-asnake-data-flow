import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import personalData from '@/data/personal.json';

const Footer = () => {
  const socialLinks = [
    { icon: Linkedin, href: personalData.social.linkedin, label: "LinkedIn", color: "hover:text-[var(--color-primary-500)]" },
    { icon: Github, href: personalData.social.github, label: "GitHub", color: "hover:text-[var(--color-primary-500)]" },
    { icon: Mail, href: `mailto:${personalData.email}`, label: "Email", color: "hover:text-[var(--color-primary-500)]" },
  ];

  const contactInfo = [
    { icon: MapPin, text: personalData.location },
    { icon: Phone, text: personalData.phone },
    { icon: Mail, text: personalData.email },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--color-surface-primary)' }}>
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: 'var(--color-primary-500)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full opacity-20"
          style={{ background: 'var(--color-primary-700)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Glass overlay */}
      <div className="relative backdrop-blur-sm border-t" style={{ 
        background: 'rgba(22, 27, 34, 0.8)',
        borderColor: 'var(--color-border-primary)'
      }}>
        <div className="mobile-container py-8 md:py-12 lg:py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-10 lg:mb-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 md:space-y-4 text-center md:text-left"
            >
              <h3 className="font-bold text-2xl md:text-3xl font-playfair" style={{ color: 'var(--color-text-primary)' }}>
                {personalData.name}
              </h3>
              <p className="font-medium font-montserrat text-sm md:text-base" style={{ color: 'var(--color-primary-500)' }}>
                {personalData.title}
              </p>
              <p className="leading-relaxed font-inter text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                {personalData.bio}
              </p>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 md:space-y-4 text-center md:text-left"
            >
              <h4 className="font-semibold text-base md:text-lg font-montserrat" style={{ color: 'var(--color-text-primary)' }}>
                Get In Touch
              </h4>
              <div className="space-y-2 md:space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3 transition-colors duration-300 group"
                    style={{ color: 'var(--color-text-secondary)' }}
                    whileHover={{ x: 5, color: 'var(--color-primary-500)' }}
                  >
                    <item.icon 
                      size={14} 
                      className="group-hover:scale-110 transition-transform duration-200" 
                      style={{ color: 'var(--color-primary-500)' }}
                    />
                    <span className="font-inter text-sm md:text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social links and Portfolio Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 md:space-y-4 text-center md:text-left"
            >
              <h4 className="font-semibold text-base md:text-lg font-montserrat" style={{ color: 'var(--color-text-primary)' }}>
                Connect With Me
              </h4>
              <div className="flex justify-center md:justify-start space-x-3 md:space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="group relative touch-target"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-2.5 md:p-3 glass-card rounded-xl transition-all duration-300">
                      <link.icon size={18} className="transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-8 md:-top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-inter"
                         style={{ background: 'var(--color-primary-500)', color: 'var(--color-text-inverse)' }}>
                      {link.label}
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick links */}
              <div className="pt-3 md:pt-4">
                <h5 className="text-xs md:text-sm uppercase mb-2 md:mb-3 font-montserrat tracking-wide" 
                    style={{ color: 'var(--color-primary-500)' }}>
                  Quick Navigation
                </h5>
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                  {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, index) => (
                    <motion.a
                      key={index}
                      href={`#${item.toLowerCase()}`}
                      className="px-2.5 md:px-3 py-1 text-xs rounded-full transition-all duration-300 font-montserrat border"
                      style={{ 
                        color: 'var(--color-text-secondary)',
                        borderColor: 'var(--color-border-muted)'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        color: 'var(--color-primary-500)',
                        borderColor: 'var(--color-border-secondary)'
                      }}
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
            className="pt-6 md:pt-8 border-t"
            style={{ borderColor: 'var(--color-border-primary)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 text-center md:text-left">
                <p className="text-xs md:text-sm font-inter" style={{ color: 'var(--color-text-muted)' }}>
                  © {new Date().getFullYear()} Simon Asnake. All rights reserved.
                </p>
                <p className="text-xs md:text-sm font-inter" style={{ color: 'var(--color-text-muted)' }}>
                  Built with React & Tailwind CSS
                </p>
              </div>
              
              <motion.a
                href="#hero"
                className="group flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-1.5 md:py-2 glass-button rounded-lg transition-all duration-300 font-inter"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xs md:text-sm" style={{ color: 'var(--color-primary-500)' }}>Back to Top</span>
                <ExternalLink size={12} className="group-hover:rotate-45 transition-transform duration-300" 
                             style={{ color: 'var(--color-primary-500)' }} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;