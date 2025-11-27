/**
 * NotificationContext
 * Mengelola state notifications dan push notifications
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppState } from 'react-native';
import notificationApi from '../services/api/notificationApi';
import {
  onMessageReceived,
  onNotificationOpened,
  onTokenRefresh,
} from '../services/notifications/pushNotification';
import { useAuth } from './AuthContext';

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Setup push notification listeners
  useEffect(() => {
    if (!isAuthenticated) return;

    // Listen for foreground messages
    const unsubscribeForeground = onMessageReceived((message) => {
      handleNewNotification(message);
    });

    // Listen for notification opened
    const unsubscribeOpened = onNotificationOpened((message) => {
      handleNotificationOpened(message);
    });

    // Listen for token refresh
    const unsubscribeTokenRefresh = onTokenRefresh((token) => {
      console.log('New FCM token:', token);
    });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
      unsubscribeTokenRefresh();
    };
  }, [isAuthenticated]);

  // Load notifications when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
      loadUnreadCount();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated]);

  // Refresh notifications when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && isAuthenticated) {
        loadUnreadCount();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated]);

  // Load notifications from API
  const loadNotifications = async (filter = 'all', page = 1) => {
    try {
      setIsLoading(true);
      const result = await notificationApi.getNotifications(filter, page);
      
      if (result.success) {
        if (page === 1) {
          setNotifications(result.data.notifications);
        } else {
          setNotifications(prev => [...prev, ...result.data.notifications]);
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load unread count
  const loadUnreadCount = async () => {
    try {
      const result = await notificationApi.getUnreadCount();
      
      if (result.success) {
        setUnreadCount(result.data.count);
      }
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

  // Handle new notification (from push)
  const handleNewNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      title: message.notification?.title || '',
      message: message.notification?.body || '',
      data: message.data,
      isRead: false,
      timestamp: Date.now(),
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Handle notification opened
  const handleNotificationOpened = (message) => {
    console.log('Notification opened:', message);
    // Navigate to specific screen based on notification data
    // This will be handled in App.js with navigation
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const result = await notificationApi.markAsRead(notificationId);
      
      if (result.success) {
        setNotifications(prev =>
          prev.map(notif =>
            notif.id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error marking as read:', error);
      return { success: false };
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const result = await notificationApi.markAllAsRead();
      
      if (result.success) {
        setNotifications(prev =>
          prev.map(notif => ({ ...notif, isRead: true }))
        );
        setUnreadCount(0);
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error marking all as read:', error);
      return { success: false };
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const result = await notificationApi.deleteNotification(notificationId);
      
      if (result.success) {
        const notification = notifications.find(n => n.id === notificationId);
        
        setNotifications(prev =>
          prev.filter(notif => notif.id !== notificationId)
        );
        
        if (notification && !notification.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error deleting notification:', error);
      return { success: false };
    }
  };

  // Delete all notifications
  const deleteAllNotifications = async () => {
    try {
      const result = await notificationApi.deleteAllNotifications();
      
      if (result.success) {
        setNotifications([]);
        setUnreadCount(0);
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Error deleting all notifications:', error);
      return { success: false };
    }
  };

  // Refresh notifications
  const refreshNotifications = async () => {
    await loadNotifications();
    await loadUnreadCount();
  };

  const value = {
    notifications,
    unreadCount,
    isLoading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook untuk menggunakan NotificationContext
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  
  return context;
};

export default NotificationContext;