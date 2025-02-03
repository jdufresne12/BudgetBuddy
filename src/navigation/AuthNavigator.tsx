import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from './types';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignUpScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureDirection: 'vertical',
    }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ gestureEnabled: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
    <Stack.Screen name="Signup" component={SignupScreen} options={{ gestureEnabled: false }} />
  </Stack.Navigator>
);