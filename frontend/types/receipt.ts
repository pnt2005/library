export type Receipt = {
    id: string
    reader: string
    status: string
    createDate: string
    borrowDate: string
    returnDate: string
    borrowReceiptBooks: {
        id: string
        name: string
        author: string
        quantity: string
    } []
}