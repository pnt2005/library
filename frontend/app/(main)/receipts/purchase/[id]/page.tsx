"use client"

import PurchaseReceiptDetail from "@/components/receipts/purchase/PurchaseReceiptDetail";
import { useUser } from "@/contexts/UserContext";
import { useCartStore } from "@/store/cartStore";
import { PurchaseReceipt } from "@/types/purchaseReceipt";
import { api } from "@/utils/api/api";
import { approvePurchaseReceipt, getPurchaseReceiptById, receivePurchaseReceipt } from "@/utils/api/purchaseReceipt";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PurchaseReceiptDetailPage() {
    const {id} = useParams()
    const [receipt, setReceipt] = useState<PurchaseReceipt | null>(null)
    const {user, setUser} = useUser()
    const clearCart = useCartStore((state) => state.clearCart)
    const searchParams = useSearchParams()
    const check = searchParams.get("check") 

    useEffect(() => {
        const fetch = async () => {
            getPurchaseReceiptById(id as string).then(setReceipt)
        }
        fetch()
        if (check) {
        toast.success('Books bought successfully')
        api
              .get('/auth/me')
              .then((res) => setUser(res.data))
        clearCart()
    }
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
        <div className="m-4">
            <PurchaseReceiptDetail receipt={receipt} />
        
            {user?.role==="ROLE_READER" && receipt?.status==="PAID" &&
                <button
                    onClick={handleReceive}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Receive
                </button>
            }
        </div>
    )
}