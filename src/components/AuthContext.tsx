import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Verificar sesión existente localmente
    const savedToken = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('currentUser');
    if (savedToken && savedUser) {
      try {
        const parsedUser: User = JSON.parse(savedUser);
        setUser(parsedUser);
        setAccessToken(savedToken);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const usersRaw = localStorage.getItem('users');
      const users: Array<User & { password: string }> = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        setIsLoading(false);
        return false;
      }
      const token = `tok_${Math.random().toString(36).slice(2)}.${Date.now()}`;
      const sessionUser: User = { id: found.id, email: found.email, name: found.name, phone: found.phone };
      setUser(sessionUser);
      setAccessToken(token);
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      localStorage.setItem('accessToken', token);
      setIsLoading(false);
      return true;
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
      const usersRaw = localStorage.getItem('users');
      const users: Array<User & { password: string }> = usersRaw ? JSON.parse(usersRaw) : [];
      const exists = users.some(u => u.email === userData.email);
      if (exists) {
        setIsLoading(false);
        return false;
      }
      const newUser: User & { password: string } = {
        id: `usr_${cryptoRandom()}`,
        email: userData.email,
        name: `${userData.name} ${userData.lastName}`.trim(),
        phone: userData.phone,
        password: userData.password,
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      // auto login
      const token = `tok_${Math.random().toString(36).slice(2)}.${Date.now()}`;
      const sessionUser: User = { id: newUser.id, email: newUser.email, name: newUser.name, phone: newUser.phone };
      setUser(sessionUser);
      setAccessToken(token);
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      localStorage.setItem('accessToken', token);
      setIsLoading(false);
      return true;
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

// Utilidad simple para generar IDs pseudo-aleatorios
function cryptoRandom() {
  // Usa crypto si está disponible; si no, fallback a Math.random
  try {
    const bytes = new Uint8Array(12);
    (window.crypto || (window as any).msCrypto).getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  }
}