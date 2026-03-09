import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Utensils,
  Sparkles,
  Calculator,
  Moon,
  Dumbbell,
  Brain,
  CheckSquare,
  ArrowRight,
  Heart,
  Activity,
  TrendingUp,
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  const tools = [
    {
      name: 'Nutro Diet',
      description: 'Get personalized diet plans based on your health conditions',
      icon: Utensils,
      color: 'from-orange-500 to-amber-500',
      link: '/dashboard/diet',
    },
    {
      name: 'Ayurvedic Solutions',
      description: 'Explore natural remedies and lifestyle recommendations',
      icon: Sparkles,
      color: 'from-purple-500 to-violet-500',
      link: '/dashboard/ayurvedic',
    },
    {
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health category',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      link: '/dashboard/bmi',
    },
    {
      name: 'Sleep Checker',
      description: 'Analyze your sleep patterns and get recommendations',
      icon: Moon,
      color: 'from-indigo-500 to-blue-500',
      link: '/dashboard/sleep',
    },
    {
      name: 'Yoga & Exercise',
      description: 'Follow guided routines for various health conditions',
      icon: Dumbbell,
      color: 'from-green-500 to-emerald-500',
      link: '/dashboard/yoga',
    },
    {
      name: 'Symptom Checker',
      description: 'Check symptoms and get preliminary health information',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      link: '/dashboard/symptom-checker',
    },
    {
      name: 'Health Todo',
      description: 'Track your daily health tasks and habits',
      icon: CheckSquare,
      color: 'from-teal-500 to-cyan-500',
      link: '/dashboard/todo',
    },
  ];

  const quickStats = [
    { label: 'Health Score', value: '85%', icon: Heart, color: 'text-red-500' },
    { label: 'Active Days', value: '12', icon: Activity, color: 'text-green-500' },
    { label: 'Goals Met', value: '8/10', icon: TrendingUp, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-white/80">
                  Here's your personalized health dashboard. Let's continue your wellness journey.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/dashboard/symptom-checker">
                  <Button className="bg-white text-[#1e88e5] hover:bg-gray-100">
                    <Activity className="w-4 h-4 mr-2" />
                    Check Symptoms
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Health Tools Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-[#1e88e5]" />
            Health Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link key={index} to={tool.link}>
                <Card className="h-full card-hover cursor-pointer border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-[#1e88e5] text-sm font-medium">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div className="mt-8">
          <Card className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Daily Health Tip</h3>
                  <p className="text-gray-600">
                    Drink at least 8 glasses of water daily to stay hydrated and support your body's 
                    natural detoxification processes. Proper hydration is essential for optimal health!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
