import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userToken: string | null;
  setUserToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const carregarDadosDoUsuario = async () => {
      const tokenArmazenado = await AsyncStorage.getItem('userToken');
      if (tokenArmazenado) {
        setUserToken(tokenArmazenado); 
      }
    };

    carregarDadosDoUsuario();
  }, []);

  const armazenarTokenUsuario = async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem('userToken', token); 
    } else {
      await AsyncStorage.removeItem('userToken'); 
    }
    setUserToken(token);
  };

  const login = async (token: string) => {
    await armazenarTokenUsuario(token);
  };

  const logout = async () => {
    await armazenarTokenUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, setUserToken: armazenarTokenUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
