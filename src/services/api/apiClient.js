/**
 * API Client - Axios instance dengan interceptors
 * Menangani semua request/response ke backend
 */

import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getSecureData, saveSecureData, removeSecureData } from '../storage/secureStorage';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../../utils/constants';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL || 'https://api.modiva.com/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get token from secure storage
      const token = await getSecureData(STORAGE_KEYS.AUTH_TOKEN);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log request in development
      if (__DEV__) {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }
      
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (__DEV__) {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log error in development
    if (__DEV__) {
      console.log('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
    }
    
    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await getSecureData(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (refreshToken) {
          // Try to refresh token
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          
          const { access_token } = response.data;
          
          // Save new token
          await saveSecureData(STORAGE_KEYS.AUTH_TOKEN, access_token);
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        await removeSecureData(STORAGE_KEYS.AUTH_TOKEN);
        await removeSecureData(STORAGE_KEYS.REFRESH_TOKEN);
        await removeSecureData(STORAGE_KEYS.USER_DATA);
        
        // Navigate to login (handled by AuthContext)
        return Promise.reject({
          message: ERROR_MESSAGES.UNAUTHORIZED,
          logout: true,
        });
      }
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      return Promise.reject({
        message: ERROR_MESSAGES.NETWORK,
        code: 'NETWORK_ERROR',
      });
    }
    
    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timeout. Silakan coba lagi.',
        code: 'TIMEOUT',
      });
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error ||
                        ERROR_MESSAGES.SERVER_ERROR;
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// API Methods
export const api = {
  // GET request
  get: (url, config = {}) => {
    return apiClient.get(url, config);
  },
  
  // POST request
  post: (url, data, config = {}) => {
    return apiClient.post(url, data, config);
  },
  
  // PUT request
  put: (url, data, config = {}) => {
    return apiClient.put(url, data, config);
  },
  
  // PATCH request
  patch: (url, data, config = {}) => {
    return apiClient.patch(url, data, config);
  },
  
  // DELETE request
  delete: (url, config = {}) => {
    return apiClient.delete(url, config);
  },
  
  // Upload file with multipart/form-data
  upload: (url, formData, onUploadProgress) => {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },
};

export default apiClient;