import BookCard from "@/components/book/BookCard"
import { BorrowReceipt } from "@/types/borrowReceipt"

type Props = {
  receipt: BorrowReceipt | null
}

export default function BorrowReceiptDetail({ receipt }: Props) {
    return (
        <>
        <div className="grid md:grid-cols-5 gap-1 p-4 bg-gray-50 rounded shadow-sm">
          <div>
            <p className="font-semibold">Reader:</p>
            <p>{receipt?.reader.username}</p>
          </div>
          <div>
            <p className="font-semibold">Borrow date:</p>
            <p>{receipt?.borrowDate}</p>
          </div>
          <div>
            <p className="font-semibold">Return date:</p>
            <p>{receipt?.returnDate}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p>{receipt?.status}</p>
          </div>
          <div>
            <p className="font-semibold">Total price:</p>
            <p>{receipt?.totalPrice}$</p>
          </div>
        </div>
            <p className="font-semibold my-2">Books:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {receipt?.borrowReceiptBooks.map((borrowReceiptBook, index) => (
                <div key={index} className="relative">
                <BookCard book={borrowReceiptBook.book} />
                <span className="absolute top-2 right-2 bg-black text-white text-xs rounded px-2 py-0.5">
                    x{borrowReceiptBook.quantity}
                </span>
                </div>
            ))}
            </div>
        </>
    )
}