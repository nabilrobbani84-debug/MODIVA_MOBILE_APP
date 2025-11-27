// ========================================
// src/styles/globalStyles.js
// ========================================
import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

/**
 * Helper untuk membuat shadow yang kompatibel di Web dan Native
 */
const getShadowStyle = (size = 'base') => {
  // KHUSUS WEB: Gunakan 'boxShadow' (standard CSS)
  if (Platform.OS === 'web') {
    switch (size) {
      case 'large':
        return { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' };
      case 'none':
        return { boxShadow: 'none' };
      default: // base
        return { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' };
    }
  }

  // KHUSUS HP (Android/iOS): Gunakan shadow props native
  if (size === 'large') {
    return {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    };
  }

  return {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  };
};

// 2. STYLE DEFINITIONS
export const globalStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Content
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.base,
  },

  // Center
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHorizontal: {
    alignItems: 'center',
  },
  centerVertical: {
    justifyContent: 'center',
  },

  // Flex
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowEvenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  // === BAGIAN CARD & SHADOW YANG DIPERBAIKI ===
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.base,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...getShadowStyle('base'), // Menggunakan helper aman
  },

  shadow: {
    ...getShadowStyle('base'),
  },
  shadowLarge: {
    ...getShadowStyle('large'),
  },
  // ============================================

  // Text Alignment
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },

  // Typography Shortcuts
  h1: typography.heading1,
  h2: typography.heading2,
  h3: typography.heading3,
  h4: typography.heading4,
  body: typography.body,
  bodySmall: typography.bodySmall,
  caption: typography.caption,
  label: typography.label,

  // Spacing
  mt: { marginTop: spacing.base },
  mb: { marginBottom: spacing.base },
  ml: { marginLeft: spacing.base },
  mr: { marginRight: spacing.base },
  mx: { marginHorizontal: spacing.base },
  my: { marginVertical: spacing.base },
  
  p: { padding: spacing.base },
  px: { paddingHorizontal: spacing.base },
  py: { paddingVertical: spacing.base },

  // Border
  border: { borderWidth: 1, borderColor: colors.border },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: colors.border },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.base,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.base,
    textAlign: 'center',
  },
});

export default globalStyles;