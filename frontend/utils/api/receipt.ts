import { api } from './api';
export async function borrowBooks(payload: {
    readerId: string, 
    books: { bookId: string; quantity: number }[]
}) {
    const res = await api.post('/borrow-receipts', payload)
    return res.data
}