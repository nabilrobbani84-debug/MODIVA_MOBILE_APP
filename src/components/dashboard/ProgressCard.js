/**
 * ProgressCard Component
 * Menampilkan progress konsumsi vitamin dengan visualisasi
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import Button from '../common/Button';

const { width } = Dimensions.get('window');

const ProgressCard = ({
  current = 0,
  total = 48,
  onDetailPress,
  style,
}) => {
  const percentage = (current / total) * 100;

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[colors.orange, colors.orangeDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Vitamin Bottle Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>💊</Text>
          </View>
        </View>

        {/* Progress Info */}
        <View style={styles.infoContainer}>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressNumber}>
              {current}/{total}
            </Text>
            <Text style={styles.progressLabel}>
              Jumlah vitamin diminum
            </Text>
          </View>

          <Button
            title="Lihat Detail"
            onPress={onDetailPress}
            size="small"
            variant="primary"
            style={styles.detailButton}
            textStyle={styles.detailButtonText}
          />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percentage}%` },
              ]}
            />
          </View>
          <Text style={styles.percentageText}>
            {Math.round(percentage)}%
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

// Variant sederhana tanpa gradient
export const SimpleProgressCard = ({
  current = 0,
  total = 48,
  title = 'Progress Konsumsi',
  onPress,
  style,
}) => {
  const percentage = (current / total) * 100;

  return (
    <TouchableOpacity
      style={[styles.simpleContainer, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.simpleHeader}>
        <Text style={styles.simpleTitle}>{title}</Text>
        <Text style={styles.simpleProgress}>
          {current}/{total}
        </Text>
      </View>

      <View style={styles.simpleProgressBar}>
        <View
          style={[
            styles.simpleProgressFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>

      <View style={styles.simpleFooter}>
        <Text style={styles.simplePercentage}>
          {Math.round(percentage)}% tercapai
        </Text>
        <Text style={styles.simpleRemaining}>
          {total - current} vitamin tersisa
        </Text>
      </View>
    </TouchableOpacity>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: width * 0.4,
    height: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 80,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTextContainer: {
    flex: 1,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  detailButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
  },
  detailButtonText: {
    fontSize: 14,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    minWidth: 40,
    textAlign: 'right',
  },

  // Simple Variant
  simpleContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  simpleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  simpleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  simpleProgress: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  simpleProgressBar: {
    height: 12,
    backgroundColor: colors.gray200,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  simpleProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  simpleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  simplePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  simpleRemaining: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ProgressCard;