/**
 * ReportHistoryScreen
 * Halaman riwayat laporan konsumsi vitamin
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/navigation/Header';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import { colors } from '../../styles/colors';

const ReportHistoryScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, pending, rejected

  useEffect(() => {
    loadReports();
  }, [filterStatus]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Fetch from API
      // const data = await reportApi.getReportHistory();
      
      // Mock data
      const mockData = [
        {
          id: 1,
          date: '12 Mei 2024',
          fullDate: '2024-05-12',
          hb: 12.5,
          status: 'completed',
          statusLabel: 'Selesai',
          note: 'Normal',
          photo: 'https://via.placeholder.com/400x300',
          hasPhoto: true,
          verifiedBy: 'Admin Sekolah',
          verifiedAt: '13 Mei 2024',
        },
        {
          id: 2,
          date: '5 Mei 2024',
          fullDate: '2024-05-05',
          hb: 12.0,
          status: 'completed',
          statusLabel: 'Selesai',
          note: 'Normal',
          photo: 'https://via.placeholder.com/400x300',
          hasPhoto: true,
          verifiedBy: 'Admin Sekolah',
          verifiedAt: '6 Mei 2024',
        },
        {
          id: 3,
          date: '28 Apr 2024',
          fullDate: '2024-04-28',
          hb: 11.8,
          status: 'pending',
          statusLabel: 'Menunggu Verifikasi',
          note: 'Normal',
          photo: 'https://via.placeholder.com/400x300',
          hasPhoto: true,
        },
        {
          id: 4,
          date: '21 Apr 2024',
          fullDate: '2024-04-21',
          hb: 11.5,
          status: 'completed',
          statusLabel: 'Selesai',
          note: 'Normal',
          photo: 'https://via.placeholder.com/400x300',
          hasPhoto: true,
          verifiedBy: 'Admin Sekolah',
          verifiedAt: '22 Apr 2024',
        },
      ];

      // Filter by status
      let filteredData = mockData;
      if (filterStatus !== 'all') {
        filteredData = mockData.filter(item => item.status === filterStatus);
      }

      setReports(filteredData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReports();
    setRefreshing(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleReportPress = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

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

  const renderFilterButton = (label, value) => {
    const isActive = filterStatus === value;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.filterButtonActive]}
        onPress={() => setFilterStatus(value)}
      >
        <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderReportItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleReportPress(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <View style={styles.reportDate}>
            <Icon name="calendar" size={16} color={colors.textSecondary} />
            <Text style={styles.reportDateText}>{item.date}</Text>
          </View>
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
              style={[styles.statusText, { color: getStatusColor(item.status) }]}
            >
              {item.statusLabel}
            </Text>
          </View>
        </View>

        <View style={styles.reportBody}>
          {item.hasPhoto && (
            <Image
              source={{ uri: item.photo }}
              style={styles.reportThumbnail}
              resizeMode="cover"
            />
          )}
          <View style={styles.reportInfo}>
            <View style={styles.reportInfoRow}>
              <Text style={styles.reportInfoLabel}>Nilai HB:</Text>
              <Text style={styles.reportInfoValue}>{item.hb} g/dL</Text>
            </View>
            <View style={styles.reportInfoRow}>
              <Text style={styles.reportInfoLabel}>Keterangan:</Text>
              <Text style={styles.reportInfoValue}>{item.note}</Text>
            </View>
          </View>
        </View>

        <View style={styles.reportFooter}>
          <Icon name="chevron-right" size={16} color={colors.gray400} />
          <Text style={styles.viewDetailText}>Lihat Detail</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="inbox" size={64} color={colors.gray300} />
      <Text style={styles.emptyText}>Belum ada riwayat laporan</Text>
      <Text style={styles.emptySubtext}>
        {filterStatus === 'all'
          ? 'Laporan yang Anda kirim akan muncul di sini'
          : 'Tidak ada laporan dengan status ini'}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Riwayat Laporan" showBackButton onBackPress={handleBack} />
        <Loading.Screen message="Memuat riwayat..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Riwayat Laporan"
        showBackButton
        onBackPress={handleBack}
      />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {renderFilterButton('Semua', 'all')}
          {renderFilterButton('Selesai', 'completed')}
          {renderFilterButton('Menunggu', 'pending')}
          {renderFilterButton('Ditolak', 'rejected')}
        </ScrollView>
      </View>

      {/* Reports List */}
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmpty}
      />

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Detail Laporan"
        size="large"
      >
        {selectedReport && (
          <View style={styles.detailContainer}>
            {selectedReport.photo && (
              <Image
                source={{ uri: selectedReport.photo }}
                style={styles.detailPhoto}
                resizeMode="cover"
              />
            )}

            <View style={styles.detailInfo}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tanggal:</Text>
                <Text style={styles.detailValue}>{selectedReport.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nilai HB:</Text>
                <Text style={styles.detailValue}>{selectedReport.hb} g/dL</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(selectedReport.status) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(selectedReport.status) },
                    ]}
                  >
                    {selectedReport.statusLabel}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Keterangan:</Text>
                <Text style={styles.detailValue}>{selectedReport.note}</Text>
              </View>

              {selectedReport.verifiedBy && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Diverifikasi oleh:</Text>
                    <Text style={styles.detailValue}>{selectedReport.verifiedBy}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tanggal verifikasi:</Text>
                    <Text style={styles.detailValue}>{selectedReport.verifiedAt}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Filter
  filterContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray100,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.white,
  },

  // List
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },

  // Report Card
  reportCard: {
    marginBottom: 16,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reportDateText: {
    fontSize: 14,
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
  reportBody: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  reportThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  reportInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reportInfoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reportInfoLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: 8,
  },
  reportInfoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  viewDetailText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Detail Modal
  detailContainer: {
    paddingBottom: 16,
  },
  detailPhoto: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailInfo: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
});

export default ReportHistoryScreen;