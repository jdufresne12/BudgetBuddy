import React, { memo, useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BudgetProvider } from './contexts/BudgetContext';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './navigation/TabNavigator';
import { LoadingScreen } from './screens/LoadingScreen';
import { LoadingProvider } from './contexts/LoadingContext';

enableScreens();

const Navigation = memo(() => {
  const { isAuthenticated } = useAuth();
  console.log('Navigation rendering with isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <TabNavigator /> : <AuthNavigator />;
});

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <AuthProvider>
          <BudgetProvider>
            <NavigationContainer>
              <LoadingScreen>
                <Navigation />
              </LoadingScreen>
            </NavigationContainer>
          </BudgetProvider>
        </AuthProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}