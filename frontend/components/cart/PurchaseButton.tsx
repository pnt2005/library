'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { useUser } from '@/contexts/UserContext'
import { purchaseBooks } from '@/utils/api/purchaseReceipt'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51S029qFZzQxfehlUM3kZNJBqxyMwYsohFdFcIKaNAo34eCY7vjRx99srdxh4iaOGrKnaGCznvwcKeDL0uXHKpbj900fniZCbKO")

export default function PurchaseButton() {
  const cartItems = useCartStore((state) => state.items)
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

      const data = await purchaseBooks(payload)
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({sessionId: data.sessionId})
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
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Buy'}
    </button>
  )
}
