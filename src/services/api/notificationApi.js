/**
 * notificationApi.js
 * API service untuk notification management
 */

import { api } from './apiClient';
import { API_ENDPOINTS } from '../../utils/constants';

export const notificationApi = {
  /**
   * Get all notifications dengan filter
   */
  getNotifications: async (filter = 'all', page = 1, limit = 20) => {
    try {
      const params = {
        page,
        limit,
      };

      if (filter !== 'all') {
        params.filter = filter; // unread, read
      }

      const response = await api.get(API_ENDPOINTS.GET_NOTIFICATIONS, { params });

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
   * Get notification detail
   */
  getNotificationDetail: async (notificationId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_NOTIFICATIONS}/${notificationId}`);

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
   * Mark notification as read
   */
  markAsRead: async (notificationId) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.MARK_AS_READ}/${notificationId}`);

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
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    try {
      const response = await api.post(`${API_ENDPOINTS.MARK_AS_READ}/all`);

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
   * Delete notification
   */
  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.GET_NOTIFICATIONS}/${notificationId}`);

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
   * Delete all notifications
   */
  deleteAllNotifications: async () => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.GET_NOTIFICATIONS}/all`);

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
   * Get unread count
   */
  getUnreadCount: async () => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_NOTIFICATIONS}/unread-count`);

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
   * Register FCM token untuk push notifications
   */
  registerFCMToken: async (token, deviceInfo) => {
    try {
      const response = await api.post('/notifications/register-token', {
        fcm_token: token,
        device_info: deviceInfo,
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
   * Unregister FCM token
   */
  unregisterFCMToken: async (token) => {
    try {
      const response = await api.post('/notifications/unregister-token', {
        fcm_token: token,
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
   * Update notification settings
   */
  updateSettings: async (settings) => {
    try {
      const response = await api.put('/notifications/settings', settings);

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
   * Get notification settings
   */
  getSettings: async () => {
    try {
      const response = await api.get('/notifications/settings');

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

export default notificationApi;