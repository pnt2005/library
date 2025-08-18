'use client'

import PurchaseReceiptCard from "@/components/receipts/purchase/PurchaseReceiptCard"
import { useUser } from "@/contexts/UserContext"
import { PurchaseReceipt } from "@/types/purchaseReceipt"
import { getPurchaseReceipts } from "@/utils/api/purchaseReceipt"
import { useEffect, useState } from "react"


export default function ReceiptListPage() {
    const { user } = useUser()
    const [purchaseReceipts, setPurchaseReceipts] = useState<PurchaseReceipt[]>([])

    const fetchPurchaseReceipt = async () => {
        if (user?.role === "ROLE_ADMIN")
            getPurchaseReceipts().then(setPurchaseReceipts);
        else
            getPurchaseReceipts(user?.username).then(setPurchaseReceipts);
    }

    useEffect(() => {
        fetchPurchaseReceipt()
    }, [])

    return (
        <main className="p-4">
            {purchaseReceipts.length>0 && purchaseReceipts.map((receipt) => (
                <PurchaseReceiptCard key={receipt.id} receipt={receipt}/>
            ))}
        </main>
    )
}