import { api } from './api';

export async function borrowBooks(payload: {
    readerId: string, 
    books: { bookId: string; quantity: number }[]
}) {
    const res = await api.post('/borrow-receipts', payload)
    return res.data
}

export async function getBorrowReceipts(readerName?: string) {
    const res = await api.get('/borrow-receipts', {
        params: readerName ? { readerName } : {}
    })
    return res.data
}

export async function returnBooks(receiptId: string) {
    const res = await api.post(`/borrow-receipts/${receiptId}/return`)
    return res.data
}

export async function getBorrowReceiptById(receiptId: string) {
    const res = await api.get(`/borrow-receipts/${receiptId}`)
    return res.data
}
