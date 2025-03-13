import apiClient from '../client';
import { handleApiError } from '../config';
import { BudgetItem } from './budget';

export interface Transaction {
    user_id: number | undefined;
    item_id: number | null;
    transaction_id: number | null;
    description: string;
    amount: number;
    type: string;
    date: string | null;
}

export interface CreateTransactionData {
    user_id: number | undefined;
    item_id: number | undefined;
    description: string;
    amount: number;
    type: string;
    date: string | null;
}

export interface DeleteTransactionData {
    user_id: number | undefined;
    transaction_id: number | null;
}

export interface GetAllTransactionsData {
    user_id: number | undefined;
}

export interface GetMonthsTransactionsData {
    user_id: number | undefined;
    month: number;
    year: number;
}

export const transactionAPI = {
    createTransaction: async (data: CreateTransactionData) => {
        try {
            const response = await apiClient.post<Transaction>
                ('/transaction/create_transaction', data)
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    deleteTransaction: async (data: DeleteTransactionData) => {
        try {
            const response = await apiClient.delete<Boolean>
                ('/transaction/delete_transaction', { data: data })
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    updateTransaction: async (data: Transaction) => {
        try {
            const response = await apiClient.post<Transaction>
                ('/transaction/update_transaction', data)
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    getAllTransactions: async (data: GetAllTransactionsData) => {
        try {
            const response = await apiClient.post<Transaction[]>
                ('/transaction/get_all_transactions', data)
            return response.data
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    getMonthsTransactions: async (data: GetMonthsTransactionsData) => {
        try {
            const response = await apiClient.post<Transaction[]>
                ('/transaction/get_months_transactions', data)
            return response.data
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

}