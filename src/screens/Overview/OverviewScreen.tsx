import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { colors } from '../../assets/theme.ts'
import { useBudget } from "../../contexts/BudgetContext.tsx";
import RemainingBudget from "../../components/RemainingBudget.tsx";
import SpendingTimelineChart from "../../components/SpendingTimelineChart.tsx";

function OverviewScreen(): React.JSX.Element {
  const { budget } = useBudget();

  return (
    <View style={styles.container}>
      {/* Remaining Budget */}
      <View style={styles.budgetContainer}>
        <RemainingBudget />
      </View>
      <View style={styles.budgetContainer}>
        <SpendingTimelineChart />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    marginVertical: 10,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    width: '90%',
    minHeight: 100,
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