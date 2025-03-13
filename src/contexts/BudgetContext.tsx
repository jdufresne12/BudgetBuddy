import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { SectionData, SectionName } from '../api/services/section';
import { budgetAPI, BudgetItem, Category, DeleteBudgetItemData, GetBudgetData } from '../api/services/budget';
import { CreateTransactionData, Transaction, transactionAPI } from '../api/services/transaction';
import { sectionMockData } from '../utils/mockData';
import { useAuth } from './AuthContext';

export interface Budget {
    Income: BudgetItem[];
    Home: BudgetItem[];
    Food: BudgetItem[];
    Transportation: BudgetItem[];
    Subscriptions: BudgetItem[];
}

interface BudgetContextType {
    budget: Budget;
    transactions: Transaction[];
    categories: Category[];
    curMonth: number;
    curYear: number;
    addBudgetItem: (newBudgetItemData: BudgetItem) => Budget;
    updateBudgetItem: (newBudgetItemData: BudgetItem) => Budget;
    removeBudgetItem: (deleteItemData: DeleteBudgetItemData) => Budget;
    dataToBudget: (budgetData: any) => Budget;
    addTransaction: (transactionData: Transaction) => void;
    addToTransactions: (transactionData: Transaction) => void;
    updateTransaction: (transactionData: Transaction) => void;
    updateTransactions: (transactionData: Transaction) => void;
    deleteTransaction: (transactionData: Transaction) => void;
    deleteFromTransactions: (transactionData: Transaction) => void;
    isCurrentMonth: (date: string) => Boolean;
    isCurrentYear: (date: string) => Boolean;
}

interface BudgetProviderProps {
    children: ReactNode;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
    const { userData } = useAuth();
    const mockDataOn = false;
    const curMonth = new Date().getMonth();
    const curYear = new Date().getFullYear();
    const [budget, setBudget] = useState<Budget>({
        Income: mockDataOn ? sectionMockData.INCOME_SECTION_DATA : [],
        Home: mockDataOn ? sectionMockData.HOME_SECTION_DATA : [],
        Food: mockDataOn ? sectionMockData.FOOD_SECTION_DATA : [],
        Transportation: mockDataOn ? sectionMockData.TRANSPORTATION_SECTION_DATA : [],
        Subscriptions: mockDataOn ? sectionMockData.SUBSCRIPTION_SECTION_DATA : [],
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (userData?.user_id) {
            getBudget();
            getTransactions();
            getCategories();
        }
    }, [userData?.user_id])

    const getBudget = async () => {
        try {
            const data: GetBudgetData = {
                'user_id': userData?.user_id,
                'month': curMonth + 1,
                'year': curYear
            };
            const response: BudgetItem[] = await budgetAPI.getBudget(data);
            setBudget(dataToBudget(response));
        } catch (error) {
            console.error(error);
        }
    };

    const getTransactions = async () => {
        try {
            const data = { "user_id": userData?.user_id }
            const response: Transaction[] = await transactionAPI.getAllTransactions(data);
            if (response) {
                const sortedTransactions = response.sort((a, b) => Date.parse(b.date!) - Date.parse(a.date!));
                setTransactions(sortedTransactions);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await budgetAPI.getAllCategories({ "user_id": userData?.user_id });
            const formattedCategories = response.map(item => ({
                ...item,
                item_id: item.item_id?.toString()
            }));

            setCategories(formattedCategories);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    /**
     * Parses returned budget data from get_budget API and returns a new Budget object with said data
     * @param budgetData -> BudgetItem[]
     * @returns budget
     */
    const dataToBudget = (budgetData: any) => {
        let newBudget: Budget = {
            Income: [],
            Home: [],
            Food: [],
            Transportation: [],
            Subscriptions: [],
        };
        budgetData.forEach((item: BudgetItem) => {
            if (item.section in newBudget) {
                newBudget[item.section as SectionName].push(item);
            }
            else {
                console.warn(`Unknown section: ${item.section}`);
            }
        });
        return newBudget;
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
     * Adds a transaction to a budget item within the Context Budget
     * @param newTransactionData 
     */
    const addTransaction = (newTransactionData: Transaction) => {
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
     * Updates an existing transaction within the Context Budget
     * @param updatedTransactionData 
     */
    const updateTransaction = (updatedTransactionData: Transaction) => {
        let sectionName: keyof Budget | undefined;
        const budgetItemArray = Object.values(budget).flat();
        for (let i = 0; i < budgetItemArray.length; i++) {
            if (budgetItemArray[i].item_id === updatedTransactionData.item_id) {
                sectionName = budgetItemArray[i].section as keyof Budget;
                break;
            }
        }
        if (!sectionName) {
            console.error("Item not found in budget sections.");
            return;
        }
        setBudget(prev => ({
            ...prev,
            [sectionName]: prev[sectionName].map((item: BudgetItem) =>
                item.item_id === updatedTransactionData.item_id
                    ? {
                        ...item,
                        transactions: item.transactions.map((transaction: Transaction) =>
                            transaction.transaction_id === updatedTransactionData.transaction_id
                                ? updatedTransactionData
                                : transaction
                        )
                    }
                    : item
            )
        }));
        updateTransactions(updatedTransactionData)
    };

    /**
     * Updates an existing transaction within the Context Budget
     * @param updatedTransactionData 
     */
    const deleteTransaction = (deletedTransactionData: Transaction) => {
        let sectionName: keyof Budget | undefined;
        const budgetItemArray = Object.values(budget).flat();
        for (let i = 0; i < budgetItemArray.length; i++) {
            if (budgetItemArray[i].item_id === deletedTransactionData.item_id) {
                sectionName = budgetItemArray[i].section as keyof Budget;
                break;
            }
        }
        if (!sectionName) {
            console.error("Item not found in budget sections.");
            return;
        }
        setBudget(prev => ({
            ...prev,
            [sectionName]: prev[sectionName].map((item: BudgetItem) =>
                item.item_id === deletedTransactionData.item_id
                    ? {
                        ...item,
                        transactions: item.transactions.filter((transaction: Transaction) =>
                            transaction.transaction_id !== deletedTransactionData.transaction_id
                        )
                    }
                    : item
            )
        }));
        deleteFromTransactions(deletedTransactionData);
    };

    /**
     * Adds a transaction to the Transactions array and keeps it in descending order
     * @param newTransactionData 
     */
    const addToTransactions = (newTransactionData: Transaction) => {
        let newTransactions = transactions;
        newTransactions.push(newTransactionData)
        newTransactions = newTransactions.sort((a, b) => Date.parse(b.date!) - Date.parse(a.date!));
        setTransactions(newTransactions);
    };

    /**
     * Adds a transaction to the Transactions array and keeps it in descending order
     * @param newTransactionData 
     */
    const updateTransactions = (newTransactionData: Transaction) => {
        let newTransactions = transactions.map((transaction: Transaction) =>
            transaction.transaction_id === newTransactionData.transaction_id
                ? newTransactionData
                : transaction
        )
        newTransactions = newTransactions.sort((a, b) => Date.parse(b.date!) - Date.parse(a.date!));
        setTransactions(newTransactions);
    };

    /**
     * Adds a transaction to the Transactions array and keeps it in descending order
     * @param newTransactionData 
     */
    const deleteFromTransactions = (newTransactionData: Transaction) => {
        let newTransactions = transactions.filter((transaction: Transaction) =>
            transaction.transaction_id !== newTransactionData.transaction_id
        )
        newTransactions = newTransactions.sort((a, b) => Date.parse(b.date!) - Date.parse(a.date!));
        setTransactions(newTransactions);
    };

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
        transactions,
        categories,
        curMonth,
        curYear,
        addBudgetItem,
        updateBudgetItem,
        removeBudgetItem,
        dataToBudget,
        addTransaction,
        addToTransactions,
        updateTransaction,
        updateTransactions,
        deleteTransaction,
        deleteFromTransactions,
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