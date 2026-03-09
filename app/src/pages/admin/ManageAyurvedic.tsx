import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit2, Trash2, Search, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { ayurvedicAPI, diseaseAPI } from '../../services/api';
import { toast } from 'sonner';

interface Disease {
  id: number;
  name: string;
}

interface AyurvedicSolution {
  id: number;
  diseaseId: number;
  diseaseName: string;
  herbs: string;
  homeRemedy: string;
  lifestyleChanges: string;
}

const ManageAyurvedic: React.FC = () => {
  const [solutions, setSolutions] = useState<AyurvedicSolution[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<AyurvedicSolution | null>(null);
  const [viewSolution, setViewSolution] = useState<AyurvedicSolution | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    diseaseId: '',
    herbs: '',
    homeRemedy: '',
    lifestyleChanges: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [solutionsRes, diseasesRes] = await Promise.all([
        ayurvedicAPI.getAll(),
        diseaseAPI.getAll(),
      ]);
      if (solutionsRes.data.success) {
        setSolutions(solutionsRes.data.data);
      }
      if (diseasesRes.data.success) {
        setDiseases(diseasesRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedSolution(null);
    setFormData({
      diseaseId: '',
      herbs: '',
      homeRemedy: '',
      lifestyleChanges: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (solution: AyurvedicSolution) => {
    setSelectedSolution(solution);
    setFormData({
      diseaseId: solution.diseaseId.toString(),
      herbs: solution.herbs,
      homeRemedy: solution.homeRemedy,
      lifestyleChanges: solution.lifestyleChanges,
    });
    setIsDialogOpen(true);
  };

  const handleView = (solution: AyurvedicSolution) => {
    setViewSolution(solution);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (solution: AyurvedicSolution) => {
    setSelectedSolution(solution);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedSolution) return;

    try {
      await ayurvedicAPI.delete(selectedSolution.id);
      toast.success('Solution deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting solution:', error);
      toast.error('Failed to delete solution');
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedSolution) {
        await ayurvedicAPI.update(selectedSolution.id, formData);
        toast.success('Solution updated successfully');
      } else {
        await ayurvedicAPI.create(formData);
        toast.success('Solution created successfully');
      }
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving solution:', error);
      toast.error('Failed to save solution');
    }
  };

  const filteredSolutions = solutions.filter((solution) =>
    solution.diseaseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-purple-500" />
              Manage Ayurvedic Solutions
            </h1>
            <p className="text-gray-600 mt-1">Manage Ayurvedic remedies and recommendations</p>
          </div>
          <Button
            onClick={handleAdd}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Solution
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Solutions List */}
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
            {filteredSolutions.map((solution) => (
              <Card
                key={solution.id}
                className="border-0 shadow-md cursor-pointer hover:bg-gray-50"
                onClick={() => handleView(solution)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {solution.diseaseName}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {solution.herbs}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleView(solution); }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleEdit(solution); }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleDelete(solution); }}
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
                {selectedSolution ? 'Edit Solution' : 'Add New Solution'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label>Disease</Label>
                <Select
                  value={formData.diseaseId}
                  onValueChange={(value) => setFormData({ ...formData, diseaseId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select disease" />
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
                <Label htmlFor="herbs">Recommended Herbs</Label>
                <Textarea
                  id="herbs"
                  value={formData.herbs}
                  onChange={(e) => setFormData({ ...formData, herbs: e.target.value })}
                  rows={3}
                  placeholder="List of Ayurvedic herbs..."
                />
              </div>
              <div>
                <Label htmlFor="homeRemedy">Home Remedies</Label>
                <Textarea
                  id="homeRemedy"
                  value={formData.homeRemedy}
                  onChange={(e) => setFormData({ ...formData, homeRemedy: e.target.value })}
                  rows={4}
                  placeholder="Home remedy instructions..."
                />
              </div>
              <div>
                <Label htmlFor="lifestyleChanges">Lifestyle Recommendations</Label>
                <Textarea
                  id="lifestyleChanges"
                  value={formData.lifestyleChanges}
                  onChange={(e) => setFormData({ ...formData, lifestyleChanges: e.target.value })}
                  rows={4}
                  placeholder="Lifestyle changes and recommendations..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1e88e5]">
                  {selectedSolution ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Solution Details</DialogTitle>
            </DialogHeader>
            {viewSolution && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="font-semibold">Disease</Label>
                  <p className="mt-1">{viewSolution.diseaseName}</p>
                </div>
                <div>
                  <Label className="font-semibold">Recommended Herbs</Label>
                  <p className="mt-1 whitespace-pre-line">{viewSolution.herbs}</p>
                </div>
                <div>
                  <Label className="font-semibold">Home Remedies</Label>
                  <p className="mt-1 whitespace-pre-line">{viewSolution.homeRemedy}</p>
                </div>
                <div>
                  <Label className="font-semibold">Lifestyle Recommendations</Label>
                  <p className="mt-1 whitespace-pre-line">{viewSolution.lifestyleChanges}</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This solution will be permanently deleted. This action cannot be undone.
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

export default ManageAyurvedic;
