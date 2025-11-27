// ========================================
// src/styles/typography.js
// ========================================
/**
 * Typography styles
 */
import { Platform } from 'react-native';
import { colors } from './colors';

export const typography = {
  // Font Families
  fontFamily: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
  },

  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Text Styles
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: colors.textPrimary,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.textPrimary,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: colors.textPrimary,
  },
  heading4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  heading5: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  heading6: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.textPrimary,
  },

  // Body Text
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.textSecondary,
  },

  // Button Text
  buttonLarge: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  buttonSmall: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors.textSecondary,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: colors.textSecondary,
  },

  // Label
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: colors.textPrimary,
  },

  // Link
  link: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
};

export default typography;