import React, { useState, useEffect } from 'react';
import { Search, Leaf, Info, ExternalLink, Beaker, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { plantAPI } from '../../services/api';
import { toast } from 'sonner';

interface Plant {
  id: number;
  plantName: string;
  scientificName: string;
  uses: string;
  imageUrl: string;
}

const MedicinalPlants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await plantAPI.getAll();
      if (response.data.success) {
        setPlants(response.data.data);
        setFilteredPlants(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
      toast.error('Failed to load medicinal plants');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPlants(plants);
    } else {
      const filtered = plants.filter(plant =>
        plant.plantName.toLowerCase().includes(query.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlants(filtered);
    }
  };

  const plantBenefits = [
    { title: 'Natural Healing', desc: 'Plant-based remedies with minimal side effects', icon: Heart },
    { title: 'Boosts Immunity', desc: 'Strengthens the body\'s natural defense system', icon: Beaker },
    { title: 'Holistic Care', desc: 'Treats the root cause, not just symptoms', icon: Leaf },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-[#43a047]" />
            <span className="text-sm font-medium text-[#43a047]">Ayurvedic Wisdom</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Medicinal <span className="text-[#43a047]">Plants</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the healing power of nature. Explore our comprehensive database of 
            Ayurvedic medicinal plants and their therapeutic uses.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plantBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-[#43a047]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search plants by name or scientific name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-[#43a047]"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">Important Note</p>
            <p className="text-sm text-amber-700">
              While these plants have traditional medicinal uses, consult an Ayurvedic practitioner 
              or healthcare provider before using them for treatment.
            </p>
          </div>
        </div>

        {/* Plants Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No plants found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <Dialog key={plant.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer card-hover border-0 shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <Leaf className="w-20 h-20 text-[#43a047]/50" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-[#43a047]">{plant.plantName}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {plant.scientificName}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {plant.uses}
                      </p>
                      <div className="mt-4 flex items-center text-[#43a047] text-sm font-medium">
                        <span>Learn More</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-[#43a047] flex items-center">
                      <Leaf className="w-6 h-6 mr-2" />
                      {plant.plantName}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-24 h-24 text-[#43a047]/50" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Scientific Name</h4>
                      <p className="text-gray-600 italic">{plant.scientificName}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Beaker className="w-4 h-4 mr-2 text-[#43a047]" />
                        Medicinal Uses
                      </h4>
                      <p className="text-gray-600">{plant.uses}</p>
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

export default MedicinalPlants;
