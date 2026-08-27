'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { openAuthModal } = useAuth();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Coded Meets
        </span>
      </h1>

      <p className="max-w-2xl text-slate-400 text-lg sm:text-xl mb-10 leading-relaxed">
        Connect, explore local provider listings, browse nearby maps, and share updates in our community feed.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/feed"
          className="px-6 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-pink-600/30 text-sm"
        >
          Explore Feeds & Posts
        </Link>

        <Link
          href="/directory"
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold rounded-xl transition-all text-sm"
        >
          View Directory
        </Link>

        <button
          onClick={openAuthModal}
          className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all shadow-lg text-sm"
        >
          Sign In / Register
        </button>
      </div>
    </main>
  );
}