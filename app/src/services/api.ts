import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('wellspring_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('wellspring_token');
          localStorage.removeItem('wellspring_user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('API error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

// Disease API
export const diseaseAPI = {
  getAll: () =>
    api.get('/diseases'),
  
  getById: (id: number) =>
    api.get(`/diseases/${id}`),
  
  search: (keyword: string) =>
    api.get(`/diseases/search?keyword=${keyword}`),
  
  create: (data: any) =>
    api.post('/diseases', data),
  
  update: (id: number, data: any) =>
    api.put(`/diseases/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/diseases/${id}`),
};

// Medicinal Plant API
export const plantAPI = {
  getAll: () =>
    api.get('/plants'),
  
  getById: (id: number) =>
    api.get(`/plants/${id}`),
  
  search: (keyword: string) =>
    api.get(`/plants/search?keyword=${keyword}`),
  
  create: (data: any) =>
    api.post('/plants', data),
  
  update: (id: number, data: any) =>
    api.put(`/plants/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/plants/${id}`),
};

// Diet Plan API
export const dietPlanAPI = {
  getAll: () =>
    api.get('/diet-plans'),
  
  getById: (id: number) =>
    api.get(`/diet-plans/${id}`),
  
  getByDisease: (diseaseId: number) =>
    api.get(`/diet-plans/disease/${diseaseId}`),
  
  getByFilter: (diseaseId: number, ageGroup: string, type: string) =>
    api.get(`/diet-plans/filter?diseaseId=${diseaseId}&ageGroup=${ageGroup}&type=${type}`),
  
  create: (data: any) =>
    api.post('/diet-plans', data),
  
  update: (id: number, data: any) =>
    api.put(`/diet-plans/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/diet-plans/${id}`),
};

// Ayurvedic Solution API
export const ayurvedicAPI = {
  getAll: () =>
    api.get('/ayurvedic'),
  
  getById: (id: number) =>
    api.get(`/ayurvedic/${id}`),
  
  getByDisease: (diseaseId: number) =>
    api.get(`/ayurvedic/disease/${diseaseId}`),
  
  create: (data: any) =>
    api.post('/ayurvedic', data),
  
  update: (id: number, data: any) =>
    api.put(`/ayurvedic/${id}`, data),
  
  delete: (id: number) =>
    api.delete(`/ayurvedic/${id}`),
};

// Support Message API
export const supportAPI = {
  getAll: () =>
    api.get('/support'),
  
  getById: (id: number) =>
    api.get(`/support/${id}`),
  
  create: (data: any) =>
    api.post('/support', data),
  
  delete: (id: number) =>
    api.delete(`/support/${id}`),
};

// Symptom Checker API
export const symptomAPI = {
  analyze: (symptoms: string) =>
    api.post('/symptoms/analyze', { symptoms }),
  
  quickCheck: (symptoms: string) =>
    api.get(`/symptoms/check?symptoms=${encodeURIComponent(symptoms)}`),
};

// Health Check API
export const healthAPI = {
  check: () =>
    api.get('/health'),
};

export default api;
