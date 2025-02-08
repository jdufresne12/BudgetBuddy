import React, { SetStateAction, useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { typography, colors } from '../assets/theme.ts';
import { useAuth } from '../contexts/AuthContext.tsx';
import { sectionAPI, SectionData, CreateSection } from '../api/services/section.ts';
import { BudgetState } from '../screens/Budget/BudgetTabScreen.tsx';

interface AddSectionProps {
    setBudgetState: React.Dispatch<React.SetStateAction<BudgetState>>;
}

function AddSection({ setBudgetState }: AddSectionProps): React.JSX.Element {
    const { userData } = useAuth();

    const [newSectionName, setNewSectionName] = useState<string>("");

    function getCurrentDate() {
        return new Date().toISOString().split("T")[0]
    }

    const handleBlur = async () => {
        if (newSectionName.trim() !== "") {
            const data: CreateSection = {
                "user_id": userData?.user_id,
                "name": newSectionName.trim(),
                "start_date": getCurrentDate(),
                "end_date": null
            }
            try {
                const response = await sectionAPI.createSection(data)
                addNewSection(response);
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : 'Unable to create new section';
                console.error(errorMessage);
            }
        }
        setNewSectionName("");
    }

    const addNewSection = (sectionData: SectionData) => {
        setBudgetState(prevState => ({
            ...prevState,
            sections: {
                ...prevState.sections,
                [sectionData.section_id]: sectionData // Add new section
            }
        }));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>
                {/* Category Title */}
                <TextInput
                    placeholder='New Section'
                    placeholderTextColor={colors.empty}
                    style={styles.categoryTitle}
                    selectionColor={colors.primary}
                    value={newSectionName}
                    onChangeText={setNewSectionName}
                    onBlur={handleBlur}
                />
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: 20,
        borderRadius: 10,
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
    categoryTitle: {
        height: '100%',
        width: '100%',
        letterSpacing: 0.4,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.header,
        color: colors.black,
    },
});

export default AddSection;
