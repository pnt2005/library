'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { getBookById } from '@/utils/api/book'
import { Book } from '@/types/book'
import CartItemCard from '@/components/cart/CartItemCard'
import toast from 'react-hot-toast'
import PurchaseButton from '@/components/cart/PurchaseButton'
import { useUser } from '@/contexts/UserContext'
import BorrowButton from '@/components/cart/BorrowButton'
import { Reader } from '@/types/reader'
import { getReaders } from '@/utils/api/user'

export default function CartPage() {
  const cartItems = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const [books, setBooks] = useState<Record<string, Book>>({})
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const [readers, setReaders] = useState<Reader[]>([])
  const [selectedReaderId, setSelectedReaderId] = useState<string>('')

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

  useEffect(() => {
    if (user?.role === "ROLE_ADMIN")
      getReaders()
        .then(setReaders)
        .catch(() => toast.error('Failed to load readers')) 
  }, [])
  

  const totalBorrowPrice = cartItems.reduce((sum, item) => {
    const book = books[item.bookId]
    return sum + (book?.borrowPrice || 0) * item.quantity
  }, 0)

  const totalPurchasePrice = cartItems.reduce((sum, item) => {
    const book = books[item.bookId]
    return sum + (book?.purchasePrice || 0) * item.quantity
  }, 0)

  return (
    <div className="max-w-4xl mx-auto p-6">

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No book in cart yet.</p>
      ) : (
        <>
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
          </div>

          <div className='mt-4'>Total borrow price: {totalBorrowPrice}$</div>
          <div>Total purchase price: {totalPurchasePrice}$</div>

          <div className="mt-6">
            {user?.role==="ROLE_READER" && <PurchaseButton />}
            {user?.role==="ROLE_ADMIN" && (
              <>
                <label className="block mb-2 font-medium">Select reader:</label>
                <select
                  className="border p-2 rounded w-full md:w-1/2"
                  value={selectedReaderId}
                  onChange={(e) => setSelectedReaderId(e.target.value)}
                >
                  <option value="">-- Choose a reader --</option>
                  {readers.map((reader) => (
                    <option key={reader.id} value={reader.id}>
                      {reader.username}
                    </option>
                  ))}
                </select>

                {selectedReaderId && (
                  <div className="mt-4">
                    <BorrowButton readerId={selectedReaderId} />
                  </div>
                )}
              </>
            )}
          </div>
      </>
      )}
    </div>
  )
}
