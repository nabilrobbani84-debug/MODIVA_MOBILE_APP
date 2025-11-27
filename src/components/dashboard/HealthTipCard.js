/**
 * HealthTipCard Component
 * Menampilkan tips kesehatan dengan desain menarik
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // PERBAIKAN: Menghapus Image dan Dimensions yang tidak digunakan
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

// PERBAIKAN: Menghapus deklarasi width yang tidak digunakan
// const { width } = Dimensions.get('window');

const HealthTipCard = ({
  title = 'Tahukah Kamu?',
  description = 'Vitamin D membantu penyerapan kalsium untuk tulang yang kuat.',
  icon = '💡',
  buttonText = 'Pelajari Lebih Lanjut',
  onPress,
  gradientColors = [colors.cyanLight, colors.cyan],
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{buttonText}</Text>
              <Icon name="arrow-right" size={16} color={colors.white} />
            </View>
          </View>

          {/* Icon/Image */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>{icon}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Compact Variant
export const CompactHealthTipCard = ({
  title,
  description,
  icon = '💊',
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.compactContainer, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.compactIcon}>
        <Text style={styles.compactIconText}>{icon}</Text>
      </View>
      <View style={styles.compactContent}>
        <Text style={styles.compactTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.compactDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color={colors.gray400} />
    </TouchableOpacity>
  );
};

// List of Health Tips
export const HealthTipsList = ({ tips = [], onTipPress }) => {
  const defaultTips = [
    {
      id: 1,
      title: 'Vitamin D',
      description: 'Vitamin D membantu penyerapan kalsium untuk tulang yang kuat.',
      icon: '☀️',
    },
    {
      id: 2,
      title: 'Zat Besi',
      description: 'Zat besi penting untuk mencegah anemia dan meningkatkan energi.',
      icon: '🩸',
    },
    {
      id: 3,
      title: 'Minum Air',
      description: 'Minum 8 gelas air per hari untuk menjaga hidrasi tubuh.',
      icon: '💧',
    },
  ];

  const tipsData = tips.length > 0 ? tips : defaultTips;

  return (
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Tips Kesehatan</Text>
        <TouchableOpacity>
          <Text style={styles.listSeeAll}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      {tipsData.map((tip) => (
        <CompactHealthTipCard
          key={tip.id}
          title={tip.title}
          description={tip.description}
          icon={tip.icon}
          onPress={() => onTipPress && onTipPress(tip)}
          style={styles.listItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
    marginRight: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 40,
  },

  // Compact Variant
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  compactIconText: {
    fontSize: 24,
  },
  compactContent: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  compactDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // List Container
  listContainer: {
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  listSeeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  listItem: {
    marginBottom: 8,
  },
});

export default HealthTipCard;