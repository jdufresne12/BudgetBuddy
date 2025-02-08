import React from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { typography, colors } from '../assets/theme.ts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface ModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleRemoveSection: () => void;
}

function DeleteSectionModal({ isVisible, setIsVisible, handleRemoveSection }: ModalProps): React.JSX.Element {
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
                            <Text style={styles.title}>Delete Section?</Text>
                            <Text style={styles.message}>
                                Are you sure you want to delete this Budget Section?
                            </Text>
                            <Text style={styles.warning}>
                                Note: This will permanently remove all budget items in this section
                            </Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.removeButton]}
                                    onPress={handleRemoveSection}
                                >
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
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
        alignItems: 'center',
        width: '85%',
        margin: 20,
        paddingVertical: 25,
        paddingHorizontal: 20,
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
    title: {
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.header,
        fontWeight: typography.fontWeights.heavy,
        color: colors.black,
        marginBottom: 15,
    },
    message: {
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.body,
        fontWeight: typography.fontWeights.medium,
        color: colors.black,
        textAlign: 'center',
        marginBottom: 8,
    },
    warning: {
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.small,
        fontWeight: typography.fontWeights.regular,
        color: colors.error,
        textAlign: 'center',
        marginBottom: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 8,
    },
    removeButton: {
        backgroundColor: colors.remove,
    },
    removeButtonText: {
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.body,
        fontWeight: typography.fontWeights.heavy,
        color: colors.white,
        textAlign: 'center',
    },
});

export default DeleteSectionModal;