import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    // logout: () => void;
  }
  
  // Create context
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  // Create a provider component that will wrap our app
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Tracks whether user is logged in
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Function to handle login
    const login = async (email: string, password: string) => {
      try {
        // Call login API
        setIsAuthenticated(true);
      } catch (error) {
        // Handle login error
      }
    };
  
    const signup = async (email: string, password: string) => {
      try {
        // Call signup API
        setIsAuthenticated(true);
      } catch (error) {
        // Handle signup error
      }
    };
  
    const logout = () => {
      setIsAuthenticated(false);
    };
  
    // Provide these values to all child components
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, signup/*, logout*/ }}>
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