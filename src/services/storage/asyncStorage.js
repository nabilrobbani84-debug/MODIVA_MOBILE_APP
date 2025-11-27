/**
 * asyncStorage.js
 * Wrapper untuk AsyncStorage
 * Untuk menyimpan data non-sensitif
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data to AsyncStorage
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return { success: true };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, error };
  }
};

/**
 * Get data from AsyncStorage
 */
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return { success: true };
  } catch (error) {
    console.error('Error removing data:', error);
    return { success: false, error };
  }
};

/**
 * Clear all data from AsyncStorage
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return { success: true };
  } catch (error) {
    console.error('Error clearing all data:', error);
    return { success: false, error };
  }
};

/**
 * Get all keys from AsyncStorage
 */
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return { success: true, keys };
  } catch (error) {
    console.error('Error getting all keys:', error);
    return { success: false, error };
  }
};

/**
 * Save multiple items
 */
export const saveMultipleData = async (dataArray) => {
  try {
    const pairs = dataArray.map(([key, value]) => [
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
    return { success: true };
  } catch (error) {
    console.error('Error saving multiple data:', error);
    return { success: false, error };
  }
};

/**
 * Get multiple items
 */
export const getMultipleData = async (keys) => {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    const data = {};
    
    pairs.forEach(([key, value]) => {
      if (value !== null) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error getting multiple data:', error);
    return { success: false, error };
  }
};

/**
 * Remove multiple items
 */
export const removeMultipleData = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
    return { success: true };
  } catch (error) {
    console.error('Error removing multiple data:', error);
    return { success: false, error };
  }
};

/**
 * Merge data (for objects)
 */
export const mergeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
    return { success: true };
  } catch (error) {
    console.error('Error merging data:', error);
    return { success: false, error };
  }
};

/**
 * Check if key exists
 */
export const hasData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error('Error checking data:', error);
    return false;
  }
};

export default {
  saveData,
  getData,
  removeData,
  clearAllData,
  getAllKeys,
  saveMultipleData,
  getMultipleData,
  removeMultipleData,
  mergeData,
  hasData,
};