/**
 * AppNavigator
 * Root navigator yang mengelola auth flow dan main flow
 */

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Loading
import Loading from '../components/common/Loading';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading screen while checking auth status
  if (isLoading) {
    return <Loading.Screen message="Memuat aplikasi..." />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack - User not logged in
        <Stack.Screen 
          name="Auth" 
          component={AuthNavigator}
          options={{
            animationTypeForReplace: !isAuthenticated ? 'pop' : 'push',
          }}
        />
      ) : (
        // Main Stack - User logged in
        <Stack.Screen 
          name="Main" 
          component={MainNavigator}
          options={{
            animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;