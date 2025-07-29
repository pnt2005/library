import { create } from 'zustand'

export type Book = {
    id: string
    name: string
    author: string
    description: string
    year: number
    image: string
    publisher: string
}

type State = {
  books: Book[]
  setBooks: (books: Book[]) => void
}

export const useBookStore = create<State>((set) => ({
  books: [],
  setBooks: (books) => set({ books })
}))
