import { api } from './api';


export async function getBooks(query = '') {
  const res = await api.get('/books');
  return res.data;
}

export const getBookById = async (id: string) => {
  const res = await api.get(`/books/${id}`)
  return res.data
}

export async function createBook(book: any) {
  const res = await api.post("/books", book);
  return res.data;
}

export async function updateBook(id: string, book: any) {
  const res = await api.put(`/books/${id}`, book);
  return res.data;
}

export async function deleteBook(id: string) {
  const res = await api.delete(`/books/${id}`);
  return res.data;
}