import { Book } from "./book"

export type BorrowReceipt = {
    id: string
    reader: {
        id: string
        username: string
    }
    status: string
    borrowDate: string
    returnDate: string
    borrowReceiptBooks: {
        id: string
        quantity: string
        book: Book
    } []
    totalPrice: number
}