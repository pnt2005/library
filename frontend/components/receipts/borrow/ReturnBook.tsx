import { returnBooks } from "@/utils/api/borrowReceipt"
import toast from "react-hot-toast"

export default function ReturnBook({receiptId}: {receiptId: string}) {
    const handleReturn = async() => {
        try {
            await returnBooks(receiptId)
            toast.success('Return book successfully')
        }
        catch (err) {
            toast.error('Return books failed')
        }
    }

    return (
        <button
            onClick={handleReturn}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
            Return
        </button>
    )
}