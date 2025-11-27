/**
 * ForgotPasswordScreen
 * Halaman bantuan untuk lupa password
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/navigation/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import { colors } from '../../styles/colors';

const ForgotPasswordScreen = ({ navigation }) => {
  const [nisn, setNisn] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Simulate success
    setShowSuccess(true);
  };

  const handleContactAdmin = (method) => {
    switch (method) {
      case 'whatsapp':
        Linking.openURL('https://wa.me/628123456789');
        break;
      case 'email':
        Linking.openURL('mailto:admin@modiva.com');
        break;
      case 'phone':
        Linking.openURL('tel:+628123456789');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Lupa Password"
        showBackButton
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <Card variant="flat" style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Icon name="info" size={24} color={colors.primary} />
          </View>
          <Text style={styles.infoTitle}>Informasi</Text>
          <Text style={styles.infoText}>
            Password Anda dikelola oleh admin sekolah. Untuk reset password,
            silakan hubungi admin sekolah Anda melalui salah satu cara di bawah ini.
          </Text>
        </Card>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hubungi Admin Sekolah</Text>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => handleContactAdmin('whatsapp')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#25D366' + '20' }]}>
              <Icon name="message-circle" size={24} color="#25D366" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>WhatsApp</Text>
              <Text style={styles.contactSubtitle}>Chat langsung dengan admin</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => handleContactAdmin('email')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
              <Icon name="mail" size={24} color={colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email</Text>
              <Text style={styles.contactSubtitle}>admin@modiva.com</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => handleContactAdmin('phone')}
            activeOpacity={0.7}
          >
            <View style={[styles.contactIcon, { backgroundColor: colors.success + '20' }]}>
              <Icon name="phone" size={24} color={colors.success} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Telepon</Text>
              <Text style={styles.contactSubtitle}>+62 812 3456 7890</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pertanyaan Umum</Text>

          <Card variant="outlined" style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              Bagaimana cara mendapatkan password?
            </Text>
            <Text style={styles.faqAnswer}>
              Password awal diberikan oleh admin sekolah melalui email yang
              terdaftar. Periksa inbox atau spam folder Anda.
            </Text>
          </Card>

          <Card variant="outlined" style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              Berapa lama proses reset password?
            </Text>
            <Text style={styles.faqAnswer}>
              Admin sekolah biasanya memproses permintaan dalam 1-2 hari kerja.
              Untuk lebih cepat, hubungi langsung via WhatsApp.
            </Text>
          </Card>

          <Card variant="outlined" style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              Apakah saya bisa mengganti password sendiri?
            </Text>
            <Text style={styles.faqAnswer}>
              Saat ini perubahan password hanya bisa dilakukan melalui admin
              sekolah untuk menjaga keamanan akun Anda.
            </Text>
          </Card>
        </View>

        {/* Back to Login Button */}
        <Button
          title="Kembali ke Login"
          variant="outline"
          onPress={handleBack}
          fullWidth
          style={styles.backButton}
        />
      </ScrollView>

      {/* Success Modal */}
      <Modal.Success
        visible={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigation.goBack();
        }}
        title="Permintaan Terkirim"
        message="Permintaan reset password Anda telah dikirim ke admin sekolah."
        buttonText="Kembali ke Login"
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
    padding: 16,
  },

  // Info Card
  infoCard: {
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },

  // Contact Cards
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  // FAQ Cards
  faqCard: {
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // Back Button
  backButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});

export default ForgotPasswordScreen;