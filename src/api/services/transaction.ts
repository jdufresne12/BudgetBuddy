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
    category: string;
    date: string | null;
}

export interface CreateTransactionData {
    user_id: number | undefined;
    item_id: number | null;
    description: string;
    amount: number;
    type: string;
    date: string | null;
}
