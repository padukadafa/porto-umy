import { Github, Linkedin, Mail } from "lucide-react";
import { Section } from "../Section";
import Spline from "@splinetool/react-spline";

const handleContactClick = (type: 'email' | 'linkedin' | 'github') => {
  const urls = {
    email: 'mailto:your-email@example.com',
    linkedin: 'https://linkedin.com/in/your-profile',
    github: 'https://github.com/your-username'
  };
  
  if (type === 'email') {
    window.location.href = urls.email;
  } else {
    window.open(urls[type], '_blank');
  }
};

const ContactSection = () => {
  return (
    <Section
      id="contact"
      title="Let's Create Something Amazing"
      kicker="Get In Touch"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      

      {/* Optional Overlay */}

      {/* Konten */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Ready to bring your ideas to life? Let's collaborate and create 
              something extraordinary together. Whether it's 3D experiences, 
              web applications, or creative solutions, I'm here to help.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={() => handleContactClick('email')}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-800 rounded-xl font-medium hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <Mail className="w-5 h-5" />
                <span>Email Me</span>
              </button>
              <button 
                onClick={() => handleContactClick('linkedin')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </button>
              <button 
                onClick={() => handleContactClick('github')}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </button>
            </div>
          </div>
          <div className="w-full ">
            <Spline 
                scene="https://prod.spline.design/b4imS4UmMrnVtPjx/scene.splinecode" 
                className="w-full h-full"
                
            />
            </div>
        </div>
      </div>
    </Section>
  );
}

export default ContactSection;
