/**
 * pushNotification.js
 * Service untuk handle push notifications menggunakan Firebase Cloud Messaging
 */

import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';
import notificationApi from '../api/notificationApi';
import { saveData, getData } from '../storage/asyncStorage';

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
      return true;
    }
    
    console.log('Notification permission denied');
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Get FCM token
 */
export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    
    // Save token locally
    await saveData('fcm_token', token);
    
    // Register token to backend
    await registerTokenToBackend(token);
    
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Register token to backend
 */
const registerTokenToBackend = async (token) => {
  try {
    const deviceInfo = {
      platform: Platform.OS,
      version: Platform.Version,
    };
    
    const result = await notificationApi.registerFCMToken(token, deviceInfo);
    
    if (result.success) {
      console.log('Token registered to backend successfully');
    }
  } catch (error) {
    console.error('Error registering token to backend:', error);
  }
};

/**
 * Handle foreground notifications
 */
export const onMessageReceived = (callback) => {
  return messaging().onMessage(async (remoteMessage) => {
    console.log('Foreground notification received:', remoteMessage);
    
    // Show local notification
    if (remoteMessage.notification) {
      Alert.alert(
        remoteMessage.notification.title || 'Notification',
        remoteMessage.notification.body || '',
        [{ text: 'OK', onPress: () => callback && callback(remoteMessage) }]
      );
    }
    
    // Call callback
    if (callback) {
      callback(remoteMessage);
    }
  });
};

/**
 * Handle background notifications (when app is in background)
 */
export const onBackgroundMessage = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Background notification received:', remoteMessage);
  });
};

/**
 * Handle notification opened (when user taps notification)
 */
export const onNotificationOpened = (callback) => {
  // Handle notification that opened the app from quit state
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification opened app from quit state:', remoteMessage);
        if (callback) {
          callback(remoteMessage);
        }
      }
    });

  // Handle notification that opened the app from background state
  return messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification opened app from background state:', remoteMessage);
    if (callback) {
      callback(remoteMessage);
    }
  });
};

/**
 * Subscribe to topic
 */
export const subscribeToTopic = async (topic) => {
  try {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to topic: ${topic}`);
    return { success: true };
  } catch (error) {
    console.error('Error subscribing to topic:', error);
    return { success: false, error };
  }
};

/**
 * Unsubscribe from topic
 */
export const unsubscribeFromTopic = async (topic) => {
  try {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from topic: ${topic}`);
    return { success: true };
  } catch (error) {
    console.error('Error unsubscribing from topic:', error);
    return { success: false, error };
  }
};

/**
 * Delete FCM token
 */
export const deleteFCMToken = async () => {
  try {
    const token = await getData('fcm_token');
    
    if (token) {
      // Unregister from backend
      await notificationApi.unregisterFCMToken(token);
      
      // Delete token from Firebase
      await messaging().deleteToken();
      
      console.log('FCM token deleted');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting FCM token:', error);
    return { success: false, error };
  }
};

/**
 * Check notification permission status
 */
export const checkNotificationPermission = async () => {
  try {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    return enabled;
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

/**
 * Initialize notifications
 */
export const initNotifications = async () => {
  try {
    // Request permission
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      // Get FCM token
      await getFCMToken();
      
      // Setup background handler
      onBackgroundMessage();
      
      // Subscribe to default topics
      await subscribeToTopic('all_users');
      await subscribeToTopic('students');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error initializing notifications:', error);
    return { success: false, error };
  }
};

/**
 * Handle token refresh
 */
export const onTokenRefresh = (callback) => {
  return messaging().onTokenRefresh(async (token) => {
    console.log('FCM token refreshed:', token);
    
    // Save new token
    await saveData('fcm_token', token);
    
    // Register to backend
    await registerTokenToBackend(token);
    
    // Call callback
    if (callback) {
      callback(token);
    }
  });
};

export default {
  requestNotificationPermission,
  getFCMToken,
  onMessageReceived,
  onBackgroundMessage,
  onNotificationOpened,
  subscribeToTopic,
  unsubscribeFromTopic,
  deleteFCMToken,
  checkNotificationPermission,
  initNotifications,
  onTokenRefresh,
};