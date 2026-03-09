import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 pt-20">
      <div className="text-center px-4">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto relative">
            {/* Background Circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e88e5]/20 to-[#43a047]/20 rounded-full" />
            
            {/* 404 Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-bold bg-gradient-to-r from-[#1e88e5] to-[#43a047] bg-clip-text text-transparent">
                404
              </span>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-[#fb8c00] rounded-full animate-pulse" />
            <div className="absolute bottom-8 right-8 w-3 h-3 bg-[#1e88e5] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 right-4 w-2 h-2 bg-[#43a047] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track to better health.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] hover:opacity-90 text-white"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/diseases" className="text-[#1e88e5] hover:underline text-sm">
              Disease Information
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/plants" className="text-[#1e88e5] hover:underline text-sm">
              Medicinal Plants
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/about" className="text-[#1e88e5] hover:underline text-sm">
              About Us
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="text-[#1e88e5] hover:underline text-sm">
              Contact
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600">Looking for something specific?</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Diabetes', 'Yoga', 'BMI Calculator', 'Diet Plans'].map((term) => (
              <Link
                key={term}
                to={`/diseases?search=${term.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#1e88e5]/10 hover:text-[#1e88e5] transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
