import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken, removeAuthToken } from '../services/api';

interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<AdminUser | null>(() => {
    const savedUser = localStorage.getItem('footbee_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const existingToken = getAuthToken();
    if (existingToken) {
      setTokenState(existingToken);
      const savedUser = localStorage.getItem('footbee_admin_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } else {
      setTokenState(null);
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.login(email, password);
      if (response.success && response.data) {
        const { token: newToken, admin } = response.data;
        setAuthToken(newToken);
        localStorage.setItem('footbee_admin_user', JSON.stringify(admin));
        setTokenState(newToken);
        setUser(admin);
      } else {
        throw new Error('Login failed. Invalid response from server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeAuthToken();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
