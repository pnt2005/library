'use client'

import BorrowReceiptCard from "@/components/receipts/borrow/BorrowReceiptCard"
import PurchaseReceiptCard from "@/components/receipts/purchase/PurchaseReceiptCard"
import { useUser } from "@/contexts/UserContext"
import { BorrowReceipt } from "@/types/borrowReceipt"
import { PurchaseReceipt } from "@/types/purchaseReceipt"
import { getBorrowReceipts, getPurchaseReceipts } from "@/utils/api/receipt"
import { useEffect, useState } from "react"

type ReceiptType = 'purchase' | 'borrow'

export default function ReceiptListPage() {
    const { user } = useUser()
    const [receiptType, setReceiptType] = useState<ReceiptType>('borrow')
    const [purchaseReceipts, setPurchaseReceipts] = useState<PurchaseReceipt[]>([])
    const [borrowReceipts, setBorrowReceipts] = useState<BorrowReceipt[]>([])

    const fetchBorrowReceipt = async () => {
        if (user?.role === "ROLE_ADMIN")
            getBorrowReceipts().then(setBorrowReceipts);
        else
            getBorrowReceipts(user?.username).then(setBorrowReceipts);
    }

    const fetchPurchaseReceipt = async () => {
        if (user?.role === "ROLE_ADMIN")
            getPurchaseReceipts().then(setPurchaseReceipts);
        else
            getPurchaseReceipts(user?.username).then(setPurchaseReceipts);
    }

    useEffect(() => {
        if (receiptType === 'borrow') fetchBorrowReceipt()
        else fetchPurchaseReceipt()
    }, [receiptType])

    return (
        <main className="p-4">
            <div>
                <button
                    onClick={() => setReceiptType('borrow')}
                    className={`px-4 py-2 ${receiptType==='borrow' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Borrow
                </button>

                <button
                    onClick={() => setReceiptType('purchase')}
                    className={`px-4 py-2 rounded ${receiptType === 'purchase' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                    Purchase
                </button>
            </div>
            {receiptType==='borrow' && borrowReceipts.length>0 && borrowReceipts.map((receipt) => (
                <BorrowReceiptCard key={receipt.id} receipt={receipt}/>
            ))}

            {receiptType==='purchase' && purchaseReceipts.length>0 && purchaseReceipts.map((receipt) => (
                <PurchaseReceiptCard key={receipt.id} receipt={receipt}/>
            ))}
        </main>
    )
}