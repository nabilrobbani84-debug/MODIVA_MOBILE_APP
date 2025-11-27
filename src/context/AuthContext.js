/**
 * AuthContext - Mengelola state autentikasi user
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../services/api/authApi';
import { getSecureData, saveSecureData, removeSecureData } from '../services/storage/secureStorage';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in (on app start)
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getSecureData(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await getSecureData(STORAGE_KEYS.USER_DATA);
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Check auth status error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (nisn, schoolId) => {
    try {
      setIsLoading(true);
      
      const response = await authApi.login(nisn, schoolId);
      
      if (response.success) {
        // PERBAIKAN: Rename 'user' menjadi 'authUser' untuk menghindari shadowing state 'user'
        const { access_token, refresh_token, user: authUser } = response.data;
        
        // Save to secure storage
        await saveSecureData(STORAGE_KEYS.AUTH_TOKEN, access_token);
        await saveSecureData(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
        await saveSecureData(STORAGE_KEYS.USER_DATA, JSON.stringify(authUser));
        
        // Update state
        setUser(authUser);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return {
          success: false,
          message: response.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.SERVER_ERROR,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Call logout API
      await authApi.logout();
      
      // Clear storage
      await removeSecureData(STORAGE_KEYS.AUTH_TOKEN);
      await removeSecureData(STORAGE_KEYS.REFRESH_TOKEN);
      await removeSecureData(STORAGE_KEYS.USER_DATA);
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      // Even if API call fails, logout locally
      await removeSecureData(STORAGE_KEYS.AUTH_TOKEN);
      await removeSecureData(STORAGE_KEYS.REFRESH_TOKEN);
      await removeSecureData(STORAGE_KEYS.USER_DATA);
      
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user data
  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      await saveSecureData(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui data user',
      };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

export default AuthContext;