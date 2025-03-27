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
  logout: () => Promise<void>;
  getToken: () => string | undefined;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  getToken: () => undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const fetchUserData = useCallback(async () => {
    const token = Cookies.get('token');
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          Cookies.remove('token');
        }
      } else {
        setUser(null);
        Cookies.remove('token');
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      setUser(null);
      Cookies.remove('token');
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getToken = useCallback(() => Cookies.get('token'), []);

  const login = useCallback(async (credentials: UserLoginProps) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token && data.user) {
          Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
          setUser(data.user);
        } else {
          throw new Error('Invalid server response');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: UserRegisterProps) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token && data.user) {
          Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
          setUser(data.user);
        } else {
          throw new Error('Invalid server response');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', 
        { method: 'POST', credentials: 'include' }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('token');
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};