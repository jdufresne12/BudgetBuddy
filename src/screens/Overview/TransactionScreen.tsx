import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../assets/theme.ts';

function TransactionScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>TRANSACTION SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    backgroundColor: colors.secondary,
  },
});

export default TransactionScreen;
