/**
 * secureStorage.web.js
 * Implementasi alternatif untuk Web karena react-native-keychain tidak support web.
 * Di web, kita menggunakan AsyncStorage biasa (Note: Ini tidak seaman Keychain native).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data (Menggunakan AsyncStorage untuk Web)
 */
export const saveSecureData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`secure_${key}`, value);
    return { success: true };
  } catch (error) {
    console.error('Error saving secure data (web):', error);
    return { success: false, error };
  }
};

/**
 * Get secure data
 */
export const getSecureData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`secure_${key}`);
    return value;
  } catch (error) {
    console.error('Error getting secure data (web):', error);
    return null;
  }
};

/**
 * Remove secure data
 */
export const removeSecureData = async (key) => {
  try {
    await AsyncStorage.removeItem(`secure_${key}`);
    return { success: true };
  } catch (error) {
    console.error('Error removing secure data (web):', error);
    return { success: false, error };
  }
};

/**
 * Clear all secure data
 */
export const clearAllSecureData = async () => {
  try {
    // Warning: This might clear non-secure items too if keys overlap, 
    // but for this mock implementation it is acceptable or you can implement key filtering
    const keys = await AsyncStorage.getAllKeys();
    const secureKeys = keys.filter(k => k.startsWith('secure_'));
    await AsyncStorage.multiRemove(secureKeys);
    return { success: true };
  } catch (error) {
    console.error('Error clearing all secure data (web):', error);
    return { success: false, error };
  }
};

/**
 * Check if secure data exists
 */
export const hasSecureData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`secure_${key}`);
    return value !== null;
  } catch (error) {
    console.error('Error checking secure data (web):', error);
    return false;
  }
};

/**
 * Save multiple secure data
 */
export const saveMultipleSecureData = async (dataObject) => {
  try {
    const pairs = Object.entries(dataObject).map(([key, value]) => [
      `secure_${key}`,
      typeof value === 'string' ? value : JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
    return { success: true };
  } catch (error) {
    console.error('Error saving multiple secure data (web):', error);
    return { success: false, error };
  }
};

/**
 * Get multiple secure data
 */
export const getMultipleSecureData = async (keys) => {
  try {
    const secureKeys = keys.map(key => `secure_${key}`);
    const results = await AsyncStorage.multiGet(secureKeys);
    
    const data = {};
    results.forEach(([key, value]) => {
      const originalKey = key.replace('secure_', '');
      data[originalKey] = value;
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error getting multiple secure data (web):', error);
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