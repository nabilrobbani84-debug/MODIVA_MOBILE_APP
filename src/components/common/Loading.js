/**
 * Loading Component
 * Berbagai macam loading indicator untuk aplikasi
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  // PERBAIKAN: Menghapus Dimensions yang tidak digunakan
} from 'react-native';
import { colors } from '../../styles/colors';

// PERBAIKAN: Menghapus deklarasi width yang tidak digunakan dan menyebabkan shadowing
// const { width } = Dimensions.get('window');

// Loading Spinner (inline)
const LoadingSpinner = ({ 
  size = 'small', 
  color = colors.primary,
  style,
}) => (
  <View style={[styles.spinnerContainer, style]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

// Loading Overlay (fullscreen)
const LoadingOverlay = ({ 
  visible = false,
  message = 'Loading...',
  transparent = true,
}) => (
  <Modal
    visible={visible}
    transparent={transparent}
    animationType="fade"
    statusBarTranslucent
  >
    <View style={styles.overlayContainer}>
      <View style={styles.overlayContent}>
        <ActivityIndicator size="large" color={colors.primary} />
        {message && (
          <Text style={styles.overlayText}>{message}</Text>
        )}
      </View>
    </View>
  </Modal>
);

// Loading Screen (untuk initial loading)
const LoadingScreen = ({ message = 'Loading...' }) => (
  <View style={styles.screenContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
    {message && (
      <Text style={styles.screenText}>{message}</Text>
    )}
  </View>
);

// Loading Dots Animation
const LoadingDots = ({ color = colors.primary, style }) => {
  const [dotCount, setDotCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.dotsContainer, style]}>
      <Text style={[styles.dotsText, { color }]}>
        Loading{'.'.repeat(dotCount)}
      </Text>
    </View>
  );
};

// Loading Skeleton (untuk content placeholder)
const LoadingSkeleton = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 8,
  style,
}) => (
  <View
    style={[
      styles.skeleton,
      {
        width,
        height,
        borderRadius,
      },
      style,
    ]}
  />
);

// Loading List (skeleton untuk list items)
const LoadingList = ({ count = 3, itemHeight = 80 }) => (
  <View style={styles.listContainer}>
    {Array.from({ length: count }).map((_, index) => (
      <View key={index} style={styles.listItem}>
        <LoadingSkeleton width={60} height={60} borderRadius={30} />
        <View style={styles.listItemContent}>
          {/* PERBAIKAN: Menggunakan style dari StyleSheet */}
          <LoadingSkeleton width="80%" height={16} style={styles.mb8} />
          <LoadingSkeleton width="60%" height={14} />
        </View>
      </View>
    ))}
  </View>
);

// Loading Card (skeleton untuk card)
const LoadingCard = ({ style }) => (
  <View style={[styles.card, style]}>
    {/* PERBAIKAN: Menggunakan style dari StyleSheet */}
    <LoadingSkeleton width="100%" height={200} style={styles.mb12} />
    <LoadingSkeleton width="80%" height={20} style={styles.mb8} />
    <LoadingSkeleton width="60%" height={16} />
  </View>
);

// Main Loading Component with all variants
const Loading = ({ 
  variant = 'spinner', // spinner, overlay, screen, dots, skeleton, list, card
  ...props 
}) => {
  switch (variant) {
    case 'overlay':
      return <LoadingOverlay {...props} />;
    case 'screen':
      return <LoadingScreen {...props} />;
    case 'dots':
      return <LoadingDots {...props} />;
    case 'skeleton':
      return <LoadingSkeleton {...props} />;
    case 'list':
      return <LoadingList {...props} />;
    case 'card':
      return <LoadingCard {...props} />;
    case 'spinner':
    default:
      return <LoadingSpinner {...props} />;
  }
};

// Export individual components as well
Loading.Spinner = LoadingSpinner;
Loading.Overlay = LoadingOverlay;
Loading.Screen = LoadingScreen;
Loading.Dots = LoadingDots;
Loading.Skeleton = LoadingSkeleton;
Loading.List = LoadingList;
Loading.Card = LoadingCard;

const styles = StyleSheet.create({
  // Spinner
  spinnerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Overlay
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minWidth: 150,
  },
  overlayText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '600',
  },

  // Screen
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },

  // Dots
  dotsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Skeleton
  skeleton: {
    backgroundColor: colors.gray200,
    overflow: 'hidden',
  },

  // List
  listContainer: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },

  // Card
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  
  // Utilities
  mb8: {
    marginBottom: 8,
  },
  mb12: {
    marginBottom: 12,
  },
});

export default Loading;