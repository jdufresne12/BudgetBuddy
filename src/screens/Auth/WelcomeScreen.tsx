import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography } from '../../assets/theme';
import Icon from '@react-native-vector-icons/ionicons';

type AuthNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>;

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Icon name='logo-bitcoin' size={125} color={colors.primary} />
      </View>

      {/* Welcome Text & Tagline */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.tagline}>Smart budgeting made simple</Text>
      </View>

      {/* Feature Icons */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Icon name="pie-chart-outline" size={24} color={colors.white} />
          <Text style={styles.featureText}>Track Spending</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="trending-up-outline" size={24} color={colors.white} />
          <Text style={styles.featureText}>Set Goals</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="wallet-outline" size={24} color={colors.white} />
          <Text style={styles.featureText}>Save Money</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.createButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logoContainer: {
    marginTop: 125,
    width: 175,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
    backgroundColor: colors.secondary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.90,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    marginTop: 100,
    marginBottom: 5,
    letterSpacing: 0.5,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeights.heavy,
    fontSize: typography.sizes.moneyLarge,
    color: colors.white,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    padding: 10,
  },
  featureText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  buttonContainer: {
    width: '90%',
    gap: 10,
  },
  createButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  createButtonText: {
    color: '#66ccff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;