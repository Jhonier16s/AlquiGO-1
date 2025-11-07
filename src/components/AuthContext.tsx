import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión existente
    const checkSession = async () => {
      const savedToken = localStorage.getItem('accessToken');
      const savedUser = localStorage.getItem('currentUser');
      
      if (savedToken && savedUser) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-92179ba9/session`,
            {
              headers: {
                'Authorization': `Bearer ${savedToken}`,
              }
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setAccessToken(savedToken);
          } else {
            // Token inválido, limpiar
            localStorage.removeItem('accessToken');
            localStorage.removeItem('currentUser');
          }
        } catch (error) {
          console.error('Error verificando sesión:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-92179ba9/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('accessToken', data.accessToken);
        setIsLoading(false);
        return true;
      } else {
        console.error('Error en login:', data.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string;
    gender?: string;
    country?: string;
    city?: string;
    address?: string;
    acceptMarketing: boolean;
  }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-92179ba9/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(userData)
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Después de registrar, iniciar sesión automáticamente
        const loginSuccess = await login(userData.email, userData.password);
        setIsLoading(false);
        return loginSuccess;
      } else {
        console.error('Error en registro:', data.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}