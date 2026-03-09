import React, { useState } from 'react';
import { Calculator, Info, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateBMI } from '../../utils/helpers';

const BMI: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum) {
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = heightNum / 100;
    const bmiResult = calculateBMI(weightNum, heightInMeters);
    setResult(bmiResult);
  };

  const getHealthTip = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'Consider consulting a nutritionist to develop a healthy weight gain plan. Focus on nutrient-dense foods and strength training exercises.';
      case 'Normal Weight':
        return 'Great job! Maintain your healthy lifestyle with balanced nutrition and regular physical activity.';
      case 'Overweight':
        return 'Consider adopting a balanced diet and increasing physical activity. Small changes can make a big difference.';
      case 'Obese':
        return 'It is recommended to consult a healthcare provider for a personalized weight management plan.';
      default:
        return '';
    }
  };

  const bmiCategories = [
    { range: '< 18.5', category: 'Underweight', color: 'bg-blue-500', icon: TrendingDown },
    { range: '18.5 - 24.9', category: 'Normal Weight', color: 'bg-green-500', icon: Minus },
    { range: '25 - 29.9', category: 'Overweight', color: 'bg-yellow-500', icon: TrendingUp },
    { range: '≥ 30', category: 'Obese', color: 'bg-red-500', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Calculator className="w-8 h-8 mr-3 text-[#1e88e5]" />
            BMI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your Body Mass Index (BMI) to understand your weight category and get health recommendations.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">BMI Limitations</p>
            <p className="text-sm text-amber-700">
              BMI is a general indicator and does not account for muscle mass, bone density, or individual health factors. 
              Consult a healthcare provider for a comprehensive assessment.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-[#1e88e5] to-[#43a047] hover:opacity-90 text-white"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          {/* Result */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Your Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="text-center">
                  <div className={`w-32 h-32 rounded-full ${result.color} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-4xl font-bold text-white">{result.bmi}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {result.category}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-[#1e88e5] mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{getHealthTip(result.category)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Enter your details to see your BMI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* BMI Categories */}
        <Card className="border-0 shadow-md mt-8">
          <CardHeader>
            <CardTitle className="text-lg">BMI Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bmiCategories.map((cat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <cat.icon className={`w-6 h-6 mx-auto mb-2 ${cat.color.replace('bg-', 'text-')}`} />
                  <p className="text-sm font-medium text-gray-800">{cat.category}</p>
                  <p className="text-xs text-gray-500">{cat.range}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BMI;
