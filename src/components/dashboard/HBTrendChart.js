/**
 * HBTrendChart Component
 * Menampilkan grafik tren Hemoglobin dengan LineChart
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../../styles/colors';
import Card from '../common/Card';

const { width } = Dimensions.get('window');

const HBTrendChart = ({
  data = [],
  latestHB = 12.5,
  trend = '+0.2%',
  trendDirection = 'up', // up, down, stable
  style,
}) => {
  // Default data jika kosong
  const defaultData = [
    { month: 'Sen', value: 11.2 },
    { month: 'Sel', value: 11.8 },
    { month: 'Rab', value: 11.5 },
    { month: 'Kam', value: 10.8 },
    { month: 'Jum', value: 12.8 },
    { month: 'Sab', value: 12.2 },
    { month: 'Min', value: 12.5 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  // Prepare data for chart
  const labels = chartData.map((item) => item.month);
  const values = chartData.map((item) => item.value);

  // Chart configuration
  const chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.green,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.gray200,
      strokeWidth: 1,
    },
  };

  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up':
        return colors.success;
      case 'down':
        return colors.error;
      default:
        return colors.warning;
    }
  };

  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <Card variant="default" style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>HB Trend</Text>
      </View>

      {/* Current HB Value */}
      <View style={styles.valueContainer}>
        <Text style={styles.currentValue}>{latestHB}</Text>
        <Text style={styles.unit}>g/dL</Text>
        <View
          style={[
            styles.trendBadge,
            { backgroundColor: getTrendColor() + '20' },
          ]}
        >
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {getTrendIcon()} {trend}
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Minggu ini</Text>

      {/* Chart */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chartContainer}
      >
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: values,
              },
            ],
          }}
          width={width > 400 ? width - 80 : 350}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          withDots={true}
          withShadow={false}
          fromZero={false}
        />
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>Normal (12.0-16.0 g/dL)</Text>
        </View>
      </View>
    </Card>
  );
};

// Compact Variant
export const CompactHBTrend = ({
  latestHB = 12.5,
  trend = '+0.2%',
  trendDirection = 'up',
  onPress,
  style,
}) => {
  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up':
        return colors.success;
      case 'down':
        return colors.error;
      default:
        return colors.warning;
    }
  };

  return (
    <Card onPress={onPress} style={[styles.compactContainer, style]}>
      <View style={styles.compactHeader}>
        <Text style={styles.compactTitle}>HB Terakhir</Text>
        <View
          style={[
            styles.compactTrendBadge,
            { backgroundColor: getTrendColor() + '20' },
          ]}
        >
          <Text style={[styles.compactTrendText, { color: getTrendColor() }]}>
            {trend}
          </Text>
        </View>
      </View>
      <View style={styles.compactValue}>
        <Text style={styles.compactValueText}>{latestHB}</Text>
        <Text style={styles.compactUnit}>g/dL</Text>
      </View>
      <Text style={styles.compactSubtitle}>Minggu ini</Text>
    </Card>
  );
};

// Simple Bar Chart Variant
export const SimpleHBChart = ({ data = [], style }) => {
  const defaultData = [
    { month: 'Sen', value: 11.2 },
    { month: 'Sel', value: 11.8 },
    { month: 'Rab', value: 11.5 },
    { month: 'Kam', value: 10.8 },
    { month: 'Jum', value: 12.8 },
    { month: 'Sab', value: 12.2 },
    { month: 'Min', value: 12.5 },
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <View style={[styles.simpleContainer, style]}>
      <Text style={styles.simpleTitle}>Tren HB 7 Hari Terakhir</Text>
      <View style={styles.barsContainer}>
        {chartData.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          return (
            <View key={index} style={styles.barWrapper}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPercentage}%`,
                      backgroundColor: colors.green,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barLabel}>{item.month}</Text>
            </View>
          );
        })}
      </View>
    </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  chartContainer: {
    marginHorizontal: -16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Compact Variant
  compactContainer: {
    padding: 16,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  compactTrendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  compactTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  compactValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  compactValueText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  compactUnit: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  compactSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  // Simple Bar Chart
  simpleContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  simpleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    width: '70%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
  },
});

export default HBTrendChart;