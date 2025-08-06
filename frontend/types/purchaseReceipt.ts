import { Book } from "./book"

export type PurchaseReceipt = {
    id: string
    reader: {
        id: string
        username: string
    }
    status: string
    createDate: string
    purchaseReceiptBooks: {
        id: string
        quantity: string
        book: Book
    } []
    totalPrice: number
}