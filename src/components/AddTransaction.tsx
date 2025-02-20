import React, { useEffect, useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { colors, typography } from '../assets/theme.ts'
import AddTransactionModal from "./AddTransactionModal.tsx";

interface AddTransactionProps {

}

function AddTransaction({ }: AddTransactionProps): React.JSX.Element {
    const [showTransactionModal, setShowTransactionModal] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.transactionButton}
                onPress={() => setShowTransactionModal(true)}
            >
                <Text style={styles.transactionButtonText}>Add Transaction</Text>
            </TouchableOpacity>
            <AddTransactionModal
                isVisible={showTransactionModal}
                setIsVisible={(setShowTransactionModal)}
                handleUpdateItem={() => console.log('update')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.40,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    transactionButton: {
        width: '75%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.black
    },
    transactionButtonText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.title,
        color: colors.white,
    },
});

export default AddTransaction;