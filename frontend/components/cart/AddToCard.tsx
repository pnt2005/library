'use client'

import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'
import { Plus, Minus } from 'lucide-react'

type Props = {
  bookId: string
  availableQuantity: number
}

export default function AddToCart({ bookId, availableQuantity }: Props) {
  const addToCart = useCartStore((state) => state.addToCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const items = useCartStore((state) => state.items)

  const item = items.find((i) => i.bookId === bookId)
  const quantity = item?.quantity || 0

  const handleAdd = () => {
    if (quantity === 0) {
      addToCart(bookId, 1)
    }
    toast.success('Book added to cart!')
  }

  return (
    <div className="mt-6 flex items-center gap-4">
      {/* Tăng / giảm số lượng */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (quantity > 1) decreaseQuantity(bookId)
          }}
          disabled={quantity <= 1}
          className={`p-1 rounded border ${
            quantity <= 1
              ? 'text-gray-400 border-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-200'
          }`}
        >
          <Minus size={16} />
        </button>

        <span className="w-6 text-center">{quantity || 1}</span>

        <button
          onClick={() => {
            if (quantity < availableQuantity) {
              if (quantity === 0) {
                addToCart(bookId, 1)
              } else {
                increaseQuantity(bookId)
              }
            } else {
              toast.error('Exceeds available quantity')
            }
          }}
          className="p-1 rounded border hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Nút thêm vào giỏ nếu chưa có */}
      {quantity === 0 && (
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      )}
    </div>
  )
}
