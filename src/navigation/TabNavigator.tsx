import React, { useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import OverviewTabScreen from '../screens/Overview/OverviewTabScreen';
import BudgetTabScreen from '../screens/Budget/BudgetTabScreen';
import { colors } from '../assets/theme';
import SignOutModal from '../components/SignOutModal';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? 'black' : color, fontSize: 10, marginTop: 3 }}>
              {route.name}
            </Text>
          ),
          tabBarIcon: ({ focused, color }) => {
            let iconName: any;
            let focusedColor = focused ? colors.primary : color;

            if (route.name === 'Overview') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'Budget') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Sign Out') {
              iconName = 'log-out-outline';
            }

            return <Icon name={iconName} size={25} color={focusedColor} />;
          },
        })}
      >
        <Tab.Screen
          name="Overview"
          component={OverviewTabScreen}
          listeners={{
            tabPress: () => setActiveTab('Overview'),
          }}
        />
        <Tab.Screen
          name="Budget"
          component={BudgetTabScreen}
          listeners={{
            tabPress: () => setActiveTab('Budget'),
          }}
        />
        <Tab.Screen
          name="Sign Out"
          component={View}
          options={{
            tabBarButton: (props) => (
              <Pressable
                {...props}
                onPress={() => {
                  setIsVisible(true);
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <SignOutModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

    </>
  );
};
