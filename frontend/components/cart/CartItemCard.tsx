'use client'

import { Book } from '@/types/book'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash } from 'lucide-react'

type Props = {
  book: Book
  quantity: number
  onRemove: () => void
  onIncrease: () => void
  onDecrease: () => void
}

export default function CartItemCard({
  book,
  quantity,
  onRemove,
  onIncrease,
  onDecrease
}: Props) {
  return (
    <div className="border p-4 rounded flex gap-4 hover:bg-gray-50 transition">
      {/* Ảnh sách */}
      {book.image ? (
        <Image
          src={book.image}
          alt={book.name}
          width={80}
          height={100}
          className="rounded object-cover shadow"
        />
      ) : (
        <div className="w-[80px] h-[100px] bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
          No Image
        </div>
      )}

      {/* Cột thông tin sách */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <Link href={`/books/${book.id}`} className="block">
            <h2 className="text-lg font-semibold">{book.name}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
          </Link>
        </div>

        {/* Tăng/giảm số lượng */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={onDecrease}
            disabled={quantity <= 1}
            className={`p-1 rounded border ${
              quantity <= 1
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-200'
            }`}
          >
            <Minus size={16} />
          </button>

          <span className="w-6 text-center">{quantity}</span>

          <button
            onClick={onIncrease}
            disabled={book.quantity===quantity}
            className={`p-1 rounded border ${
              quantity === book.quantity
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-200'
            }`}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Nút xóa */}
        <div className="mt-2">
          <button
            onClick={onRemove}
            className="text-red-600 hover:bg-red-100 p-2 rounded flex items-center gap-1 text-sm"
          >
            <Trash size={16} /> Remove
          </button>
        </div>
      </div>
    </div>
  )
}
