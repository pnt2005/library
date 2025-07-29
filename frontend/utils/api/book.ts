import { api } from './api';


export async function getBooks(query = '') {
  const res = await api.get('/books');
  return res.data;
}

export const getBookById = async (id: string) => {
  const res = await api.get(`/books/${id}`)
  return res.data
}