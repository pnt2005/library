'use client';

import { useEffect, useState } from 'react';
import { BookCard } from '@/components/book/BookCard';
import { getBooks } from '@/utils/api/book';
import Chatbot from '@/components/ChatBot';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getBooks(query).then(setBooks);
  }, [query]);

  return (
    <>
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Thư viện sách</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {books.map((book:any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
    <Chatbot/>
    </>
  );
}
