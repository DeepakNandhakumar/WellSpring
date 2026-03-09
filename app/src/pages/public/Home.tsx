import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Activity,
  Leaf,
  Utensils,
  Sparkles,
  Dumbbell,
  Brain,
  Moon,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  LayoutDashboard,
} from 'lucide-react';
import { diseaseAPI, plantAPI } from '../../services/api';

const Home: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [diseaseCount, setDiseaseCount] = useState(0);
  const [plantCount, setPlantCount] = useState(0);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diseasesRes, plantsRes] = await Promise.all([
          diseaseAPI.getAll(),
          plantAPI.getAll(),
        ]);
        setDiseaseCount(diseasesRes.data.data?.length || 10);
        setPlantCount(plantsRes.data.data?.length || 10);
      } catch (error) {
        console.error('Error fetching data:', error);
        setDiseaseCount(10);
        setPlantCount(10);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: Activity,
      title: 'Disease Awareness',
      description: 'Learn about common diseases, their symptoms, causes, and prevention strategies.',
      color: 'from-red-500 to-pink-500',
      link: '/diseases',
    },
    {
      icon: Leaf,
      title: 'Medicinal Plants',
      description: 'Discover the healing power of Ayurvedic plants and their traditional uses.',
      color: 'from-green-500 to-emerald-500',
      link: '/plants',
    },
    {
      icon: Utensils,
      title: 'Nutro Diet Plans',
      description: 'Get personalized diet recommendations based on your health conditions.',
      color: 'from-orange-500 to-amber-500',
      link: '/dashboard/diet',
    },
    {
      icon: Sparkles,
      title: 'Ayurvedic Solutions',
      description: 'Explore natural remedies and lifestyle changes for better health.',
      color: 'from-purple-500 to-violet-500',
      link: '/dashboard/ayurvedic',
    },
    {
      icon: Dumbbell,
      title: 'Yoga & Exercise',
      description: 'Follow guided yoga routines and exercises for various health conditions.',
      color: 'from-blue-500 to-cyan-500',
      link: '/dashboard/yoga',
    },
    {
      icon: Brain,
      title: 'AI Symptom Checker',
      description: 'Check your symptoms and get preliminary health information.',
      color: 'from-indigo-500 to-blue-500',
      link: '/dashboard/symptom-checker',
    },
  ];

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Users' },
    { icon: Activity, value: diseaseCount.toString(), label: 'Diseases Covered' },
    { icon: Leaf, value: plantCount.toString(), label: 'Medicinal Plants' },
    { icon: Award, value: '98%', label: 'User Satisfaction' },
  ];

  const benefits = [
    'Personalized health recommendations',
    'Evidence-based Ayurvedic remedies',
    'Comprehensive disease information',
    'Expert-curated diet plans',
    'Yoga routines for all levels',
    '24/7 health tracking tools',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-orange-50" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1e88e5]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#43a047]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fb8c00]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-6 animate-fade-in">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-[#fb8c00]" />
                <span className="text-sm font-medium text-gray-700">AI-Powered Health Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your Journey to{' '}
                <span className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] bg-clip-text text-transparent">
                  Better Health
                </span>{' '}
                Starts Here
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                WellSpring combines modern healthcare with ancient Ayurvedic wisdom to provide 
                you with personalized preventive health solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link to={isAdmin ? '/admin' : '/dashboard'}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] hover:opacity-90 text-white px-8 btn-scale"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-2" />
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] hover:opacity-90 text-white px-8 btn-scale"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
                <Link to="/diseases">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"
                  >
                    Explore Diseases
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#43a047]" />
                  <span className="text-sm text-gray-600">Free to Use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#43a047]" />
                  <span className="text-sm text-gray-600">Expert Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#43a047]" />
                  <span className="text-sm text-gray-600">Always Available</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e88e5]/20 to-[#43a047]/20 rounded-full" />
                
                {/* Floating Cards */}
                <div className="absolute top-10 left-10 bg-white rounded-xl shadow-lg p-4 animate-fade-in stagger-1">
                  <Heart className="w-8 h-8 text-red-500 mb-2" />
                  <p className="text-sm font-semibold">Heart Health</p>
                  <p className="text-xs text-gray-500">Monitor daily</p>
                </div>

                <div className="absolute top-1/2 right-0 translate-x-4 bg-white rounded-xl shadow-lg p-4 animate-fade-in stagger-2">
                  <Activity className="w-8 h-8 text-[#1e88e5] mb-2" />
                  <p className="text-sm font-semibold">Track Activity</p>
                  <p className="text-xs text-gray-500">Stay active</p>
                </div>

                <div className="absolute bottom-20 left-0 -translate-x-4 bg-white rounded-xl shadow-lg p-4 animate-fade-in stagger-3">
                  <Moon className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-sm font-semibold">Sleep Better</p>
                  <p className="text-xs text-gray-500">Rest well</p>
                </div>

                <div className="absolute bottom-10 right-10 bg-white rounded-xl shadow-lg p-4 animate-fade-in stagger-4">
                  <Leaf className="w-8 h-8 text-[#43a047] mb-2" />
                  <p className="text-sm font-semibold">Natural Care</p>
                  <p className="text-xs text-gray-500">Ayurvedic wisdom</p>
                </div>

                {/* Center Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#1e88e5] to-[#43a047] rounded-full flex items-center justify-center shadow-2xl">
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 card-hover"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#1e88e5]" />
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Health Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of health tools and resources designed to help you 
              live a healthier, happier life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full card-hover cursor-pointer border-0 shadow-md">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-[#1e88e5] font-medium">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] bg-clip-text text-transparent">
                  WellSpring
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine the best of modern healthcare with traditional Ayurvedic wisdom 
                to provide you with comprehensive preventive health solutions.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#43a047]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#43a047]" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                {isAuthenticated ? (
                  <Link to={isAdmin ? '/admin' : '/dashboard'}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] hover:opacity-90 text-white"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-2" />
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] hover:opacity-90 text-white"
                    >
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#1e88e5]/10 to-[#1e88e5]/5 rounded-2xl p-6">
                    <TrendingUp className="w-10 h-10 text-[#1e88e5] mb-3" />
                    <p className="text-2xl font-bold text-gray-800">95%</p>
                    <p className="text-sm text-gray-600">Health Improvement</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#43a047]/10 to-[#43a047]/5 rounded-2xl p-6">
                    <Users className="w-10 h-10 text-[#43a047] mb-3" />
                    <p className="text-2xl font-bold text-gray-800">50K+</p>
                    <p className="text-sm text-gray-600">Happy Users</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-[#fb8c00]/10 to-[#fb8c00]/5 rounded-2xl p-6">
                    <Award className="w-10 h-10 text-[#fb8c00] mb-3" />
                    <p className="text-2xl font-bold text-gray-800">100+</p>
                    <p className="text-sm text-gray-600">Health Experts</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6">
                    <Heart className="w-10 h-10 text-purple-500 mb-3" />
                    <p className="text-2xl font-bold text-gray-800">24/7</p>
                    <p className="text-sm text-gray-600">Health Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-green-600 p-12 text-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of users who have transformed their lives with WellSpring. 
                Start your preventive health journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link to={isAdmin ? '/admin' : '/dashboard'}>
                    <Button
                      size="lg"
                      className="bg-white text-green-600 hover:bg-gray-100 px-8 font-semibold transition-all duration-300 shadow-lg"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-2" />
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="bg-white text-green-600 hover:bg-gray-100 px-8 font-semibold transition-all duration-300 shadow-lg"
                    >
                      Create Free Account
                    </Button>
                  </Link>
                )}
                <Link to="/about">
                  <Button
                    size="lg"
                    className="bg-green-800 text-white hover:bg-green-900 px-8 font-semibold transition-all duration-300 shadow-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
