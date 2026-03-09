import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/public/Home';
import DiseaseInfo from './pages/public/DiseaseInfo';
import MedicinalPlants from './pages/public/MedicinalPlants';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Terms from './pages/public/Terms';
import NotFound from './pages/public/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import NutroDiet from './pages/dashboard/NutroDiet';
import Ayurvedic from './pages/dashboard/Ayurvedic';
import BMI from './pages/dashboard/BMI';
import SleepChecker from './pages/dashboard/SleepChecker';
import YogaExercise from './pages/dashboard/YogaExercise';
import SymptomChecker from './pages/dashboard/SymptomChecker';
import HealthTodo from './pages/dashboard/HealthTodo';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDiseases from './pages/admin/ManageDiseases';
import ManageDietPlans from './pages/admin/ManageDietPlans';
import ManagePlants from './pages/admin/ManagePlants';
import ManageAyurvedic from './pages/admin/ManageAyurvedic';
import ViewSupportMessages from './pages/admin/ViewSupportMessages';

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

// Dashboard Layout
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-grow pt-20">
      {children}
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

// App Routes Component
const AppRoutes: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/diseases" element={<Layout><DiseaseInfo /></Layout>} />
      <Route path="/plants" element={<Layout><MedicinalPlants /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />

      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={isAdmin ? '/admin' : '/dashboard'} /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to={isAdmin ? '/admin' : '/dashboard'} /> : <Register />} 
      />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/diet" element={<ProtectedRoute><DashboardLayout><NutroDiet /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/ayurvedic" element={<ProtectedRoute><DashboardLayout><Ayurvedic /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/bmi" element={<ProtectedRoute><DashboardLayout><BMI /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/sleep" element={<ProtectedRoute><DashboardLayout><SleepChecker /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/yoga" element={<ProtectedRoute><DashboardLayout><YogaExercise /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/symptom-checker" element={<ProtectedRoute><DashboardLayout><SymptomChecker /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/todo" element={<ProtectedRoute><DashboardLayout><HealthTodo /></DashboardLayout></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><DashboardLayout><AdminDashboard /></DashboardLayout></AdminRoute>} />
      <Route path="/admin/diseases" element={<AdminRoute><DashboardLayout><ManageDiseases /></DashboardLayout></AdminRoute>} />
      <Route path="/admin/diet-plans" element={<AdminRoute><DashboardLayout><ManageDietPlans /></DashboardLayout></AdminRoute>} />
      <Route path="/admin/plants" element={<AdminRoute><DashboardLayout><ManagePlants /></DashboardLayout></AdminRoute>} />
      <Route path="/admin/ayurvedic" element={<AdminRoute><DashboardLayout><ManageAyurvedic /></DashboardLayout></AdminRoute>} />
      <Route path="/admin/messages" element={<AdminRoute><DashboardLayout><ViewSupportMessages /></DashboardLayout></AdminRoute>} />

      {/* 404 Route */}
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;
