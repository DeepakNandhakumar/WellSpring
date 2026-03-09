import React, { useState, useEffect } from 'react';
import { Search, Activity, AlertCircle, Shield, Info, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { diseaseAPI } from '../../services/api';
import { toast } from 'sonner';

interface Disease {
  id: number;
  name: string;
  description: string;
  symptoms: string;
  causes: string;
  prevention: string;
}

const DiseaseInfo: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [filteredDiseases, setFilteredDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [, setSelectedDisease] = useState<Disease | null>(null);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      const response = await diseaseAPI.getAll();
      if (response.data.success) {
        setDiseases(response.data.data);
        setFilteredDiseases(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching diseases:', error);
      toast.error('Failed to load diseases');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredDiseases(diseases);
    } else {
      const filtered = diseases.filter(disease =>
        disease.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDiseases(filtered);
    }
  };

  const diseaseCategories = [
    { name: 'Chronic Conditions', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Lifestyle Diseases', icon: Shield, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Preventable Diseases', icon: Info, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Disease <span className="text-[#1e88e5]">Information</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about various diseases, their symptoms, causes, and preventive measures. 
            Knowledge is the first step towards prevention.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search diseases..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-[#1e88e5]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {diseaseCategories.map((category, index) => (
            <div
              key={index}
              className={`${category.bg} rounded-xl p-6 flex items-center space-x-4`}
            >
              <div className={`w-12 h-12 rounded-lg ${category.bg} flex items-center justify-center`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{category.name}</p>
                <p className="text-sm text-gray-600">Learn more</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">Medical Disclaimer</p>
            <p className="text-sm text-amber-700">
              The information provided is for educational purposes only and should not be 
              considered as medical advice. Always consult a healthcare professional for diagnosis and treatment.
            </p>
          </div>
        </div>

        {/* Diseases Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredDiseases.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No diseases found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <Dialog key={disease.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer card-hover border-0 shadow-md"
                    onClick={() => setSelectedDisease(disease)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-[#1e88e5] flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        {disease.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {disease.description}
                      </p>
                      <div className="mt-4 flex items-center text-[#1e88e5] text-sm font-medium">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-[#1e88e5] flex items-center">
                      <Activity className="w-6 h-6 mr-2" />
                      {disease.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                      <p className="text-gray-600">{disease.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                        Symptoms
                      </h4>
                      <p className="text-gray-600">{disease.symptoms}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Info className="w-4 h-4 mr-2 text-blue-500" />
                        Causes
                      </h4>
                      <p className="text-gray-600">{disease.causes}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-green-500" />
                        Prevention
                      </h4>
                      <p className="text-gray-600">{disease.prevention}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseInfo;
