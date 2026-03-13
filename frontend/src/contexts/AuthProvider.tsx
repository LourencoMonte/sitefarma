import { useState, type ReactNode } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { User } from '@/types/user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Mock de autenticação - em produção, isso faria uma chamada à API
    if (email && password) {
      setUser({
        id: '1',
        name: 'Administrador',
        email: email,
        perfil: 'admin'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}