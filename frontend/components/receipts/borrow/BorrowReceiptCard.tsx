'use client'

import { BorrowReceipt } from "@/types/borrowReceipt"
import Link from "next/link"

type Props = {
  receipt: BorrowReceipt
}

export default function BorrowReceiptCard({ receipt }: Props) {

  return (
    <Link href={`/receipts/borrow/${receipt.id}`}>
    <div className="border rounded-xl shadow-md p-6 m-4 bg-white hover:bg-gray-50 space-y-4">
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="font-semibold">Reader:</p>
          <p>{receipt.reader.username}</p>
        </div>

        <div>
          <p className="font-semibold">Borrow date:</p>
          <p>{receipt.borrowDate}</p>
        </div>

        <div>
          <p className="font-semibold">Status:</p>
          <p>{receipt.status}</p>
        </div>
        <div>
          <p className="font-semibold">Total price:</p>
          <p>{receipt.totalPrice}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}
