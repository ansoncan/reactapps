// context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  isAuthenticated: false,
  login: async (token: string) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
