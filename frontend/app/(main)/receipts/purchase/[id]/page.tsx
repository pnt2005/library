"use client"

import PurchaseReceiptDetail from "@/components/receipts/purchase/PurchaseReceiptDetail";
import { PurchaseReceipt } from "@/types/purchaseReceipt";
import { getPurchaseReceiptById } from "@/utils/api/purchaseReceipt";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PurchaseReceiptDetailPage() {
    const {id} = useParams()
    const [receipt, setReceipt] = useState<PurchaseReceipt | null>(null)

    useEffect(() => {
        const fetch = async () => {
            getPurchaseReceiptById(id as string).then(setReceipt)
        }
        fetch()
    })


    return (
        <PurchaseReceiptDetail receipt={receipt} />
    )
}