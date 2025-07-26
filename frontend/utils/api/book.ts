import { api } from './api';


export async function getBooks(query = '') {
  const res = await api.get('/books');
  return res.data;
}
