import { Book } from "./book"

export type Receipt = {
    id: string
    reader: {
        id: string
        username: string
    }
    status: string
    createDate: string
    borrowDate: string
    returnDate: string
    borrowReceiptBooks: {
        id: string
        quantity: string
        book: Book
    } []
}