import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types/index.js';
import { getCurrentUser, signIn as authSignIn, signOut as authSignOut, updateUser as authUpdateUser } from '../utils/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    const authenticatedUser = authSignIn(email, password);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const signOut = () => {
    authSignOut();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    authUpdateUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
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
