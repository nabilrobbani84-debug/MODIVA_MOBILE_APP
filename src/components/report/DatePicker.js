// ========================================
// src/components/report/DatePicker.js
// ========================================
/**
 * DatePicker Component
 * Custom date picker component
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { colors } from '../../styles/colors';
import { dateFormatter } from '../../utils/dateFormatter';

const DatePicker = ({
  label,
  value,
  onChange,
  mode = 'date',
  minimumDate,
  maximumDate = new Date(),
  style,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const handleConfirm = () => {
    onChange(selectedDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
    setSelectedDate(value || new Date());
  };

  const formatDisplayDate = () => {
    if (!value) return 'Pilih tanggal';
    
    if (dateFormatter.isToday(value)) {
      return 'Hari ini';
    } else if (dateFormatter.isYesterday(value)) {
      return 'Kemarin';
    } else {
      return dateFormatter.format(value, 'DD MMMM YYYY');
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Icon name="calendar" size={20} color={colors.primary} />
        <Text style={styles.dateText}>{formatDisplayDate()}</Text>
        <Icon name="chevron-down" size={20} color={colors.gray400} />
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        onClose={handleCancel}
        title="Pilih Tanggal"
        size="small"
      >
        <View style={styles.pickerContainer}>
          <DateTimePicker
            date={selectedDate}
            onDateChange={setSelectedDate}
            mode={mode}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            locale="id"
          />
          
          <View style={styles.pickerButtons}>
            <Button
              title="Batal"
              variant="outline"
              onPress={handleCancel}
              style={styles.pickerButton}
            />
            <Button
              title="Simpan"
              onPress={handleConfirm}
              style={styles.pickerButton}
            />
          </View>
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  pickerContainer: {
    paddingVertical: 16,
  },
  pickerButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  pickerButton: {
    flex: 1,
  },
});

export default DatePicker;