import { API_BASE_URL } from "@env";
export const APIBASEURL = API_BASE_URL;

// NOTE BEING USED FOR NOW
export const getBaseUrl = () => {
    //   if (__DEV__) {
    //     return 'http://localhost:8000';  // Development URL
    //   }
    //   return 'https://api.yourapp.com';  // Production URL
    return 'http://localhost:8000';  // Development URL
};

// API ERROR HANDLING
export const handleApiError = (error: any): never => {  // Note the return type
    if (error.response) {
        throw new Error(error.response.data.detail || 'An error occurred');
    } else if (error.request) {
        throw new Error('No response from server');
    } else {
        throw new Error(error.message || 'An error occurred');
    }
};