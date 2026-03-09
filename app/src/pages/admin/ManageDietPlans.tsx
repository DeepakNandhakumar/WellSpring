import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Edit2, Trash2, Search } from 'lucide-react';
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
import { dietPlanAPI, diseaseAPI } from '../../services/api';
import { toast } from 'sonner';

interface Disease {
  id: number;
  name: string;
}

interface DietPlan {
  id: number;
  diseaseId: number;
  diseaseName: string;
  ageGroup: string;
  type: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  avoidFood: string;
}

const ManageDietPlans: React.FC = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);
  const [formData, setFormData] = useState({
    diseaseId: '',
    ageGroup: '',
    type: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    avoidFood: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansRes, diseasesRes] = await Promise.all([
        dietPlanAPI.getAll(),
        diseaseAPI.getAll(),
      ]);
      if (plansRes.data.success) {
        setDietPlans(plansRes.data.data);
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
    setSelectedPlan(null);
    setFormData({
      diseaseId: '',
      ageGroup: '',
      type: '',
      breakfast: '',
      lunch: '',
      dinner: '',
      avoidFood: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (plan: DietPlan) => {
    setSelectedPlan(plan);
    setFormData({
      diseaseId: plan.diseaseId.toString(),
      ageGroup: plan.ageGroup,
      type: plan.type,
      breakfast: plan.breakfast,
      lunch: plan.lunch,
      dinner: plan.dinner,
      avoidFood: plan.avoidFood,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (plan: DietPlan) => {
    setSelectedPlan(plan);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPlan) return;

    try {
      await dietPlanAPI.delete(selectedPlan.id);
      toast.success('Diet plan deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting diet plan:', error);
      toast.error('Failed to delete diet plan');
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedPlan) {
        await dietPlanAPI.update(selectedPlan.id, formData);
        toast.success('Diet plan updated successfully');
      } else {
        await dietPlanAPI.create(formData);
        toast.success('Diet plan created successfully');
      }
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving diet plan:', error);
      toast.error('Failed to save diet plan');
    }
  };

  const filteredPlans = dietPlans.filter((plan) =>
    plan.diseaseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-orange-500" />
              Manage Diet Plans
            </h1>
            <p className="text-gray-600 mt-1">Create and manage diet recommendations</p>
          </div>
          <Button
            onClick={handleAdd}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Diet Plan
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search diet plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Diet Plans List */}
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
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {plan.diseaseName} - {plan.ageGroup}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {plan.type === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(plan)}
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
                {selectedPlan ? 'Edit Diet Plan' : 'Add New Diet Plan'}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Age Group</Label>
                  <Select
                    value={formData.ageGroup}
                    onValueChange={(value) => setFormData({ ...formData, ageGroup: value })}
                  >
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
                  <Label>Diet Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VEG">Vegetarian</SelectItem>
                      <SelectItem value="NONVEG">Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="breakfast">Breakfast</Label>
                <Textarea
                  id="breakfast"
                  value={formData.breakfast}
                  onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="lunch">Lunch</Label>
                <Textarea
                  id="lunch"
                  value={formData.lunch}
                  onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="dinner">Dinner</Label>
                <Textarea
                  id="dinner"
                  value={formData.dinner}
                  onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="avoidFood">Foods to Avoid</Label>
                <Textarea
                  id="avoidFood"
                  value={formData.avoidFood}
                  onChange={(e) => setFormData({ ...formData, avoidFood: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#1e88e5]">
                  {selectedPlan ? 'Update' : 'Create'}
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
                This diet plan will be permanently deleted. This action cannot be undone.
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

export default ManageDietPlans;
