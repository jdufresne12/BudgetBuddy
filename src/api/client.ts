import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from "@env";

// Create an axios instance with custom config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;