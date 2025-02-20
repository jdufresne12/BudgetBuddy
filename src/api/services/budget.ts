import apiClient from '../client';
import { handleApiError } from '../config';

export interface BudgetItem {
    section: string;
    item_id: number;
    user_id: number | undefined;
    name: string;
    amount: number;
    type: string;
    start_date: string;
    end_date: string | null
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

export interface GetSectionsItemsData {
    section: string;
    user_id: number | undefined;
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
            handleApiError(error);
            throw error;
        }
    },

    getSectionsItems: async (data: GetSectionsItemsData) => {
        try {
            const response = await apiClient.post<BudgetItem[]>
                ('/budget/get_sections_items', data)
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
}