/**
 * LoginScreen
 * Halaman login menggunakan NISN dan ID Sekolah
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import { colors } from '../../styles/colors';
import { REGEX, ERROR_MESSAGES } from '../../utils/constants';

const LoginScreen = ({ navigation }) => {
  const { login, isLoading } = useAuth();
  
  const [nisn, setNisn] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validate inputs
  const validate = () => {
    const newErrors = {};

    if (!nisn) {
      newErrors.nisn = 'NISN harus diisi';
    } else if (!REGEX.NISN.test(nisn)) {
      newErrors.nisn = 'NISN harus 10 digit angka';
    }

    if (!schoolId) {
      newErrors.schoolId = 'ID Sekolah harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    const result = await login(nisn, schoolId);

    if (result.success) {
      // Navigation akan otomatis handled oleh AuthContext
      // User akan diarahkan ke Dashboard
    } else {
      setErrorMessage(result.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
      setShowError(true);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <View style={styles.logoIcon} />
            </View>
          </View>
          <Text style={styles.appName}>Modiva</Text>
          <Text style={styles.tagline}>
            Pantau kesehatan, Rutin Minum Vitamin
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.formCard}>
            <Text style={styles.welcomeTitle}>Selamat Datang Kembali !</Text>
            <Text style={styles.welcomeSubtitle}>
              Masuk untuk melanjutkan
            </Text>

            {/* NISN Input */}
            <Input
              label="NISN"
              placeholder="Masukkan NISN kamu"
              value={nisn}
              onChangeText={(text) => {
                setNisn(text);
                if (errors.nisn) {
                  setErrors({ ...errors, nisn: '' });
                }
              }}
              keyboardType="number-pad"
              maxLength={10}
              error={!!errors.nisn}
              errorMessage={errors.nisn}
              leftIcon={
                <Text style={styles.inputIcon}>👤</Text>
              }
            />

            {/* School ID Input */}
            <Input
              label="ID sekolah"
              placeholder="Masukkan ID Sekolah kamu"
              value={schoolId}
              onChangeText={(text) => {
                setSchoolId(text);
                if (errors.schoolId) {
                  setErrors({ ...errors, schoolId: '' });
                }
              }}
              autoCapitalize="characters"
              error={!!errors.schoolId}
              errorMessage={errors.schoolId}
              leftIcon={
                <Text style={styles.inputIcon}>🏫</Text>
              }
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>
                Lupa Password ?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              title="Masuk"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
            />

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                Belum punya akun? Hubungi admin sekolah Anda
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Modiva - STT Terpadu Nurul Fikri
          </Text>
        </View>
      </ScrollView>

      {/* Loading Overlay */}
      <Loading.Overlay
        visible={isLoading}
        message="Memproses login..."
      />

      {/* Error Modal */}
      <Modal.Error
        visible={showError}
        onClose={() => setShowError(false)}
        title="Login Gagal"
        message={errorMessage}
        buttonText="Coba Lagi"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.error,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Form Section
  formSection: {
    flex: 1,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputIcon: {
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  helpContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Footer
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default LoginScreen;