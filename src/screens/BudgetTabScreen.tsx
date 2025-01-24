import React, {useEffect, useState} from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View                              
} from "react-native";
import {colors, typography} from '../assets/theme.ts';
import MonthSlider from "../components/MonthSlider.tsx";
import ExpensesChart from "../components/ExpensesChart.tsx";
import BudgetCategoryCard from '../components/BudgetCategoryCard.tsx';

function BudgetTabScreen(): React.JSX.Element {
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [remainingBudget, setRemainingBudget] = useState<number>(100);
    const [totalExpenses, setTotalExpenses] = useState<number>(45);
    const [circleProgress, setCircleProgress] = useState<number>((totalExpenses/remainingBudget) || 0);

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: colors.secondary }}
        >
            <View style={styles.monthSliderContainer}>
                <MonthSlider 
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                />           
            </View>
            <View style={styles.container}>
                {/* Total expenses this month chart */}
                <View style={styles.expensesContainer}>
                    <ExpensesChart 
                        remainingBudget={remainingBudget}
                        setRemainingBudget={setRemainingBudget}
                        totalExpenses={totalExpenses}
                        setTotalExpenses={setTotalExpenses}
                        circleProgress={circleProgress}
                        setCircleProgress={setCircleProgress}
                    />
                </View>

                {/* Categories cards */}
                <View style={styles.budgetCardsContainer}>
                    <BudgetCategoryCard />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {  
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
    },
    monthSliderContainer: {
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
        minHeight: "20%",
        marginTop: 20,
    },
    budgetCardsContainer: {
        alignItems: 'center',
        width: '100%',
        minHeight: "20%",
        marginTop: 20,
    },
});

export default BudgetTabScreen;