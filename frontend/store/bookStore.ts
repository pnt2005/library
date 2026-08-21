import { create } from 'zustand'

export type Book = {
    id: string
    name: string
    author: string
    description: string
    year: number
    image: string
    publisher: string
    borrowPrice: number
    purchasePrice: number
    averageRating?: number
}

type State = {
  books: Book[]
  totalPages: number
  currentPage: number
  totalElements: number
  setBooks: (data: any) => void
}

export const useBookStore = create<State>((set) => ({
  books: [],
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  setBooks: (data) => set({
    books: data?.content || [],
    totalPages: data?.page?.totalPages || data?.totalPages || 0,
    currentPage: data?.page?.number || data?.number || 0,
    totalElements: data?.page?.totalElements || data?.totalElements || 0,
  })
}))
