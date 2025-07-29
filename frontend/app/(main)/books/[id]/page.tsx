'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/utils/api/api'
import Image from 'next/image'
import { Book } from '@/types/book'
import { getBookById } from '@/utils/api/book'


export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id as string)
        setBook(data)
      } catch (err) {
        console.error('Failed to fetch book:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) return <p className="p-4 text-center">Loading...</p>
  if (!book) return <p className="p-4 text-center text-red-500">Book not found.</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.name}
            width={300}
            height={400}
            className="rounded shadow-md object-cover"
          />
        ) : (
          <div className="w-[300px] h-[400px] bg-gray-200 flex items-center justify-center text-gray-500 rounded shadow">
            No Image
          </div>
        )}

        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold">{book.name}</h1>
          <p className="text-gray-600 italic">by {book.author}</p>

          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>

          {book.price !== undefined && (
            <p className="text-lg text-green-600 font-semibold">
              Price: ${book.price.toFixed(2)}
            </p>
          )}

          {book.category && book.category.split('/').length > 0 && (
            <div>
              <strong>Categories:</strong>
              <ul className="flex gap-2 flex-wrap mt-1">
                {book.category.split('/').map((cat, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                  >
                    {cat.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}


          <div className="mt-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-800 mt-2 whitespace-pre-line">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
