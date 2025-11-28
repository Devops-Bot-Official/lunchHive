/* Demo Backend / Mock API Layer for LunchHive */
import { format } from 'date-fns';

export type HiveType = 'work' | 'home';

export interface Hive {
  id: string;
  name: string;
  type: HiveType;
  address: string;
  deliveryWindow: string;
  companySubsidised?: boolean;
  subsidyRate?: number; // e.g., 0.5 for 50%
  subsidyCap?: number; // e.g., 8 for €8 cap
  dailyStats: {
    previousOrders: number;
    todaysOrders: number;
  };
  thresholds: {
    smallDiscount: number;
    freeDelivery: number;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  dietaryTags: string[];
  officeFriendly?: boolean;
}

export type OrderStatus = 'Pending batch' | 'Being prepared' | 'Out for delivery' | 'Delivered' | 'Failed';

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  dietaryTags?: string[];
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  hiveId: string;
  status: OrderStatus;
  deliveryWindow: string;
  note?: string;
  createdAt: string;
}

export interface SubscriptionPreferences {
  vegetarianAllowed: boolean;
  veganAllowed: boolean;
  budgetPerLunch: number;
}

export interface Subscription {
  id: string;
  planName: string;
  daysOfWeek: string[]; // e.g., ['Mon','Wed','Fri']
  preferences: SubscriptionPreferences;
  status: 'active' | 'paused';
  nextDeliveries: string[]; // dates
}

export interface UserStats {
  totalLunches: number;
  favouriteMeal: string;
  healthyPercent: number;
  preferredLocation: 'work' | 'home';
}

export interface User {
  id: string;
  name: string;
  email: string;
  defaultHiveId?: string;
  savedHives: string[];
  favourites: string[]; // menu item ids
  stats: UserStats;
}

export interface HiveStats {
  hiveId: string;
  todaysOrders: number;
  thresholds: {
    smallDiscount: number;
    freeDelivery: number;
  };
  deliveryWindow: string;
  companySubsidised?: boolean;
  subsidyRate?: number;
  subsidyCap?: number;
}

// In-memory mock store (persisted via localStorage when possible)
const LS_KEYS = {
  user: 'lunchhive_user',
  orders: 'lunchhive_orders',
  subscription: 'lunchhive_subscription',
  selectedHiveId: 'lunchhive_selected_hive',
  hives: 'lunchhive_hives',
  todaysOrders: 'lunchhive_todays_orders'
};

let hives: Hive[] = [
  {
    id: 'hive_acme_5',
    name: 'ACME Tower – Floor 5',
    type: 'work',
    address: '123 Enterprise Ave',
    deliveryWindow: '12:00–12:15',
    companySubsidised: true,
    subsidyRate: 0.5,
    subsidyCap: 8,
    dailyStats: { previousOrders: 12, todaysOrders: 3 },
    thresholds: { smallDiscount: 5, freeDelivery: 10 }
  },
  {
    id: 'hive_acme_7',
    name: 'ACME Tower – Floor 7',
    type: 'work',
    address: '123 Enterprise Ave',
    deliveryWindow: '12:10–12:25',
    companySubsidised: false,
    subsidyRate: 0,
    subsidyCap: 0,
    dailyStats: { previousOrders: 8, todaysOrders: 2 },
    thresholds: { smallDiscount: 5, freeDelivery: 10 }
  },
  {
    id: 'hive_cowork_downtown',
    name: 'CoWork Hub Downtown',
    type: 'work',
    address: '55 Shared Space Blvd',
    deliveryWindow: '12:20–12:35',
    companySubsidised: false,
    subsidyRate: 0,
    subsidyCap: 0,
    dailyStats: { previousOrders: 10, todaysOrders: 1 },
    thresholds: { smallDiscount: 5, freeDelivery: 12 }
  },
  {
    id: 'hive_rose_12_18',
    name: 'Rose Street 12–18',
    type: 'home',
    address: 'Rose Street 12–18',
    deliveryWindow: '12:00–12:20',
    companySubsidised: false,
    subsidyRate: 0,
    subsidyCap: 0,
    dailyStats: { previousOrders: 6, todaysOrders: 2 },
    thresholds: { smallDiscount: 5, freeDelivery: 10 }
  },
  {
    id: 'hive_sunset_block_b',
    name: 'Sunset Apartments Block B',
    type: 'home',
    address: 'Sunset Blvd, Block B',
    deliveryWindow: '12:15–12:35',
    companySubsidised: false,
    subsidyRate: 0,
    subsidyCap: 0,
    dailyStats: { previousOrders: 9, todaysOrders: 4 },
    thresholds: { smallDiscount: 7, freeDelivery: 15 }
  }
];

let menu: MenuItem[] = [
  { id: 'menu_mediterranean_chicken', name: 'Mediterranean Chicken Bowl', description: 'Grilled chicken, quinoa, hummus, cherry tomatoes, olives', price: 11.5, dietaryTags: ['High protein'], officeFriendly: true },
  { id: 'menu_greek_salad', name: 'Greek Salad Bowl', description: 'Feta, cucumber, tomatoes, Kalamata olives, oregano', price: 9.5, dietaryTags: ['Vegetarian'], officeFriendly: true },
  { id: 'menu_vegan_curry', name: 'Coconut Veg Curry', description: 'Mixed veggies in coconut curry, jasmine rice', price: 10, dietaryTags: ['Vegan'], officeFriendly: true },
  { id: 'menu_beef_bulgogi', name: 'Beef Bulgogi Bowl', description: 'Marinated beef, rice, kimchi, scallions', price: 12.5, dietaryTags: ['High protein'], officeFriendly: true },
  { id: 'menu_spicy_ramen', name: 'Spicy Miso Ramen', description: 'Miso broth, noodles, egg, chili oil', price: 11, dietaryTags: ['Spicy'], officeFriendly: false },
  { id: 'menu_low_carb_salmon', name: 'Low-Carb Salmon Greens', description: 'Seared salmon, greens, avocado, seeds', price: 13, dietaryTags: ['Low carb', 'High protein'], officeFriendly: true }
];

let orders: Order[] = [];
let subscription: Subscription | null = null;

let currentUser: User = {
  id: 'u1',
  name: 'Alex Kim',
  email: 'alex.kim@example.com',
  defaultHiveId: 'hive_acme_5',
  savedHives: ['hive_acme_5', 'hive_rose_12_18'],
  favourites: ['menu_greek_salad', 'menu_mediterranean_chicken'],
  stats: {
    totalLunches: 23,
    favouriteMeal: 'Greek Salad Bowl',
    healthyPercent: 65,
    preferredLocation: 'work'
  }
};

// Initialize from localStorage if present
(function initFromLocalStorage() {
  try {
    const h = localStorage.getItem(LS_KEYS.hives);
    const u = localStorage.getItem(LS_KEYS.user);
    const o = localStorage.getItem(LS_KEYS.orders);
    const s = localStorage.getItem(LS_KEYS.subscription);
    const t = localStorage.getItem(LS_KEYS.todaysOrders);
    if (h) hives = JSON.parse(h);
    if (u) currentUser = JSON.parse(u);
    if (o) orders = JSON.parse(o);
    if (s) subscription = JSON.parse(s);
    if (t) {
      const map: Record<string, number> = JSON.parse(t);
      hives = hives.map(hv => ({
        ...hv,
        dailyStats: { ...hv.dailyStats, todaysOrders: map[hv.id] ?? hv.dailyStats.todaysOrders }
      }));
    }
  } catch {}
})();

function persist() {
  try {
    localStorage.setItem(LS_KEYS.hives, JSON.stringify(hives));
    localStorage.setItem(LS_KEYS.user, JSON.stringify(currentUser));
    localStorage.setItem(LS_KEYS.orders, JSON.stringify(orders));
    if (subscription) localStorage.setItem(LS_KEYS.subscription, JSON.stringify(subscription));
    const tMap: Record<string, number> = {};
    hives.forEach(h => { tMap[h.id] = h.dailyStats.todaysOrders; });
    localStorage.setItem(LS_KEYS.todaysOrders, JSON.stringify(tMap));
  } catch {}
}

function randomDelay(): number { return 200 + Math.floor(Math.random() * 800); }
function maybeFail() { if (Math.random() < 0.1) throw new Error('Network error: please try again'); }

function withLatency<T>(fn: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    const ms = randomDelay();
    setTimeout(() => {
      try {
        maybeFail();
        const result = fn();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
}

export function getCurrentUser(): Promise<User> {
  return withLatency(() => currentUser);
}

export function getHives(options?: { type?: HiveType; search?: string }): Promise<Hive[]> {
  return withLatency(() => {
    let list = hives.slice();
    if (options?.type) list = list.filter(h => h.type === options.type);
    if (options?.search) {
      const s = options.search.toLowerCase();
      list = list.filter(h => h.name.toLowerCase().includes(s) || h.address.toLowerCase().includes(s));
    }
    return list;
  });
}

export function setUserHive(hiveId: string): Promise<Hive> {
  return withLatency(() => {
    const hive = hives.find(h => h.id === hiveId);
    if (!hive) throw new Error('Hive not found');
    currentUser.defaultHiveId = hiveId;
    if (!currentUser.savedHives.includes(hiveId)) currentUser.savedHives.push(hiveId);
    localStorage.setItem(LS_KEYS.selectedHiveId, hiveId);
    persist();
    return hive;
  });
}

export function getSelectedHiveId(): string | undefined {
  try {
    return localStorage.getItem(LS_KEYS.selectedHiveId) || currentUser.defaultHiveId;
  } catch {
    return currentUser.defaultHiveId;
  }
}

export function getHiveDetails(hiveId: string): Promise<Hive> {
  return withLatency(() => {
    const hive = hives.find(h => h.id === hiveId);
    if (!hive) throw new Error('Hive not found');
    return hive;
  });
}

export function getHiveStats(hiveId: string): Promise<HiveStats> {
  return withLatency(() => {
    const hive = hives.find(h => h.id === hiveId);
    if (!hive) throw new Error('Hive not found');
    return {
      hiveId: hive.id,
      todaysOrders: hive.dailyStats.todaysOrders,
      thresholds: hive.thresholds,
      deliveryWindow: hive.deliveryWindow,
      companySubsidised: hive.companySubsidised,
      subsidyRate: hive.subsidyRate,
      subsidyCap: hive.subsidyCap
    };
  });
}

export function getTodayMenu(hiveId: string): Promise<MenuItem[]> {
  return withLatency(() => {
    const hive = hives.find(h => h.id === hiveId);
    if (!hive) throw new Error('Hive not found');
    // For demo, same menu for all hives; could tweak prices later per hive
    return menu.slice();
  });
}

export interface CreateOrderInput {
  items: { itemId: string; quantity: number }[];
  hiveId: string;
  note?: string;
  paymentMethod: 'company' | 'card_4242' | 'demo_card';
}

export function createOrder(input: CreateOrderInput): Promise<Order> {
  return withLatency(() => {
    const hive = hives.find(h => h.id === input.hiveId);
    if (!hive) throw new Error('Hive not found');
    if (!input.items.length) throw new Error('Your cart is empty');
    const now = new Date();
    const orderItems: OrderItem[] = input.items.map(it => {
      const m = menu.find(mm => mm.id === it.itemId);
      if (!m) throw new Error('Menu item not found');
      return { itemId: m.id, name: m.name, quantity: it.quantity, price: m.price, dietaryTags: m.dietaryTags };
    });
    const subtotal = orderItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
    // Company subsidy discount
    let discount = 0;
    if (hive.companySubsidised && hive.subsidyRate && hive.subsidyCap) {
      discount = Math.min(hive.subsidyRate * subtotal, hive.subsidyCap);
    }
    // Delivery fee based on thresholds
    const projectedOrders = hive.dailyStats.todaysOrders + 1; // after placing
    let deliveryFee = 2.5;
    if (projectedOrders >= hive.thresholds.freeDelivery) {
      deliveryFee = 0;
    } else if (projectedOrders >= hive.thresholds.smallDiscount) {
      deliveryFee = Math.max(0, deliveryFee - 1);
    }
    const total = Math.max(0, subtotal - discount) + deliveryFee;
    const order: Order = {
      id: 'ord_' + Math.random().toString(36).slice(2, 10),
      items: orderItems,
      subtotal,
      discount,
      deliveryFee,
      total: parseFloat(total.toFixed(2)),
      hiveId: hive.id,
      status: 'Pending batch',
      deliveryWindow: hive.deliveryWindow,
      note: input.note,
      createdAt: now.toISOString()
    };
    orders.unshift(order);
    // Increment todaysOrders
    hive.dailyStats.todaysOrders += 1;
    persist();
    return order;
  });
}

export function getOrders(): Promise<Order[]> {
  return withLatency(() => {
    // Update statuses based on time to simulate progress
    const now = Date.now();
    orders = orders.map(o => {
      const ageMin = (now - new Date(o.createdAt).getTime()) / 60000;
      let status: OrderStatus = o.status;
      if (ageMin > 90) status = 'Delivered';
      else if (ageMin > 60) status = 'Out for delivery';
      else if (ageMin > 30) status = 'Being prepared';
      else status = 'Pending batch';
      return { ...o, status };
    });
    persist();
    return orders.slice();
  });
}

export function getOrderById(id: string): Promise<Order | undefined> {
  return withLatency(() => orders.find(o => o.id === id));
}

export function getSubscription(): Promise<Subscription | null> {
  return withLatency(() => subscription);
}

export interface CreateSubscriptionInput {
  planName: string;
  daysOfWeek: string[];
  preferences: SubscriptionPreferences;
}

export function createSubscription(input: CreateSubscriptionInput): Promise<Subscription> {
  return withLatency(() => {
    const nextDeliveries = input.daysOfWeek.map((d, idx) => format(new Date(Date.now() + (idx + 1) * 86400000), 'yyyy-MM-dd'));
    subscription = {
      id: 'sub_' + Math.random().toString(36).slice(2, 10),
      planName: input.planName,
      daysOfWeek: input.daysOfWeek,
      preferences: input.preferences,
      status: 'active',
      nextDeliveries
    };
    persist();
    return subscription;
  });
}

export function updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription> {
  return withLatency(() => {
    if (!subscription || subscription.id !== id) throw new Error('Subscription not found');
    subscription = { ...subscription, ...updates };
    persist();
    return subscription;
  });
}

export function getProfile(userId: string): Promise<{ user: User; orders: Order[]; favourites: MenuItem[] }> {
  return withLatency(() => {
    if (currentUser.id !== userId) throw new Error('User not found');
    const favs = menu.filter(m => currentUser.favourites.includes(m.id));
    return { user: currentUser, orders: orders.slice(), favourites: favs };
  });
}

export function resetDemoData(): Promise<void> {
  return withLatency(() => {
    try {
      localStorage.removeItem(LS_KEYS.user);
      localStorage.removeItem(LS_KEYS.orders);
      localStorage.removeItem(LS_KEYS.subscription);
      localStorage.removeItem(LS_KEYS.selectedHiveId);
      localStorage.removeItem(LS_KEYS.hives);
      localStorage.removeItem(LS_KEYS.todaysOrders);
    } catch {}
    // Reset in-memory
    orders = [];
    subscription = null;
    hives = hives.map(h => ({ ...h, dailyStats: { ...h.dailyStats, todaysOrders: Math.floor(h.dailyStats.previousOrders * 0.2) } }));
    currentUser = {
      id: 'u1',
      name: 'Alex Kim',
      email: 'alex.kim@example.com',
      defaultHiveId: 'hive_acme_5',
      savedHives: ['hive_acme_5', 'hive_rose_12_18'],
      favourites: ['menu_greek_salad', 'menu_mediterranean_chicken'],
      stats: {
        totalLunches: 0,
        favouriteMeal: 'Greek Salad Bowl',
        healthyPercent: 65,
        preferredLocation: 'work'
      }
    };
    persist();
  });
}
