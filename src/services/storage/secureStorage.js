/**
 * secureStorage.js
 * Secure storage menggunakan react-native-keychain
 * Untuk menyimpan data sensitif seperti token
 */

import * as Keychain from 'react-native-keychain';

/**
 * Save data secara secure
 */
export const saveSecureData = async (key, value) => {
  try {
    await Keychain.setGenericPassword(key, value, {
      service: key,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving secure data:', error);
    return { success: false, error };
  }
};

/**
 * Get secure data
 */
export const getSecureData = async (key) => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: key,
    });
    
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error getting secure data:', error);
    return null;
  }
};

/**
 * Remove secure data
 */
export const removeSecureData = async (key) => {
  try {
    await Keychain.resetGenericPassword({
      service: key,
    });
    return { success: true };
  } catch (error) {
    console.error('Error removing secure data:', error);
    return { success: false, error };
  }
};

/**
 * Clear all secure data
 */
export const clearAllSecureData = async () => {
  try {
    await Keychain.resetGenericPassword();
    return { success: true };
  } catch (error) {
    console.error('Error clearing all secure data:', error);
    return { success: false, error };
  }
};

/**
 * Check if secure data exists
 */
export const hasSecureData = async (key) => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: key,
    });
    return credentials !== false;
  } catch (error) {
    console.error('Error checking secure data:', error);
    return false;
  }
};

/**
 * Save multiple secure data
 */
export const saveMultipleSecureData = async (dataObject) => {
  try {
    const promises = Object.entries(dataObject).map(([key, value]) =>
      saveSecureData(key, typeof value === 'string' ? value : JSON.stringify(value))
    );
    
    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error('Error saving multiple secure data:', error);
    return { success: false, error };
  }
};

/**
 * Get multiple secure data
 */
export const getMultipleSecureData = async (keys) => {
  try {
    const promises = keys.map((key) => getSecureData(key));
    const results = await Promise.all(promises);
    
    const data = {};
    keys.forEach((key, index) => {
      data[key] = results[index];
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error getting multiple secure data:', error);
    return { success: false, error };
  }
};

export default {
  saveSecureData,
  getSecureData,
  removeSecureData,
  clearAllSecureData,
  hasSecureData,
  saveMultipleSecureData,
  getMultipleSecureData,
};