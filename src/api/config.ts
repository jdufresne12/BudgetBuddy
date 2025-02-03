import { API_BASE_URL } from "@env";
export const APIBASEURL = API_BASE_URL; // Change this to your actual API URL

// NOTE BEING USED FOR NOW

export const getBaseUrl = () => {
//   if (__DEV__) {
//     return 'http://localhost:8000';  // Development URL
//   }
//   return 'https://api.yourapp.com';  // Production URL
    return 'http://localhost:8000';  // Development URL
};