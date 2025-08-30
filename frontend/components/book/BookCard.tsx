'use client'

import { Book } from '@/store/bookStore'
import Link from 'next/link'

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.id}`}>
      <div className="border rounded p-4 shadow hover:shadow-md hover:scale-[1.01] transition cursor-pointer">
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-60 object-cover mb-2 rounded"
        />
      </div>
    </Link>
  )
}
