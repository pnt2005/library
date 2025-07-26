// components/BookCard.tsx
import { Book } from '@/types/book';


export default function BookCard({ book }: {book: Book}) {
  return (
    <div className="border rounded p-4 shadow">
      <img src={book.image} alt={book.name} className="w-full h-40 object-cover mb-2 rounded" />
      <h2 className="text-lg font-semibold">{book.name}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-500">{book.description}</p>
    </div>
  );
}
