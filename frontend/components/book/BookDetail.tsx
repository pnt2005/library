'use client'

import Image from 'next/image'
import { Book } from '@/types/book'
import AddToCart from '../cart/AddToCard'
import Link from 'next/link'
import { deleteBook } from '@/utils/api/book'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function BookDetail({ book }: { book: Book }) {
  const router = useRouter(); 

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(book.id);
      toast.success("Book deleted successfully!");
      router.push("/books");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  
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
          <p><strong>Published year:</strong> {book.year}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Available quantity:</strong> {book.quantity}</p>
          <p><strong>Borrow Price:</strong> {book.borrowPrice} $</p>
          <p><strong>Purchase Price:</strong> {book.purchasePrice} $</p>

          {book.category && (
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

          <div className="flex gap-3 mt-6">
            <AddToCart bookId={book.id} />
            <Link
              href={`/books/${book.id}/edit`}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
