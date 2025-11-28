export type TransportType = 'bike' | 'ebike' | 'scooter' | 'foot';

export interface HiveZone {
  id: string;
  name: string;
}

export interface RiderApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  transportType: TransportType;
  preferredZones: string[];
  availability: {
    weekdaysLunch: boolean;
    weekends: boolean;
    notes?: string;
  };
  bio?: string;
  payoutDetails?: string;
  idDocumentName?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RiderProfile {
  fullName: string;
  phone: string;
  city: string;
  transportType: TransportType;
  preferredZones: string[];
  availabilityDays?: { [day: string]: boolean };
  availabilityWindow?: { startHour: number; endHour: number };
  payoutDetails?: string;
}

export interface RiderStats {
  totalEarningsWeek: number;
  totalBatchesWeek: number;
}

export interface DeliveryBatch {
  id: string;
  riderId: string;
  hiveId: string;
  hiveName: string;
  pickupLocation: {
    name: string;
    address: string;
  };
  pickupWindow: string;
  deliveryWindow: string;
  orderCount: number;
  status: 'not_started' | 'in_progress' | 'picked_up' | 'delivered' | 'cancelled';
  earnings: number;
  createdAt: string;
}

export interface Rider {
  id: string;
  applicationId?: string;
  status: 'none' | 'pending' | 'approved' | 'rejected';
  isOnline: boolean;
  profile: RiderProfile;
  stats: RiderStats;
  currentBatchId?: string | null;
}

const STORAGE_KEYS = {
  application: 'lh_rider_application',
  rider: 'lh_current_rider',
  batches: 'lh_rider_batches',
};

const defaultHives: HiveZone[] = [
  { id: 'hive-1', name: 'ACME Tower' },
  { id: 'hive-2', name: 'Rose Street' },
  { id: 'hive-3', name: 'Harbor Offices' },
  { id: 'hive-4', name: 'Tech Park Campus' },
];

function simulateDelay<T>(data: T, { failRate = 0.1, min = 300, max = 900 }: { failRate?: number; min?: number; max?: number } = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('Network error (demo)'));
      } else {
        resolve(data);
      }
    }, delay);
  });
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function nowISO() {
  return new Date().toISOString();
}

function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function ensureSeedBatches(rider: Rider) {
  const existing = readJSON<DeliveryBatch[]>(STORAGE_KEYS.batches) || [];
  if (existing.length > 0) return;
  const today = new Date();
  const todayStr = today.toISOString();
  const sample: DeliveryBatch[] = [
    {
      id: uid('batch'),
      riderId: rider.id,
      hiveId: 'hive-1',
      hiveName: 'ACME Tower – Floor 5',
      pickupLocation: { name: 'Sunrise Kitchen', address: '12 Market St' },
      pickupWindow: '11:45–11:55',
      deliveryWindow: '12:00–12:15',
      orderCount: 12,
      status: 'not_started',
      earnings: 18.5,
      createdAt: todayStr,
    },
    {
      id: uid('batch'),
      riderId: rider.id,
      hiveId: 'hive-2',
      hiveName: 'Rose Street Offices',
      pickupLocation: { name: 'Green Leaf Kitchen', address: '88 Rose St' },
      pickupWindow: '12:30–12:40',
      deliveryWindow: '12:45–13:00',
      orderCount: 9,
      status: 'delivered',
      earnings: 14.0,
      createdAt: todayStr,
    },
    {
      id: uid('batch'),
      riderId: rider.id,
      hiveId: 'hive-3',
      hiveName: 'Harbor Offices – Tower B',
      pickupLocation: { name: 'Harbor Kitchen', address: 'Pier 7' },
      pickupWindow: '13:15–13:25',
      deliveryWindow: '13:30–13:45',
      orderCount: 15,
      status: 'cancelled',
      earnings: 0,
      createdAt: todayStr,
    },
  ];
  writeJSON(STORAGE_KEYS.batches, sample);
  const current = sample.find(b => b.status === 'not_started');
  if (current) {
    rider.currentBatchId = current.id;
    writeJSON(STORAGE_KEYS.rider, rider);
  }
}

export async function getAvailableHives(): Promise<HiveZone[]> {
  return simulateDelay(defaultHives, { failRate: 0 });
}

export async function applyAsRider(applicationData: Omit<RiderApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<RiderApplication> {
  const application: RiderApplication = {
    ...applicationData,
    id: uid('app'),
    status: 'pending',
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
  writeJSON(STORAGE_KEYS.application, application);
  const rider: Rider = {
    id: uid('rider'),
    applicationId: application.id,
    status: 'pending',
    isOnline: false,
    profile: {
      fullName: application.fullName,
      phone: application.phone,
      city: application.city,
      transportType: application.transportType,
      preferredZones: application.preferredZones,
    },
    stats: { totalEarningsWeek: 0, totalBatchesWeek: 0 },
    currentBatchId: null,
  };
  writeJSON(STORAGE_KEYS.rider, rider);
  return simulateDelay(application);
}

export async function getRiderApplicationStatus(): Promise<{ status: 'none' | 'pending' | 'approved' | 'rejected'; application?: RiderApplication; lastUpdated?: string; notes?: string }> {
  const app = readJSON<RiderApplication>(STORAGE_KEYS.application);
  if (!app) {
    return simulateDelay({ status: 'none' as const });
  }
  return simulateDelay({ status: app.status as 'pending' | 'approved' | 'rejected', application: app, lastUpdated: app.updatedAt, notes: app.notes });
}

export async function getCurrentRider(): Promise<Rider | null> {
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  return simulateDelay(rider);
}

export async function getRiderStatus(): Promise<'none' | 'pending' | 'approved' | 'rejected'> {
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  const app = readJSON<RiderApplication>(STORAGE_KEYS.application);
  let status: 'none' | 'pending' | 'approved' | 'rejected' = 'none';
  if (rider) status = rider.status;
  else if (app) status = app.status;
  return simulateDelay(status);
}

export async function setRiderOnline(isOnline: boolean): Promise<Rider> {
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  if (!rider) throw new Error('No rider');
  rider.isOnline = isOnline;
  writeJSON(STORAGE_KEYS.rider, rider);
  if (isOnline && rider.status === 'approved') {
    ensureSeedBatches(rider);
  }
  return simulateDelay(rider);
}

export async function getRiderBatches(): Promise<DeliveryBatch[]> {
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  const batches = readJSON<DeliveryBatch[]>(STORAGE_KEYS.batches) || [];
  if (rider && rider.status === 'approved' && batches.length === 0) {
    ensureSeedBatches(rider);
    const seeded = readJSON<DeliveryBatch[]>(STORAGE_KEYS.batches) || [];
    return simulateDelay(seeded);
  }
  return simulateDelay(batches);
}

export async function getCurrentBatch(): Promise<DeliveryBatch | null> {
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  const batches = readJSON<DeliveryBatch[]>(STORAGE_KEYS.batches) || [];
  if (!rider) return simulateDelay(null);
  let current: DeliveryBatch | undefined;
  if (rider.currentBatchId) current = batches.find(b => b.id === rider.currentBatchId);
  if (!current) current = batches.find(b => b.status === 'not_started' || b.status === 'in_progress' || b.status === 'picked_up');
  return simulateDelay(current || null);
}

export async function updateBatchStatus(batchId: string, status: DeliveryBatch['status']): Promise<DeliveryBatch> {
  const batches = readJSON<DeliveryBatch[]>(STORAGE_KEYS.batches) || [];
  const idx = batches.findIndex(b => b.id === batchId);
  if (idx === -1) throw new Error('Batch not found');
  batches[idx].status = status;
  writeJSON(STORAGE_KEYS.batches, batches);
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  if (rider) {
    // Update currentBatchId
    if (status === 'delivered' || status === 'cancelled') {
      rider.currentBatchId = null;
      // Recompute weekly stats
      const weekData = computeWeekStats(batches);
      rider.stats.totalEarningsWeek = weekData.weekEarnings;
      rider.stats.totalBatchesWeek = weekData.weekBatches;
      writeJSON(STORAGE_KEYS.rider, rider);
    } else {
      rider.currentBatchId = batchId;
      writeJSON(STORAGE_KEYS.rider, rider);
    }
  }
  return simulateDelay(batches[idx]);
}

function isSameWeek(d1: Date, d2: Date): boolean {
  const oneJan = new Date(d2.getFullYear(), 0, 1);
  const dayOfYear = (date: Date) => Math.floor((date.getTime() - oneJan.getTime()) / 86400000);
  const weekNumber = (date: Date) => Math.floor((dayOfYear(date) + oneJan.getDay()) / 7);
  return weekNumber(d1) === weekNumber(d2) && d1.getFullYear() === d2.getFullYear();
}

function computeWeekStats(batches: DeliveryBatch[]) {
  const now = new Date();
  let weekEarnings = 0;
  let weekBatches = 0;
  for (const b of batches) {
    const d = new Date(b.createdAt);
    if (isSameWeek(d, now) && b.status === 'delivered') {
      weekEarnings += b.earnings;
      weekBatches += 1;
    }
  }
  return { weekEarnings, weekBatches };
}

export async function getRiderEarnings(): Promise<{ today: number; week: number; totalBatchesWeek: number }> {
  const batches = readJSON<DeliveryBatch[]>(STORAGE_KEYS.batches) || [];
  const now = new Date();
  const todayStr = now.toDateString();
  let today = 0;
  for (const b of batches) {
    if (new Date(b.createdAt).toDateString() === todayStr && b.status === 'delivered') {
      today += b.earnings;
    }
  }
  const weekData = computeWeekStats(batches);
  return simulateDelay({ today: Math.round(today * 100) / 100, week: Math.round(weekData.weekEarnings * 100) / 100, totalBatchesWeek: weekData.weekBatches });
}

export async function updateRiderProfile(updates: Partial<RiderProfile>): Promise<Rider> {
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  if (!rider) throw new Error('No rider');
  rider.profile = { ...rider.profile, ...updates };
  writeJSON(STORAGE_KEYS.rider, rider);
  const app = readJSON<RiderApplication>(STORAGE_KEYS.application);
  if (app) {
    if (updates.fullName) app.fullName = updates.fullName;
    if (updates.phone) app.phone = updates.phone;
    if (updates.city) app.city = updates.city;
    if (updates.transportType) app.transportType = updates.transportType;
    if (updates.preferredZones) app.preferredZones = updates.preferredZones;
    app.updatedAt = nowISO();
    writeJSON(STORAGE_KEYS.application, app);
  }
  return simulateDelay(rider);
}

export async function setApplicationStatus(status: 'pending' | 'approved' | 'rejected' | 'none', notes?: string): Promise<{ status: 'none' | 'pending' | 'approved' | 'rejected' }> {
  const app = readJSON<RiderApplication>(STORAGE_KEYS.application);
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  if (status === 'none') {
    localStorage.removeItem(STORAGE_KEYS.application);
    if (rider) {
      rider.status = 'none';
      rider.isOnline = false;
      rider.currentBatchId = null;
      writeJSON(STORAGE_KEYS.rider, rider);
    }
    localStorage.removeItem(STORAGE_KEYS.batches);
    return simulateDelay({ status: 'none' });
  }
  if (app) {
    app.status = status as RiderApplication['status'];
    app.notes = notes;
    app.updatedAt = nowISO();
    writeJSON(STORAGE_KEYS.application, app);
  }
  if (rider) {
    rider.status = status;
    writeJSON(STORAGE_KEYS.rider, rider);
    if (status === 'approved') {
      ensureSeedBatches(rider);
    }
  }
  return simulateDelay({ status });
}

export async function leaveDeliveryProgram(): Promise<void> {
  localStorage.removeItem(STORAGE_KEYS.application);
  localStorage.removeItem(STORAGE_KEYS.batches);
  const rider = readJSON<Rider>(STORAGE_KEYS.rider);
  if (rider) {
    rider.status = 'none';
    rider.isOnline = false;
    rider.currentBatchId = null;
    writeJSON(STORAGE_KEYS.rider, rider);
  }
  return simulateDelay(undefined);
}
