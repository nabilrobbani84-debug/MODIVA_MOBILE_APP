/**
 * NotificationsScreen
 * Halaman daftar notifikasi dengan filter
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/navigation/Header';
import Loading from '../../components/common/Loading';
import { colors } from '../../styles/colors';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Fetch from API
      // const data = await notificationApi.getNotifications(filter);
      
      // Mock data
      const mockData = [
        {
          id: 1,
          type: 'reminder',
          title: 'Vitamin Intake Reminder',
          message: 'Jangan lupa minum vitamin hari ini!',
          time: 'Today, 10:00 AM',
          timestamp: new Date().getTime(),
          isRead: false,
          icon: 'bell',
          iconColor: colors.primary,
        },
        {
          id: 2,
          type: 'motivation',
          title: 'Motivational Message',
          message: 'Kamu hebat! Terus jaga kesehatanmu.',
          time: 'Yesterday, 2:30 PM',
          timestamp: new Date().getTime() - 86400000,
          isRead: false,
          icon: 'heart',
          iconColor: colors.error,
        },
        {
          id: 3,
          type: 'reminder',
          title: 'Vitamin Intake Reminder',
          message: 'Waktunya minum tablet tambah darah!',
          time: '2 days ago, 9:15 AM',
          timestamp: new Date().getTime() - 172800000,
          isRead: true,
          icon: 'bell',
          iconColor: colors.primary,
        },
        {
          id: 4,
          type: 'report_status',
          title: 'Laporan Diverifikasi',
          message: 'Laporan konsumsi tanggal 12 Mei 2024 telah diverifikasi.',
          time: '3 days ago, 11:45 AM',
          timestamp: new Date().getTime() - 259200000,
          isRead: true,
          icon: 'check-circle',
          iconColor: colors.success,
        },
        {
          id: 5,
          type: 'health_tip',
          title: 'Tips Kesehatan',
          message: 'Vitamin D membantu penyerapan kalsium untuk tulang yang kuat.',
          time: '4 days ago, 1:00 PM',
          timestamp: new Date().getTime() - 345600000,
          isRead: true,
          icon: 'info',
          iconColor: colors.warning,
        },
      ];

      // Filter notifications
      let filteredData = mockData;
      if (filter === 'unread') {
        filteredData = mockData.filter(item => !item.isRead);
      } else if (filter === 'read') {
        filteredData = mockData.filter(item => item.isRead);
      }

      setNotifications(filteredData);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotificationPress = async (notification) => {
    // Mark as read
    if (!notification.isRead) {
      // TODO: Mark as read in API
      // await notificationApi.markAsRead(notification.id);
      
      setNotifications(prev =>
        prev.map(item =>
          item.id === notification.id ? { ...item, isRead: true } : item
        )
      );
    }

    // Navigate to detail
    navigation.navigate('NotificationDetail', { notification });
  };

  const handleMarkAllAsRead = async () => {
    try {
      // TODO: Mark all as read in API
      // await notificationApi.markAllAsRead();
      
      setNotifications(prev =>
        prev.map(item => ({ ...item, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const renderFilterButton = (label, value) => {
    const isActive = filter === value;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.filterButtonActive]}
        onPress={() => setFilter(value)}
      >
        <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.notificationUnread]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.iconColor + '20' }]}>
        <Icon name={item.icon} size={24} color={item.iconColor} />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>

      <Icon name="chevron-right" size={20} color={colors.gray400} />
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="inbox" size={64} color={colors.gray300} />
      <Text style={styles.emptyText}>Tidak ada notifikasi</Text>
      <Text style={styles.emptySubtext}>
        {filter === 'unread'
          ? 'Semua notifikasi sudah dibaca'
          : 'Notifikasi akan muncul di sini'}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Notifications" showBackButton onBackPress={handleBack} />
        <Loading.Screen message="Memuat notifikasi..." />
      </View>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      <Header
        title="Notifications"
        showBackButton
        onBackPress={handleBack}
      />

      {/* Filter & Actions */}
      <View style={styles.filterContainer}>
        <View style={styles.filterButtons}>
          {renderFilterButton('Semua', 'all')}
          {renderFilterButton(`Belum Dibaca (${unreadCount})`, 'unread')}
          {renderFilterButton('Sudah Dibaca', 'read')}
        </View>
        
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markAllText}>Tandai Semua Dibaca</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Filter Container
  filterContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.gray100,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  markAllButton: {
    alignSelf: 'flex-start',
  },
  markAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  // List
  listContent: {
    flexGrow: 1,
  },

  // Notification Item
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  notificationUnread: {
    backgroundColor: colors.primary + '08',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default NotificationsScreen;