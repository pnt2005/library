'use client';

import BookList from '@/components/book/BookList';
import { useBookStore } from '@/store/bookStore';
import { getBooks } from '@/utils/api/book';
import { useEffect, useState } from 'react';

export default function BookListPage() {
  const [query, setQuery] = useState('');
  const setBooks = useBookStore((s) => s.setBooks)

  useEffect(() => {
    getBooks(query).then(setBooks);
  }, [query]);

  
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Library</h1>
      <BookList/>
    </main>
  );
}
