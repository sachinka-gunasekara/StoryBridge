"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import backgroundImage from '../public/assets/library_background.jpg'; // Path to your image

export default function HomePage() {
  return (
    <div className="flex items-center justify-center gap-10 min-h-screen bg-white sm:flex-row flex-col sm:p-16 p-4">
      <div className="sm:w-1/3 sm:text-justify text-center">
        <h1 className="text-4xl font-bold text-s-300">Welcome to Our Library</h1>
        <p className="mt-4 text-lg text-s-100">
          Explore a vast collection of books and resources to enhance your knowledge.
        </p>
        <Link href="/library">
          <button className="mt-6 px-6 py-3 bg-p-100 text-white rounded-md hover:bg-p-200-hover">
            Go to Library
          </button>
        </Link>
      </div>

      <div className="sm:w-2/3 h-full">
        <Image 
          src={backgroundImage} 
          alt="Library background"
          className="rounded" 
        />
      </div>
    </div>
  );
}
