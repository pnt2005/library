import { create } from 'zustand'

type CartItem = {
  bookId: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addToCart: (bookId: string, quantity: number) => void
  removeFromCart: (bookId: string) => void
  increaseQuantity: (bookId: string) => void
  decreaseQuantity: (bookId: string) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addToCart: (bookId, quantity) =>
    set((state) => {
      const existing = state.items.find((item) => item.bookId === bookId)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.bookId === bookId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }
      return { items: [...state.items, { bookId, quantity }] }
    }),

  removeFromCart: (bookId) =>
    set((state) => ({
      items: state.items.filter((item) => item.bookId !== bookId),
    })),

  increaseQuantity: (bookId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.bookId === bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (bookId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.bookId === bookId
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      ),
    })),
}))
