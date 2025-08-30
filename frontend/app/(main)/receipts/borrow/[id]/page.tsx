"use client"

import BorrowReceiptDetail from "@/components/receipts/borrow/BorrowReceiptDetail";
import { useUser } from "@/contexts/UserContext";
import { BorrowReceipt } from "@/types/borrowReceipt";
import { getBorrowReceiptById, renewBorrowReceipt, returnBooks } from "@/utils/api/borrowReceipt";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BorrowReceiptDetailPage() {
    const {id} = useParams()
    const [receipt, setReceipt] = useState<BorrowReceipt | null>(null)
    const {user} = useUser()

    useEffect(() => {
        const fetch = async () => {
            getBorrowReceiptById(id as string).then(setReceipt)
        }
        fetch()
    }, [])

    const handleReturn = async() => {
        try {
            setReceipt(await returnBooks(id as string))
            toast.success('Return book successfully')
        }
        catch (err) {
            toast.error('Return books failed')
        }
    }

    const handleRenew = async() => {
        try {
            setReceipt(await renewBorrowReceipt(id as string))
            toast.success('Extend borrow date successfully')
        }
        catch (err) {
            toast.error('Extend borrow date failed')
        }
    }

    return (
        <div className="m-4">
            <BorrowReceiptDetail receipt={receipt} />
            {user?.role==="ROLE_ADMIN" && receipt?.status==="BORROWING" && 
                <button
                    onClick={handleReturn}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Return
                </button>
            }
            {user?.role==="ROLE_READER" && receipt?.status==="BORROWING" && 
                <button
                    onClick={handleRenew}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Extend borrow date
                </button>
            }
        </div>
    )
}