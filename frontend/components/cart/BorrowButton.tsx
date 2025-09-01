'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { borrowBooks } from '@/utils/api/borrowReceipt'

export default function BorrowButton({readerId}: {readerId: string}) {
  const cartItems = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [loading, setLoading] = useState(false)

  const handleBorrow = async () => {

    setLoading(true)
    try {
      const payload = {
        readerId: readerId,
        books: cartItems.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity
        }))
      }

      await borrowBooks(payload)
      toast.success('Books borrowed successfully')
      clearCart()
    } catch (err) {
      toast.error('Failed to borrow books')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBorrow}
      disabled={loading}
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Borrow'}
    </button>
  )
}
