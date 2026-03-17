import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { authService } from '@/services';
import type { User } from '@/types/user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token salvo ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
        } catch {
          localStorage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Aqui você faria a chamada real de login ao Supabase
      // Por enquanto, simulamos salvando o "token" e buscando o perfil
      if (email && password) {
        // Em produção: const { access_token } = await supabase.auth.signInWithPassword({ email, password });
        localStorage.setItem('access_token', 'mock_token');
        
        // Simula usuário - em produção, buscar do Supabase
        setUser({
          id: '1',
          name: 'Administrador',
          email: email,
          perfil: 'admin'
        });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const isAdmin = user?.perfil === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      isAdmin,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}