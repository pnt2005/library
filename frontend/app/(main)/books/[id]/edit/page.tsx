"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Book } from "@/types/book";
import { getBookById, updateBook } from "@/utils/api/book";
import toast from "react-hot-toast";


export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current book
    useEffect(() => {
        if (!id) return;
        getBookById(id as string).then(setBook).catch(console.error).finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!book) return;

        try {
            await updateBook(id as string, book);
            toast.success("Book updated successfully!");
            router.push(`/books/${id}`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update book");
        }
    };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!book) return <p className="p-6">Book not found</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        {/* ISBN & Publisher */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">ISBN</label>
            <input
              type="text"
              value={book.isbn}
              onChange={(e) => setBook({ ...book, isbn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Publisher</label>
            <input
              type="text"
              value={book.publisher}
              onChange={(e) => setBook({ ...book, publisher: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Category, Year, Quantity */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              value={book.category}
              onChange={(e) => setBook({ ...book, category: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              type="number"
              value={book.year}
              onChange={(e) =>
                setBook({ ...book, year: parseInt(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              value={book.quantity}
              onChange={(e) =>
                setBook({ ...book, quantity: parseInt(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            value={book.image}
            onChange={(e) => setBook({ ...book, image: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Borrow Price</label>
            <input
              type="number"
              step="0.01"
              value={book.borrowPrice}
              onChange={(e) =>
                setBook({ ...book, borrowPrice: parseFloat(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Purchase Price</label>
            <input
              type="number"
              step="0.01"
              value={book.purchasePrice}
              onChange={(e) =>
                setBook({ ...book, purchasePrice: parseFloat(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push(`/books/${id}`)}
            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
