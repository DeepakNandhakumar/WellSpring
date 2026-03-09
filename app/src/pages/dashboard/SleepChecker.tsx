import React, { useState } from 'react';
import { Moon, Clock, Sun, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { checkSleepQuality } from '../../utils/helpers';

const SleepChecker: React.FC = () => {
  const [sleepHours, setSleepHours] = useState([7]);
  const [result, setResult] = useState<{
    quality: string;
    message: string;
    color: string;
  } | null>(null);

  const handleCheck = () => {
    const sleepResult = checkSleepQuality(sleepHours[0]);
    setResult(sleepResult);
  };

  const getSleepIcon = (quality: string) => {
    switch (quality) {
      case 'Poor':
        return <AlertCircle className="w-16 h-16 text-red-500" />;
      case 'Fair':
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case 'Excellent':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'Good':
        return <Sun className="w-16 h-16 text-blue-500" />;
      case 'Excessive':
        return <Moon className="w-16 h-16 text-purple-500" />;
      default:
        return <Moon className="w-16 h-16 text-gray-400" />;
    }
  };

  const sleepTips = [
    'Maintain a consistent sleep schedule, even on weekends',
    'Create a relaxing bedtime routine',
    'Keep your bedroom cool, dark, and quiet',
    'Avoid screens at least 1 hour before bed',
    'Limit caffeine intake after 2 PM',
    'Exercise regularly, but not close to bedtime',
    'Avoid heavy meals before sleeping',
  ];

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Moon className="w-8 h-8 mr-3 text-indigo-500" />
            Sleep Checker
          </h1>
          <p className="text-gray-600">
            Analyze your sleep patterns and get personalized recommendations for better rest.
          </p>
        </div>

        {/* Sleep Input */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg">How many hours did you sleep?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-5xl font-bold text-[#1e88e5]">{sleepHours[0]}</span>
              <span className="text-xl text-gray-500 ml-2">hours</span>
            </div>
            
            <Slider
              value={sleepHours}
              onValueChange={setSleepHours}
              max={12}
              min={0}
              step={0.5}
              className="w-full"
            />
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>

            <Button
              onClick={handleCheck}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white"
            >
              <Moon className="w-5 h-5 mr-2" />
              Analyze Sleep
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                {getSleepIcon(result.quality)}
                <h2 className={`text-2xl font-bold mt-4 ${result.color}`}>
                  {result.quality} Sleep Quality
                </h2>
                <p className="text-gray-600 mt-4 max-w-lg mx-auto">{result.message}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sleep Tips */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Info className="w-5 h-5 mr-2 text-[#1e88e5]" />
              Tips for Better Sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sleepTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SleepChecker;
