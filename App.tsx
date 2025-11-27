/**
 * App.tsx - Root Entry Point
 * Menghubungkan semua Context Provider dan Navigator
 */

import React from 'react';
import { StatusBar, StyleSheet, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import Context Providers (State Management Global)
// Urutan nesting provider penting: Auth biasanya paling luar
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { NotificationProvider } from './src/context/NotificationContext';

// Import Root Navigator (Pintu masuk ke screen-screen Anda)
import AppNavigator from './src/navigation/AppNavigator';

// Opsional: Mengabaikan warning spesifik yang tidak kritikal saat development
LogBox.ignoreLogs([
  'Warning: ...', 
  'props.pointerEvents is deprecated',
]);

const App = () => {
  return (
    // GestureHandlerRootView wajib untuk navigasi stack/drawer di Android/iOS modern
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* 1. AuthProvider: Cek token login & simpan data user dasar */}
          <AuthProvider>
            {/* 2. UserProvider: Handle data profil detail siswa */}
            <UserProvider>
              {/* 3. NotificationProvider: Handle notifikasi & FCM */}
              <NotificationProvider>
                
                {/* Konfigurasi Status Bar agar sesuai desain putih/gelap */}
                <StatusBar 
                  barStyle="dark-content" 
                  backgroundColor="transparent" 
                  translucent={true} 
                />
                
                {/* Memanggil Navigator Utama yang Anda buat di src/navigation/AppNavigator.js */}
                <AppNavigator />

              </NotificationProvider>
            </UserProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;