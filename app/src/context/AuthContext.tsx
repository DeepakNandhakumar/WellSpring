import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [initialAuth] = useState(() => {
    const storedToken = localStorage.getItem('wellspring_token');
    const storedUser = localStorage.getItem('wellspring_user');

    if (!storedToken || !storedUser) {
      return { token: null, user: null };
    }

    try {
      const parsedUser = JSON.parse(storedUser) as User;
      if (
        parsedUser &&
        typeof parsedUser.id === 'number' &&
        typeof parsedUser.name === 'string' &&
        typeof parsedUser.email === 'string' &&
        (parsedUser.role === 'USER' || parsedUser.role === 'ADMIN')
      ) {
        return { token: storedToken, user: parsedUser };
      }
    } catch (error) {
      console.error('Invalid stored authentication state:', error);
    }

    localStorage.removeItem('wellspring_token');
    localStorage.removeItem('wellspring_user');
    return { token: null, user: null };
  });

  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [token, setToken] = useState<string | null>(initialAuth.token);
  const loading = false;

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('wellspring_token', newToken);
    localStorage.setItem('wellspring_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('wellspring_token');
    localStorage.removeItem('wellspring_user');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ADMIN',
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
