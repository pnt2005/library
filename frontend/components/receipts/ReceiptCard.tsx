'use client'

import { Receipt } from "@/types/receipt"
import BookCard from "../book/BookCard"
import { useUser } from "@/contexts/UserContext"
import { acceptReceipt, returnBooks } from "@/utils/api/receipt"
import toast from "react-hot-toast"

type Props = {
  receipt: Receipt
  onRefresh: () => void
}

export default function ReceiptCard({ receipt, onRefresh }: Props) {
  const { user } = useUser()
  const handleButton = async () => {
    if (receipt.status === 'ACCEPTED')
      try {
          await returnBooks(receipt.id)
          toast.success('Books returned successfully')
          onRefresh()
      }
      catch (err) {
          toast.error('Failed to return books')
      }
    else
      try {
          await acceptReceipt(receipt.id)
          toast.success('Accept receipt successfully')
          onRefresh()
      }
      catch (err) {
          toast.error('Failed to accept receipt')
      }
  }

  return (
    <div className="border rounded-xl shadow-md p-6 m-4 bg-white hover:bg-gray-50 space-y-4">
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="font-semibold">Create date:</p>
          <p>{receipt.createDate}</p>
        </div>

        <div>
          <p className="font-semibold">Borrow date:</p>
          <p>{receipt.borrowDate}</p>
        </div>

        <div>
          <p className="font-semibold">Return date:</p>
          <p>{receipt.returnDate}</p>
        </div>

        <div>
          <p className="font-semibold">Status:</p>
          <p>{receipt.status}</p>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Books:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {receipt.borrowReceiptBooks.map((borrowReceiptBook, index) => (
            <div key={index} className="relative">
              <BookCard book={borrowReceiptBook.book} />
              <span className="absolute top-2 right-2 bg-black text-white text-xs rounded px-2 py-0.5">
                x{borrowReceiptBook.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {user?.role==='ROLE_ADMIN' && 
      receipt.status!=='RETURNED' && 
      <button
          onClick={handleButton}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {receipt.status === 'ACCEPTED' ? 'Return' : 'Accept'}
      </button>
      }
    </div>
  )
}
