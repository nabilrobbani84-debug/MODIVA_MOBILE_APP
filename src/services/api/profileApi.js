/**
 * profileApi.js
 * API service untuk profile management
 */

import { api } from './apiClient';
import { API_ENDPOINTS } from '../../utils/constants';

export const profileApi = {
  /**
   * Get user profile
   */
  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_PROFILE);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Update profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Upload profile photo
   */
  uploadProfilePhoto: async (photo) => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        type: photo.type || 'image/jpeg',
        name: photo.fileName || 'profile.jpg',
      });

      const response = await api.upload('/profile/photo', formData);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Delete profile photo
   */
  deleteProfilePhoto: async () => {
    try {
      const response = await api.delete('/profile/photo');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Update health data (height, weight, HB)
   */
  updateHealthData: async (healthData) => {
    try {
      const response = await api.put('/profile/health', healthData);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Get profile statistics
   */
  getProfileStats: async () => {
    try {
      const response = await api.get('/profile/statistics');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Update notification preferences
   */
  updateNotificationPreferences: async (preferences) => {
    try {
      const response = await api.put('/profile/notifications', preferences);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Get notification preferences
   */
  getNotificationPreferences: async () => {
    try {
      const response = await api.get('/profile/notifications');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await api.post('/profile/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  /**
   * Update contact information
   */
  updateContactInfo: async (contactData) => {
    try {
      const response = await api.put('/profile/contact', contactData);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export default profileApi;