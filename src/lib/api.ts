import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.patch('/auth/change-password', { currentPassword, newPassword }),
  changeEmail: (currentPassword: string, newEmail: string) =>
    api.patch('/auth/change-email', { currentPassword, newEmail }),
};

export const contactAPI = {
  submit: (data: {
    name: string;
    email?: string;
    mobile: string;
    loanType: string;
    message?: string;
  }) => api.post('/contact/submit', data),
  getAll: (status?: string) =>
    api.get('/contact', { params: { status } }),
  getOne: (id: string) => api.get(`/contact/${id}`),
  updateStatus: (id: string, status: string, notes?: string) =>
    api.patch(`/contact/${id}`, { status, notes }),
  delete: (id: string) => api.delete(`/contact/${id}`),
};

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data: {
    officeAddress: string;
    phone: string;
    email: string;
    businessHours: string;
  }) => api.patch('/settings', data),
};

export const quickAPI = {
  submit: (data: { loanType: string; mobileNumber: string }) =>
    api.post('/quick/submit', data),
  getAll: () => api.get('/quick'),
  updateStatus: (id: string, status: string, notes?: string) =>
    api.patch(`/quick/${id}`, { status, notes }),
  delete: (id: string) => api.delete(`/quick/${id}`),
};

export default api;
