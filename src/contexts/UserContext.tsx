import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, User } from '@/lib/api';

interface UserContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getCurrentUser()
      .then(u => setUser(u))
      .catch(e => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, error, refresh: load, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
