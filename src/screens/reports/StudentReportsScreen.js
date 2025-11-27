/**
 * StudentReportsScreen
 * Halaman laporan detail siswa dengan grafik dan statistik
 */

import React, { useState, useEffect, useCallback } from 'react'; // PERBAIKAN: Import useCallback
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions, // PERBAIKAN: Pindahkan import Dimensions ke sini agar rapi
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/navigation/Header';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

const StudentReportsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reportData, setReportData] = useState(null);

  // PERBAIKAN: Bungkus loadReportData dengan useCallback
  const loadReportData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // TODO: Fetch from API
      // const data = await reportsApi.getStudentReports();
      
      // Mock data
      const mockData = {
        student: {
          name: user?.name || 'Priya Patel',
          id: '20231001',
          school: 'SMPN 1 Jakarta',
          photo: null,
        },
        hemoglobin: {
          current: 12.5,
          change: 0.5,
          percentage: '+0.5%',
          trend: 'up',
          history: [
            { month: 'Jan', value: 11.8 },
            { month: 'Feb', value: 12.1 },
            { month: 'Mar', value: 11.9 },
            { month: 'Apr', value: 12.5 },
            { month: 'May', value: 13.0 },
            { month: 'Jun', value: 12.5 },
          ],
        },
        vitaminIntake: {
          percentage: 85,
          current: 41,
          total: 48,
          change: 5,
          history: [
            { month: 'Jan', value: 75 },
            { month: 'Feb', value: 78 },
            { month: 'Mar', value: 82 },
            { month: 'Apr', value: 80 },
            { month: 'May', value: 83 },
            { month: 'Jun', value: 85 },
          ],
        },
        pastReports: [
          { date: 'June 15, 2024', hb: '12.0 g/dL', status: 'Completed' },
          { date: 'May 15, 2024', hb: '11.8 g/dL', status: 'Completed' },
          { date: 'April 15, 2024', hb: '12.2 g/dL', status: 'Completed' },
        ],
      };

      setReportData(mockData);
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]); // Dependency user untuk useCallback

  useEffect(() => {
    loadReportData();
  }, [loadReportData]); // PERBAIKAN: Tambahkan loadReportData ke dependency array

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReportData();
    setRefreshing(false);
  };

  const handleDownload = () => {
    console.log('Download report');
    // TODO: Implement download functionality
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Student Reports" showBackButton onBackPress={handleBack} />
        <Loading.Screen message="Memuat laporan..." />
      </View>
    );
  }

  const chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(168, 85, 247, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: colors.purple,
    },
  };

  const barChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `rgba(236, 72, 153, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Reports</Text>
        <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>

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
        {/* Student Info */}
        <View style={styles.studentInfo}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentAvatarText}>
              {reportData.student.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.studentDetails}>
            <Text style={styles.studentName}>{reportData.student.name}</Text>
            <Text style={styles.studentId}>Student ID: {reportData.student.id}</Text>
          </View>
        </View>

        {/* Hemoglobin Trends */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Hemoglobin Trends</Text>
          
          <View style={styles.metricHeader}>
            <View>
              <Text style={styles.metricLabel}>Hemoglobin Levels</Text>
              <Text style={styles.metricValue}>
                {reportData.hemoglobin.current} g/dL
              </Text>
              <Text style={styles.metricChange}>
                Last 6 Months {reportData.hemoglobin.percentage}
              </Text>
            </View>
          </View>

          <LineChart
            data={{
              labels: reportData.hemoglobin.history.map(item => item.month),
              datasets: [{ data: reportData.hemoglobin.history.map(item => item.value) }],
            }}
            width={width - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
          />
        </Card>

        {/* Vitamin Intake */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Vitamin Intake</Text>
          
          <View style={styles.metricHeader}>
            <View>
              <Text style={styles.metricLabel}>Vitamin Consumption</Text>
              <Text style={styles.metricValue}>
                {reportData.vitaminIntake.percentage}%
              </Text>
              <Text style={styles.metricChange}>
                Last 6 Months +{reportData.vitaminIntake.change}%
              </Text>
            </View>
          </View>

          <BarChart
            data={{
              labels: reportData.vitaminIntake.history.map(item => item.month),
              datasets: [{ data: reportData.vitaminIntake.history.map(item => item.value) }],
            }}
            width={width - 64}
            height={220}
            chartConfig={barChartConfig}
            style={styles.chart}
            withInnerLines={false}
            showValuesOnTopOfBars={false}
            fromZero
          />
        </Card>

        {/* Past Reports */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Past Reports</Text>
          
          {reportData.pastReports.map((report, index) => (
            <View key={index} style={styles.reportItem}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportDate}>{report.date}</Text>
                <Text style={styles.reportHB}>HB: {report.hb}</Text>
              </View>
              <View style={styles.reportStatus}>
                <Text style={styles.reportStatusText}>{report.status}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Summary Stats */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Summary Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{reportData.vitaminIntake.current}</Text>
              <Text style={styles.statLabel}>Vitamins Taken</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{reportData.vitaminIntake.percentage}%</Text>
              <Text style={styles.statLabel}>Compliance Rate</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{reportData.hemoglobin.current}</Text>
              <Text style={styles.statLabel}>Avg HB Level</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Checkups Done</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  downloadButton: {
    padding: 8,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },

  // Student Info
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  studentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  studentAvatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Card
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },

  // Metrics
  metricHeader: {
    marginBottom: 16,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '600',
  },

  // Chart
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },

  // Report Item
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  reportInfo: {
    flex: 1,
  },
  reportDate: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  reportHB: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  reportStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.success + '20',
    borderRadius: 12,
  },
  reportStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default StudentReportsScreen;