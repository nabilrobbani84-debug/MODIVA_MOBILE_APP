// ========================================
// src/utils/dateFormatter.js
// ========================================
/**
 * Date formatting utilities
 */
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('id');

export const dateFormatter = {
  /**
   * Format date to readable string
   * @param {Date|string} date
   * @param {string} format - default: 'DD MMMM YYYY'
   */
  format: (date, format = 'DD MMMM YYYY') => {
    if (!date) return '';
    return dayjs(date).format(format);
  },

  /**
   * Format date for API (YYYY-MM-DD)
   */
  toApiFormat: (date) => {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },

  /**
   * Format date with time
   */
  formatDateTime: (date) => {
    if (!date) return '';
    return dayjs(date).format('DD MMMM YYYY, HH:mm');
  },

  /**
   * Format time only
   */
  formatTime: (date) => {
    if (!date) return '';
    return dayjs(date).format('HH:mm');
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  fromNow: (date) => {
    if (!date) return '';
    return dayjs(date).fromNow();
  },

  /**
   * Check if date is today
   */
  isToday: (date) => {
    return dayjs(date).isSame(dayjs(), 'day');
  },

  /**
   * Check if date is yesterday
   */
  isYesterday: (date) => {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
  },

  /**
   * Get day name
   */
  getDayName: (date) => {
    if (!date) return '';
    return dayjs(date).format('dddd');
  },

  /**
   * Get month name
   */
  getMonthName: (date) => {
    if (!date) return '';
    return dayjs(date).format('MMMM');
  },

  /**
   * Parse date string
   */
  parse: (dateString) => {
    return dayjs(dateString).toDate();
  },
};

export default dateFormatter;