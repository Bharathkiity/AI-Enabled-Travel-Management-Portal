import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds - reasonable timeout for AI requests
});

// Public endpoints that don't need tokens
const publicEndpoints = [
  '/auth/login',
  '/auth/register'
];

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method.toUpperCase()} request to: ${config.url}`);
    
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url.includes(endpoint)
    );
    
    if (!isPublicEndpoint) {
      const token = localStorage.getItem('token');
      if (token) {
        const cleanToken = token.replace(/"/g, '');
        config.headers.Authorization = `Bearer ${cleanToken}`;
        console.log('✅ Token attached to request');
      }
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with PROPER TIMEOUT HANDLING
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    // Check if it's a timeout error
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout:', error.message);
      toast.error('Request timeout. The server is taking too long to respond.');
      
      // You can add custom retry logic here if needed
      // For AI requests, you might want to show a specific message
      if (error.config.url.includes('/ai/')) {
        toast.error('AI service is taking longer than expected. Please try again.');
      }
      
      return Promise.reject(error);
    }
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('❌ Error response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
      
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      } else if (error.response.status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (error.response.status === 404) {
        toast.error('Resource not found.');
      } else if (error.response.status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('❌ No response received:', error.request);
      
      // Check if it's a CORS error
      if (error.message.includes('CORS')) {
        toast.error('CORS error. Please check backend configuration.');
      } else {
        toast.error('Cannot connect to server. Is the backend running?');
      }
    } else {
      // Something happened in setting up the request
      console.error('❌ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;