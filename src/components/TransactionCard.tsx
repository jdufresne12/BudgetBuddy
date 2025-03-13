import React, { useEffect, useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, typography } from '../assets/theme.ts';
import { useBudget } from '../contexts/BudgetContext.tsx';
import { Transaction } from '../api/services/transaction.ts';
import Icon from '@react-native-vector-icons/ionicons';
import { formatToDollar } from '../utils/textFormatting.ts';
import EditTransactionModal from '../components/EditTransactionModal.tsx';

interface TransactionCardProps {
    transaction: Transaction
}

function TransactionCard({ transaction }: TransactionCardProps): React.JSX.Element {
    const [showTransactionModal, setShowTransactionModal] = useState<boolean>(false);

    function isIncome(transactionType: string) {
        return transactionType === "income" ? true : false;
    }

    function formatDate(date: string) {
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setShowTransactionModal(true)}
            >
                <Text style={styles.transactionDate}>{formatDate(transaction.date!)}</Text>
                <View style={styles.lineSeparator} />
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={[
                            styles.budgetItemName,
                            { color: isIncome(transaction.type) ? colors.income_green : colors.expense_red }
                        ]}
                    >
                        {transaction.description}
                    </Text>
                    <View style={styles.budgetItemAmount}>
                        <Text
                            style={[
                                styles.budgetItemAmountText,
                                { color: isIncome(transaction.type) ? colors.income_green : colors.expense_red }
                            ]}
                        >
                            {formatToDollar(transaction.amount)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <EditTransactionModal
                isVisible={showTransactionModal}
                setIsVisible={setShowTransactionModal}
                transaction={transaction}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 110,
        marginTop: 5,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: colors.white,
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
    transactionDate: {
        marginTop: 15,
        paddingLeft: 20,
        letterSpacing: 0.3,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.title,
    },
    lineSeparator: {
        height: 1.5,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        marginVertical: 10,
    },
    budgetItemName: {
        alignSelf: 'center',
        paddingLeft: 20,
        flex: 1,
        letterSpacing: 0.3,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.medium,
        fontSize: typography.sizes.body,
    },
    budgetItemAmount: {
        alignSelf: 'center',
        minWidth: 5,
        marginRight: 25,
        borderRadius: 10,
        backgroundColor: colors.secondary,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.20,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    budgetItemAmountText: {
        padding: 7,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.body,
    },
    emptyTransactions: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyTransactionsText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.body,
        color: colors.black
    }

});

export default TransactionCard;