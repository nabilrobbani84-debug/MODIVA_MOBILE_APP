/**
 * WeeklyConsumptionList Component
 * Menampilkan daftar konsumsi vitamin mingguan
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  // PERBAIKAN: Menghapus Image yang tidak digunakan
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
// PERBAIKAN: Menghapus Card yang tidak digunakan

// PERBAIKAN: Mendefinisikan komponen separator di luar komponen utama agar stabil
const ItemSeparator = () => <View style={styles.separator} />;

const WeeklyConsumptionList = ({
  data = [],
  onItemPress,
  onViewAllPress,
  style,
}) => {
  // Default data jika kosong
  const defaultData = [
    {
      id: 1,
      date: '12 Mei 2024',
      hb: 12.5,
      status: 'completed',
      statusLabel: 'Selesai',
      note: 'Normal',
      hasPhoto: true,
    },
    {
      id: 2,
      date: '5 Mei 2024',
      hb: 12.0,
      status: 'completed',
      statusLabel: 'Selesai',
      note: 'Normal',
      hasPhoto: true,
    },
    {
      id: 3,
      date: '28 Apr 2024',
      hb: 11.8,
      status: 'completed',
      statusLabel: 'Selesai',
      note: 'Normal',
      hasPhoto: true,
    },
    {
      id: 4,
      date: '21 Apr 2024',
      hb: 11.5,
      status: 'completed',
      statusLabel: 'Selesai',
      note: 'Normal',
      hasPhoto: true,
    },
  ];

  const listData = data.length > 0 ? data : defaultData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'rejected':
        return colors.error;
      default:
        return colors.gray400;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'pending':
        return 'clock';
      case 'rejected':
        return 'x-circle';
      default:
        return 'circle';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onItemPress && onItemPress(item)}
      activeOpacity={0.7}
    >
      {/* Calendar Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.calendarIcon}>
          <Icon name="calendar" size={24} color={colors.primary} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.date}>{item.date}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) + '20' },
            ]}
          >
            <Icon
              name={getStatusIcon(item.status)}
              size={12}
              color={getStatusColor(item.status)}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.statusLabel}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Nilai HB:</Text>
            <Text style={styles.detailValue}>{item.hb} g/dL</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Keterangan:</Text>
            <Text style={styles.detailValue}>{item.note}</Text>
          </View>
        </View>

        {item.hasPhoto && (
          <View style={styles.photoIndicator}>
            <Icon name="image" size={14} color={colors.primary} />
            <Text style={styles.photoText}>Foto tersedia</Text>
          </View>
        )}
      </View>

      {/* Arrow Icon */}
      <Icon name="chevron-right" size={20} color={colors.gray400} />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Konsumsi Mingguan</Text>
      {onViewAllPress && (
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAllText}>Lihat Semua</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="inbox" size={48} color={colors.gray300} />
      <Text style={styles.emptyText}>Belum ada laporan konsumsi</Text>
      <Text style={styles.emptySubtext}>
        Mulai laporkan konsumsi vitamin Anda
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {renderHeader()}
      {listData.length > 0 ? (
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          // PERBAIKAN: Menggunakan komponen yang didefinisikan di luar
          ItemSeparatorComponent={ItemSeparator}
        />
      ) : (
        renderEmpty()
      )}
    </View>
  );
};

// Compact Item Variant
export const CompactConsumptionItem = ({ item, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'rejected':
        return colors.error;
      default:
        return colors.gray400;
    }
  };

  return (
    <TouchableOpacity
      style={styles.compactItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.compactLeft}>
        <View
          style={[
            styles.compactStatusDot,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactDate}>{item.date}</Text>
          <Text style={styles.compactHB}>HB: {item.hb} g/dL</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={16} color={colors.gray400} />
    </TouchableOpacity>
  );
};

// Grid Variant
export const ConsumptionGrid = ({ data = [], onItemPress }) => {
  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => onItemPress && onItemPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.gridDate}>{item.date.split(' ')[0]}</Text>
      <Text style={styles.gridMonth}>{item.date.split(' ')[1]}</Text>
      <View
        style={[
          styles.gridStatus,
          { backgroundColor: item.status === 'completed' ? colors.success : colors.gray300 },
        ]}
      >
        <Icon
          name={item.status === 'completed' ? 'check' : 'x'}
          size={16}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={4}
      columnWrapperStyle={styles.gridRow}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  // List Item
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
  },
  separator: {
    height: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  calendarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  details: {
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  photoIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoText: {
    fontSize: 12,
    color: colors.primary,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  // Compact Variant
  compactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  compactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  compactContent: {
    flex: 1,
  },
  compactDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  compactHB: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Grid Variant
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridItem: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gridDate: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gridMonth: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  gridStatus: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeeklyConsumptionList;