import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { colors, typography } from '../assets/theme.ts';
import { formatToDollar } from "../utils/textFormatting.ts";
import { useBudget } from "../contexts/BudgetContext.tsx";
import { BudgetItem } from "../api/services/budget.ts";
import { Transaction } from "../api/services/transaction.ts";

const SpendingTimelineChart = () => {
    const { budget } = useBudget();
    const [totalSpent, setTotalSpent] = useState(0);
    const [pathData, setPathData] = useState("");
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

    const today = new Date();
    const currentDay = today.getDate();
    const screenWidth = Dimensions.get("window").width - 60;
    const chartHeight = 100;
    const dayLabels = [1, 6, 11, 16, 21, 26, 31];

    useEffect(() => {
        if (budget) {
            calculateSpendingData();
        }
    }, [budget]);

    const calculateSpendingData = () => {
        // Get current month and year
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Initialize daily spending array
        const dailySpending = Array(daysInMonth + 1).fill(0);

        // Process all transactions
        let totalMonthlySpent = 0;

        Object.values(budget).forEach(category => {
            category.forEach((budgetItem: BudgetItem) => {
                budgetItem.transactions.forEach((transaction: Transaction) => {
                    const transactionDate = new Date(transaction.date!);

                    // Only include transactions from current month
                    if (transactionDate.getMonth() === currentMonth &&
                        transactionDate.getFullYear() === currentYear) {

                        const day = transactionDate.getDate();

                        if (transaction.type === 'expense') {
                            dailySpending[day] += transaction.amount;
                            totalMonthlySpent += transaction.amount;
                        } else {
                            // For income/refunds
                            dailySpending[day] -= transaction.amount;
                            totalMonthlySpent -= transaction.amount;
                        }
                    }
                });
            });
        });

        // Calculate cumulative spending
        const cumulativeSpending = Array(daysInMonth + 1).fill(0);
        let runningTotal = 0;

        for (let i = 1; i <= daysInMonth; i++) {
            runningTotal += dailySpending[i];
            cumulativeSpending[i] = runningTotal;
        }

        setTotalSpent(totalMonthlySpent > 0 ? totalMonthlySpent : 0);

        // Get the maximum value for scaling the chart
        const maxSpending = Math.max(...cumulativeSpending);

        // Generate points for the SVG path
        const points = [];

        // Generate coordinates for all days up to current day
        for (let day = 1; day <= currentDay; day++) {
            const x = ((day - 1) / 30) * screenWidth;
            const y = maxSpending > 0
                ? chartHeight - (cumulativeSpending[day] / maxSpending * chartHeight * 0.8)
                : chartHeight / 2;

            points.push({ x, y });
        }

        // Create SVG path data
        let svgPath = "";
        if (points.length > 0) {
            svgPath = `M ${points[0].x} ${points[0].y}`;

            for (let i = 1; i < points.length; i++) {
                // Use curve for smoother line (similar to bezier)
                const prevPoint = points[i - 1];
                const currentPoint = points[i];

                // Control points for the curve
                const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
                const cp1y = prevPoint.y;
                const cp2x = prevPoint.x + 2 * (currentPoint.x - prevPoint.x) / 3;
                const cp2y = currentPoint.y;

                svgPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentPoint.x} ${currentPoint.y}`;
            }
        }

        setPathData(svgPath);

        // Set dot position at the current day
        if (points.length > 0) {
            setDotPosition({
                x: points[points.length - 1].x,
                y: points[points.length - 1].y
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>SPENT THIS MONTH</Text>
            <Text style={styles.amountText}>{formatToDollar(totalSpent)}</Text>

            <View style={styles.divider} />

            <View style={styles.chartContainer}>
                <Svg width={screenWidth} height={chartHeight}>
                    {/* Line path */}
                    <Path
                        d={pathData}
                        stroke={colors.primary}
                        strokeWidth="3"
                        fill="none"
                    />

                    {/* Dot at current day */}
                    <Circle
                        cx={dotPosition.x}
                        cy={dotPosition.y}
                        r="6"
                        fill={colors.primary}
                    />
                </Svg>

                {/* Day labels */}
                <View style={styles.dayLabelsContainer}>
                    {dayLabels.map((day) => {
                        const position = ((day - 1) / 30) * 100;

                        return (
                            <Text
                                key={day}
                                style={[
                                    styles.dayLabel,
                                    { position: 'absolute', left: `${position}%` }
                                ]}
                            >
                                {day}
                            </Text>
                        );
                    })}
                </View>
            </View>

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                    <Text style={styles.legendText}>This period</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.inactive }]} />
                    <Text style={styles.legendText}>Budget</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        width: '100%'
    },
    titleText: {
        fontSize: 14,
        color: "#888",
        fontWeight: "500"
    },
    amountText: {
        fontSize: 36,
        fontWeight: "bold",
        marginVertical: 5
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginVertical: 15
    },
    chartContainer: {
        marginVertical: 15,
        height: 130
    },
    dayLabelsContainer: {
        position: 'relative',
        width: '100%',
        height: 20,
        marginTop: 10
    },
    dayLabel: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        width: 20,
        marginLeft: -10
    },
    legendContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5
    },
    legendText: {
        fontSize: 12,
        color: colors.inactive
    }
});

export default SpendingTimelineChart;