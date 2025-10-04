import { notesMock } from '../mocks/notesMock';
import { getBaseUrl } from './client';

const useMock = String(process.env.REACT_APP_USE_MOCK || 'true').toLowerCase() !== 'false';

async function http(method, path, body){
  const base = getBaseUrl();
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'Content-Type':'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if(!res.ok){ throw new Error(await res.text() || res.statusText); }
  return res.status === 204 ? null : res.json();
}

// PUBLIC_INTERFACE
export const notesApi = useMock ? {
  list: ()=> notesMock.list(),
  get: (id)=> notesMock.get(id),
  create: (data)=> notesMock.create(data),
  update: (id, data)=> notesMock.update(id, data),
  remove: (id)=> notesMock.remove(id)
} : {
  list: ()=> http('GET', '/notes'),
  get: (id)=> http('GET', `/notes/${id}`),
  create: (data)=> http('POST', '/notes', data),
  update: (id, data)=> http('PUT', `/notes/${id}`, data),
  remove: (id)=> http('DELETE', `/notes/${id}`)
};
