import React, { useState, useEffect } from 'react';
import { Leaf, Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { plantAPI } from '../../services/api';
import { toast } from 'sonner';

interface Plant {
  id: number;
  plantName: string;
  scientificName: string;
  uses: string;
  imageUrl: string;
}

const ManagePlants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [formData, setFormData] = useState({
    plantName: '',
    scientificName: '',
    uses: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await plantAPI.getAll();
      if (response.data.success) {
        setPlants(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
      toast.error('Failed to load plants');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedPlant(null);
    setFormData({
      plantName: '',
      scientificName: '',
      uses: '',
      imageUrl: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (plant: Plant) => {
    setSelectedPlant(plant);
    setFormData({
      plantName: plant.plantName,
      scientificName: plant.scientificName,
      uses: plant.uses,
      imageUrl: plant.imageUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPlant) return;

    try {
      await plantAPI.delete(selectedPlant.id);
      toast.success('Plant deleted successfully');
      fetchPlants();
    } catch (error) {
      console.error('Error deleting plant:', error);
      toast.error('Failed to delete plant');
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedPlant) {
        await plantAPI.update(selectedPlant.id, formData);
        toast.success('Plant updated successfully');
      } else {
        await plantAPI.create(formData);
        toast.success('Plant created successfully');
      }
      setIsDialogOpen(false);
      fetchPlants();
    } catch (error) {
      console.error('Error saving plant:', error);
      toast.error('Failed to save plant');
    }
  };

  const filteredPlants = plants.filter((plant) =>
    plant.plantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Leaf className="w-8 h-8 mr-3 text-green-500" />
              Manage Plants
            </h1>
            <p className="text-gray-600 mt-1">Update medicinal plant database</p>
          </div>
          <Button
            onClick={handleAdd}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Plant
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Plants List */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPlants.map((plant) => (
              <Card key={plant.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{plant.plantName}</h3>
                      <p className="text-gray-500 text-sm italic">{plant.scientificName}</p>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {plant.uses}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plant)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(plant)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPlant ? 'Edit Plant' : 'Add New Plant'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="plantName">Plant Name</Label>
                <Input
                  id="plantName"
                  value={formData.plantName}
                  onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="scientificName">Scientific Name</Label>
                <Input
                  id="scientificName"
                  value={formData.scientificName}
                  onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="uses">Medicinal Uses</Label>
                <Textarea
                  id="uses"
                  value={formData.uses}
                  onChange={(e) => setFormData({ ...formData, uses: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1e88e5]">
                  {selectedPlant ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete &quot;{selectedPlant?.plantName}&quot;. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ManagePlants;
