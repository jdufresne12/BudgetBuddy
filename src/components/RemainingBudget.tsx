import React, { useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { typography, colors } from '../assets/theme.ts';
import { formatToDollar } from "../utils/textFormatting.ts";

function RemainingBudget(): React.JSX.Element {
    const [remainingBudget, setRemainingBudget] = useState<number>(500);
    const [budget, setBudget] = useState<number>(1500);
    const [amountSpent, setAmountSpent] = useState<number>(300);

    return (
      <View style={styles.container}>
        <View style={styles.budgetTitleContainer}>
          <Text style={styles.budgetTitle}>Budget</Text>
        </View>

        <View style={styles.leftToSpendContainer}>
            <Text style={styles.leftToSpendText}>LEFT TO SPEND</Text>
        </View>

        <View style={styles.budgetContainer}>
            <Text style={styles.budgetText}>{formatToDollar(remainingBudget)}</Text>
            <View style={styles.progressBar}>
                <Progress.Bar 
                    progress={amountSpent/budget} 
                    width={335} 
                    borderWidth={0}
                    color={colors.primary}
                    unfilledColor={colors.secondary}
                />
            </View>
            <Text style={styles.leftToSpendText}>
                OF YOUR
                <Text style={styles.spentText}>{` ${formatToDollar(budget)} `}</Text>
                BUDGET
            </Text>
        </View>

        {/*  */}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    budgetTitleContainer: {
        height: 50,
        marginBottom: -2,
        paddingTop: 15,
        paddingLeft: 30,
    },
    budgetTitle: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.header,
        letterSpacing: 0.5,
    },
    leftToSpendContainer: {
        paddingLeft: 30,
        paddingBottom: 5,
    },  
    leftToSpendText: {
        paddingTop: 10,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.small,
        color: colors.inactive
    },
    budgetContainer: {
        paddingLeft: 30,
    },  
    budgetText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.moneyLarge,
        color: 'black'
    },
    spentText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.body,
        color: 'black'
    },
    progressBar: {
        paddingTop: 5
    },

});

export default RemainingBudget;