/**
 * Header Component
 * Komponen header yang dapat dikustomisasi untuk berbagai screen
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  showLogo = false,
  leftComponent,
  rightComponent,
  onBackPress,
  onRightPress,
  rightIcon,
  backgroundColor = colors.white,
  titleColor = colors.textPrimary,
  style,
}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <View style={[styles.container, { backgroundColor }, style]}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="arrow-left" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          ) : showLogo ? (
            <View style={styles.logo}>
              <View style={styles.logoIcon} />
            </View>
          ) : leftComponent ? (
            leftComponent
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          <Text
            style={[styles.title, { color: titleColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {rightIcon ? (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name={rightIcon} size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          ) : rightComponent ? (
            rightComponent
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
      </View>
    </>
  );
};

// Header variant untuk Dashboard
Header.Dashboard = ({ userName, onNotificationPress }) => (
  <View style={styles.dashboardContainer}>
    <View style={styles.dashboardLeft}>
      <View style={styles.logo}>
        <View style={styles.logoIcon} />
      </View>
      <Text style={styles.dashboardTitle}>Modiva</Text>
    </View>
    <TouchableOpacity
      onPress={onNotificationPress}
      style={styles.iconButton}
    >
      <Icon name="bell" size={24} color={colors.textPrimary} />
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationBadgeText}>3</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Header variant untuk Profile
Header.Profile = ({ userName, onEditPress }) => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileTitle}>Profile</Text>
    <TouchableOpacity
      onPress={onEditPress}
      style={styles.editButton}
    >
      <Icon name="edit-2" size={20} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
  },
  logo: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.error,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },

  // Dashboard Header
  dashboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  dashboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },

  // Profile Header
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  editButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '20',
  },
});

export default Header;