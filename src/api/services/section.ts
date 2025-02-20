import apiClient from '../client';
import { handleApiError } from '../config';
import { BudgetItem } from './budget';

export type SectionName = "Income" | "Home" | "Food" | "Transportation" | "Subscriptions";

export interface SectionData {
    section_id: number;
    name: string;
    start_date: string;
    end_date: string | null;
    budgetItems: BudgetItem[];
}

export interface Transaction {
    transaction_id: number;
    name: string;
    amount: number;
}

export interface CreateSection {
    user_id: number | undefined;
    name: string;
    start_date: string;
    end_date: string | null
};

export interface GetMonthsSectionsData {
    user_id: number | undefined;
    month: number;
    year: number
};

export interface DeleteSectionData {
    section: string;
    user_id: number | undefined;
};


export const sectionAPI = {
    createSection: async (data: CreateSection) => {
        try {
            const response = await apiClient.post<SectionData>
                ('/section/create_section', data);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    getMonthsSections: async (data: GetMonthsSectionsData) => {
        try {
            const response = await apiClient.post<SectionData[]>
                ('/section/get_months_sections', data);
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    deleteSection: async (data: DeleteSectionData) => {
        try {
            const response = await apiClient.delete<Boolean>
                ('/section/delete_section', { data })
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }
};