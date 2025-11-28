import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import type { Rider, RiderApplication, RiderProfile, DeliveryBatch, HiveZone } from '@/lib/riderApi';
import { applyAsRider, getRiderApplicationStatus, getCurrentRider, getRiderStatus, setRiderOnline, getRiderBatches, getCurrentBatch, updateBatchStatus, getRiderEarnings, updateRiderProfile, setApplicationStatus, leaveDeliveryProgram, getAvailableHives } from '@/lib/riderApi';

interface RiderContextType {
  status: 'none' | 'pending' | 'approved' | 'rejected';
  rider: Rider | null;
  application: RiderApplication | null;
  isLoading: boolean;
  hives: HiveZone[];
  refresh: () => Promise<void>;
  apply: (data: Omit<RiderApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<RiderApplication>;
  setOnline: (isOnline: boolean) => Promise<Rider | void>;
  batches: DeliveryBatch[];
  currentBatch: DeliveryBatch | null;
  fetchBatches: () => Promise<void>;
  fetchCurrentBatch: () => Promise<void>;
  changeBatchStatus: (batchId: string, status: DeliveryBatch['status']) => Promise<void>;
  earnings: { today: number; week: number; totalBatchesWeek: number } | null;
  fetchEarnings: () => Promise<void>;
  updateProfile: (updates: Partial<RiderProfile>) => Promise<void>;
  setAppStatus: (status: 'pending' | 'approved' | 'rejected' | 'none', notes?: string) => Promise<void>;
  leaveProgram: () => Promise<void>;
}

const RiderContext = createContext<RiderContextType | undefined>(undefined);

export function RiderProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [rider, setRider] = useState<Rider | null>(null);
  const [application, setApplication] = useState<RiderApplication | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [batches, setBatches] = useState<DeliveryBatch[]>([]);
  const [currentBatch, setCurrentBatch] = useState<DeliveryBatch | null>(null);
  const [earnings, setEarnings] = useState<{ today: number; week: number; totalBatchesWeek: number } | null>(null);
  const [hives, setHives] = useState<HiveZone[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [st, r, app, zones] = await Promise.all([
          getRiderStatus(),
          getCurrentRider(),
          getRiderApplicationStatus(),
          getAvailableHives(),
        ]);
        setStatus(st);
        setRider(r);
        setApplication(app.application || null);
        setHives(zones);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const [st, r, app] = await Promise.all([
        getRiderStatus(),
        getCurrentRider(),
        getRiderApplicationStatus(),
      ]);
      setStatus(st);
      setRider(r);
      setApplication(app.application || null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const apply = async (data: Omit<RiderApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const res = await applyAsRider(data);
    await refresh();
    return res;
  };

  const setOnline = async (online: boolean) => {
    try {
      const r = await setRiderOnline(online);
      setRider(r);
      toast.success(online ? 'You are now Online' : 'You are now Offline');
    } catch (e) {
      toast.error('Failed to update online status');
    }
  };

  const fetchBatches = async () => {
    try {
      const list = await getRiderBatches();
      setBatches(list);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCurrentBatch = async () => {
    try {
      const b = await getCurrentBatch();
      setCurrentBatch(b);
    } catch (e) {
      console.error(e);
    }
  };

  const changeBatchStatus = async (batchId: string, st: DeliveryBatch['status']) => {
    try {
      await updateBatchStatus(batchId, st);
      await Promise.all([fetchBatches(), fetchCurrentBatch(), fetchEarnings()]);
      toast.success(st === 'picked_up' ? 'Batch picked up' : st === 'delivered' ? 'Batch delivered' : st === 'in_progress' ? 'Batch started' : 'Batch updated');
    } catch (e) {
      toast.error('Failed to update batch');
    }
  };

  const fetchEarnings = async () => {
    try {
      const e = await getRiderEarnings();
      setEarnings(e);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfileFn = async (updates: Partial<RiderProfile>) => {
    try {
      const r = await updateRiderProfile(updates);
      setRider(r);
      toast.success('Profile updated');
    } catch (e) {
      toast.error('Failed to update profile');
    }
  };

  const setAppStatusFn = async (st: 'pending' | 'approved' | 'rejected' | 'none', notes?: string) => {
    try {
      await setApplicationStatus(st, notes);
      await refresh();
      toast.success(`Status set to ${st}`);
    } catch (e) {
      toast.error('Failed to change status');
    }
  };

  const leaveProgramFn = async () => {
    try {
      await leaveDeliveryProgram();
      await refresh();
      toast.success('You left the delivery program');
    } catch (e) {
      toast.error('Failed to leave');
    }
  };

  const value: RiderContextType = {
    status,
    rider,
    application,
    isLoading,
    hives,
    refresh,
    apply,
    setOnline,
    batches,
    currentBatch,
    fetchBatches,
    fetchCurrentBatch,
    changeBatchStatus,
    earnings,
    fetchEarnings,
    updateProfile: updateProfileFn,
    setAppStatus: setAppStatusFn,
    leaveProgram: leaveProgramFn,
  };

  return <RiderContext.Provider value={value}>{children}</RiderContext.Provider>;
}

export function useRider() {
  const ctx = useContext(RiderContext);
  if (!ctx) throw new Error('useRider must be used within RiderProvider');
  return ctx;
}
