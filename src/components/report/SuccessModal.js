// ========================================
// src/components/report/SuccessModal.js
// ========================================
/**
 * SuccessModal Component
 * Modal untuk menampilkan success message
 */
import React from 'react';
import Modal from '../common/Modal';

const SuccessModal = ({
  visible,
  onClose,
  title = 'Berhasil!',
  message = 'Data berhasil disimpan',
  buttonText = 'OK',
}) => {
  return (
    <Modal.Success
      visible={visible}
      onClose={onClose}
      title={title}
      message={message}
      buttonText={buttonText}
      onConfirm={onClose}
    />
  );
};

export default SuccessModal;