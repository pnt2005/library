import { api } from './api';

export async function purchaseBooks(payload: {
    readerId: string, 
    books: { bookId: string; quantity: number }[]
}) {
    const res = await api.post('/purchase-receipts', payload)
    return res.data
}

export async function getPurchaseReceipts(readerName?: string) {
    const res = await api.get('/purchase-receipts', {
        params: readerName ? { readerName } : {}
    })
    return res.data
}

export async function getPurchaseReceiptById(receiptId: string) {
    const res = await api.get(`/purchase-receipts/${receiptId}`)
    return res.data
}
