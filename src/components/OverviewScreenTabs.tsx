import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {typography} from '../assets/theme';

interface OverviewScreenTabsProps {
    activeTab: 'overview' | 'transactions';
    setActiveTab: React.Dispatch<React.SetStateAction<'overview' | 'transactions'>>;
  }

const OveriewScreenTabs = ({ activeTab, setActiveTab }: OverviewScreenTabsProps) => {

  return (
    <View style={styles.container}>
      {/* Overview Tab Button */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('overview')}>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'overview' && styles.activeTabLabel,
            ]}>
            OVERVIEW
          </Text>
          {activeTab === 'overview' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Transactions Tab Button */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('transactions')}>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'transactions' && styles.activeTabLabel,
            ]}>
            TRANSACTIONS
          </Text>
          {activeTab === 'transactions' && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 30,
    gap: 25,
  },
  tabContainer: {
    position: 'relative',
  },
  tabButton: {
    padding: 5,
  },
  tabLabel: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.body,
    fontWeight: typography.fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabLabel: {
    color: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
  }),
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
  }),
  },
});

export default OveriewScreenTabs;
