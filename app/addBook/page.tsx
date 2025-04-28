"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBook } from '../../lib/api'; 
import Link from 'next/link';
import { ArrowLeft } from 'iconsax-reactjs';

interface Book {
  title: string;
  category: string;
  author: string;
  cover: string;
  rating: number | string;
}

export default function AddBookPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Book>({
    title: '',
    category: '',
    author: '',
    cover: '',
    rating: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.cover.trim()) newErrors.cover = 'Cover URL is required';
    if (!formData.rating.toString().trim()) newErrors.rating = 'Rating is required';
    else if (isNaN(Number(formData.rating)) || Number(formData.rating) < 1 || Number(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await addBook({
        ...formData,
        rating: Number(formData.rating),
      });
      router.push('/library');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link href="/library" className="flex gap-2 mb-5 cursor-pointer">
        <ArrowLeft size="24" className="text-s-200" />
        <h1 className="text-s-200">Back</h1>
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded p-6">
        <h1 className="text-2xl font-bold mb-6 text-s-300">Add New Book 📚</h1>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1 text-s-300">Title</label>
          <input
            type="text"
            placeholder='Enter the book title...'
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
            }}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.title && <p className="text-error-100 text-sm">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1 text-s-300">Category</label>
          <input
            type="text"
            placeholder='Enter the book category...'
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
            }}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.category && <p className="text-error-100 text-sm">{errors.category}</p>}
        </div>

        {/* Author */}
        <div>
          <label className="block font-semibold mb-1 text-s-300">Author</label>
          <input
            type="text"
            placeholder='Enter the author name...'
            value={formData.author}
            onChange={(e) => {
              setFormData({ ...formData, author: e.target.value });
              if (errors.author) setErrors(prev => ({ ...prev, author: '' }));
            }}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.author && <p className="text-error-100 text-sm">{errors.author}</p>}
        </div>

        {/* Cover URL */}
        <div>
          <label className="block font-semibold mb-1 text-s-300">Cover Image URL</label>
          <input
            type="text"
            placeholder='Enter cover image url...'
            value={formData.cover}
            onChange={(e) => {
              setFormData({ ...formData, cover: e.target.value });
              if (errors.cover) setErrors(prev => ({ ...prev, cover: '' }));
            }}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.cover && <p className="text-error-100 text-sm">{errors.cover}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="block font-semibold mb-1 text-s-300">Rating (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={formData.rating}
            onChange={(e) => {
              setFormData({ ...formData, rating: e.target.value });
              if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
            }}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {errors.rating && <p className="text-error-100 text-sm">{errors.rating}</p>}
        </div>

        <div className='flex gap-3'>
          <Link href="/library" className='w-full'>
            <button
                type="button"
                className="w-full border border-s-100 text-s-100 py-2 rounded-lg hover:border-s-200"
              >
                Cancel
            </button>
          </Link>

          <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-p-100 text-white py-2 rounded-lg hover:bg-p-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
        </div>
       
      </form>
    </div>
  );
}
