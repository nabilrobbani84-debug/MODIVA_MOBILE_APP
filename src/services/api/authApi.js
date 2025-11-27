/**
 * authApi.js
 * API service untuk authentication
 */

import { api } from './apiClient';
import { API_ENDPOINTS } from '../../utils/constants';

export const authApi = {
  /**
   * Login dengan NISN dan ID Sekolah
   */
  login: async (nisn, schoolId) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, {
        nisn,
        school_id: schoolId,
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
   * Logout
   */
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
      return { success: true };
    } catch (error) {
      // Still return success even if API fails
      // We'll clear local storage anyway
      return { success: true };
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
        refresh_token: refreshToken,
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
   * Verify token validity
   */
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
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
   * Request password reset
   */
  requestPasswordReset: async (nisn, email) => {
    try {
      const response = await api.post('/auth/forgot-password', {
        nisn,
        email,
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
   * Change password
   */
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
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
};

export default authApi;