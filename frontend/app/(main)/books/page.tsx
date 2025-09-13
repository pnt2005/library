'use client';

import BookList from '@/components/book/BookList';
import { useUser } from '@/contexts/UserContext';
import { useBookStore } from '@/store/bookStore';
import { getBooks } from '@/utils/api/book';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BookListPage() {
  const [query, setQuery] = useState('');
  const setBooks = useBookStore((s) => s.setBooks)
  const { user } = useUser()

  useEffect(() => {
    getBooks(query).then(setBooks);
  }, [query]);

  
  return (
    <main className="p-6 max-w-6xl mx-auto">
      {user?.role==="ROLE_ADMIN" && 
        <Link
          href="/books/add"
          className='text-white px-4 py-2 rounded bg-gray-600 hover:bg-gray-700'
        >
          Add Book
        </Link>
      }
      <BookList/>
    </main>
  );
}
