'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { getBookById } from '@/utils/api/book'
import { Book } from '@/types/book'
import CartItemCard from '@/components/cart/CartItemCard'
import toast from 'react-hot-toast'
import BorrowButton from '@/components/cart/BorrowButton'

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const [books, setBooks] = useState<Record<string, Book>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const results = await Promise.all(
          cartItems.map((item) => getBookById(item.bookId))
        )
        const mapped = Object.fromEntries(results.map((b) => [b.id, b]))
        setBooks(mapped)
      } catch {
        toast.error('Can not load book in cart')
      } finally {
        setLoading(false)
      }
    }

    if (cartItems.length > 0) fetchBooks()
    else setLoading(false)
  }, [cartItems])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No book in cart yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cartItems.map((item) => {
            const book = books[item.bookId]
            if (!book) return null
            return (
              <CartItemCard
                key={item.bookId}
                book={book}
                quantity={item.quantity}
                onRemove={() => removeFromCart(item.bookId)}
                onIncrease={() => increaseQuantity(item.bookId)}
                onDecrease={() => decreaseQuantity(item.bookId)}
              />
            )
          })}
          <div className="mt-6">
            <BorrowButton />
          </div>
        </div>
      )}
    </div>
  )
}
