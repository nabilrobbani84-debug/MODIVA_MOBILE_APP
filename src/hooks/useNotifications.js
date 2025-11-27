// ========================================
// src/hooks/useNotifications.js
// ========================================
/**
 * useNotifications Hook
 * Custom hook untuk notifications (re-export dari NotificationContext)
 */
import { useNotification as useNotificationContext } from '../context/NotificationContext';

export const useNotifications = () => {
  return useNotificationContext();
};

export default useNotifications;