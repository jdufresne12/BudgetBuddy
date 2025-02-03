import apiClient from '../client';

interface CreateUserData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
}

export const userApi = {
    createUser: async (userData: CreateUserData) => {
        try {
            const response = await apiClient.post<CreateUserResponse>('/users', userData);
            console.log("RESPONSE")
            console.log(response)
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    deleteUser: async () => {

    },

    getAllUsers: async () => {

    },

    getUser: async () => {

    }
}


// Helper function to handle API errors
const handleApiError = (error: any) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
            status: error.response.status,
            message: error.response.data.detail || 'An error occurred',
            data: error.response.data
        };
    } else if (error.request) {
        // The request was made but no response was received
        return {
            status: 0,
            message: 'No response from server',
            data: null
        };
    } else {
        // Something happened in setting up the request that triggered an Error
        return {
            status: 0,
            message: error.message || 'An error occurred',
            data: null
        };
    }
};