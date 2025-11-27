// ========================================
// src/components/report/PhotoUploader.js
// ========================================
/**
 * PhotoUploader Component
 * Component untuk upload foto dengan preview
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useCamera from '../../hooks/useCamera';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { colors } from '../../styles/colors';
import { validators } from '../../utils/validators';
import { FILE_UPLOAD } from '../../utils/constants';

const PhotoUploader = ({
  label,
  photo,
  onPhotoChange,
  required = false,
  style,
}) => {
  const { takePhoto, pickImage, loading } = useCamera();
  const [showOptions, setShowOptions] = React.useState(false);

  const handleTakePhoto = async () => {
    setShowOptions(false);
    const result = await takePhoto();
    
    if (result) {
      // Validate file
      if (!validators.isValidFileSize(result.fileSize, FILE_UPLOAD.MAX_SIZE)) {
        Alert.alert('Error', 'Ukuran foto terlalu besar. Maksimal 5MB');
        return;
      }

      if (!validators.isValidFileType(result.type, FILE_UPLOAD.ALLOWED_TYPES)) {
        Alert.alert('Error', 'Format file tidak didukung. Gunakan JPG atau PNG');
        return;
      }

      onPhotoChange(result);
    }
  };

  const handlePickImage = async () => {
    setShowOptions(false);
    const result = await pickImage();
    
    if (result) {
      // Validate file
      if (!validators.isValidFileSize(result.fileSize, FILE_UPLOAD.MAX_SIZE)) {
        Alert.alert('Error', 'Ukuran foto terlalu besar. Maksimal 5MB');
        return;
      }

      if (!validators.isValidFileType(result.type, FILE_UPLOAD.ALLOWED_TYPES)) {
        Alert.alert('Error', 'Format file tidak didukung. Gunakan JPG atau PNG');
        return;
      }

      onPhotoChange(result);
    }
  };

  const handleRemovePhoto = () => {
    Alert.alert(
      'Hapus Foto?',
      'Apakah Anda yakin ingin menghapus foto ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', onPress: () => onPhotoChange(null), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      {photo ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photo.uri }}
            style={styles.preview}
            resizeMode="cover"
          />
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowOptions(true)}
            >
              <Icon name="refresh-cw" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Ganti Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleRemovePhoto}
            >
              <Icon name="trash-2" size={20} color={colors.error} />
              <Text style={[styles.actionText, styles.deleteText]}>
                Hapus
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => setShowOptions(true)}
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

      {/* Photo Options Modal */}
      <Modal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        title="Pilih Sumber Foto"
        size="small"
      >
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={handleTakePhoto}
            disabled={loading}
          >
            <Icon name="camera" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Ambil Foto</Text>
          </TouchableOpacity>
          
          <View style={styles.optionDivider} />
          
          <TouchableOpacity
            style={styles.option}
            onPress={handlePickImage}
            disabled={loading}
          >
            <Icon name="image" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Pilih dari Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
  previewContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  preview: {
    width: '100%',
    height: 300,
  },
  previewActions: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  actionText: {
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
  optionsContainer: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  optionDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
});

export default PhotoUploader;