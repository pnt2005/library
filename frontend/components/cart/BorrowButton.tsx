'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { borrowBooks } from '@/utils/api/receipt'
import { useUser } from '@/contexts/UserContext'

export default function BorrowButton() {
  const cartItems = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const handleBorrow = async () => {
    if (!user) {
      toast.error('You need to login to borrow book')
      return
    }
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return
    }

    setLoading(true)
    try {
      const payload = {
        readerId: user?.id,
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
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Mượn sách'}
    </button>
  )
}
