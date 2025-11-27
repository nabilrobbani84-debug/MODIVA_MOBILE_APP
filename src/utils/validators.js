// ========================================
// src/utils/validators.js
// ========================================
/**
 * Validation utilities
 */
import { REGEX } from './constants';

export const validators = {
  /**
   * Validate email
   */
  isValidEmail: (email) => {
    if (!email) return false;
    return REGEX.EMAIL.test(email);
  },

  /**
   * Validate phone number (Indonesia)
   */
  isValidPhone: (phone) => {
    if (!phone) return false;
    return REGEX.PHONE.test(phone);
  },

  /**
   * Validate NISN (10 digits)
   */
  isValidNISN: (nisn) => {
    if (!nisn) return false;
    return REGEX.NISN.test(nisn);
  },

  /**
   * Validate password strength
   */
  isValidPassword: (password) => {
    if (!password) return false;
    // Minimum 8 characters, at least 1 letter and 1 number
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  },

  /**
   * Check if string is empty
   */
  isEmpty: (value) => {
    return !value || value.trim().length === 0;
  },

  /**
   * Validate file size
   */
  isValidFileSize: (fileSize, maxSize = 5 * 1024 * 1024) => {
    return fileSize <= maxSize;
  },

  /**
   * Validate file type
   */
  isValidFileType: (fileType, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']) => {
    return allowedTypes.includes(fileType);
  },

  /**
   * Validate number range
   */
  isInRange: (value, min, max) => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },

  /**
   * Validate height (100-250 cm)
   */
  isValidHeight: (height) => {
    return validators.isInRange(height, 100, 250);
  },

  /**
   * Validate weight (20-200 kg)
   */
  isValidWeight: (weight) => {
    return validators.isInRange(weight, 20, 200);
  },

  /**
   * Validate HB level (5-20 g/dL)
   */
  isValidHB: (hb) => {
    return validators.isInRange(hb, 5, 20);
  },
};

export default validators;