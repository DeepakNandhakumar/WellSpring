import React, { useState, useEffect } from 'react';
import { Activity, Plus, Edit2, Trash2, Search } from 'lucide-react';
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

const ManageDiseases: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    symptoms: '',
    causes: '',
    prevention: '',
  });

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      const response = await diseaseAPI.getAll();
      if (response.data.success) {
        setDiseases(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching diseases:', error);
      toast.error('Failed to load diseases');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedDisease(null);
    setFormData({
      name: '',
      description: '',
      symptoms: '',
      causes: '',
      prevention: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (disease: Disease) => {
    setSelectedDisease(disease);
    setFormData({
      name: disease.name,
      description: disease.description,
      symptoms: disease.symptoms,
      causes: disease.causes,
      prevention: disease.prevention,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (disease: Disease) => {
    setSelectedDisease(disease);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDisease) return;

    try {
      await diseaseAPI.delete(selectedDisease.id);
      toast.success('Disease deleted successfully');
      fetchDiseases();
    } catch (error) {
      console.error('Error deleting disease:', error);
      toast.error('Failed to delete disease');
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedDisease) {
        await diseaseAPI.update(selectedDisease.id, formData);
        toast.success('Disease updated successfully');
      } else {
        await diseaseAPI.create(formData);
        toast.success('Disease created successfully');
      }
      setIsDialogOpen(false);
      fetchDiseases();
    } catch (error) {
      console.error('Error saving disease:', error);
      toast.error('Failed to save disease');
    }
  };

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Activity className="w-8 h-8 mr-3 text-red-500" />
              Manage Diseases
            </h1>
            <p className="text-gray-600 mt-1">Add, edit, or remove disease information</p>
          </div>
          <Button
            onClick={handleAdd}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Disease
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search diseases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Diseases List */}
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
            {filteredDiseases.map((disease) => (
              <Card key={disease.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{disease.name}</h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {disease.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(disease)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(disease)}
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
                {selectedDisease ? 'Edit Disease' : 'Add New Disease'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Disease Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="causes">Causes</Label>
                <Textarea
                  id="causes"
                  value={formData.causes}
                  onChange={(e) => setFormData({ ...formData, causes: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="prevention">Prevention</Label>
                <Textarea
                  id="prevention"
                  value={formData.prevention}
                  onChange={(e) => setFormData({ ...formData, prevention: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1e88e5]">
                  {selectedDisease ? 'Update' : 'Create'}
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
                This will permanently delete &quot;{selectedDisease?.name}&quot;. This action cannot be undone.
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

export default ManageDiseases;
