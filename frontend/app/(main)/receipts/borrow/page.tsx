'use client'

import BorrowReceiptCard from "@/components/receipts/borrow/BorrowReceiptCard"
import { useUser } from "@/contexts/UserContext"
import { BorrowReceipt } from "@/types/borrowReceipt"
import { getBorrowReceipts } from "@/utils/api/borrowReceipt"
import { useEffect, useState } from "react"


export default function ReceiptListPage() {
    const { user } = useUser()
    const [borrowReceipts, setBorrowReceipts] = useState<BorrowReceipt[]>([])

    const fetchBorrowReceipt = async () => {
        if (user?.role === "ROLE_ADMIN")
            getBorrowReceipts().then(setBorrowReceipts);
        else
            getBorrowReceipts(user?.username).then(setBorrowReceipts);
    }

    useEffect(() => {
        fetchBorrowReceipt()
    }, [])
    

    return (
        <main className="p-4">
            {borrowReceipts.map((receipt) => (
                <BorrowReceiptCard key={receipt.id} receipt={receipt}/>
            ))}
        </main>
    )
}