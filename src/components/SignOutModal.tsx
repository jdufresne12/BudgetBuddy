import React, { useEffect, useState } from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { colors, typography } from '../assets/theme';
import { useLoading } from '../contexts/LoadingContext';
import { useAuth } from '../contexts/AuthContext';

interface SignOutModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignOutModal = ({ isVisible, setIsVisible }: SignOutModalProps) => {
    const { logout: contextLogout } = useAuth();
    const { setIsLoading } = useLoading();

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await contextLogout();
        } catch {
            console.log('Failed to logout')
        }
        setIsLoading(false);
    }

    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.blurredContainer}>
                <View style={styles.container}>
                    <Text style={styles.verificationText}>Are you sure you want to sign out?</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => setIsVisible(false)}
                            style={styles.button}
                        >
                            <Text style={[styles.buttonText, { color: colors.error_red }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSignOut}
                            style={styles.button}
                        >
                            <Text style={[styles.buttonText, { color: colors.primary }]}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blurredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    verificationText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    button: {
        padding: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: typography.fontWeights.medium
    }
});

export default SignOutModal;
