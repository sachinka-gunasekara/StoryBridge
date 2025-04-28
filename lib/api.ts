import axios from 'axios';

export type Book = {
  id: number;
  title: string;
  category: string;
  author: string;
  rating: number;
  cover: string;
};

const API_URL = 'http://localhost:3001/books';

// Get all books
export async function getBooks(): Promise<Book[]> {
  const res = await axios.get<Book[]>(API_URL);
  return res.data;
}

// Get a single book by ID
export async function getBookById(id: number): Promise<Book> {
  const res = await axios.get<Book>(`${API_URL}/${id}`);
  return res.data;
}

// Add a new book
export async function addBook(book: Omit<Book, 'id'>): Promise<Book> {
  const res = await axios.post<Book>(API_URL, book);
  return res.data;
}

// Update a book
export async function updateBook(id: number, book: Omit<Book, 'id'>): Promise<Book> {
  const res = await axios.put<Book>(`${API_URL}/${id}`, book);
  return res.data;
}

// Delete a book
export async function deleteBook(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
