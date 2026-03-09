import React from 'react';
import { Shield, Lock, Eye, Database, Share2, Cookie } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email address) when you register',
        'Health-related information you provide in symptom checkers',
        'Usage data and analytics to improve our services',
        'Device and browser information for security purposes',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide personalized health recommendations',
        'To improve our platform and user experience',
        'To communicate important updates and health tips',
        'To ensure the security of your account',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption (SSL/TLS)',
        'Your password is hashed using BCrypt',
        'Regular security audits and updates',
        'Limited access to personal information by staff',
      ],
    },
    {
      icon: Share2,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information',
        'Data is only shared with your consent',
        'Anonymous data may be used for research',
        'Legal compliance when required by law',
      ],
    },
    {
      icon: Cookie,
      title: 'Cookies and Tracking',
      content: [
        'We use cookies to enhance user experience',
        'You can disable cookies in browser settings',
        'Analytics cookies help us improve our service',
        'No third-party advertising cookies',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Shield className="w-8 h-8 text-[#1e88e5]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            At WellSpring, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform. Please read this 
            privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access the site.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e88e5]/10 to-[#43a047]/10 flex items-center justify-center mr-3">
                  <section.icon className="w-5 h-5 text-[#1e88e5]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-[#1e88e5] mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="mt-8 bg-gradient-to-r from-[#1e88e5]/5 to-[#43a047]/5 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-[#43a047] mt-2 mr-3 flex-shrink-0" />
              <span className="text-gray-600">Access your personal information</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-[#43a047] mt-2 mr-3 flex-shrink-0" />
              <span className="text-gray-600">Request correction of inaccurate data</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-[#43a047] mt-2 mr-3 flex-shrink-0" />
              <span className="text-gray-600">Request deletion of your data</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 rounded-full bg-[#43a047] mt-2 mr-3 flex-shrink-0" />
              <span className="text-gray-600">Opt-out of marketing communications</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@wellspring.com" className="text-[#1e88e5] hover:underline">
              privacy@wellspring.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
