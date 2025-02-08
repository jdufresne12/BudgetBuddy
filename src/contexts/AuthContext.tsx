import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, UserData } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  token: string | null;
  login: (token: string, user_data: UserData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [token, storedUserData] = await Promise.all([
          storage.getToken(),
          storage.getUserData()
        ]);

        if (typeof token === 'string' && storedUserData) {
          setToken(token);
          setUserData(storedUserData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setToken(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token: string, user_data: UserData) => {
    try {
      await storage.setToken(token);
      await storage.setUserData(user_data);

      setIsAuthenticated(true);
      setUserData(user_data);
      setToken(token);
    } catch (error) {
      console.error('Login error:', error);
      await storage.clearAll();
      setToken(null);
      setUserData(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await storage.clearAll();
      setUserData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};