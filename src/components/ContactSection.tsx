
import { useState, useEffect, useRef, FormEvent } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
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
      className="py-20 bg-gradient-to-b from-white to-portfolio-gray/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-portfolio-navy mb-4 text-center">Get In Touch</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Interested in transforming your data into actionable insights? Let's connect to discuss how data science and visualization can drive your business forward.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-purple/40 transition-all duration-300 transform translate-y-4 opacity-0"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-purple/40 transition-all duration-300 transform translate-y-4 opacity-0"
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-purple/40 transition-all duration-300 transform translate-y-4 opacity-0"
              >
                <option value="Consultation">Consultation</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-purple/40 transition-all duration-300 transform translate-y-4 opacity-0"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={`w-full py-3 px-6 rounded-md font-medium text-white transition-all duration-300 transform translate-y-4 opacity-0 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-portfolio-purple/40 ${
                formState.isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-portfolio-purple hover:bg-portfolio-navy'
              }`}
            >
              {formState.isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <p className="font-medium text-portfolio-navy mb-2">Alternative Contact Methods</p>
              <div className="flex items-center space-x-3">
                <a href="#" aria-label="Email" className="flex items-center text-gray-600 hover:text-portfolio-purple transition-colors">
                  <Mail size={16} className="mr-1" />
                  <span>simon.asnake@example.com</span>
                </a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-portfolio-navy text-white flex items-center justify-center hover:bg-portfolio-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-portfolio-navy text-white flex items-center justify-center hover:bg-portfolio-purple transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <p className="mt-8 text-center text-gray-600">
            Currently available for freelance projects and consulting opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
