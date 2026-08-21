import { api } from './api';


export async function getBooks(query = '', page = 0, size = 12) {
  const params = new URLSearchParams(query);
  params.set('page', page.toString());
  params.set('size', size.toString());
  const res = await api.get(`/books?${params.toString()}`);
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