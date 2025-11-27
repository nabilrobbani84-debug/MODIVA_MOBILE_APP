/**
 * NotificationDetailScreen
 * Halaman detail notifikasi
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/navigation/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { colors } from '../../styles/colors';

const NotificationDetailScreen = ({ navigation, route }) => {
  const { notification } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${notification.title}\n\n${notification.message}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'reminder':
        return 'Pengingat';
      case 'motivation':
        return 'Motivasi';
      case 'report_status':
        return 'Status Laporan';
      case 'health_tip':
        return 'Tips Kesehatan';
      default:
        return 'Notifikasi';
    }
  };

  const getActionButton = () => {
    switch (notification.type) {
      case 'reminder':
        return (
          <Button
            title="Isi Laporan Sekarang"
            onPress={() => {
              navigation.navigate('ReportForm');
            }}
            fullWidth
          />
        );
      case 'report_status':
        return (
          <Button
            title="Lihat Laporan"
            onPress={() => {
              navigation.navigate('ReportHistory');
            }}
            fullWidth
          />
        );
      case 'health_tip':
        return (
          <Button
            title="Baca Lebih Lanjut"
            onPress={() => {
              console.log('Navigate to health tips');
            }}
            fullWidth
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Detail Notifikasi"
        showBackButton
        onBackPress={handleBack}
        rightIcon="share-2"
        onRightPress={handleShare}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Type Badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{getTypeLabel(notification.type)}</Text>
        </View>

        {/* Icon */}
        <View style={[styles.iconLarge, { backgroundColor: notification.iconColor + '20' }]}>
          <Icon name={notification.icon} size={48} color={notification.iconColor} />
        </View>

        {/* Title */}
        <Text style={styles.title}>{notification.title}</Text>

        {/* Time */}
        <View style={styles.timeContainer}>
          <Icon name="clock" size={16} color={colors.textSecondary} />
          <Text style={styles.time}>{notification.time}</Text>
        </View>

        {/* Message Card */}
        <Card style={styles.messageCard}>
          <Text style={styles.messageLabel}>Pesan:</Text>
          <Text style={styles.message}>{notification.message}</Text>
        </Card>

        {/* Additional Info based on type */}
        {notification.type === 'report_status' && (
          <Card variant="flat" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="info" size={20} color={colors.primary} />
              <Text style={styles.infoText}>
                Laporan Anda telah ditinjau dan diverifikasi oleh admin sekolah.
              </Text>
            </View>
          </Card>
        )}

        {notification.type === 'reminder' && (
          <Card variant="flat" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="alert-circle" size={20} color={colors.warning} />
              <Text style={styles.infoText}>
                Jangan lupa untuk melaporkan konsumsi vitamin Anda hari ini.
              </Text>
            </View>
          </Card>
        )}

        {notification.type === 'health_tip' && (
          <Card variant="flat" style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Tahukah Kamu?</Text>
            <Text style={styles.tipContent}>
              Vitamin D tidak hanya baik untuk tulang, tetapi juga meningkatkan sistem kekebalan
              tubuh dan membantu mengatur mood. Dapatkan vitamin D dari sinar matahari pagi
              selama 10-15 menit setiap hari.
            </Text>
          </Card>
        )}

        {/* Action Button */}
        {getActionButton()}

        {/* Related Actions */}
        <View style={styles.relatedActions}>
          <Text style={styles.relatedTitle}>Aksi Lainnya</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Icon name="bell-off" size={20} color={colors.textPrimary} />
              <Text style={styles.actionText}>Nonaktifkan notifikasi serupa</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <Icon name="settings" size={20} color={colors.textPrimary} />
              <Text style={styles.actionText}>Pengaturan notifikasi</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Type Badge
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  // Icon
  iconLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  // Title
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },

  // Time
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 24,
  },
  time: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Message Card
  messageCard: {
    marginBottom: 16,
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
  },

  // Info Card
  infoCard: {
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // Tip Card
  tipCard: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: colors.warning + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  tipContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // Related Actions
  relatedActions: {
    marginTop: 24,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});

export default NotificationDetailScreen;