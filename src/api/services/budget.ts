import apiClient from '../client';
import { handleApiError } from '../config';
import { Transaction } from './transaction';

export interface BudgetItem {
    section: string;
    item_id: number;
    user_id: number | undefined;
    name: string;
    amount: number;
    type: string;
    start_date: string;
    end_date: string | null
    transactions: Transaction[]
}

export interface CreateBudgetItemData {
    section: string;
    user_id: number | undefined;
    name: string;
    amount: number;
    type: string;
    start_date: string;
    end_date: string | null;
}

export interface DeleteBudgetItemData {
    section: string;
    user_id: number | undefined;
    item_id: number;
}

export interface GetBudgetData {
    user_id: number | undefined;
    month: number;
    year: number;
}

export interface GetCategoriesData {
    user_id: number | undefined;
}

export interface Category {
    item_id: number | undefined;
    name: string;
}


export const budgetAPI = {
    createBudgetItem: async (data: CreateBudgetItemData) => {
        try {
            const response = await apiClient.post<BudgetItem>
                ('/budget/create_budget_item', data)
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    deleteBudgetItem: async (data: DeleteBudgetItemData) => {
        try {
            const response = await apiClient.delete<Boolean>
                ('/budget/delete_budget_item', { data: data })
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    updateBudgetItem: async (data: BudgetItem) => {
        try {
            const response = await apiClient.post<BudgetItem>
                ('/budget/update_budget_item', data)
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    getBudget: async (data: GetBudgetData) => {
        try {
            const response = await apiClient.post<BudgetItem[]>
                ('/budget/get_budget', data)
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    getAllCategories: async (data: GetCategoriesData) => {
        try {
            const response = await apiClient.post<Category[]>
                ('/budget/get_all_categories', data)
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
}