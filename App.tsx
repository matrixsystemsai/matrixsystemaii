import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Cpu,
  Database,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';
import MatrixBackground from './components/MatrixBackground';
import Statistics from './components/Statistics';
import { supabase } from './lib/supabase';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setFormMessage('Please fill in all fields');
      return;
    }

    setFormStatus('loading');

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      setFormStatus('success');
      setFormMessage('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setFormStatus('idle');
        setFormMessage('');
      }, 5000);
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show text when user scrolls down a bit (after 20% of viewport height)
      if (scrollPosition > windowHeight * 0.2) {
        setIsTextVisible(true);
      } else {
        setIsTextVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="bg-black text-white">
      {/* Unified Background with Navigation, Hero, Services, and About */}
      <div className="relative">
        <MatrixBackground />

        {/* Navigation */}
        <nav className="relative z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/matrixsystemsai logo.png"
                alt="Matrix Systems AI"
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Home</a>
              <a href="#services" className="text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Services</a>
              <a href="#statistics" className="text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Statistics</a>
              <a href="#about" className="text-gray-300 hover:text-[#00ff41] transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Contact</a>
              <button className="bg-[#00ff41] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#00cc33] transition-colors duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-[#00ff41] transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800">
              <div className="px-6 py-4 space-y-4">
                <a href="#home" className="block text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Home</a>
                <a href="#services" className="block text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Services</a>
                <a href="#statistics" className="block text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Statistics</a>
                <a href="#about" className="block text-gray-300 hover:text-[#00ff41] transition-colors duration-300">About</a>
                <a href="#contact" className="block text-gray-300 hover:text-[#00ff41] transition-colors duration-300">Contact</a>
                <button className="w-full bg-[#00ff41] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#00cc33] transition-colors duration-300">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="text-center px-6 max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in text-[#00ff41]">
                MATRIX SYSTEMS AI
              </h1>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <ChevronDown className="text-[#00ff41]" size={32} />
          </div>
        </section>

        {/* Text content below hero */}
        <section className="py-20 px-6 bg-black">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 transform relative z-10 ${
            isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Automations with the human touch
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-[#00ff41] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#00cc33] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                Explore Solutions
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-20 px-6 bg-black">
          <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[#00ff41]">The Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive three-step approach to delivering transformative AI solutions tailored to your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-xl border border-gray-800 hover:border-[#00ff41] transition-all duration-300 group">
              <div className="mb-6">
                <Brain className="text-[#00ff41] group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#00ff41] transition-colors duration-300">Analyse</h3>
              <p className="text-gray-400 leading-relaxed">
                Examine your workflows in depth to pinpoint AI opportunities that drive efficiency, scalability, and competitive advantage.
              </p>
            </div>

            <div className="bg-black p-8 rounded-xl border border-gray-800 hover:border-[#00ff41] transition-all duration-300 group">
              <div className="mb-6">
                <Cpu className="text-[#00ff41] group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#00ff41] transition-colors duration-300">Build & Deploy</h3>
              <p className="text-gray-400 leading-relaxed">
                Develop and deploy tailored AI solutions that prioritise quality, security, and long-term business value.
              </p>
            </div>

            <div className="bg-black p-8 rounded-xl border border-gray-800 hover:border-[#00ff41] transition-all duration-300 group">
              <div className="mb-6">
                <Database className="text-[#00ff41] group-hover:scale-110 transition-transform duration-300" size={48} />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#00ff41] transition-colors duration-300">Maintain & Improve</h3>
              <p className="text-gray-400 leading-relaxed">
                Continuously optimise and enhance AI solutions to drive sustained performance, resilience, and measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Leading the <span className="text-[#00ff41]">AI Revolution</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Matrix Systems AI is at the forefront of artificial intelligence innovation, creating solutions that push the boundaries of what's possible in the digital realm.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our team of expert researchers and engineers work tirelessly to develop AI systems that are not just powerful, but also ethical, transparent, and beneficial for humanity's future.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#00ff41] mb-2">500+</div>
                  <div className="text-gray-300">AI Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00ff41] mb-2">50+</div>
                  <div className="text-gray-300">Enterprise Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00ff41] mb-2">99.9%</div>
                  <div className="text-gray-300">System Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#00ff41] mb-2">24/7</div>
                  <div className="text-gray-300">AI Monitoring</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00ff41]/20 to-transparent p-8 rounded-2xl border border-[#00ff41]/30">
                <div className="bg-black p-8 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse"></div>
                      <span className="text-[#00ff41] font-mono">AI_SYSTEM_ONLINE</span>
                    </div>
                    <div className="text-gray-400 font-mono text-sm">
                      {'>'} Initializing neural networks...<br/>
                      {'>'} Loading machine learning models...<br/>
                      {'>'} Establishing secure connections...<br/>
                      {'>'} <span className="text-[#00ff41]">System ready for deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Contact Section - Get in Touch */}
      <section id="contact" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get In <span className="text-[#00ff41]">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business with AI? Let's discuss how Matrix Systems AI can help you achieve your goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00ff41]/10 p-3 rounded-lg">
                    <Mail className="text-[#00ff41]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-gray-400">Info@matrixsystemsai.com</p>
                    <p className="text-gray-400">support@matrixsystemsai.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#00ff41]/10 p-3 rounded-lg">
                    <Phone className="text-[#00ff41]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-gray-400">+44 7549049250</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-black p-8 rounded-xl border border-gray-800">
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#00ff41] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your name"
                    disabled={formStatus === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#00ff41] focus:outline-none transition-colors duration-300"
                    placeholder="Enter your email"
                    disabled={formStatus === 'loading'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-[#00ff41] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project"
                    disabled={formStatus === 'loading'}
                  ></textarea>
                </div>

                {formMessage && (
                  <div className={`p-4 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    formStatus === 'success'
                      ? 'bg-green-900/30 text-green-300 border border-green-700'
                      : 'bg-red-900/30 text-red-300 border border-red-700'
                  }`}>
                    {formMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#00ff41] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#00cc33] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/matrixsystemsai logo.png" 
              alt="Matrix Systems AI" 
              className="h-12 w-auto mx-auto mb-4"
            />
          </div>
          <p className="text-gray-400 mb-4">
            © 2024 Matrix Systems AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Powering the future with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;