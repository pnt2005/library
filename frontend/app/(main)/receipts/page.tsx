'use client'

import ReceiptCard from "@/components/receipts/ReceiptCard"
import { Receipt } from "@/types/receipt"
import { getReceipts } from "@/utils/api/receipt"
import { useEffect, useState } from "react"

export default function ReceiptListPage() {
    const [receipts, setReceipts] = useState<Receipt[]>([])

    useEffect(() => {
        getReceipts().then(setReceipts);
    }, [])

    return (
        <main>
            {receipts.map((receipt) => (
                <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
        </main>
    )
}