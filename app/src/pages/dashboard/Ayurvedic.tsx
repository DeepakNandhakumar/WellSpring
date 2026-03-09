import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Leaf, AlertCircle, Info, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { diseaseAPI, ayurvedicAPI } from '../../services/api';
import { toast } from 'sonner';

interface Disease {
  id: number;
  name: string;
}

interface AyurvedicSolution {
  id: number;
  diseaseName: string;
  herbs: string;
  homeRemedy: string;
  lifestyleChanges: string;
}

const Ayurvedic: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [solution, setSolution] = useState<AyurvedicSolution | null>(null);
  const [loading, setLoading] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // whenever user picks a disease we automatically fetch the solution
  useEffect(() => {
    if (selectedDisease) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDisease]);

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
    if (!selectedDisease) {
      toast.error('Please select a health condition');
      return;
    }

    try {
      setLoading(true);
      const response = await ayurvedicAPI.getByDisease(parseInt(selectedDisease));
      if (response.data.success) {
        const data = response.data.data;
        // API might return an array or single object depending on backend implementation
        if (Array.isArray(data)) {
          setSolution(data.length > 0 ? data[0] : null);
        } else {
          setSolution(data);
        }
      }
    } catch (error) {
      console.error('Error fetching ayurvedic solution:', error);
      toast.error('No Ayurvedic solution found for this condition');
      setSolution(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-purple-500" />
            Ayurvedic Solutions
          </h1>
          <p className="text-gray-600">
            Discover traditional Ayurvedic remedies and lifestyle recommendations for holistic healing.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">Ayurvedic Disclaimer</p>
            <p className="text-sm text-amber-700">
              These remedies are based on traditional Ayurvedic practices. Consult an Ayurvedic 
              practitioner before using any herbs or remedies, especially if you have existing 
              health conditions or are taking medications.
            </p>
          </div>
        </div>

        {/* Search Form */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Health Condition
                </label>
                <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a condition" />
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
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-violet-500 hover:opacity-90 text-white"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Loading...
                    </span>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Find Solution
                    </>
                  )}
                </Button>
              </div>

              {/* note: selection triggers search automatically now */}
            </div>
          </CardContent>
        </Card>

        {/* Solution Display */}
        {solution && (
          <>
            <div
              className="space-y-6 cursor-pointer"
              onClick={() => setIsViewDialogOpen(true)}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Ayurvedic Solution for {solution.diseaseName}
              </h2>

              {/* Herbs */}
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-lg flex items-center text-green-800">
                    <Leaf className="w-5 h-5 mr-2" />
                    Recommended Herbs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">{solution.herbs}</p>
                </CardContent>
              </Card>

              {/* Home Remedy */}
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle className="text-lg flex items-center text-amber-800">
                    <Heart className="w-5 h-5 mr-2" />
                    Home Remedies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 whitespace-pre-line">{solution.homeRemedy}</p>
                </CardContent>
              </Card>

              {/* Lifestyle Changes */}
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-lg flex items-center text-blue-800">
                    <Info className="w-5 h-5 mr-2" />
                    Lifestyle Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 whitespace-pre-line">{solution.lifestyleChanges}</p>
                </CardContent>
              </Card>
            </div>

            {/* view dialog for user */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Solution Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label className="font-semibold">Disease</Label>
                    <p className="mt-1">{solution.diseaseName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Recommended Herbs</Label>
                    <p className="mt-1 whitespace-pre-line">{solution.herbs}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Home Remedies</Label>
                    <p className="mt-1 whitespace-pre-line">{solution.homeRemedy}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Lifestyle Recommendations</Label>
                    <p className="mt-1 whitespace-pre-line">{solution.lifestyleChanges}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* Introduction when no solution */}
        {!solution && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Explore Ayurvedic Wisdom
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Select a health condition above to discover traditional Ayurvedic remedies, 
              recommended herbs, and lifestyle changes for holistic healing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ayurvedic;
