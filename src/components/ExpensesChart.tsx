import React, { useEffect, useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { typography, colors } from '../assets/theme.ts';
import { formatToDollar } from "../utils/textFormatting.ts";

interface ExpensesChartProps {
    remainingBudget: number;
    totalExpenses: number;
    circleProgress: number;
}

function ExpensesChart({
    remainingBudget,
    totalExpenses,
    circleProgress,
}: ExpensesChartProps): React.JSX.Element {

    return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                <Progress.Circle
                    progress={circleProgress}
                    size={100}
                    thickness={15}
                    borderColor="none"
                    color={colors.primary}
                    unfilledColor={colors.empty}
                    strokeCap="round"
                />
            </View>

            <View style={styles.expensesContainer}>
                <Text style={styles.plannedExpensesText}>Total Planned Expenses</Text>
                <Text style={styles.spentText}>{formatToDollar(totalExpenses)}</Text>
                <Text style={styles.leftInBudgetText}>{`${formatToDollar(remainingBudget)} left to budget`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: "90%",
        alignSelf: 'center',
        marginTop: 20,
        padding: 20,
        // borderRadius: 10,
        // backgroundColor: 'white',
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
    circleContainer: {
        width: '40%',
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    expensesContainer: {
        justifyContent: 'center',
        width: '60%',
        paddingBottom: 10,
        gap: 3,
    },
    plannedExpensesText: {
        paddingTop: 10,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.small,
        letterSpacing: 0.5,
        color: colors.inactive
    },
    spentText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.moneyLarge,
        color: 'black'
    },
    leftInBudgetText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.body,
        color: colors.inactive
    }

});

export default ExpensesChart;