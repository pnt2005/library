import BookCard from "@/components/book/BookCard"
import { PurchaseReceipt } from "@/types/purchaseReceipt"

type Props = {
  receipt: PurchaseReceipt | null
}

export default function PurchaseReceiptDetail({ receipt }: Props) {
  return (
    <div className="space-y-6">
      {/* Thông tin chính */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded shadow-sm">
        <div>
          <p className="font-semibold text-gray-700">Create date</p>
          <p className="text-gray-600">{receipt?.createDate}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Status</p>
          <p className="text-gray-600">{receipt?.status}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Reader</p>
          <p className="text-gray-600">{receipt?.reader.username}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Total price</p>
          <p className="text-gray-600">${receipt?.totalPrice}</p>
        </div>
      </div>

      {/* Danh sách sách */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">Books</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {receipt?.purchaseReceiptBooks.map((item, index) => (
            <div key={index} className="relative">
              <BookCard book={item.book} />
              <span className="absolute top-2 right-2 bg-black text-white text-xs rounded px-2 py-0.5">
                x{item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
