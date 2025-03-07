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
import { GetMonthsSectionsData, sectionAPI, SectionData, SectionName } from "../../api/services/section.ts";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { BudgetItem } from "../../api/services/budget.ts";

import { sectionMockData } from "../../utils/mockData.ts";
import { Budget, useBudget } from "../../contexts/BudgetContext.tsx";

export interface BudgetState {
    sections: Budget;
    currentMonth: number;
    currentYear: number;
}

function BudgetTabScreen(): React.JSX.Element {
    const { userData } = useAuth();
    const { budget, isCurrentMonth, isCurrentYear } = useBudget()

    const mockDataOn = true;
    const [budgetState, setBudgetState] = useState<BudgetState>({
        sections: budget,
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    });
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [remainingBudget, setRemainingBudget] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [circleProgress, setCircleProgress] = useState<number>(0);

    const sections = ["Income", "Home", "Food", "Transporation", "Subscriptions"];

    // useEffect(() => {
    //     const getSections = async () => {
    //         try {
    //             const data: GetMonthsSectionsData = {
    //                 'user_id': userData?.user_id,
    //                 'month': currentMonth,
    //                 'year': currentYear
    //             };
    //             const response: SectionData[] = await sectionAPI.getMonthsSections(data);

    //             const sectionsRecord: Record<number, SectionData> = response.reduce((acc, section) => ({
    //                 ...acc,
    //                 [section.section_id]: {
    //                     ...section,
    //                     budgetItems: []
    //                 }
    //             }), {});

    //             setBudgetState(prevState => ({
    //                 ...prevState,
    //                 sections: sectionsRecord
    //             }));

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     getSections()

    //     console.log(currentMonth)
    //     console.log(currentYear)
    // }, [currentMonth])

    useEffect(() => {
        calculateBudget();
    }, [budgetState])

    const calculateBudget = () => {
        const totalIncome: number = calculateTotalIncome(budgetState.sections);
        const totalExpense: number = calculateTotalExpense(budgetState.sections);
        const remainingBudget: number = totalIncome - totalExpense;
        const remainingBudgetPercent: number = (totalExpense / totalIncome) || 0;

        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpense);
        setRemainingBudget(remainingBudget);
        setCircleProgress(remainingBudgetPercent);
    };

    const calculateTotalIncome = (sections: any): number => {
        sections = Object.values(sections);
        return sections.reduce((totalIncome: number, budgetItems: BudgetItem[]) => {
            const sectionIncome = budgetItems.reduce((itemTotal: number, item: BudgetItem) => {
                if (item.type?.toLowerCase() === "income") {
                    return itemTotal + (item.amount || 0);
                }
                return itemTotal;
            }, 0);

            return totalIncome + sectionIncome;
        }, 0);
    };

    const calculateTotalExpense = (sections: any) => {
        sections = Object.values(sections);
        return sections.reduce((totalExpense: number, bugdetItems: BudgetItem[]) => {
            const sectionTotal = bugdetItems.reduce((itemTotal: number, item: BudgetItem) => {
                if (item.type?.toLowerCase() === 'expense') {
                    return itemTotal + (item.amount || 0);
                }
                return itemTotal
            }, 0)
            return totalExpense + sectionTotal;
        }, 0)
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ backgroundColor: colors.secondary, }}
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

                    <TouchableOpacity onPress={calculateBudget}>
                        <ExpensesChart
                            remainingBudget={remainingBudget}
                            totalExpenses={totalExpenses}
                            circleProgress={circleProgress}
                        />
                    </TouchableOpacity>

                    {Object.keys(budgetState.sections).length !== 0
                        ? (
                            <View style={styles.budgetCardsContainer}>
                                {Object.entries(budgetState.sections).map(([sectionName, budgetItems]) =>
                                    <BudgetSectionCard
                                        key={sectionName}
                                        section={sectionName}
                                        budgetItems={budgetItems}
                                        setBudgetState={setBudgetState}
                                        currentMonth={currentMonth}
                                        currentYear={currentYear}
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

                    {/* <AddSection setBudgetState={setBudgetState} /> */}
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
        marginBottom: 30,
        gap: 20,
    },
});

export default BudgetTabScreen;