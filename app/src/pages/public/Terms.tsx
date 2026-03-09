import React from 'react';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Heart } from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: `By accessing and using WellSpring, you accept and agree to be bound by the terms and 
      provisions of this agreement. If you do not agree to abide by these terms, please do not use 
      this platform.`,
    },
    {
      icon: Heart,
      title: 'Medical Disclaimer',
      content: `WellSpring provides health information for educational purposes only. The content on 
      this platform is not intended to be a substitute for professional medical advice, diagnosis, 
      or treatment. Always seek the advice of your physician or other qualified health provider 
      with any questions you may have regarding a medical condition.`,
    },
    {
      icon: FileText,
      title: 'User Accounts',
      content: `When you create an account with us, you must provide accurate and complete information. 
      You are responsible for maintaining the confidentiality of your account and password. You agree 
      to accept responsibility for all activities that occur under your account.`,
    },
    {
      icon: XCircle,
      title: 'Prohibited Activities',
      content: `Users are prohibited from: (1) Using the platform for any illegal purpose, (2) 
      Attempting to gain unauthorized access to any part of the platform, (3) Interfering with 
      other users' access to the platform, (4) Uploading malicious code or viruses, (5) 
      Misrepresenting information provided on the platform.`,
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: `All content on WellSpring, including text, graphics, logos, and software, is the 
      property of WellSpring and is protected by copyright and other intellectual property laws. 
      You may not reproduce, distribute, or create derivative works without our express permission.`,
    },
    {
      icon: AlertTriangle,
      title: 'Limitation of Liability',
      content: `WellSpring shall not be liable for any indirect, incidental, special, consequential, 
      or punitive damages resulting from your use of or inability to use the platform. This includes 
      any decisions made based on information provided through our services.`,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <FileText className="w-8 h-8 text-[#1e88e5]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700 text-sm">
                Please read these Terms of Service carefully before using WellSpring. By using our 
                platform, you agree to these terms. If you disagree with any part of the terms, 
                you may not access the service.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e88e5]/10 to-[#43a047]/10 flex items-center justify-center mr-3">
                  <section.icon className="w-5 h-5 text-[#1e88e5]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Terms</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Termination</h3>
              <p className="text-gray-600 text-sm">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Governing Law</h3>
              <p className="text-gray-600 text-sm">
                These Terms shall be governed and construed in accordance with the laws, without 
                regard to its conflict of law provisions.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Changes to Terms</h3>
              <p className="text-gray-600 text-sm">
                We reserve the right, at our sole discretion, to modify or replace these Terms at 
                any time. We will provide notice of any changes by posting the new Terms on this page.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:legal@wellspring.com" className="text-[#1e88e5] hover:underline">
              legal@wellspring.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
