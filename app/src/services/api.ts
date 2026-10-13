import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
).replace(/\/+$/, '');

const AUTH_PATHS = ['/auth/login', '/auth/register'];

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('wellspring_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? '';
    const isAuthSubmission = AUTH_PATHS.some((path) => requestUrl.includes(path));

    // A failed login (401) is a normal form error, not an expired session.
    // Only redirect when an existing authenticated session is rejected.
    if (
      status === 401 &&
      !isAuthSubmission &&
      localStorage.getItem('wellspring_token')
    ) {
      localStorage.removeItem('wellspring_token');
      localStorage.removeItem('wellspring_user');

      if (!['/login', '/register'].includes(window.location.pathname)) {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

// Disease API
export const diseaseAPI = {
  getAll: () => api.get('/diseases'),
  getById: (id: number) => api.get(`/diseases/${id}`),
  search: (keyword: string) =>
    api.get('/diseases/search', { params: { keyword } }),
  create: (data: unknown) => api.post('/diseases', data),
  update: (id: number, data: unknown) => api.put(`/diseases/${id}`, data),
  delete: (id: number) => api.delete(`/diseases/${id}`),
};

// Medicinal Plant API
export const plantAPI = {
  getAll: () => api.get('/plants'),
  getById: (id: number) => api.get(`/plants/${id}`),
  search: (keyword: string) =>
    api.get('/plants/search', { params: { keyword } }),
  create: (data: unknown) => api.post('/plants', data),
  update: (id: number, data: unknown) => api.put(`/plants/${id}`, data),
  delete: (id: number) => api.delete(`/plants/${id}`),
};

// Diet Plan API
export const dietPlanAPI = {
  getAll: () => api.get('/diet-plans'),
  getById: (id: number) => api.get(`/diet-plans/${id}`),
  getByDisease: (diseaseId: number) =>
    api.get(`/diet-plans/disease/${diseaseId}`),
  getByFilter: (diseaseId: number, ageGroup: string, type: string) =>
    api.get('/diet-plans/filter', { params: { diseaseId, ageGroup, type } }),
  create: (data: unknown) => api.post('/diet-plans', data),
  update: (id: number, data: unknown) => api.put(`/diet-plans/${id}`, data),
  delete: (id: number) => api.delete(`/diet-plans/${id}`),
};

// Ayurvedic Solution API
export const ayurvedicAPI = {
  getAll: () => api.get('/ayurvedic'),
  getById: (id: number) => api.get(`/ayurvedic/${id}`),
  getByDisease: (diseaseId: number) =>
    api.get(`/ayurvedic/disease/${diseaseId}`),
  create: (data: unknown) => api.post('/ayurvedic', data),
  update: (id: number, data: unknown) => api.put(`/ayurvedic/${id}`, data),
  delete: (id: number) => api.delete(`/ayurvedic/${id}`),
};

// Support Message API
export const supportAPI = {
  getAll: () => api.get('/support'),
  getById: (id: number) => api.get(`/support/${id}`),
  create: (data: unknown) => api.post('/support', data),
  delete: (id: number) => api.delete(`/support/${id}`),
};

// Symptom Checker API
export const symptomAPI = {
  analyze: (symptoms: string) => api.post('/symptoms/analyze', { symptoms }),
  quickCheck: (symptoms: string) =>
    api.get('/symptoms/check', { params: { symptoms } }),
};

// Health Check API
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
