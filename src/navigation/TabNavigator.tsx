import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import colors from '../assets/colors.ts';
import Icon from '@react-native-vector-icons/ionicons';
import OverviewScreen from '../screens/OverviewScreen';
import BudgetScreen from '../screens/BudgetScreen';
import AccountScreen from '../screens/AccountScreen';

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
                let iconName:any
                let focusedColor:any  = focused ? colors.primary : color;
      
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
        <Tab.Screen name="Overview" component={OverviewScreen}/>
        <Tab.Screen name="Budget" component={BudgetScreen}/>
        <Tab.Screen name="Account" component={AccountScreen}/>
    </Tab.Navigator>
);