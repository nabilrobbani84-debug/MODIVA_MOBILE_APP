/**
 * UserContext
 * Mengelola state user data dan profile
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import profileApi from '../services/api/profileApi';
import { useAuth } from './AuthContext';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { user: authUser, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Load user data when authenticated
  useEffect(() => {
    if (isAuthenticated && authUser) {
      loadUserData();
      loadUserStats();
    } else {
      setUserData(null);
      setStats(null);
    }
  }, [isAuthenticated, authUser]);

  // Load user data from API
  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const result = await profileApi.getProfile();
      
      if (result.success) {
        setUserData(result.data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user statistics
  const loadUserStats = async () => {
    try {
      const result = await profileApi.getProfileStats();
      
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  // Update user data
  const updateUserData = async (newData) => {
    try {
      setIsLoading(true);
      const result = await profileApi.updateProfile(newData);
      
      if (result.success) {
        setUserData(result.data);
        return { success: true };
      }
      
      return { success: false, message: result.message };
    } catch (error) {
      console.error('Error updating user data:', error);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update health data
  const updateHealthData = async (healthData) => {
    try {
      setIsLoading(true);
      const result = await profileApi.updateHealthData(healthData);
      
      if (result.success) {
        setUserData(prev => ({ ...prev, ...result.data }));
        return { success: true };
      }
      
      return { success: false, message: result.message };
    } catch (error) {
      console.error('Error updating health data:', error);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Upload profile photo
  const uploadProfilePhoto = async (photo) => {
    try {
      setIsLoading(true);
      const result = await profileApi.uploadProfilePhoto(photo);
      
      if (result.success) {
        setUserData(prev => ({ ...prev, photo: result.data.photo_url }));
        return { success: true, photoUrl: result.data.photo_url };
      }
      
      return { success: false, message: result.message };
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    await loadUserData();
    await loadUserStats();
  };

  const value = {
    userData: userData || authUser,
    stats,
    isLoading,
    updateUserData,
    updateHealthData,
    uploadProfilePhoto,
    refreshUserData,
    loadUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook untuk menggunakan UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
};

export default UserContext;