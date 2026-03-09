import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Disease Information', path: '/diseases' },
    { name: 'Medicinal Plants', path: '/plants' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const healthTools = [
    { name: 'BMI Calculator', path: '/dashboard/bmi' },
    { name: 'Sleep Checker', path: '/dashboard/sleep' },
    { name: 'Yoga & Exercise', path: '/dashboard/yoga' },
    { name: 'Symptom Checker', path: '/dashboard/symptom-checker' },
    { name: 'Diet Plans', path: '/dashboard/diet' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="WellSpring Logo" 
                className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-xl font-bold">WellSpring</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your comprehensive preventive health intelligence platform. 
              Empowering you with knowledge for a healthier tomorrow.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1e88e5] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1e88e5] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1e88e5] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1e88e5] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-[#43a047]" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-[#fb8c00]" />
              Health Tools
            </h3>
            <ul className="space-y-2">
              {healthTools.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-[#1e88e5]" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                <span className="text-gray-400 text-sm">support@wellspring.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Health Street,<br />
                  Wellness City, WC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} WellSpring. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button
              onClick={scrollToTop}
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-gray-950 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-xs text-center">
            <strong>Disclaimer:</strong> The information provided on this platform is for educational purposes only 
            and should not be considered as medical advice. Always consult with a qualified healthcare provider 
            for diagnosis and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
