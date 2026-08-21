'use client';

import BookList from '@/components/book/BookList';
import { useUser } from '@/contexts/UserContext';
import { useBookStore } from '@/store/bookStore';
import { getBooks } from '@/utils/api/book';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BookListPage() {
  const [searchField, setSearchField] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  
  const setBooks = useBookStore((s) => s.setBooks);
  const totalPages = useBookStore((s) => s.totalPages);
  const currentPage = useBookStore((s) => s.currentPage);
  
  const { user } = useUser()

  useEffect(() => {
    getBooks(query, page).then(setBooks);
  }, [query, page, setBooks]);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      setQuery(`${searchField}=${encodeURIComponent(searchValue)}`);
    } else {
      setQuery('');
    }
    setPage(0); // Reset page to 0 on new search
  };
  
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <select 
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="p-2 border rounded border-gray-300"
          >
            <option value="name">Name</option>
            <option value="author">Author</option>
            <option value="description">Description</option>
            <option value="isbn">ISBN</option>
            <option value="publisher">Publisher</option>
          </select>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search books..."
            className="p-2 border rounded border-gray-300 flex-1"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Search
          </button>
        </form>

        {user?.role==="ROLE_ADMIN" && 
          <Link
            href="/books/add"
            className='text-white px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 shrink-0'
          >
            Add Book
          </Link>
        }
      </div>

      <BookList/>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
