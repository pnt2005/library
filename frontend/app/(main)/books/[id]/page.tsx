'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Book } from '@/types/book'
import { getBookById } from '@/utils/api/book'
import BookDetail from '@/components/book/BookDetail'

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getBookById(id as string)
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  return (
    <>
      {loading ? (
        <p className="p-4 text-center">Loading...</p>
      ) : book ? (
        <BookDetail book={book} />
      ) : (
        <p className="p-4 text-center text-red-500">Book not found.</p>
      )}
    </>
  )
}
