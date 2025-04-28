"use client";

import { useEffect, useState } from 'react';
import { getBooks, deleteBook, Book } from '../../lib/api';
import Link from 'next/link';
import Modal from '../../components/DeleteModal'; 
import { CloseCircle, Home, Star1 } from 'iconsax-reactjs';

const renderRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <Star1 key={`full-${index}`} className="text-yellow-500" variant="Bold" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Star1 key={`empty-${index}`} className="text-gray-500" />
      ))}
    </>
  );
};

export default function LibraryPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // New: separate filteredBooks
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState<boolean>(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setAllBooks(data);        // Save full list
        setFilteredBooks(data);   // Initially, filteredBooks = allBooks
      } catch (error) {
        alert('Error fetching books.');
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filterBooks = () => {
      if (searchTerm.trim() === '') {
        setFilteredBooks(allBooks); // If no search, show all books
      } else {
        const filtered = allBooks.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
      }
    };
    filterBooks();
  }, [searchTerm, allBooks]); // Re-run filtering when searchTerm or allBooks changes

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete.id);
        setAllBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookToDelete.id));
        setIsModalVisible(false);
        setBookToDelete(null);
      } catch (error) {
        alert('Error deleting book.');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setBookToDelete(null);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className='flex gap-3 items-center'>
            <Link href="/">
              <Home size={32} />
            </Link>    
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Library 📚</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-s-100 px-4 py-2 rounded-lg w-full pr-10" // <- Add padding-right for the icon
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-s-100 hover:text-s-300"
              >
              <CloseCircle size={20} />
              </button>
            )}
        </div>


          <Link href="/addBook">
            <button className="px-4 py-2 bg-s-100 text-white rounded-lg hover:bg-s-200">Add Book</button>
          </Link>

          <button
            onClick={() => setIsGridView(!isGridView)}
            className="px-4 py-2 bg-p-100 text-white rounded-lg hover:bg-p-200"
          >
            {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
          </button>
        </div>
      </div>

      <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3" : "space-y-4"}>
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className={isGridView ? "border p-4 rounded-lg shadow hover:shadow-md transition" : "border p-4 rounded-lg shadow hover:shadow-md flex items-center gap-4"}>
              <img src={book.cover} alt={book.title} className={isGridView ? "w-full h-40 object-cover rounded mb-4" : "w-24 h-32 object-cover rounded"} />
              <div className="flex flex-col justify-between">
                <h2 className="text-lg font-semibold line-clamp-1">{book.title}</h2>
                <h3 className="text-base font-semibold text-s-100 line-clamp-1">{book.category}</h3>
                <p className="text-s-100 text-sm">{book.author}</p>
                <div className="flex items-center text-yellow-500">
                  {renderRating(book.rating)}
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/editBook/${book.id}`}>
                    <button className="px-3 py-1 text-sm border bg-p-100 text-white rounded hover:bg-p-200 min-w-20">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="px-3 py-1 text-sm border border-error-100 text-error-100 rounded hover:border-error-200 min-w-20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center text-center sm:col-span-3 lg:col-span-5">
            <img src="/assets/not found.png" alt="No results found" className="w-1/2 mx-auto" />
            <p className="mt-4 text-s-100">No books found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Modal for confirmation */}
      <Modal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        bookTitle={bookToDelete?.title || ''}
      />
    </div>
  );
}
