'use client'

import { Book } from '@/store/bookStore'
import Link from 'next/link'

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.id}`} className="group h-full block">
      <div className="border rounded p-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer h-full flex flex-col bg-white">
        <div className="w-full aspect-[2/3] relative mb-3 bg-gray-50 rounded overflow-hidden flex items-center justify-center p-1">
          <img
            src={book.image || undefined}
            alt={book.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight mb-1 text-gray-800 group-hover:text-blue-600 transition-colors">
            {book.name}
          </h3>
          <p className="text-gray-600 text-sm mb-1">{book.author}</p>
          
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-gray-600 text-sm font-medium">{book.averageRating || 4.5}</span>
          </div>

          <div className="mt-auto pt-2 flex items-center justify-between">
            <span className="text-blue-600 font-bold text-lg">
              ${book.borrowPrice || book.purchasePrice || '0.00'}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {book.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
