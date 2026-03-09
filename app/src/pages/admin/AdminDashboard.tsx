import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Activity, Leaf, Mail, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { diseaseAPI, plantAPI, supportAPI } from '../../services/api';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    diseases: 0,
    plants: 0,
    messages: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [diseasesRes, plantsRes, messagesRes] = await Promise.all([
        diseaseAPI.getAll(),
        plantAPI.getAll(),
        supportAPI.getAll(),
      ]);

      setStats({
        diseases: diseasesRes.data.data?.length || 0,
        plants: plantsRes.data.data?.length || 0,
        messages: messagesRes.data.data?.length || 0,
        users: 2, // Demo count
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const adminCards = [
    {
      title: 'Manage Diseases',
      description: 'Add, edit, or remove disease information',
      icon: Activity,
      color: 'from-red-500 to-pink-500',
      link: '/admin/diseases',
      count: stats.diseases,
    },
    {
      title: 'Manage Plants',
      description: 'Update medicinal plant database',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      link: '/admin/plants',
      count: stats.plants,
    },
    {
      title: 'Diet Plans',
      description: 'Create and manage diet recommendations',
      icon: TrendingUp,
      color: 'from-orange-500 to-amber-500',
      link: '/admin/diet-plans',
      count: '-',
    },
    {
      title: 'Ayurvedic Solutions',
      description: 'Manage Ayurvedic remedies',
      icon: Shield,
      color: 'from-purple-500 to-violet-500',
      link: '/admin/ayurvedic',
      count: '-',
    },
    {
      title: 'Support Messages',
      description: 'View and respond to user messages',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/messages',
      count: stats.messages,
    },
  ];

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-white/70">Manage WellSpring platform content and data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Diseases</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {loading ? '...' : stats.diseases}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Medicinal Plants</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {loading ? '...' : stats.plants}
                  </p>
                </div>
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Messages</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {loading ? '...' : stats.messages}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {loading ? '...' : stats.users}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tools Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Management Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card, index) => (
              <Link key={index} to={card.link}>
                <Card className="h-full card-hover cursor-pointer border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                      <span className="text-2xl font-bold text-[#1e88e5]">{card.count}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                    <div className="flex items-center text-[#1e88e5] text-sm font-medium">
                      <span>Manage</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
