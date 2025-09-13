"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api/api";
import toast from "react-hot-toast";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    author: "",
    description: "",
    isbn: "",
    publisher: "",
    category: "",
    year: "",
    image: "",
    quantity: "",
    borrowPrice: "",
    purchasePrice: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const book = {
      ...formData,
      year: parseInt(formData.year),
      quantity: parseInt(formData.quantity),
      borrowPrice: parseFloat(formData.borrowPrice),
      purchasePrice: parseFloat(formData.purchasePrice),
    };

    try {
        const res = await api.post('/books', book);
        if (res.status === 200 || res.status === 201) {
            const newBook = res.data;
            toast.success("Book added successfully");
            router.push(`/books/${newBook.id}`);
        } else {
            toast.error("Failed to add book");
        }
    } catch (err) {
      console.error(err);
      toast.error("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200";

  return (
    <div className="max-w-4xl mx-auto py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        {/* Name & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Book Title
            </label>
            <input id="name" value={formData.name} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author
            </label>
            <input id="author" value={formData.author} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea id="description" value={formData.description} onChange={handleChange} rows={3} className={inputClass} required />
        </div>

        {/* ISBN & Publisher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium mb-1">
              ISBN
            </label>
            <input id="isbn" value={formData.isbn} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="publisher" className="block text-sm font-medium mb-1">
              Publisher
            </label>
            <input id="publisher" value={formData.publisher} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        {/* Category & Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <input id="category" value={formData.category} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium mb-1">
              Year
            </label>
            <input type="number" id="year" value={formData.year} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        {/* Image & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Cover Image (URL)
            </label>
            <input id="image" value={formData.image} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
              Quantity
            </label>
            <input type="number" id="quantity" value={formData.quantity} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        {/* Borrow Price & Purchase Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="borrowPrice" className="block text-sm font-medium mb-1">
              Borrow Price
            </label>
            <input type="number" step="0.01" id="borrowPrice" value={formData.borrowPrice} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium mb-1">
              Purchase Price
            </label>
            <input type="number" step="0.01" id="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        {/* Buttons */}
        <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
        {loading ? "Saving..." : "Save Book"}
        </button>
      </form>
    </div>
  );
}
