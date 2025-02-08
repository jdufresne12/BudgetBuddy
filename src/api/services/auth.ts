import apiClient from '../client';
import { handleApiError } from '../config';

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    access_token: string;
    token_type: string;
    user_data: {
        user_id: number
        email: string
        first_name: string
        last_name: string
    };
}

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
            console.log(response.data.access_token)
            return response.data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            throw handleApiError(error);
        }
    },

    verifyToken: async () => {
        try {
            const response = await apiClient.get('/auth/verify');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};