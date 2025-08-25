"use client"

import PurchaseReceiptDetail from "@/components/receipts/purchase/PurchaseReceiptDetail";
import { useUser } from "@/contexts/UserContext";
import { PurchaseReceipt } from "@/types/purchaseReceipt";
import { approvePurchaseReceipt, getPurchaseReceiptById, receivePurchaseReceipt } from "@/utils/api/purchaseReceipt";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PurchaseReceiptDetailPage() {
    const {id} = useParams()
    const [receipt, setReceipt] = useState<PurchaseReceipt | null>(null)
    const {user} = useUser()

    useEffect(() => {
        const fetch = async () => {
            getPurchaseReceiptById(id as string).then(setReceipt)
        }
        fetch()
    }, [])

    const handleApprove = async () => {
        try {
            setReceipt(await approvePurchaseReceipt(id as string))
            toast.success("Approve receipt successfully")
        }
        catch (err) {
            toast.error("Approve receipt failed")
        }
    }

    const handleReceive = async () => {
        try {
            setReceipt(await receivePurchaseReceipt(id as string))
            toast.success("Receive receipt successfully")
        }
        catch (err) {
            toast.error("Receive receipt failed")
        }
    }

    return (
        <>
            <PurchaseReceiptDetail receipt={receipt} />
            {user?.role==="ROLE_ADMIN" && receipt?.status==="PENDING" &&
                <button
                    onClick={handleApprove}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Approve
                </button>
            }
            {user?.role==="ROLE_READER" && receipt?.status==="APPROVED" &&
                <button
                    onClick={handleReceive}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Receive
                </button>
            }
        </>
    )
}