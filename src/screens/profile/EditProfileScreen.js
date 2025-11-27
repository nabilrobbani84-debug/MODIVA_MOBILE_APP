/**
 * EditProfileScreen
 * Halaman untuk mengedit informasi profil pengguna
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/navigation/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import { colors } from '../../styles/colors';
import { REGEX, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/constants';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Anya Sharma',
    email: user?.email || 'anya.sharma@email.com',
    phone: user?.phone || '08123456789',
    address: user?.address || 'Jakarta Selatan',
    height: user?.height?.toString() || '176',
    weight: user?.weight?.toString() || '65',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Batalkan Perubahan?',
        'Perubahan yang belum disimpan akan hilang. Yakin ingin kembali?',
        [
          { text: 'Tidak', style: 'cancel' },
          { text: 'Ya', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!REGEX.EMAIL.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (formData.phone && !REGEX.PHONE.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    if (formData.height) {
      const height = parseInt(formData.height);
      if (isNaN(height) || height < 100 || height > 250) {
        newErrors.height = 'Tinggi badan harus antara 100-250 cm';
      }
    }

    if (formData.weight) {
      const weight = parseInt(formData.weight);
      if (isNaN(weight) || weight < 20 || weight > 200) {
        newErrors.weight = 'Berat badan harus antara 20-200 kg';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare data
      const updatedData = {
        ...formData,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
      };

      // TODO: Submit to API
      // await profileApi.updateProfile(updatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update context
      await updateUser(updatedData);

      setShowSuccess(true);
      setHasChanges(false);
    } catch (error) {
      Alert.alert('Error', error.message || ERROR_MESSAGES.SERVER_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        title="Edit Profile"
        showBackButton
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {formData.name.charAt(0)}
            </Text>
          </View>
          <Button
            title="Ubah Foto"
            variant="outline"
            size="small"
            style={styles.changePhotoButton}
          />
        </View>

        {/* Personal Info */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
          
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            error={!!errors.name}
            errorMessage={errors.name}
          />

          <Input
            label="Email"
            placeholder="email@example.com"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
            errorMessage={errors.email}
          />

          <Input
            label="No. Telepon"
            placeholder="08xxxxxxxxxx"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
            error={!!errors.phone}
            errorMessage={errors.phone}
          />

          <Input
            label="Alamat"
            placeholder="Masukkan alamat lengkap"
            value={formData.address}
            onChangeText={(text) => handleChange('address', text)}
            multiline
            numberOfLines={3}
          />
        </Card>

        {/* Health Info */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Data Kesehatan</Text>
          
          <Input
            label="Tinggi Badan (cm)"
            placeholder="176"
            value={formData.height}
            onChangeText={(text) => handleChange('height', text)}
            keyboardType="number-pad"
            error={!!errors.height}
            errorMessage={errors.height}
          />

          <Input
            label="Berat Badan (kg)"
            placeholder="65"
            value={formData.weight}
            onChangeText={(text) => handleChange('weight', text)}
            keyboardType="number-pad"
            error={!!errors.weight}
            errorMessage={errors.weight}
          />
        </Card>

        {/* Read-only Info */}
        <Card variant="flat" style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Akun</Text>
          <Text style={styles.infoText}>
            NISN dan ID Sekolah tidak dapat diubah. Hubungi admin sekolah jika ada kesalahan data.
          </Text>
          
          <View style={styles.readonlyItem}>
            <Text style={styles.readonlyLabel}>NISN:</Text>
            <Text style={styles.readonlyValue}>{user?.nisn || '0110222079'}</Text>
          </View>
          
          <View style={styles.readonlyItem}>
            <Text style={styles.readonlyLabel}>Sekolah:</Text>
            <Text style={styles.readonlyValue}>{user?.school || 'SMPN 1 Jakarta'}</Text>
          </View>
        </Card>

        {/* Save Button */}
        <Button
          title="Simpan Perubahan"
          onPress={handleSubmit}
          disabled={!hasChanges || isSubmitting}
          loading={isSubmitting}
          fullWidth
          size="large"
          style={styles.saveButton}
        />

        {/* Cancel Button */}
        <Button
          title="Batal"
          variant="outline"
          onPress={handleBack}
          fullWidth
          style={styles.cancelButton}
        />
      </ScrollView>

      {/* Loading Overlay */}
      <Loading.Overlay
        visible={isSubmitting}
        message="Menyimpan perubahan..."
      />

      {/* Success Modal */}
      <Modal.Success
        visible={showSuccess}
        onClose={handleSuccessClose}
        title="Berhasil!"
        message={SUCCESS_MESSAGES.PROFILE_UPDATED}
        buttonText="OK"
      />
    </KeyboardAvoidingView>
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
    paddingBottom: 32,
  },

  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  changePhotoButton: {
    minWidth: 120,
  },

  // Card
  card: {
    margin: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },

  // Info Text
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.gray100,
    borderRadius: 8,
  },

  // Readonly Item
  readonlyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  readonlyLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  readonlyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Buttons
  saveButton: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  cancelButton: {
    marginHorizontal: 16,
    marginTop: 12,
  },
});

export default EditProfileScreen;