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

      {/* Accumulated costs of current month */}
      {/* <View style={styles.monthlyContainer}>
                <Text style={styles.text}>
                    This section will hold the accumulated costs of current month with a line graph
                </Text>
            </View> */}

      {/* Calender */}
      {/* <View style={styles.calenderContainer}>
                <Text style={styles.text}>
                    Calender showing cost for each day of the month
                </Text>
            </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    backgroundColor: colors.secondary,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    height: '20%',
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
  monthlyContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    height: '25%',
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
  calenderContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    height: '25%',
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
  }
});

export default OverviewScreen;