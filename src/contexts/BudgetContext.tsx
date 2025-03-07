import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { SectionData, SectionName } from '../api/services/section';
import { BudgetItem, DeleteBudgetItemData } from '../api/services/budget';
import { CreateTransactionData, Transaction } from '../api/services/transaction';
import { sectionMockData } from '../utils/mockData';

export interface Budget {
    Income: BudgetItem[];
    Home: BudgetItem[];
    Food: BudgetItem[];
    Transportation: BudgetItem[];
    Subscriptions: BudgetItem[];
}

interface BudgetContextType {
    budget: Budget;
    curMonth: number;
    curYear: number;
    addTransaction: (transactionData: CreateTransactionData) => void;
    addBudgetItem: (newBudgetItemData: BudgetItem) => Budget;
    updateBudgetItem: (newBudgetItemData: BudgetItem) => Budget;
    removeBudgetItem: (deleteItemData: DeleteBudgetItemData) => Budget;
    isCurrentMonth: (date: string) => Boolean;
    isCurrentYear: (date: string) => Boolean;
}

interface BudgetProviderProps {
    children: ReactNode;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
    const mockDataOn = true;
    const curMonth = new Date().getMonth();
    const curYear = new Date().getFullYear();
    const [budget, setBudget] = useState<Budget>({
        Income: mockDataOn ? sectionMockData.INCOME_SECTION_DATA : [],
        Home: mockDataOn ? sectionMockData.HOME_SECTION_DATA : [],
        Food: mockDataOn ? sectionMockData.FOOD_SECTION_DATA : [],
        Transportation: mockDataOn ? sectionMockData.TRANSPORTATION_SECTION_DATA : [],
        Subscriptions: mockDataOn ? sectionMockData.SUBSCRIPTION_SECTION_DATA : [],
    });

    useEffect(() => {
        console.log("BUDGET UPDATED")
        console.log(budget)
    }, [budget])

    /**
     * Adds a transaction to a budget item within the Context Budget
     * @param newTransactionData 
     * @returns 
     */
    const addTransaction = (newTransactionData: CreateTransactionData) => {
        let sectionName: keyof Budget | undefined;
        const budgetItemArray = Object.values(budget).flat();
        for (let i = 0; i < budgetItemArray.length; i++) {
            if (budgetItemArray[i].item_id === newTransactionData.item_id) {
                sectionName = budgetItemArray[i].section as keyof Budget;
                break;
            }
        }
        if (!sectionName) {
            console.error("Item not found in budget sections.");
            return;
        }
        console.log(sectionName)
        setBudget(prev => ({
            ...prev,
            [sectionName]: prev[sectionName].map((item: BudgetItem) =>
                item.item_id === newTransactionData.item_id
                    ? { ...item, transactions: [...item.transactions, newTransactionData] }
                    : item
            )
        }));
    };

    /**
     * Adds a budgetItem to the Context Budget
     * @param budgetItemData 
     * @returns Entirely new budget with updated values
     */
    const addBudgetItem = (budgetItemData: BudgetItem) => {
        let newBudget: Budget = budget;
        setBudget(prev => {
            const updatedBudget = {
                ...prev,
                [budgetItemData.section]: [...prev[budgetItemData.section as SectionName], budgetItemData]
            }
            newBudget = updatedBudget;
            return updatedBudget
        });

        return newBudget;
    }

    /**
     * Updates a budgetItem from the Context Budget
     * @param budgetItemData 
     * @returns Entirely new budget with updated values
     */
    const updateBudgetItem = (budgetItemData: BudgetItem) => {
        let newBudget: Budget = budget;
        setBudget(prev => {
            const updatedBudget = {
                ...prev,
                [budgetItemData.section]: prev[budgetItemData.section as SectionName].map(item =>
                    item.item_id === budgetItemData.item_id ? budgetItemData : item
                )
            }
            newBudget = updatedBudget;
            return updatedBudget;
        })

        return newBudget;
    }

    /**
     * Removes a budgetItem from the budget object
     * @param deleteItemData 
     * @returns Entirely new budget with updated values
     */
    const removeBudgetItem = (deleteItemData: DeleteBudgetItemData) => {
        let newBudget: Budget = budget;
        setBudget(prev => {
            const updatedBudget = {
                ...prev,
                [deleteItemData.section]: prev[deleteItemData.section as SectionName].filter(item =>
                    item.item_id !== deleteItemData.item_id
                )
            }
            newBudget = updatedBudget;
            return updatedBudget;
        })

        return newBudget;
    }

    /**
     * Checks if passed date is within the same month as the context budget
     * @param date 
     * @returns true or false
     */
    const isCurrentMonth = (date: string) => {
        const month = parseInt(date?.split("-")[1]);
        return month == curMonth + 1 ? true : false;
    }

    /**
     * Checks if passed date is within the same year as the context budget
     * @param date 
     * @returns true or false
     */
    const isCurrentYear = (date: string) => {
        const year = parseInt(date?.split("-")[0]);
        return year == curYear ? true : false;
    }

    const contextValue: BudgetContextType = {
        budget,
        curMonth,
        curYear,
        addTransaction,
        addBudgetItem,
        updateBudgetItem,
        removeBudgetItem,
        isCurrentMonth,
        isCurrentYear
    };

    return (
        <BudgetContext.Provider value={contextValue}>
            {children}
        </BudgetContext.Provider>
    );
};

// Custom hook to use the budget context
export const useBudget = (): BudgetContextType => {
    const context = useContext(BudgetContext);
    if (context === undefined) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};