import React, { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';
import { colors, typography } from '../assets/theme';
import { getCurrentDate, isValidDateFormat } from '../utils/textFormatting';
import { useAuth } from '../contexts/AuthContext';
import { useBudget } from '../contexts/BudgetContext';

import BottomSheet from './BottomSheet';
import AmountInput from './AmountInput';
import { CreateTransactionData, Transaction, transactionAPI } from '../api/services/transaction';
import { budgetAPI, Category } from '../api/services/budget';

interface AddTransactionModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTransactionModal = ({ isVisible, setIsVisible }: AddTransactionModalProps) => {
    const { userData } = useAuth();
    const { categories, isCurrentMonth, isCurrentYear, addTransaction, addToTransactions } = useBudget();

    const [amount, setAmount] = useState<number>(0);
    const [itemType, setItemType] = useState<string>('expense');
    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category>({ name: "", item_id: "0" });
    const [date, setDate] = useState<string | null>(getCurrentDate());
    const [dateError, setDateError] = useState<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

    const showDatePicker = () => { setDatePickerVisibility(true) };
    const hideDatePicker = () => { setDatePickerVisibility(false) };
    const handleConfirm = (date: Date) => {
        const formattedDate = date?.toISOString()?.split("T")[0] ?? null;
        setDate(formattedDate);
        hideDatePicker();
    };

    const handleCancel = async () => {
        await resetData();
        setIsVisible(false)
    };

    const handleSetDescription = (text: string) => {
        if (text === '') {
            setDescription('');
            setDescriptionError("Please give your budget item a name")
        } else {
            setDescription(text);
            setDescriptionError(null);
        }
    };

    const handleSetDate = (text: string) => {
        if (text === "")
            setDate(null);
        else
            setDate(text);
        setDateError(null);
    };

    const handleAddTransaction = async () => {
        let isValid = true;

        if (description === null || description === '') {
            isValid = false;
            setDescriptionError("Please add a brief description of this transaction (e.g. \"Lunch\" \"Groceries\"");
        } else
            setDescriptionError(null)

        if (date !== null && date !== '') {
            if (!isValidDateFormat(date || '')) {
                isValid = false;
                setDateError("Date must be in YYYY-MM-DD format");
            }
        } else if (date === null || date === '') {
            isValid = false;
            setDateError("Date must be in YYYY-MM-DD format");
        } else
            setDateError(null)

        if (isValid) {
            try {
                const newTransaction: CreateTransactionData = {
                    user_id: userData?.user_id,
                    item_id: parseInt(category.item_id),
                    description: description,
                    amount: amount,
                    type: itemType,
                    date: date
                };

                const response = await transactionAPI.createTransaction(newTransaction);
                if (response) {
                    if (isCurrentMonth(date!) && isCurrentYear(date!)) {
                        addTransaction(response);
                    }
                    addToTransactions(response);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsVisible(false);
                await resetData();
            }
        }
    };

    async function resetData() {
        setAmount(0);
        setItemType('expense');
        setDescription('');
        setDate(getCurrentDate());
        setCategory({ name: "", item_id: "0" })
        setDescriptionError(null);
        setDateError(null);
    };

    return (
        <BottomSheet visible={isVisible} handleCancel={handleCancel}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleCancel}>
                        <Icon name="close" size={40} color={colors.empty} />
                    </TouchableOpacity>
                    <Text style={styles.budgetExpenseHeader}>Add Transaction</Text>
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

                <View style={styles.fieldContainer}>
                    <View style={styles.iconCircle}>
                        <Icon name='pencil' size={22} color={colors.white} />
                    </View>
                    <TextInput
                        style={styles.categoryText}
                        placeholder='Description'
                        placeholderTextColor={colors.inactive}
                        onChangeText={handleSetDescription}
                        value={description}
                    />
                </View>
                {descriptionError && (
                    <Text style={styles.errorText}>{descriptionError}</Text>
                )}

                <View style={styles.lineSeparator} />

                <View style={[styles.fieldContainer, { paddingRight: 15 }]}>
                    <View style={styles.iconCircle}>
                        <Icon name="folder-outline" size={22} color={colors.white} />
                    </View>
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.dropdownContainer}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={categories as any}
                        maxHeight={200}
                        labelField="name"
                        valueField="item_id"
                        placeholder="Category"
                        value={category.item_id?.toString()}
                        onChange={item => {
                            setCategory({
                                name: item.name,
                                item_id: item.item_id
                            });
                        }}
                        renderItem={(item, selected) => (
                            <View style={[styles.dropdownItem, selected && { backgroundColor: colors.primary }]}>
                                <Text style={styles.itemTextStyle}>{item.name}</Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.lineSeparator} />

                <TouchableOpacity
                    style={styles.fieldContainer}
                    onPress={showDatePicker}
                >
                    <View style={[styles.iconCircle, { backgroundColor: colors.white, paddingTop: 0 }]}>
                        <Icon name='calendar-outline' size={32} color={colors.black} />
                    </View>
                    <TextInput
                        style={styles.categoryText}
                        placeholder='Date'
                        value={date || undefined}
                        onChangeText={handleSetDate}
                    />
                </TouchableOpacity>
                {dateError && (
                    <Text style={styles.errorText}>{dateError}</Text>
                )}

                <View style={styles.lineSeparator} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddTransaction}
                    >
                        <Text style={styles.addButtonText}>Add Transaction</Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    modalStyleIOS={{ marginBottom: 40 }}
                />
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: '20%'
    },
    headerContainer: {
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
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        width: '100%',
        padding: 8,
        color: colors.inactive,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
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
    addButton: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: colors.black,
        borderRadius: 40,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.20,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    addButtonText: {
        textAlign: 'center',
        color: colors.white,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.title
    },
    errorText: {
        textAlign: 'center',
        marginBottom: -5,
        letterSpacing: 0.5,
        color: colors.error_red,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.small,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    updateButton: {
        width: '45%',
        backgroundColor: colors.black,
    },
    deleteButton: {
        width: '45%',
        backgroundColor: colors.error_red,
    },
    dropdown: {
        flex: 1,
        width: "100%",
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
    },
    dropdownContainer: {
        width: "100%",
        left: 0,
        marginTop: 18,
        borderRadius: 10,
        backgroundColor: colors.empty,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    placeholderStyle: {
        color: colors.inactive,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.body,
    },
    selectedTextStyle: {
        color: colors.black,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.body,
    },
    itemTextStyle: {
        color: colors.black,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.body,
    },
    dropdownItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
    },
});

export default AddTransactionModal;
