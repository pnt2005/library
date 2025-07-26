export type Book = {
  id: string;
  name: string;
  author: string;
  description: string;
  isbn: string;
  year: number;
  quantity: number;
  price?: number; 
  image?: string;
  category?: string[];
  publisher: string;
};
