
import { useState, useEffect, useRef, FormEvent } from 'react';
import { Github, Linkedin, Mail, Send, User, AtSign, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  isSubmitting: boolean;
  isSuccess: boolean;
}

const ContactSection = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: 'Consultation',
    message: '',
    isSubmitting: false,
    isSuccess: false,
  });
  
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to submit the form.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Form submission logic
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulate API call
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        subject: 'Consultation',
        message: '',
        isSubmitting: false,
        isSuccess: true,
      });
      
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset success state after some time
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);
    }, 1500);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (formRef.current) {
              const formElements = formRef.current.querySelectorAll('input, select, textarea, button');
              
              formElements.forEach((element, index) => {
                setTimeout(() => {
                  element.classList.add('opacity-100');
                  element.classList.remove('translate-y-4', 'opacity-0');
                }, 200 * (index + 1));
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
      id="contact" 
      ref={sectionRef}
      className="py-20 relative min-h-screen flex items-center"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C14] via-[#08080D] to-[#08080D] -z-10"></div>
      
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <motion.div 
          className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#8A89FF]/5 filter blur-[80px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#6262FF]/5 filter blur-[60px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
            <span className="bg-gradient-to-r from-[#8A89FF] via-[#7676FF] to-[#6262FF] bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-12">
            Interested in transforming your data into actionable insights? Let's connect to discuss how data science and visualization can drive your business forward.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Contact info card */}
            <motion.div 
              className="lg:col-span-2 glass-card bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl flex flex-col justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl text-white font-medium mb-4">Contact Information</h3>
                <p className="text-gray-300 mb-8">Fill out the form and I will get back to you within 24 hours.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8A89FF]/10 flex items-center justify-center mr-4">
                      <Mail className="text-[#8A89FF]" size={18} />
                    </div>
                    <p className="text-gray-300">simon.asnake@example.com</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8A89FF]/10 flex items-center justify-center mr-4">
                      <User className="text-[#8A89FF]" size={18} />
                    </div>
                    <p className="text-gray-300">Data Science Consultant</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#8A89FF]/10 hover:bg-[#8A89FF]/20 text-[#8A89FF] flex items-center justify-center transition-colors duration-300">
                      <Linkedin size={18} />
                    </a>
                    <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-[#8A89FF]/10 hover:bg-[#8A89FF]/20 text-[#8A89FF] flex items-center justify-center transition-colors duration-300">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <Badge className="bg-[#8A89FF]/10 text-[#8A89FF] hover:bg-[#8A89FF]/20 border-[#8A89FF]/20">
                  Available for freelance work
                </Badge>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div 
              className="lg:col-span-3 glass-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Decoration elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A89FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6262FF]/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
              
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-8 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name input with floating icon */}
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${activeField === 'name' ? 'text-[#8A89FF]' : 'text-gray-400'}`}>
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A89FF]/40 focus:border-[#8A89FF]/40 text-white transition-all duration-300 transform translate-y-4 opacity-0"
                      placeholder="Your name"
                    />
                    {activeField === 'name' && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8A89FF] to-[#6262FF]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  
                  {/* Email input with floating icon */}
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${activeField === 'email' ? 'text-[#8A89FF]' : 'text-gray-400'}`}>
                      <AtSign size={16} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A89FF]/40 focus:border-[#8A89FF]/40 text-white transition-all duration-300 transform translate-y-4 opacity-0"
                      placeholder="Your email"
                    />
                    {activeField === 'email' && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8A89FF] to-[#6262FF]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A89FF]/40 focus:border-[#8A89FF]/40 text-white transition-all duration-300 transform translate-y-4 opacity-0 appearance-none"
                  >
                    <option value="Consultation" className="bg-[#161B22]">Consultation</option>
                    <option value="Project Inquiry" className="bg-[#161B22]">Project Inquiry</option>
                    <option value="Job Opportunity" className="bg-[#161B22]">Job Opportunity</option>
                    <option value="Other" className="bg-[#161B22]">Other</option>
                  </select>
                  {activeField === 'subject' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#8A89FF] to-[#6262FF]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
                
                <div className="mb-6 relative">
                  <div className={`absolute left-3 top-6 transition-all duration-300 ${activeField === 'message' ? 'text-[#8A89FF]' : 'text-gray-400'}`}>
                    <MessageSquare size={16} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A89FF]/40 focus:border-[#8A89FF]/40 text-white transition-all duration-300 transform translate-y-4 opacity-0"
                    placeholder="Your message"
                  ></textarea>
                  {activeField === 'message' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8A89FF] to-[#6262FF]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium text-white bg-gradient-to-r from-[#8A89FF] via-[#7676FF] to-[#6262FF] hover:opacity-90 focus:outline-none transition-all duration-300 transform translate-y-4 opacity-0"
                  whileHover={{ y: -2, boxShadow: '0 5px 15px rgba(138, 137, 255, 0.4)' }}
                >
                  {formState.isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
