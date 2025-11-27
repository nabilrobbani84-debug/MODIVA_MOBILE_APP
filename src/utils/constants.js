/**
 * Constants - Konstanta global aplikasi Modiva
 */

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login/siswi',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Dashboard
  DASHBOARD: '/siswi/dashboard',
  
  // Reports
  SUBMIT_REPORT: '/report/submit',
  GET_REPORTS: '/siswi/reports',
  GET_REPORT_TREND: '/siswi/report/trend',
  
  // Profile
  GET_PROFILE: '/siswi/profile',
  UPDATE_PROFILE: '/siswi/profile/update',
  
  // Notifications
  GET_NOTIFICATIONS: '/notifications',
  MARK_AS_READ: '/notifications/read',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REFRESH_TOKEN: 'refresh_token',
  FCM_TOKEN: 'fcm_token',
  LAST_SYNC: 'last_sync',
};

// Status Types
export const REPORT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
};

export const REPORT_STATUS_LABELS = {
  pending: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak',
  completed: 'Selesai',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  REMINDER: 'reminder',
  MOTIVATION: 'motivation',
  REPORT_STATUS: 'report_status',
  HEALTH_TIP: 'health_tip',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png'],
  COMPRESSION_QUALITY: 0.8,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'DD MMMM YYYY HH:mm',
  TIME: 'HH:mm',
};

// HB (Hemoglobin) Ranges
export const HB_RANGES = {
  NORMAL_MIN: 12.0,
  NORMAL_MAX: 16.0,
  LOW: 11.9,
  CRITICAL: 10.0,
};

export const HB_STATUS = {
  NORMAL: 'normal',
  LOW: 'low',
  CRITICAL: 'critical',
  HIGH: 'high',
};

export const HB_STATUS_LABELS = {
  normal: 'Normal',
  low: 'Rendah',
  critical: 'Kritis',
  high: 'Tinggi',
};

// Vitamin Consumption
export const VITAMIN_TARGET = {
  WEEKLY: 1,
  MONTHLY: 4,
  YEARLY: 48,
};

// Chart Configuration
export const CHART_CONFIG = {
  HEIGHT: 220,
  BEZIER: true,
  STROKE_WIDTH: 3,
  LABEL_COLOR: '#9CA3AF',
  GRID_COLOR: '#E5E7EB',
};

// Regex Patterns
export const REGEX = {
  NISN: /^[0-9]{10}$/,
  SCHOOL_ID: /^[A-Z0-9]{6,10}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|62|0)[0-9]{9,12}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
  UNAUTHORIZED: 'Sesi Anda telah berakhir. Silakan login kembali.',
  INVALID_CREDENTIALS: 'NISN atau ID Sekolah tidak valid.',
  FILE_TOO_LARGE: 'Ukuran file terlalu besar. Maksimal 5MB.',
  INVALID_FILE_TYPE: 'Format file tidak didukung. Gunakan JPG atau PNG.',
  REQUIRED_FIELD: 'Field ini wajib diisi.',
  INVALID_DATE: 'Format tanggal tidak valid.',
  SERVER_ERROR: 'Terjadi kesalahan pada server. Coba lagi nanti.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REPORT_SUBMITTED: 'Laporan berhasil dikirim!',
  PROFILE_UPDATED: 'Profil berhasil diperbarui!',
  PHOTO_UPLOADED: 'Foto berhasil diunggah!',
  LOGIN_SUCCESS: 'Login berhasil!',
};

// Screen Names (untuk navigation)
export const SCREENS = {
  // Auth
  LOGIN: 'Login',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main
  DASHBOARD: 'Dashboard',
  REPORT_FORM: 'ReportForm',
  REPORT_HISTORY: 'ReportHistory',
  REPORTS: 'Reports',
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  NOTIFICATIONS: 'Notifications',
  NOTIFICATION_DETAIL: 'NotificationDetail',
  HEALTH_TIP_DETAIL: 'HealthTipDetail',
};

// Tab Names
export const TABS = {
  HOME: 'Home',
  REPORTS: 'Reports',
  NOTIFICATIONS: 'Notifications',
  PROFILE: 'Profile',
};

// Timeout Durations (milliseconds)
export const TIMEOUTS = {
  API_REQUEST: 30000,
  DEBOUNCE: 300,
  TOAST: 3000,
  SPLASH: 2000,
};

// Pagination
export const PAGINATION = {
  PAGE_SIZE: 10,
  INITIAL_PAGE: 1,
};

export default {
  API_ENDPOINTS,
  STORAGE_KEYS,
  REPORT_STATUS,
  NOTIFICATION_TYPES,
  FILE_UPLOAD,
  DATE_FORMATS,
  HB_RANGES,
  VITAMIN_TARGET,
  CHART_CONFIG,
  REGEX,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  SCREENS,
  TABS,
  TIMEOUTS,
  PAGINATION,
};