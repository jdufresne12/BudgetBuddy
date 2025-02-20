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
import { colors, typography } from '../assets/theme';
import { getCurrentDate, isValidDateFormat } from '../utils/textFormatting';
import { useAuth } from '../contexts/AuthContext';
import { budgetAPI } from '../api/services/budget';

import BottomSheet from './BottomSheet';
import AmountInput from './AmountInput';
import { CreateBudgetItemData, BudgetItem } from '../api/services/budget';
import { BudgetState } from '../screens/Budget/BudgetTabScreen';
import { SectionName } from '../api/services/section';

interface AddBudgetItemProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    section: string;
    setBudgetState: React.Dispatch<React.SetStateAction<BudgetState>>;
    handleAddedItem: () => void;
}

const AddBudgetItem = ({ isVisible, setIsVisible, section, setBudgetState, handleAddedItem }: AddBudgetItemProps) => {
    const { userData } = useAuth();
    const [amount, setAmount] = useState<number>(0);
    const [itemType, setItemType] = useState<string>('expense');
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [endDateError, setEndDateError] = useState<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

    const showDatePicker = () => { setDatePickerVisibility(true) };
    const hideDatePicker = () => { setDatePickerVisibility(false) };

    async function resetData() {
        setAmount(0);
        setItemType('expense');
        setName('')
        setEndDate(null);
        setNameError(null);
        setEndDateError(null);
    };

    const handleConfirm = (date: Date) => {
        const formattedDate = date?.toISOString()?.split("T")[0] ?? null;
        setEndDate(formattedDate);
        hideDatePicker();
    };

    const handleCancel = async () => {
        await resetData();
        setIsVisible(false)
    };

    const handleSetName = (text: string) => {
        if (text === '') {
            setName('');
            setNameError("Please give your budget item a name")
        } else {
            setName(text);
            setNameError(null);
        }
    };

    const handleSetDate = (text: string) => {
        if (text === "")
            setEndDate(null);
        else
            setEndDate(text);
        setEndDateError(null);
    };

    const handleAddItem = async () => {
        let isValid = true;

        if (name === null || name === '') {
            isValid = false;
            setNameError("Please give your budget item a name");
        } else
            setNameError(null)

        if (endDate !== null && endDate !== '') {
            if (!isValidDateFormat(endDate || '')) {
                isValid = false;
                setEndDateError("Date must be in YYYY-MM-DD format");
            }
        } else
            setEndDateError(null)

        if (isValid) {
            try {
                // const data: CreateBudgetItemData = {
                //     "section": section,
                //     "user_id": userData?.user_id,
                //     "name": name,
                //     "amount": amount,
                //     "type": itemType,
                //     "start_date": getCurrentDate(),
                //     "end_date": endDate
                // }
                // const response = await budgetAPI.createBudgetItem(data);
                // if (response) {
                //     handleAddedItem();
                // }
                const newItem: BudgetItem = {
                    "section": section,
                    "user_id": userData?.user_id,
                    "item_id": 0,
                    "name": name,
                    "amount": amount,
                    "type": itemType,
                    "start_date": getCurrentDate(),
                    "end_date": endDate
                }
                setBudgetState((prevState) => ({
                    ...prevState,
                    sections: {
                        ...prevState.sections,
                        [section as SectionName]: [...prevState.sections[section as SectionName], newItem],
                    },
                }));

                handleAddedItem();
            } catch (error) {
                console.error(error);
            } finally {
                setIsVisible(false)
                await resetData();
            }
        }
    };

    return (
        <BottomSheet visible={isVisible} handleCancel={handleCancel}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleCancel}>
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

                <View style={styles.fieldContainer}>
                    <View style={styles.iconCircle}>
                        <Icon name='folder-sharp' size={22} color={colors.white} />
                    </View>
                    <TextInput
                        style={styles.categoryText}
                        placeholder='Name:'
                        placeholderTextColor={colors.inactive}
                        onChangeText={handleSetName}
                    />
                </View>
                {nameError && (
                    <Text style={styles.errorText}>{nameError}</Text>
                )}

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
                        placeholder='No end date'
                        value={endDate || undefined}
                        onChangeText={handleSetDate}
                    />
                </TouchableOpacity>
                {endDateError && (
                    <Text style={styles.errorText}>{endDateError}</Text>
                )}

                <View style={styles.lineSeparator} />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddItem}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>

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
    }
});

export default AddBudgetItem;
