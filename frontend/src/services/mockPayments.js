import { mockRecentTransactions, mockApiDelay } from './mockData';

const STORAGE_KEY = 'mock_transactions';

const seed = () => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!existing || existing.length === 0) {
    // Normalize mockRecentTransactions to a richer model
    const seeded = mockRecentTransactions.map((t, idx) => ({
      id: t.id || `TXN-${String(idx + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
      customer: t.customer,
      items: Array.from({ length: t.items }).map((_, i) => ({
        productId: `PRD-${String(i + 1).padStart(3, '0')}`,
        name: `Producto ${i + 1}`,
        qty: 1,
        price: Math.round((t.amount / t.items) * 100) / 100,
      })),
      amount: t.amount,
      methods: [{ type: t.method, amount: t.amount }],
      status: t.status === 'pending' ? 'pending' : 'completed',
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  }
};

const readAll = () => {
  seed();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeAll = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

export const mockPaymentsService = {
  async list(filters = {}) {
    await mockApiDelay(300);
    let data = readAll();
    const { from, to, minAmount, maxAmount, method, status, q } = filters;

    if (from) data = data.filter((t) => new Date(t.date) >= new Date(from));
    if (to) data = data.filter((t) => new Date(t.date) <= new Date(to));
    if (minAmount) data = data.filter((t) => t.amount >= Number(minAmount));
    if (maxAmount) data = data.filter((t) => t.amount <= Number(maxAmount));
    if (method && method !== 'all') data = data.filter((t) => t.methods.some((m) => m.type === method));
    if (status && status !== 'all') data = data.filter((t) => t.status === status);
    if (q) data = data.filter((t) => t.id.toLowerCase().includes(String(q).toLowerCase()));

    // sort desc by date
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data;
  },

  async getById(id) {
    await mockApiDelay(150);
    return readAll().find((t) => t.id === id) || null;
  },

  async create(txn) {
    await mockApiDelay(300);
    const all = readAll();
    const id = txn.id || `TXN-${Date.now()}`;
    const record = { ...txn, id, date: txn.date || new Date().toISOString() };
    all.unshift(record);
    writeAll(all);
    return record;
  },

  async updateStatus(id, status) {
    await mockApiDelay(200);
    const all = readAll();
    const idx = all.findIndex((t) => t.id === id);
    if (idx >= 0) {
      all[idx].status = status;
      writeAll(all);
      return all[idx];
    }
    return null;
  },
};

export default mockPaymentsService;
