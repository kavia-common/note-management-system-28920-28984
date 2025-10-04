const STORAGE_KEY = 'notes_mock_items_v1';
const delay = (ms)=> new Promise(res=> setTimeout(res, ms));
const failureRate = ()=> Number(process.env.REACT_APP_MOCK_FAILURE_RATE || 0);

const load = ()=> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return [] }
};
const save = (items)=> localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
const maybeFail = ()=> { if(Math.random() < failureRate()) throw new Error('Mock failure'); };

export const notesMock = {
  async list(){ await delay(250); maybeFail(); return load(); },
  async get(id){ await delay(150); maybeFail(); return load().find(n=> String(n.id)===String(id)); },
  async create(data){ await delay(200); maybeFail(); const items = load(); const now = Date.now(); const item = { id: crypto.randomUUID?.() || String(now), ...data, createdAt: now, updatedAt: now }; items.unshift(item); save(items); return item; },
  async update(id, data){ await delay(200); maybeFail(); const items = load(); const idx = items.findIndex(n=> String(n.id)===String(id)); if(idx<0) throw new Error('Not found'); const updated = { ...items[idx], ...data, updatedAt: Date.now() }; items[idx]=updated; save(items); return updated; },
  async remove(id){ await delay(150); maybeFail(); const items = load().filter(n=> String(n.id)!==String(id)); save(items); return { ok:true }; }
};
