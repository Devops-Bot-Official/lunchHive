import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getHiveDetails, getHiveStats, getSelectedHiveId, Hive, HiveStats, setUserHive } from '@/lib/api';

interface HiveContextValue {
  selectedHive: Hive | null;
  stats: HiveStats | null;
  loading: boolean;
  error: string | null;
  selectHive: (hiveId: string) => Promise<void>;
  reloadStats: () => void;
}

const HiveContext = createContext<HiveContextValue | undefined>(undefined);

export function HiveProvider({ children }: { children: ReactNode }) {
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);
  const [stats, setStats] = useState<HiveStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadHive = async () => {
    const id = getSelectedHiveId();
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const hive = await getHiveDetails(id);
      setSelectedHive(hive);
      const s = await getHiveStats(id);
      setStats(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHive(); }, []);

  const selectHive = async (hiveId: string) => {
    setLoading(true);
    setError(null);
    try {
      const hive = await setUserHive(hiveId);
      setSelectedHive(hive);
      const s = await getHiveStats(hiveId);
      setStats(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const reloadStats = () => {
    if (!selectedHive) return;
    setLoading(true);
    setError(null);
    getHiveStats(selectedHive.id)
      .then(s => setStats(s))
      .catch(e => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false));
  };

  return (
    <HiveContext.Provider value={{ selectedHive, stats, loading, error, selectHive, reloadStats }}>
      {children}
    </HiveContext.Provider>
  );
}

export function useHive() {
  const ctx = useContext(HiveContext);
  if (!ctx) throw new Error('useHive must be used within HiveProvider');
  return ctx;
}
