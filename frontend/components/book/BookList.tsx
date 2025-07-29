'use client'
import { useBookStore } from '@/store/bookStore'
import BookCard from './BookCard'

export default function BookList() {
  const books = useBookStore((s) => s.books)

  if (books.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
