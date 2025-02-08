import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import { colors } from '../assets/theme.ts';
import Icon from '@react-native-vector-icons/ionicons';
import OverviewTabScreen from '../screens/Overview/OverviewTabScreen.tsx';
import BudgetTabScreen from '../screens/Budget/BudgetTabScreen.tsx';
import AccountTabScreen from '../screens/Account/AccountTabScreen.tsx';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? 'black' : color, fontSize: 10, marginTop: 3 }}>
          {route.name}
        </Text>
      ),
      tabBarIcon: ({ focused, color }) => {
        let iconName: any
        let focusedColor: any = focused ? colors.primary : color;

        if (route.name === 'Overview') {
          iconName = focused ? 'wallet' : 'wallet-outline';
        } else if (route.name === 'Budget') {
          iconName = focused ? 'calculator' : 'calculator-outline';
        } else if (route.name === 'Account') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Icon name={iconName} size={25} color={focusedColor} />;
      },
    })}
  >
    <Tab.Screen name="Overview" component={OverviewTabScreen} />
    <Tab.Screen name="Budget" component={BudgetTabScreen} />
    <Tab.Screen name="Account" component={AccountTabScreen} />
  </Tab.Navigator>
);