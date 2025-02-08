import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import BottomSheet from './BottomSheet';
import { colors, typography } from '../assets/theme';
import AmountInput from './AmountInput';

interface AddBudgetItemProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBudgetItem = ({ isVisible, setIsVisible }: AddBudgetItemProps) => {
    const [amount, setAmount] = useState<number>(0);
    const [itemType, setItemType] = useState<string>('expense');


    return (
        <BottomSheet visible={isVisible} setVisible={setIsVisible} onClose={() => setIsVisible(false)}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                    <Icon name="close" size={40} color={colors.empty} />
                </TouchableOpacity>
                <Text style={styles.budgetExpenseHeader}>Budget Item</Text>
            </View>

            <View style={{ alignSelf: 'center', marginTop: 10 }}>
                <AmountInput
                    number={String(amount)}
                    setNumber={setAmount}
                />
            </View>

            <View style={styles.itemTypeContainer}>
                <TouchableOpacity
                    style={[
                        styles.itemType,
                        itemType === 'expense' ? { backgroundColor: colors.empty } : null,
                    ]}
                    onPress={() => setItemType('expense')}>
                    <Text style={styles.itemTypeText}>EXPENSE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.itemType,
                        itemType === 'income' ? { backgroundColor: colors.empty } : null,
                    ]}
                    onPress={() => setItemType('income')}>
                    <Text style={styles.itemTypeText}>INCOME</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.lineSeparator} />

            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => console.log(`Name Pressed!`)}
            >
                <View style={styles.iconCircle}>
                    <Icon name='folder-sharp' size={20} color={colors.white} />
                </View>
                <Text style={styles.categoryText}> Name:
                    <TextInput
                        style={styles.categoryNameText}

                    />
                </Text>
            </TouchableOpacity>

            <View style={styles.lineSeparator} />

            <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => console.log(`Recurring Pressed!`)}
            >
                <View style={[styles.iconCircle, { backgroundColor: colors.white, paddingTop: 0 }]}>
                    <Icon name='calendar-outline' size={35} color={colors.black} />
                </View>
                <Text style={styles.categoryText}> No end date</Text>
            </TouchableOpacity>

            <View style={styles.lineSeparator} />

            <TouchableOpacity
                style={styles.expenseContainer}
                onPress={() => console.log(`Expense Type Pressed!`)}
            >
                <View style={styles.expense}>
                    <Text style={styles.categoryText}> Expense type</Text>
                </View>
                <Text style={[styles.categoryText, { color: colors.black, letterSpacing: 1.0 }]}> VARIABLE EXPENSE</Text>
            </TouchableOpacity>

            <View style={styles.lineSeparator} />

            {/* Save */}
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    budgetExpenseHeader: {
        marginLeft: '22%',
        letterSpacing: 1.5,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.title,
    },
    itemTypeText: {
        letterSpacing: 1,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.regular,
        fontSize: typography.sizes.small,
    },
    itemTypeContainer: {
        flexDirection: 'row',
        height: 40,
        width: '50%',
        marginTop: 15,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    itemType: {
        width: '50%',
        marginTop: 5,
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
    },
    lineSeparator: {
        height: 1.5,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.secondary,
        marginVertical: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
    },
    iconCircle: {
        width: 40,
        height: 40,
        alignItems: 'center',
        marginLeft: 15,
        paddingTop: 8,
        borderRadius: 20,
        backgroundColor: colors.inactive,
    },
    categoryName: {
        alignSelf: 'center',
        paddingLeft: 10,
        flex: 1,
        letterSpacing: 0.3,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.medium,
        fontSize: typography.sizes.body,
    },
    categoryText: {
        padding: 8,
        color: colors.inactive,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tony,
        fontSize: typography.sizes.body,
    },
    categoryNameText: {
        letterSpacing: 0.5,
        color: colors.black,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.body,
    },
    expenseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expense: {
        paddingLeft: 5
    },
});

export default AddBudgetItem;
