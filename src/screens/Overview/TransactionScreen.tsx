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
import { colors, typography } from '../../assets/theme.ts';
import { useBudget } from '../../contexts/BudgetContext.tsx';
import { Transaction } from '../../api/services/transaction.ts';
import TransactionCard from '../../components/TransactionCard.tsx';

function TransactionScreen(): React.JSX.Element {
  const { transactions } = useBudget();

  useEffect(() => {
    console.log(transactions)
  }, [transactions])

  return (
    <View style={styles.container}>
      {transactions.length > 0
        ? (
          <>
            {transactions.map((transaction: Transaction) => (
              <TransactionCard
                key={transaction.transaction_id}
                transaction={transaction}
              />
            ))}
          </>
        )
        : (
          <>
            <View style={styles.emptyTransactions}>
              <Text style={styles.emptyTransactionsText}>
                No transactions recorded yet
              </Text>
            </View>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    marginVertical: 20,
    gap: 15,
    backgroundColor: colors.secondary,
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

export default TransactionScreen;
