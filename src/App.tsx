import React from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './navigation/TabNavigator';

enableScreens();

const Navigation = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <TabNavigator /> : <AuthNavigator />;
};

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}