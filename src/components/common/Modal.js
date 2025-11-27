/**
 * Modal Component
 * Reusable modal dengan berbagai variant dan animasi
 */

import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';

const { width, height } = Dimensions.get('window');

const Modal = ({
  visible = false,
  onClose,
  title,
  children,
  variant = 'center', // center, bottom, full
  size = 'medium', // small, medium, large
  showCloseButton = true,
  closeOnBackdropPress = true,
  animationType = 'fade', // fade, slide, none
  transparent = true,
  footer,
  headerStyle,
  contentStyle,
  footerStyle,
  ...props
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  };

  const getModalStyle = () => {
    switch (variant) {
      case 'bottom':
        return styles.bottomModal;
      case 'full':
        return styles.fullModal;
      case 'center':
      default:
        return styles.centerModal;
    }
  };

  const getContainerStyle = () => {
    if (variant === 'full') return null;

    switch (size) {
      case 'small':
        return styles.smallContainer;
      case 'large':
        return styles.largeContainer;
      case 'medium':
      default:
        return styles.mediumContainer;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent
      {...props}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={[styles.overlay, getModalStyle()]}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, getContainerStyle(), contentStyle]}>
              {/* Header */}
              {(title || showCloseButton) && (
                <View style={[styles.header, headerStyle]}>
                  {title && (
                    <Text style={styles.title} numberOfLines={1}>
                      {title}
                    </Text>
                  )}
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={styles.closeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {children}
              </ScrollView>

              {/* Footer */}
              {footer && (
                <View style={[styles.footer, footerStyle]}>
                  {footer}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// Success Modal
Modal.Success = ({
  visible,
  onClose,
  title = 'Success!',
  message,
  buttonText = 'OK',
  onConfirm,
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    size="small"
    showCloseButton={false}
  >
    <View style={styles.messageContainer}>
      <View style={[styles.iconContainer, styles.successIcon]}>
        <Text style={styles.iconText}>✓</Text>
      </View>
      <Text style={styles.messageTitle}>{title}</Text>
      {message && (
        <Text style={styles.messageText}>{message}</Text>
      )}
      <TouchableOpacity
        style={[styles.messageButton, styles.successButton]}
        onPress={onConfirm || onClose}
      >
        <Text style={styles.messageButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

// Error Modal
Modal.Error = ({
  visible,
  onClose,
  title = 'Error!',
  message,
  buttonText = 'OK',
  onConfirm,
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    size="small"
    showCloseButton={false}
  >
    <View style={styles.messageContainer}>
      <View style={[styles.iconContainer, styles.errorIcon]}>
        <Text style={styles.iconText}>✕</Text>
      </View>
      <Text style={styles.messageTitle}>{title}</Text>
      {message && (
        <Text style={styles.messageText}>{message}</Text>
      )}
      <TouchableOpacity
        style={[styles.messageButton, styles.errorButton]}
        onPress={onConfirm || onClose}
      >
        <Text style={styles.messageButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

// Confirm Modal
Modal.Confirm = ({
  visible,
  onClose,
  title = 'Confirm',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmVariant = 'primary', // primary, danger
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    size="small"
    showCloseButton={false}
  >
    <View style={styles.messageContainer}>
      <View style={[styles.iconContainer, styles.confirmIcon]}>
        <Text style={styles.iconText}>?</Text>
      </View>
      <Text style={styles.messageTitle}>{title}</Text>
      {message && (
        <Text style={styles.messageText}>{message}</Text>
      )}
      <View style={styles.confirmButtons}>
        <TouchableOpacity
          style={[styles.confirmButton, styles.cancelButton]}
          onPress={onCancel || onClose}
        >
          <Text style={styles.cancelButtonText}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            confirmVariant === 'danger' ? styles.dangerButton : styles.primaryButton,
          ]}
          onPress={onConfirm}
        >
          <Text style={styles.messageButtonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
  },
  fullModal: {
    justifyContent: 'center',
  },

  // Container Sizes
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    maxHeight: height * 0.8,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  smallContainer: {
    width: width * 0.8,
    maxWidth: 320,
  },
  mediumContainer: {
    width: width * 0.85,
    maxWidth: 400,
  },
  largeContainer: {
    width: width * 0.9,
    maxWidth: 500,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: '300',
  },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  // Message Modals
  messageContainer: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successIcon: {
    backgroundColor: colors.success,
  },
  errorIcon: {
    backgroundColor: colors.error,
  },
  confirmIcon: {
    backgroundColor: colors.warning,
  },
  iconText: {
    fontSize: 32,
    color: colors.white,
    fontWeight: 'bold',
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  messageButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: colors.success,
  },
  errorButton: {
    backgroundColor: colors.error,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },

  // Confirm Buttons
  confirmButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray200,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default Modal;