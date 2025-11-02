import { mockApiDelay } from './mockData';

const STORAGE_KEY = 'mock_products';

const seed = () => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!existing || existing.length === 0) {
    const base = [
      { id: 'PRD-001', name: 'Producto A', sku: 'PRD-001', category: 'A', cost: 2000, price: 3500, stock: 25, minStock: 10, expiryDate: null },
      { id: 'PRD-002', name: 'Producto B', sku: 'PRD-002', category: 'A', cost: 1500, price: 3000, stock: 12, minStock: 20, expiryDate: null },
      { id: 'PRD-003', name: 'Producto C', sku: 'PRD-003', category: 'B', cost: 1000, price: 1800, stock: 8, minStock: 15, expiryDate: null },
      { id: 'PRD-004', name: 'Producto D', sku: 'PRD-004', category: 'B', cost: 500, price: 1000, stock: 60, minStock: 20, expiryDate: new Date(Date.now() + 1000*60*60*24*5).toISOString() },
      { id: 'PRD-005', name: 'Producto E', sku: 'PRD-005', category: 'C', cost: 750, price: 1400, stock: 40, minStock: 25, expiryDate: new Date(Date.now() + 1000*60*60*24*20).toISOString() },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
  }
};

const readAll = () => {
  seed();
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
};
const writeAll = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

export const mockInventoryService = {
  async list(filters = {}) {
    await mockApiDelay(200);
    let data = readAll();
    const { q, category, stockLevel, orderBy } = filters;
    if (q) {
      const s = String(q).toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s));
    }
    if (category && category !== 'all') data = data.filter((p) => p.category === category);
    if (stockLevel && stockLevel !== 'all') {
      data = data.filter((p) => {
        const ratio = p.stock / p.minStock;
        if (stockLevel === 'low') return p.stock <= p.minStock;
        if (stockLevel === 'medium') return ratio > 1 && ratio <= 2;
        if (stockLevel === 'high') return ratio > 2;
        return true;
      });
    }
    if (orderBy) {
      const [field, dir] = orderBy.split(':');
      data.sort((a,b) => (a[field] > b[field] ? 1 : -1) * (dir === 'desc' ? -1 : 1));
    }
    return data;
  },

  async create(product) {
    await mockApiDelay(200);
    const all = readAll();
    const id = product.id || `PRD-${Date.now()}`;
    const record = { ...product, id };
    all.push(record);
    writeAll(all);
    return record;
  },

  async update(id, product) {
    await mockApiDelay(200);
    const all = readAll();
    const idx = all.findIndex((p) => p.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...product };
      writeAll(all);
      return all[idx];
    }
    return null;
  },

  async remove(id) {
    await mockApiDelay(150);
    const all = readAll().filter((p) => p.id !== id);
    writeAll(all);
    return true;
  },

  async bulkUpdatePrice(ids, percent) {
    await mockApiDelay(300);
    const all = readAll();
    ids.forEach((id) => {
      const idx = all.findIndex((p) => p.id === id);
      if (idx >= 0) all[idx].price = Math.round(all[idx].price * (1 + percent / 100));
    });
    writeAll(all);
    return true;
  },

  async lowStock() {
    await mockApiDelay(150);
    return readAll().filter((p) => p.stock <= p.minStock);
  },

  async expiring(days = 30) {
    await mockApiDelay(150);
    const deadline = Date.now() + days * 24 * 60 * 60 * 1000;
    return readAll().filter((p) => p.expiryDate && new Date(p.expiryDate).getTime() <= deadline);
  },
};

export default mockInventoryService;
