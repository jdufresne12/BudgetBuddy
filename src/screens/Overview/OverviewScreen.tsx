import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { colors } from '../../assets/theme.ts'
import RemainingBudget from "../../components/RemainingBudget.tsx";

function OverviewScreen(): React.JSX.Element {

  return (
    <View style={styles.container}>
      {/* Remaining Budget */}
      <View style={styles.budgetContainer}>
        <RemainingBudget />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.secondary,
  },
  budgetContainer: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
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
  text: {
    alignSelf: 'center',
    textAlign: 'center'
  },
});

export default OverviewScreen;