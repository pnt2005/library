'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { purchaseBooks } from '@/utils/api/receipt'
import { useUser } from '@/contexts/UserContext'

export default function PurchaseButton() {
  const cartItems = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const handlePurchase = async () => {
    if (!user) {
      toast.error('You need to login to buy book')
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

      await purchaseBooks(payload)
      toast.success('Books bought successfully')
      clearCart()
    } catch (err) {
      toast.error('Failed to buy books')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Buy'}
    </button>
  )
}
