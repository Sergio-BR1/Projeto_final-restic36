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

  // Carregar o token armazenado ao iniciar
  useEffect(() => {
    const carregarDadosDoUsuario = async () => {
      const tokenArmazenado = await AsyncStorage.getItem('userToken');
      if (tokenArmazenado) {
        setUserToken(tokenArmazenado); 
      }
    };

    carregarDadosDoUsuario();
  }, []);

  // Função para armazenar o token no AsyncStorage e atualizar o estado
  const armazenarTokenUsuario = async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem('userToken', token); 
    } else {
      await AsyncStorage.removeItem('userToken'); 
    }
    setUserToken(token);
  };

  // Função de login
  const login = async (token: string) => {
    await armazenarTokenUsuario(token);
  };

  // Função de logout
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