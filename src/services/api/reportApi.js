/**
 * reportApi.js
 * API service untuk report management
 */

import { api } from './apiClient';
import { API_ENDPOINTS } from '../../utils/constants';

export const reportApi = {
  /**
   * Submit report konsumsi vitamin dengan foto
   */
  submitReport: async (formData) => {
    try {
      const response = await api.upload(API_ENDPOINTS.SUBMIT_REPORT, formData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted + '%');
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
   * Get report history dengan pagination
   */
  getReportHistory: async (page = 1, limit = 10, status = 'all') => {
    try {
      const params = {
        page,
        limit,
      };

      if (status !== 'all') {
        params.status = status;
      }

      const response = await api.get(API_ENDPOINTS.GET_REPORTS, { params });

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
   * Get report detail by ID
   */
  getReportDetail: async (reportId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_REPORTS}/${reportId}`);

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
   * Get HB trend data untuk chart
   */
  getHBTrend: async (period = '7days') => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_REPORT_TREND, {
        params: { period },
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
   * Update report (edit)
   */
  updateReport: async (reportId, formData) => {
    try {
      const response = await api.upload(
        `${API_ENDPOINTS.SUBMIT_REPORT}/${reportId}`,
        formData
      );

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
   * Delete report
   */
  deleteReport: async (reportId) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.SUBMIT_REPORT}/${reportId}`);

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
   * Get student reports (untuk admin/detailed view)
   */
  getStudentReports: async () => {
    try {
      const response = await api.get('/reports/student-detail');

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
   * Get report statistics
   */
  getReportStats: async () => {
    try {
      const response = await api.get('/reports/statistics');

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
   * Download report as PDF
   */
  downloadReport: async (reportId) => {
    try {
      const response = await api.get(`/reports/${reportId}/download`, {
        responseType: 'blob',
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

export default reportApi;