/**
 * ProfileScreen
 * Halaman profil pengguna dengan informasi pribadi dan kesehatan
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  // PERBAIKAN: Menghapus import Image dan Alert yang tidak digunakan
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/navigation/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { colors } from '../../styles/colors';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    const result = await logout();
    if (result.success) {
      // Navigation will be handled by AuthContext
    }
  };

  const profileData = {
    name: user?.name || 'Anya Sharma',
    school: user?.school || 'SMPN 1 Jakarta',
    nisn: user?.nisn || '0110222079',
    email: user?.email || 'anya.sharma@email.com',
    height: user?.height || 176,
    weight: user?.weight || 65,
    lastHB: user?.lastHB || 12.5,
    totalReports: 24,
    completedReports: 22,
    pendingReports: 2,
  };

  const renderInfoItem = (icon, label, value) => (
    <View style={styles.infoItem}>
      <View style={styles.infoIcon}>
        <Icon name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const renderStatItem = (label, value, color) => (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        rightIcon="edit-2"
        onRightPress={handleEditProfile}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profileData.name.charAt(0)}
              </Text>
            </View>
            <TouchableOpacity style={styles.avatarEditButton}>
              <Icon name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileSchool}>{profileData.school}</Text>
          <Text style={styles.profileNISN}>{profileData.nisn}</Text>

          <Button
            title="Edit Profile"
            variant="primary"
            size="medium"
            onPress={handleEditProfile}
            style={styles.editButton}
          />
        </View>

        {/* Stats Card */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Statistik Laporan</Text>
          <View style={styles.statsContainer}>
            {renderStatItem('Total', profileData.totalReports, colors.primary)}
            {renderStatItem('Selesai', profileData.completedReports, colors.success)}
            {renderStatItem('Menunggu', profileData.pendingReports, colors.warning)}
          </View>
        </Card>

        {/* Personal Info */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
          {renderInfoItem('mail', 'Email', profileData.email)}
          {renderInfoItem('phone', 'No. Telepon', '08123456789')}
          {renderInfoItem('map-pin', 'Alamat', 'Jakarta Selatan')}
        </Card>

        {/* Health Info */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Data Kesehatan</Text>
          {renderInfoItem('activity', 'Tinggi Badan', `${profileData.height} cm`)}
          {renderInfoItem('activity', 'Berat Badan', `${profileData.weight} kg`)}
          {renderInfoItem('droplet', 'HB Terakhir', `${profileData.lastHB} g/dL`)}
        </Card>

        {/* Settings Menu */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name="bell" size={20} color={colors.textPrimary} />
              <Text style={styles.menuText}>Notifikasi</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name="lock" size={20} color={colors.textPrimary} />
              <Text style={styles.menuText}>Privasi</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name="help-circle" size={20} color={colors.textPrimary} />
              <Text style={styles.menuText}>Bantuan</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name="info" size={20} color={colors.textPrimary} />
              <Text style={styles.menuText}>Tentang Aplikasi</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <Button
          title="Logout"
          variant="danger"
          onPress={() => setShowLogoutModal(true)}
          fullWidth
          icon={<Icon name="log-out" size={20} color={colors.white} />}
          iconPosition="left"
          style={styles.logoutButton}
        />

        {/* Version Info */}
        <Text style={styles.versionText}>Versi 1.0.0</Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal.Confirm
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logout"
        message="Apakah Anda yakin ingin keluar dari akun?"
        confirmText="Logout"
        cancelText="Batal"
        confirmVariant="danger"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
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
    paddingBottom: 100,
  },

  // Profile Header
  profileHeader: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
  },
  avatarEditButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  profileSchool: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  profileNISN: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    minWidth: 140,
  },

  // Stats Card
  statsCard: {
    margin: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  // Card
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
  },

  // Info Item
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },

  // Logout Button
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 16,
  },

  // Version
  versionText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default ProfileScreen;