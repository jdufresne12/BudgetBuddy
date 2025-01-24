import React, { useEffect, useState } from 'react';
import { 
    Animated, 
    Platform, 
    Modal, 
    StyleSheet, 
    Text,
    TouchableOpacity,
    View 
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { Dimensions } from 'react-native';
import BottomSheet from './BottomSheet';
import { colors, typography } from '../assets/theme';

interface AddExpenseModalProps {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddExpenseModal = ({ isVisible, setIsVisible }: AddExpenseModalProps) => {
  

  return (
    <BottomSheet 
        visible={isVisible} 
        onClose={() => setIsVisible(false)}
    >
        {/* Header */}
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => setIsVisible(false)}
            >
                <Icon name='close' size={40} color={colors.empty} />
            </TouchableOpacity>

            <Text style={styles.budgetExpenseHeader}>Budget Expense</Text>
        </View>

        {/* $ 100 */}

        {/* Expense/Income */}

        {/* Category Selection */}

        {/* Recurring (weekly, bi-weelkly, monthly, yearly) */}

        {/* Expense Type */}

        </BottomSheet>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        height: "5%",
        alignItems: 'center'
    },
    budgetExpenseHeader: { 
        marginLeft: '22%',
        letterSpacing: 1.5,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.tiny,
        fontSize: typography.sizes.title,
    }
});

export default AddExpenseModal;