// ========================================
// src/hooks/useCamera.js
// ========================================
/**
 * useCamera Hook
 * Custom hook untuk camera dan image picker
 */
import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const useCamera = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkCameraPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }

    return false;
  };

  const checkGalleryPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    }

    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }

    return false;
  };

  const takePhoto = useCallback(async (options = {}) => {
    try {
      const hasPermission = await checkCameraPermission();

      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant camera permission to take photos'
        );
        return null;
      }

      setLoading(true);

      const defaultOptions = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: false,
        ...options,
      };

      const response = await launchCamera(defaultOptions);

      if (response.didCancel) {
        return null;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to take photo');
        return null;
      }

      if (response.assets && response.assets[0]) {
        const photo = response.assets[0];
        setImage(photo);
        return photo;
      }

      return null;
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to take photo');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const pickImage = useCallback(async (options = {}) => {
    try {
      const hasPermission = await checkGalleryPermission();

      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant gallery permission to select photos'
        );
        return null;
      }

      setLoading(true);

      const defaultOptions = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: false,
        ...options,
      };

      const response = await launchImageLibrary(defaultOptions);

      if (response.didCancel) {
        return null;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        return null;
      }

      if (response.assets && response.assets[0]) {
        const photo = response.assets[0];
        setImage(photo);
        return photo;
      }

      return null;
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to pick image');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
  }, []);

  return {
    image,
    loading,
    takePhoto,
    pickImage,
    removeImage,
    setImage,
  };
};

export default useCamera;