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

export async function approvePurchaseReceipt(receiptId: string) {
    const res = await api.post(`/purchase-receipts/${receiptId}/approve`)
    return res.data
}

export async function receivePurchaseReceipt(receiptId: string) {
    const res = await api.post(`/purchase-receipts/${receiptId}/receive`)
    return res.data
}