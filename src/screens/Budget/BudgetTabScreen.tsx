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
import { BudgetItem } from "../../api/services/budget.ts";

export interface BudgetState {
    sections: Record<number, SectionData>;
    currentMonth: number;
    currentYear: number;
}

/**
 * Sections
 *      ->  section_id: number;
            name: string;
            start_date: string;
            end_date: string | null;
            budgetItems: BudgetItem[];
               |
                ->  item_id: number;
                    section_id: number;
                    user_id: number | undefined;
                    name: string;
                    amount: number;
                    type: string;
                    start_date: string;
                    end_date: string | null
                }
*/

function BudgetTabScreen(): React.JSX.Element {
    const { userData } = useAuth();

    const [budgetState, setBudgetState] = useState<BudgetState>({
        sections: {},
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    });
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [remainingBudget, setRemainingBudget] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [circleProgress, setCircleProgress] = useState<number>(0);

    useEffect(() => {
        getSections();
    }, [])

    useEffect(() => {
        getSections()
    }, [currentMonth])

    useEffect(() => {
        calculateBudget();
    }, [budgetState])

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

    const calculateBudget = () => {
        const totalIncome: number = calculateTotalIncome(budgetState.sections) || 0;
        const totalExpense: number = calculateTotalExpense(budgetState.sections) || 0;
        const remainingBudget: number = totalIncome - totalExpense;
        const remainingBudgetPercent: number = (totalExpense / totalIncome) || 0;

        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpense);
        setRemainingBudget(remainingBudget);
        setCircleProgress(remainingBudgetPercent);
    };

    const calculateTotalIncome = (sections: any): number => {
        sections = Object.values(sections);
        return sections.reduce((totalIncome: number, section: SectionData) => {
            const budgetItems = section.budgetItems || [];

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
        return sections.reduce((totalExpense: number, section: SectionData) => {
            const bugdetItems = section.budgetItems || [];
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