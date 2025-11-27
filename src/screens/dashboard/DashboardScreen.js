/**
 * DashboardScreen
 * Halaman utama dashboard untuk siswa
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  // PERBAIKAN: Menghapus TouchableOpacity yang tidak digunakan
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/navigation/Header';
import ProgressCard from '../../components/dashboard/ProgressCard';
import HealthTipCard from '../../components/dashboard/HealthTipCard';
import HBTrendChart from '../../components/dashboard/HBTrendChart';
import WeeklyConsumptionList from '../../components/dashboard/WeeklyConsumptionList';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { colors } from '../../styles/colors';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // PERBAIKAN: Menghapus setDashboardData karena belum digunakan
  const [dashboardData] = useState({
    progress: { current: 8, total: 48 },
    latestHB: 12.5,
    hbTrend: '+0.2%',
    hbTrendDirection: 'up',
    hbData: [
      { month: 'Sen', value: 11.2 },
      { month: 'Sel', value: 11.8 },
      { month: 'Rab', value: 11.5 },
      { month: 'Kam', value: 10.8 },
      { month: 'Jum', value: 12.8 },
      { month: 'Sab', value: 12.2 },
      { month: 'Min', value: 12.5 },
    ],
    weeklyConsumption: [
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
    ],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      // TODO: Fetch from API
      // const data = await dashboardApi.getDashboardData();
      // setDashboardData(data); // Nanti tambahkan setDashboardData kembali saat API siap
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  const handleProgressDetail = () => {
    navigation.navigate('Reports');
  };

  const handleHealthTipPress = () => {
    // Navigate to health tip detail
    console.log('Health tip pressed');
  };

  const handleReportItemPress = (item) => {
    console.log('Report item pressed:', item);
    // Navigate to report detail
  };

  const handleViewAllReports = () => {
    navigation.navigate('ReportHistory');
  };

  const handleCreateReport = () => {
    navigation.navigate('ReportForm');
  };

  if (isLoading) {
    return <Loading.Screen message="Memuat data..." />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header.Dashboard
        userName={user?.name || 'User'}
        onNotificationPress={handleNotificationPress}
      />

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Hai, {user?.name || 'Siswa'} 👋
          </Text>
        </View>

        {/* Progress Card */}
        <ProgressCard
          current={dashboardData.progress.current}
          total={dashboardData.progress.total}
          onDetailPress={handleProgressDetail}
        />

        {/* Health Tip Card */}
        <HealthTipCard
          title="Tahukah Kamu?"
          description="Vitamin D membantu penyerapan kalsium untuk tulang yang kuat."
          icon="💊"
          onPress={handleHealthTipPress}
        />

        {/* HB Trend Chart */}
        <HBTrendChart
          data={dashboardData.hbData}
          latestHB={dashboardData.latestHB}
          trend={dashboardData.hbTrend}
          trendDirection={dashboardData.hbTrendDirection}
        />

        {/* Add Report Button */}
        <Button
          title="+ Isi Laporan Konsumsi"
          onPress={handleCreateReport}
          fullWidth
          size="large"
          style={styles.addReportButton}
        />

        {/* Weekly Consumption List */}
        <WeeklyConsumptionList
          data={dashboardData.weeklyConsumption}
          onItemPress={handleReportItemPress}
          onViewAllPress={handleViewAllReports}
        />

        {/* Motivational Message */}
        {dashboardData.progress.current > 0 && (
          <View style={styles.motivationContainer}>
            <Text style={styles.motivationText}>
              🎉 Hebat! Kamu sudah minum vitamin minggu ini
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Extra space for bottom navigation
  },

  // Greeting
  greetingContainer: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // Add Report Button
  addReportButton: {
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  // Motivation
  motivationContainer: {
    backgroundColor: colors.success + '15',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  motivationText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DashboardScreen;