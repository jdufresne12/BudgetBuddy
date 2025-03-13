import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { typography, colors } from '../assets/theme.ts';
import { formatToDollar } from "../utils/textFormatting.ts";
import { useBudget } from "../contexts/BudgetContext.tsx";
import { BudgetItem } from "../api/services/budget.ts";
import { Transaction } from "../api/services/transaction.ts";

function RemainingBudget(): React.JSX.Element {
    const { budget } = useBudget();

    const [curBudget, setCurBudget] = useState<number>(0);
    const [amountSpent, setAmountSpent] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        setAmountSpent(calculateAmountSpent());
        setCurBudget(calculateCurBudget());
    }, [budget])

    useEffect(() => {
        setProgress(amountSpent / curBudget);
    }, [curBudget, amountSpent])

    function calculateCurBudget() {
        let totalExpenses = 0;

        Object.values(budget).forEach(category => {
            category.forEach((budgetItem: BudgetItem) => {
                if (budgetItem.type === 'expense') {
                    totalExpenses += budgetItem.amount;
                }
            });
        });
        return totalExpenses;
    }
    function calculateAmountSpent() {
        let totalSpent = 0;

        Object.values(budget).forEach(category => {
            category.forEach((budgetItem: BudgetItem) => {
                if (budgetItem.type === 'expense') {
                    budgetItem.transactions.forEach((transaction: Transaction) => {
                        if (transaction.type === 'expense')
                            totalSpent += transaction.amount;
                        else
                            totalSpent -= transaction.amount;
                    });
                }
            });
        });
        return totalSpent;
    }

    return (
        <View style={styles.container}>
            <View style={styles.budgetTitleContainer}>
                <Text style={styles.budgetTitle}>Budget</Text>
            </View>

            <View style={styles.leftToSpendContainer}>
                <Text style={styles.leftToSpendText}>LEFT TO SPEND</Text>
            </View>

            <View style={styles.budgetContainer}>
                <Text style={styles.budgetText}>{formatToDollar(curBudget - amountSpent)}</Text>
                <View style={styles.progressBar}>
                    <Progress.Bar
                        progress={progress}
                        width={300}
                        height={10}
                        borderWidth={0}
                        color={colors.primary}
                        unfilledColor={colors.secondary}
                        animated={false}
                    />
                </View>
                <Text style={styles.leftToSpendText}>
                    OF YOUR
                    <Text style={styles.spentText}>{` ${formatToDollar(curBudget)} `}</Text>
                    BUDGET
                </Text>
            </View>
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
        marginLeft: -1
    },
    leftToSpendContainer: {
        marginTop: -5,
        paddingLeft: 30,
        paddingBottom: 5,
    },
    leftToSpendText: {
        paddingVertical: 10,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.small,
        color: colors.inactive
    },
    budgetContainer: {
        marginTop: -10,
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