import BookCard from "@/components/book/BookCard"
import { PurchaseReceipt } from "@/types/purchaseReceipt"

type Props = {
  receipt: PurchaseReceipt |null
}

export default function PurchaseReceiptDetail({ receipt }: Props) {
    return (
        <div>
            <div>
          <p className="font-semibold">Create date:</p>
          <p>{receipt?.createDate}</p>
        </div>

        <div>
          <p className="font-semibold">Status:</p>
          <p>{receipt?.status}</p>
        </div>

        <div>
          <p className="font-semibold">Reader:</p>
          <p>{receipt?.reader.username}</p>
        </div>

        <div>
          <p className="font-semibold">Total price:</p>
          <p>{receipt?.totalPrice}</p>
        </div>
            <p className="font-semibold mb-2">Books:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {receipt?.purchaseReceiptBooks.map((purchaseReceiptBook, index) => (
                <div key={index} className="relative">
                <BookCard book={purchaseReceiptBook.book} />
                <span className="absolute top-2 right-2 bg-black text-white text-xs rounded px-2 py-0.5">
                    x{purchaseReceiptBook.quantity}
                </span>
                </div>
            ))}
        </div>
      </div>
    )
}