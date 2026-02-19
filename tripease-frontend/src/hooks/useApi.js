import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        ...options
      });
      
      if (options.showSuccessToast) {
        toast.success(options.successMessage || 'Operation successful');
      }
      
      return { data: response.data, error: null };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      
      if (options.showErrorToast !== false) {
        toast.error(errorMessage);
      }
      
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (url, options) => request('get', url, null, options),
    post: (url, data, options) => request('post', url, data, options),
    put: (url, data, options) => request('put', url, data, options),
    delete: (url, options) => request('delete', url, null, options)
  };
};