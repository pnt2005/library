import { api } from './api';


export async function getReaders(query = '') {
  const res = await api.get('/readers');
  return res.data;
}