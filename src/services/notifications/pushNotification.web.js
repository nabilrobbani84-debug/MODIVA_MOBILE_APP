/**
 * pushNotification.web.js
 * Mock implementation untuk Web karena @react-native-firebase tidak support web langsung.
 * Ini mencegah error "Unable to resolve" saat bundling web.
 */

const notSupported = async () => {
  console.warn('Push notifications (FCM) tidak didukung di versi Web demo ini.');
  return { success: false };
};

export const requestNotificationPermission = async () => false;

export const getFCMToken = async () => null;

export const onMessageReceived = (callback) => {
  return () => {}; // Unsubscribe function dummy
};

export const onBackgroundMessage = () => {};

export const onNotificationOpened = (callback) => {
  return () => {}; // Unsubscribe function dummy
};

export const subscribeToTopic = notSupported;

export const unsubscribeFromTopic = notSupported;

export const deleteFCMToken = notSupported;

export const checkNotificationPermission = async () => false;

export const initNotifications = notSupported;

export const onTokenRefresh = (callback) => {
  return () => {}; // Unsubscribe function dummy
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