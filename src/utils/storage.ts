import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for your user data
export interface UserData {
  user_id: number
  email: string
  first_name: string
  last_name: string
}

export const storage = {
  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  setUserData: async (user_data: UserData) => {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(user_data));
    } catch (error) {
      console.error('Error setting user data', error);
    }
  },

  getUserData: async (): Promise<UserData | null> => {
    try {
      const user_data = await AsyncStorage.getItem('user_data');
      return user_data ? JSON.parse(user_data) : null;
    } catch {
      console.error("Error retrieving user data");
      return null;
    }
  },

  removeUserData: async () => {
    try {
      await AsyncStorage.removeItem('user_data');
    } catch {
      console.error('Error removing user data')
    }
  },

  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};