import React, { useEffect, useState, useRef } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { colors, typography } from '../../assets/theme.ts';
import MonthSlider from "../../components/MonthSlider.tsx";
import ExpensesChart from "../../components/ExpensesChart.tsx";
import BudgetSectionCard from '../../components/BudgetSectionCard.tsx';
import AddSection from "../../components/AddSection.tsx";
import Icon from "@react-native-vector-icons/ionicons";
import { GetMonthsSectionsData, sectionAPI, SectionData } from "../../api/services/section.ts";
import { useAuth } from "../../contexts/AuthContext.tsx";

export interface BudgetState {
    sections: Record<number, SectionData>;
    currentMonth: number;
    currentYear: number;
}

function BudgetTabScreen(): React.JSX.Element {
    const { userData } = useAuth();

    const [budgetState, setBudgetState] = useState<BudgetState>({
        sections: {},  // Empty record to start
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    });
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    const [remainingBudget, setRemainingBudget] = useState<number>(100);
    const [totalExpenses, setTotalExpenses] = useState<number>(45);
    const [circleProgress, setCircleProgress] = useState<number>((totalExpenses / remainingBudget) || 0);

    useEffect(() => {
        const getSections = async () => {
            try {
                const data: GetMonthsSectionsData = {
                    'user_id': userData?.user_id,
                    'month': currentMonth,
                    'year': currentYear
                };
                const response: SectionData[] = await sectionAPI.getMonthsSections(data);

                const sectionsRecord: Record<number, SectionData> = response.reduce((acc, section) => ({
                    ...acc,
                    [section.section_id]: {
                        ...section,
                        budgetItems: []
                    }
                }), {});

                setBudgetState(prevState => ({
                    ...prevState,
                    sections: sectionsRecord
                }));

            } catch (error) {
                console.error(error);
            }
        };

        getSections();
    }, []/* [budgetState.currentMonth] */)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ width: '100%', height: '100%', backgroundColor: colors.secondary, }}
            >
                <View style={styles.container}>
                    <View style={styles.monthSliderContainer}>
                        <MonthSlider
                            month={currentMonth}
                            setMonth={setCurrentMonth}
                            year={currentYear}
                            setYear={setCurrentYear}
                        />
                    </View>

                    <ExpensesChart
                        remainingBudget={remainingBudget}
                        totalExpenses={totalExpenses}
                        circleProgress={circleProgress}
                    />

                    {Object.keys(budgetState.sections).length !== 0
                        ? (
                            <View style={styles.budgetCardsContainer}>
                                {Object.values(budgetState.sections).map((section, index) =>
                                    <BudgetSectionCard
                                        key={index}
                                        section={section}
                                        setBudgetState={setBudgetState}
                                    />
                                )}
                            </View>
                        ) : (
                            <View style={{ padding: 20 }}>
                                <Text style={{ textAlign: 'center', color: 'gray' }}>
                                    No budget sections yet. Add one to get started!
                                </Text>
                            </View>
                        )
                    }

                    <AddSection setBudgetState={setBudgetState} />
                </View>
            </ScrollView >
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    monthSliderContainer: {
        flex: 1,
        height: 500,
        marginTop: -350,
        backgroundColor: colors.primary,
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
    expensesContainer: {
        alignItems: 'center',
        width: '100%',
        maxHeight: "20%",
        marginTop: 20,
    },
    addBudgetContainer: {
        justifyContent: 'center',
        width: '100%',
        height: 30,
        marginTop: 20,
        marginBottom: 5,
        paddingLeft: 20,
    },
    addBudgetButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addBudgetButtonText: {
        paddingLeft: 5,
        color: colors.primary,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: 14
    },
    budgetCardsContainer: {
        alignItems: 'center',
        width: '100%',
        minHeight: "20%",
        marginTop: 10,
        gap: 20,
    },
});

export default BudgetTabScreen;