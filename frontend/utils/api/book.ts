// utils/api.ts
export async function getBooks(query = '') {
  const res = await fetch(`/api/books?search=${encodeURIComponent(query)}`);
  return await res.json();
}
