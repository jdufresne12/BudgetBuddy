import apiClient from '../client';

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
            console.log("FAILED 1")
            return response.data;
        } catch (error) {
            console.log("FAILED 2")
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

const handleApiError = (error: any): never => {  // Note the return type
    if (error.response) {
        throw new Error(error.response.data.detail || 'An error occurred');
    } else if (error.request) {
        throw new Error('No response from server');
    } else {
        throw new Error(error.message || 'An error occurred');
    }
};