import React, { useEffect } from 'react';
import {
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import DashedLine from 'react-native-dashed-line';
import { typography, colors } from '../assets/theme.ts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BudgetItem } from '../api/services/budget.ts';
import { formatToDollar } from '../utils/textFormatting.ts';
import { Transaction } from '../api/services/transaction.ts';

interface ModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    section: string;
    budgetItems: BudgetItem[];
}

function ViewTransactionsModal({ isVisible, setIsVisible, section, budgetItems }: ModalProps): React.JSX.Element {
    const calculateTotalSpent = (transactions: Transaction[]) => {
        if (!transactions || transactions.length === 0) {
            return 0;
        }
        return transactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

    const isIncome = (item: Transaction | BudgetItem) => {
        if (item?.type === "income")
            return true;
        return false;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}>
                    <TouchableOpacity
                        style={styles.centeredView}
                        activeOpacity={1}
                        onPress={() => setIsVisible(false)}
                    >
                        <View style={styles.modalView}>
                            <Text style={styles.header}>{section}</Text>

                            {budgetItems?.length > 0
                                ? (
                                    <>
                                        {budgetItems.map((budgetItem) => {
                                            const totalSpent = calculateTotalSpent(budgetItem.transactions);
                                            const remainingAmount = budgetItem.amount - totalSpent;
                                            const progress = Math.min(1, Math.max(0, totalSpent / budgetItem.amount));

                                            return (
                                                <View key={budgetItem.item_id} style={{ marginBottom: 30 }}>
                                                    <View style={styles.lineSeparator} />
                                                    <Text style={styles.budgetItemTitle}>{budgetItem.name}</Text>
                                                    <View style={styles.budgetItemAnalytics}>
                                                        <Text style={styles.budgetItemAnalyticsText}>
                                                            {isIncome(budgetItem) ? "Received: " : "Spent: "}
                                                            <Text style={styles.amountText}> {formatToDollar(totalSpent)}</Text>
                                                        </Text>
                                                        <Text style={styles.budgetItemAnalyticsText}>
                                                            {isIncome(budgetItem) ? "Pending: " : "Remaining: "}
                                                            <Text style={styles.amountText}>{formatToDollar(remainingAmount)}</Text>
                                                        </Text>
                                                    </View>

                                                    <View style={styles.progressBar}>
                                                        <Progress.Bar
                                                            progress={progress}
                                                            width={250}
                                                            borderWidth={.5}
                                                            color={colors.primary}
                                                            unfilledColor={colors.secondary}
                                                        />
                                                    </View>

                                                    <View style={styles.dashedLineContainer}>
                                                        <DashedLine dashLength={5} dashColor={colors.inactive} />
                                                    </View>

                                                    {budgetItem.transactions && budgetItem.transactions.length > 0 ? (
                                                        budgetItem.transactions.map((transaction) => (
                                                            <View key={transaction.transaction_id} style={styles.transactionContainer}>
                                                                <Text style={[
                                                                    styles.transactionDescription,
                                                                    { color: isIncome(transaction) ? colors.income_green : colors.expense_red }
                                                                ]}>
                                                                    ({transaction.date})  {transaction.description}
                                                                </Text>
                                                                <Text style={[
                                                                    styles.transactionAmount,
                                                                    { color: isIncome(transaction) ? colors.income_green : colors.expense_red }
                                                                ]}>
                                                                    {isIncome(transaction) ? "+" : "-"} {formatToDollar(transaction.amount)}
                                                                </Text>
                                                            </View>
                                                        ))
                                                    ) : (
                                                        <View style={styles.transactionContainer}>
                                                            <Text>No transactions</Text>
                                                        </View>
                                                    )}
                                                </View>
                                            );
                                        })}
                                    </>
                                )
                                : <>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>Nothing to Track</Text>
                                    </View>
                                </>
                            }
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '85%',
        height: "60%",
        margin: 20,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    header: {
        textAlign: 'center',
        letterSpacing: 0.3,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.moneyLarge,
    },
    lineSeparator: {
        height: 3,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: colors.inactive,
    },
    budgetItemTitle: {
        marginLeft: "12%",
        marginTop: 5,
        letterSpacing: 0.3,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.regular,
        fontSize: typography.sizes.title,
    },
    progressBar: {
        alignSelf: 'center',
        marginTop: 5
    },
    budgetItemAnalytics: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: "10%",
        marginTop: 10,
        paddingBottom: 5
    },
    budgetItemAnalyticsText: {
        letterSpacing: 0.3,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.small,
    },
    amountText: {
        marginLeft: 20,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.small,
    },
    dashedLineContainer: {
        width: "80%",
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5
    },
    transactionContainer: {
        marginTop: 5,
        marginLeft: "10%",
        marginRight: "10%",
        flexDirection: 'row'
    },
    transactionDescription: {
        flex: 1,
        textAlign: 'left',
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.small,
    },
    transactionAmount: {
        flex: 1,
        textAlign: 'right',
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.small,
    },
});

export default ViewTransactionsModal;