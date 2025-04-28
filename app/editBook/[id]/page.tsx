/* eslint-disable @next/next/no-async-client-component */
'use client';

import { useState, useEffect } from 'react';
import { updateBook, getBookById } from '../../../lib/api';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'iconsax-reactjs';
import React from 'react';

export default function EditBookPage({ params }: { params: { id: string } }) {
  const bookId = React.use(params).id; // Proper way to unwrap params

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    cover: '',
    rating: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [redirectNow, setRedirectNow] = useState(false);

  useEffect(() => {
    getBookById(bookId).then(book => {
      if (book) {
        setFormData({
          title: book.title || '',
          category: book.category || '',
          author: book.author || '',
          cover: book.cover || '',
          rating: book.rating?.toString() || '',
        });
      }
    });
  }, [bookId]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.cover.trim()) newErrors.cover = 'Cover Image URL is required';
    if (!formData.rating.trim()) newErrors.rating = 'Rating is required';
    else if (isNaN(Number(formData.rating)) || Number(formData.rating) < 1 || Number(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await updateBook(bookId, { 
        ...formData,
        rating: Number(formData.rating),
      });

      setRedirectNow(true);
    } catch (error) {
      console.error(error);
      alert('Error updating book.');
    }
  };

  if (redirectNow) {
    redirect('/library');
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link href="/library" className="flex gap-2 mb-5 cursor-pointer">
        <ArrowLeft size="24" className="text-s-200" />
        <h1 className="text-s-200">Back</h1>
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded mx-auto my-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-s-300">Edit Book ✏️</h1>

        {/* Form fields stay same */}
        {['title', 'category', 'author', 'cover', 'rating'].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 capitalize">{field === 'cover' ? 'Cover Image URL' : field}</label>
            <input
              type={field === 'rating' ? 'number' : 'text'}
              min={1}
              max={5}
              value={(formData as any)[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg text-s-300"
            />
            {errors[field] && <p className="text-error-100 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <div className='flex gap-3'>
              <Link href="/library" className='w-full'>
                  <button
                      type="button"
                      className="w-full border border-s-100 text-p-text py-2 rounded-lg hover:border-s-200"
                    >
                      Cancel
                    </button>
              </Link>
              <button
                type="submit"
                className="w-full bg-p-100 text-white py-2 rounded-lg hover:bg-p-200"
              >
                Save Changes
            </button>
        </div>

      </form>
    </div>
  );
}
