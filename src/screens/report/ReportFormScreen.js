/**
 * ReportFormScreen
 * Halaman form untuk melaporkan konsumsi vitamin dengan foto
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/navigation/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import { colors } from '../../styles/colors';
import { FILE_UPLOAD, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/constants';

const ReportFormScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const handleBack = () => {
    if (photo || note) {
      Alert.alert(
        'Batalkan Laporan?',
        'Data yang sudah diisi akan hilang. Yakin ingin kembali?',
        [
          { text: 'Tidak', style: 'cancel' },
          { text: 'Ya', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const formatDate = (date) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleTakePhoto = () => {
    setShowPhotoOptions(false);
    
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Gagal membuka kamera');
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        
        // Validate file size
        if (asset.fileSize > FILE_UPLOAD.MAX_SIZE) {
          Alert.alert('Error', ERROR_MESSAGES.FILE_TOO_LARGE);
          return;
        }
        
        setPhoto(asset);
      }
    });
  };

  const handleChooseFromLibrary = () => {
    setShowPhotoOptions(false);
    
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Gagal memilih foto');
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        
        // Validate file size
        if (asset.fileSize > FILE_UPLOAD.MAX_SIZE) {
          Alert.alert('Error', ERROR_MESSAGES.FILE_TOO_LARGE);
          return;
        }
        
        setPhoto(asset);
      }
    });
  };

  const handleRemovePhoto = () => {
    Alert.alert(
      'Hapus Foto?',
      'Apakah Anda yakin ingin menghapus foto ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', onPress: () => setPhoto(null), style: 'destructive' },
      ]
    );
  };

  const handleSubmit = async () => {
    // Validation
    if (!photo) {
      Alert.alert('Peringatan', 'Foto bukti wajib dilampirkan');
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare form data
      const formData = new FormData();
      formData.append('date', date.toISOString().split('T')[0]);
      formData.append('note', note);
      formData.append('photo', {
        uri: photo.uri,
        type: photo.type || 'image/jpeg',
        name: photo.fileName || 'photo.jpg',
      });

      // TODO: Submit to API
      // await reportApi.submitReport(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setShowSuccess(true);
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
    <View style={styles.container}>
      <Header
        title="Lapor Konsumsi Vitamin"
        showBackButton
        onBackPress={handleBack}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.label}>Tanggal konsumsi</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateButtonText}>
              {formatDate(date)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Photo Upload */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Bukti Minum Vitamin <Text style={styles.required}>*</Text>
          </Text>
          
          {photo ? (
            <Card style={styles.photoPreviewCard}>
              <Image
                source={{ uri: photo.uri }}
                style={styles.photoPreview}
                resizeMode="cover"
              />
              <View style={styles.photoActions}>
                <TouchableOpacity
                  style={styles.photoActionButton}
                  onPress={() => setShowPhotoOptions(true)}
                >
                  <Icon name="refresh-cw" size={20} color={colors.primary} />
                  <Text style={styles.photoActionText}>Ganti Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.photoActionButton, styles.deleteButton]}
                  onPress={handleRemovePhoto}
                >
                  <Icon name="trash-2" size={20} color={colors.error} />
                  <Text style={[styles.photoActionText, styles.deleteText]}>
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ) : (
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => setShowPhotoOptions(true)}
            >
              <Icon name="camera" size={48} color={colors.gray400} />
              <Text style={styles.uploadTitle}>Upload foto bukti minum vitamin</Text>
              <Text style={styles.uploadSubtitle}>Format: .jpg, .png (Max 5MB)</Text>
              <Button
                title="Pilih Foto"
                size="small"
                style={styles.uploadButton}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Note Input */}
        <View style={styles.section}>
          <Input
            label="Keterangan (Opsional)"
            placeholder="Tambahkan catatan jika perlu"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
            maxLength={200}
          />
        </View>

        {/* Submit Button */}
        <Button
          title="Kirim Laporan"
          onPress={handleSubmit}
          disabled={!photo || isSubmitting}
          loading={isSubmitting}
          fullWidth
          size="large"
          style={styles.submitButton}
        />

        {/* Info Card */}
        <Card variant="flat" style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="info" size={16} color={colors.primary} />
            <Text style={styles.infoText}>
              Pastikan foto menunjukkan Anda sedang atau akan minum vitamin
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        title="Pilih Tanggal"
        size="small"
      >
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          maximumDate={new Date()}
          locale="id"
        />
        <Button
          title="Simpan"
          onPress={() => setShowDatePicker(false)}
          fullWidth
          style={styles.datePickerButton}
        />
      </Modal>

      {/* Photo Options Modal */}
      <Modal
        visible={showPhotoOptions}
        onClose={() => setShowPhotoOptions(false)}
        title="Pilih Sumber Foto"
        size="small"
      >
        <View style={styles.photoOptionsContainer}>
          <TouchableOpacity
            style={styles.photoOption}
            onPress={handleTakePhoto}
          >
            <Icon name="camera" size={24} color={colors.primary} />
            <Text style={styles.photoOptionText}>Ambil Foto</Text>
          </TouchableOpacity>
          <View style={styles.photoOptionDivider} />
          <TouchableOpacity
            style={styles.photoOption}
            onPress={handleChooseFromLibrary}
          >
            <Icon name="image" size={24} color={colors.primary} />
            <Text style={styles.photoOptionText}>Pilih dari Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal.Success
        visible={showSuccess}
        onClose={handleSuccessClose}
        title="Laporan berhasil di kirim"
        message="Terimakasih telah menjaga kesehatanmu."
        buttonText="Tutup"
      />

      {/* Loading Overlay */}
      <Loading.Overlay
        visible={isSubmitting}
        message="Mengirim laporan..."
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
    paddingBottom: 32,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },

  // Date Button
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 12,
  },

  // Upload Box
  uploadBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  uploadButton: {
    minWidth: 120,
  },

  // Photo Preview
  photoPreviewCard: {
    padding: 0,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: 300,
  },
  photoActions: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  photoActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  photoActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error + '15',
  },
  deleteText: {
    color: colors.error,
  },

  // Submit Button
  submitButton: {
    marginBottom: 16,
  },

  // Info Card
  infoCard: {
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // Photo Options
  photoOptionsContainer: {
    paddingVertical: 8,
  },
  photoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  photoOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  photoOptionDivider: {
    height: 1,
    backgroundColor: colors.border,
  },

  // Date Picker
  datePickerButton: {
    marginTop: 16,
  },
});

export default ReportFormScreen;