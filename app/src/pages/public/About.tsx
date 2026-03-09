import React from 'react';
import { Heart, Target, Eye, Shield, Users, Award, BookOpen, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We care deeply about the well-being of every individual who uses our platform.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We provide accurate, evidence-based information you can trust.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We continuously improve our platform with the latest health insights.',
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'We believe quality health information should be free for everyone.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: 'SJ',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Dr. Rajesh Patel',
      role: 'Ayurvedic Specialist',
      image: 'RP',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Dr. Emily Chen',
      role: 'Nutrition Expert',
      image: 'EC',
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Dr. Michael Brown',
      role: 'Fitness Consultant',
      image: 'MB',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-[#1e88e5]">WellSpring</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            WellSpring is a preventive health intelligence platform that combines modern 
            healthcare knowledge with ancient Ayurvedic wisdom to empower individuals in 
            their journey towards better health.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1e88e5] to-[#1565c0] flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to quality health information and preventive care 
                resources, enabling individuals to take proactive control of their health 
                and well-being through education, awareness, and personalized guidance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#43a047] to-[#2e7d32] flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                A world where everyone has access to the knowledge and tools needed to 
                prevent diseases, maintain optimal health, and live a fulfilling life 
                through the integration of modern and traditional healthcare practices.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md card-hover">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e88e5]/10 to-[#43a047]/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-[#1e88e5]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">50K+</p>
              <p className="text-white/80">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-white/80">Health Experts</p>
            </div>
            <div>
              <p className="text-4xl font-bold">10+</p>
              <p className="text-white/80">Diseases Covered</p>
            </div>
            <div>
              <p className="text-4xl font-bold">98%</p>
              <p className="text-white/80">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our team of healthcare professionals and Ayurvedic experts work together 
            to provide you with accurate and reliable health information.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-md overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-white">{member.image}</span>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose WellSpring?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Evidence-Based</h3>
                <p className="text-gray-600 text-sm">
                  All our content is backed by scientific research and verified by healthcare professionals.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Expert-Curated</h3>
                <p className="text-gray-600 text-sm">
                  Our content is created and reviewed by qualified doctors and Ayurvedic practitioners.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Completely Free</h3>
                <p className="text-gray-600 text-sm">
                  We believe health information should be accessible to everyone, regardless of their financial situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
