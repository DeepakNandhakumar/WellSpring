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

function readStoredAuth(): { token: string | null; user: User | null } {
  const storedToken = localStorage.getItem('wellspring_token');
  const storedUser = localStorage.getItem('wellspring_user');

  if (!storedToken || !storedUser) {
    return { token: null, user: null };
  }

  try {
    const parsedUser = JSON.parse(storedUser) as User;
    if (
      typeof parsedUser.id !== 'number' ||
      typeof parsedUser.name !== 'string' ||
      typeof parsedUser.email !== 'string' ||
      !['USER', 'ADMIN'].includes(parsedUser.role)
    ) {
      throw new Error('Stored user data is invalid');
    }
    return { token: storedToken, user: parsedUser };
  } catch {
    localStorage.removeItem('wellspring_token');
    localStorage.removeItem('wellspring_user');
    return { token: null, user: null };
  }
}

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
  const [initialAuth] = useState(readStoredAuth);
  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [loading] = useState(false);

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
