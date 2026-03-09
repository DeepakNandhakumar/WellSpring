import React, { useState, useEffect } from 'react';
import { Utensils, Search, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { diseaseAPI, dietPlanAPI } from '../../services/api';
import { toast } from 'sonner';

interface Disease {
  id: number;
  name: string;
}

interface DietPlan {
  id: number;
  diseaseName: string;
  ageGroup: string;
  type: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  avoidFood: string;
}

const NutroDiet: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [dietType, setDietType] = useState('');
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await diseaseAPI.getAll();
      if (response.data.success) {
        setDiseases(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching diseases:', error);
      toast.error('Failed to load diseases');
    }
  };

  const handleSearch = async () => {
    if (!selectedDisease || !ageGroup || !dietType) {
      toast.error('Please select all options');
      return;
    }

    try {
      setLoading(true);
      const response = await dietPlanAPI.getByFilter(
        parseInt(selectedDisease),
        ageGroup,
        dietType
      );
      if (response.data.success) {
        setDietPlans(response.data.data);
        if (response.data.data.length === 0) {
          toast.info('No diet plans found for selected criteria');
        }
      }
    } catch (error) {
      console.error('Error fetching diet plans:', error);
      toast.error('Failed to load diet plans');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (planId: number) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Utensils className="w-8 h-8 mr-3 text-[#fb8c00]" />
            Nutro Diet Plans
          </h1>
          <p className="text-gray-600">
            Get personalized diet recommendations based on your health condition, age, and dietary preferences.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">Important Note</p>
            <p className="text-sm text-amber-700">
              These diet plans are for educational purposes only. Consult a nutritionist or healthcare 
              provider before making significant dietary changes.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Condition
                </label>
                <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {diseases.map((disease) => (
                      <SelectItem key={disease.id} value={disease.id.toString()}>
                        {disease.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-40">18-40 years</SelectItem>
                    <SelectItem value="40-60">40-60 years</SelectItem>
                    <SelectItem value="60+">60+ years</SelectItem>
                    <SelectItem value="All Ages">All Ages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet Type
                </label>
                <Select value={dietType} onValueChange={setDietType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VEG">Vegetarian</SelectItem>
                    <SelectItem value="NONVEG">Non-Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-[#fb8c00] to-[#ef6c00] hover:opacity-90 text-white"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Loading...
                </span>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Get Diet Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Diet Plans Results */}
        {dietPlans.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recommended Diet Plans
            </h2>
            {dietPlans.map((plan) => (
              <Card key={plan.id} className="border-0 shadow-md overflow-hidden">
                <CardHeader 
                  className="bg-gradient-to-r from-orange-50 to-amber-50 cursor-pointer"
                  onClick={() => toggleExpand(plan.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-800">
                        {plan.diseaseName} - {plan.ageGroup}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {plan.type === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian'} Diet
                      </p>
                    </div>
                    {expandedPlan === plan.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {expandedPlan === plan.id && (
                  <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Breakfast</h4>
                        <p className="text-green-700 text-sm">{plan.breakfast}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Lunch</h4>
                        <p className="text-blue-700 text-sm">{plan.lunch}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Dinner</h4>
                        <p className="text-purple-700 text-sm">{plan.dinner}</p>
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Foods to Avoid</h4>
                      <p className="text-red-700 text-sm">{plan.avoidFood}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NutroDiet;
