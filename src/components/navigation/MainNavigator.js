/**
 * MainNavigator
 * Stack navigator untuk authenticated screens

*/
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Tab Navigator
import TabNavigator from './TabNavigator';

// Report Screens
import ReportFormScreen from '../screens/report/ReportFormScreen';
import ReportHistoryScreen from '../screens/report/ReportHistoryScreen';

// Profile Screens
import EditProfileScreen from '../screens/profile/EditProfileScreen';

// Notification Detail
import NotificationDetailScreen from '../screens/notifications/NotificationDetailScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F9FAFB' },
      }}
    >
      {/* Tab Navigator as Main Screen */}
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{
          animationEnabled: false,
        }}
      />

      {/* Report Screens */}
      <Stack.Screen 
        name="ReportForm" 
        component={ReportFormScreen}
        options={{
          animationEnabled: true,
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="ReportHistory" 
        component={ReportHistoryScreen}
        options={{
          animationEnabled: true,
        }}
      />

      {/* Profile Screens */}
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          animationEnabled: true,
          presentation: 'card',
        }}
      />

      {/* Notification Detail */}
      <Stack.Screen 
        name="NotificationDetail" 
        component={NotificationDetailScreen}
        options={{
          animationEnabled: true,
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;