'use client'

import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

type Props = {
  bookId: string
}

export default function AddToCart({ bookId }: Props) {
  const addToCart = useCartStore((state) => state.addToCart)
  const items = useCartStore((state) => state.items)
  const item = items.find((i) => i.bookId === bookId)

  const handleAdd = () => {
    addToCart(bookId, 1)
    toast.success('Book added to cart!')
  }

  return (
    <button
      onClick={handleAdd}
      disabled={!!item}
      className={`text-white px-4 py-2 rounded
        ${item ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
    >
      {item ? 'Already in Cart' : 'Add to Cart'}
    </button>
  )
}
