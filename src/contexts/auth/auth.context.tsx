import Cookies from 'js-cookie';
import { createContext, useState, useEffect, useCallback } from 'react';

export interface UserProps {
  id?: number | string;
  name: string;
  email: string;
  role: string;
  country: string;
  user_profile?: {};
}

interface UserLoginProps {
  email: string;
  password: string;
  role?: string;
}

interface UserRegisterProps {
  name: string;
  email: string;
  role: string;
  country: string;
  password: string;
}

interface AuthContextType {
  user: UserProps | null;
  login: (credentials: UserLoginProps) => Promise<void>;
  register: (userData: UserRegisterProps) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const userData: UserProps = await response.json();
        setUser(userData);
      } else {
        Cookies.remove('token');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      Cookies.remove('token');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && !user) {
      fetchUserData(token);
    }
  }, [fetchUserData, user]);

  const login = useCallback(async (credentials: UserLoginProps) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const { token, user } = await response.json();
        Cookies.set('token', token, { secure: true, sameSite: 'strict' });
        setUser(user);
        return user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: UserProps) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const { token, user }: { token: string; user: UserProps } = await response.json();
        Cookies.set('token', token, { secure: true, sameSite: 'strict' });
        setUser(user);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};