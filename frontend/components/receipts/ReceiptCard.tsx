'use client'

import { Receipt } from "@/types/receipt"

type Props = {
  receipt: Receipt
}

export default function ReceiptCard({ receipt }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:bg-gray-50">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Mã phiếu:</span>
        <span>{receipt.id}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Người mượn:</span>
        <span>{receipt.reader}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Ngày mượn:</span>
        <span>{receipt.borrowDate}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Hạn trả:</span>
        <span>{receipt.returnDate}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Trạng thái:</span>
        <span
          className={`font-bold ${
            receipt.status === 'RETURNED' ? 'text-green-600' : 'text-orange-500'
          }`}
        >
          {receipt.status === 'RETURNED' ? 'Đã trả' : 'Chưa trả'}
        </span>
      </div>

      <div>
        <p className="font-semibold mb-1">Books:</p>
        <ul className="list-disc list-inside">
          {receipt.borrowReceiptBooks.map((book, index) => (
            <li key={index}>
              {book.name} ({book.quantity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
