'use client'

import ReceiptCard from "@/components/receipts/ReceiptCard"
import { useUser } from "@/contexts/UserContext"
import { Receipt } from "@/types/receipt"
import { getReceipts } from "@/utils/api/receipt"
import { useEffect, useState } from "react"

export default function ReceiptListPage() {
    const { user } = useUser()
    const [receipts, setReceipts] = useState<Receipt[]>([])

    const fetchReceipt = async () => {
        if (user?.role === "ROLE_ADMIN")
            getReceipts().then(setReceipts);
        else
            getReceipts(user?.username).then(setReceipts);
    }

    useEffect(() => {
        fetchReceipt()
    }, [])

    return (
        <main>
            {receipts.map((receipt) => (
                <ReceiptCard key={receipt.id} receipt={receipt} onRefresh={fetchReceipt}/>
            ))}
        </main>
    )
}