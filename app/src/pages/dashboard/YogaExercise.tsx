import React, { useState } from 'react';
import { Dumbbell, Play, Clock, BarChart3, ExternalLink, Search, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { yogaCategories, yogaPoses } from '../../utils/helpers';

const YogaExercise: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPoses = selectedCategory
    ? yogaPoses[selectedCategory]?.filter((pose) =>
        pose.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Dumbbell className="w-8 h-8 mr-3 text-green-500" />
            Yoga & Exercise
          </h1>
          <p className="text-gray-600">
            Discover yoga poses and exercises tailored for various health conditions and fitness goals.
          </p>
        </div>

        {/* Categories */}
        {!selectedCategory && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {yogaCategories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer card-hover border-0 shadow-md"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4">
                    <Dumbbell className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {yogaPoses[category.id]?.length || 0} poses available
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Selected Category View */}
        {selectedCategory && (
          <>
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
              >
                ← Back to Categories
              </Button>
              <h2 className="text-xl font-semibold text-gray-800">
                {yogaCategories.find((c) => c.id === selectedCategory)?.name}
              </h2>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search poses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Poses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPoses?.map((pose, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{pose.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getDifficultyColor(pose.difficulty)}>
                            {pose.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {pose.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <Dumbbell className="w-16 h-16 text-green-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{pose.description}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${pose.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Tutorial
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Benefits Section */}
        <Card className="border-0 shadow-md mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Info className="w-5 h-5 mr-2 text-[#1e88e5]" />
              Benefits of Regular Yoga Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Improves flexibility and strength',
                'Reduces stress and anxiety',
                'Enhances respiratory function',
                'Promotes better sleep quality',
                'Boosts immune system',
                'Improves cardiovascular health',
                'Increases energy and vitality',
                'Enhances mental clarity and focus',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YogaExercise;
