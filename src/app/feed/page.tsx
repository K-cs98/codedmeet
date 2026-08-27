'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/ui/Header';

interface PostItem {
  id: string;
  content: string;
  mediaUrl?: string | null;
  isPaywalled: boolean;
  price?: number | null;
  createdAt: string;
  author: {
    name: string;
    role: string;
  };
  _count?: {
    likes: number;
    comments: number;
  };
}

export default function FeedPage() {
  const { user, openAuthModal } = useAuth();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isPaywalled, setIsPaywalled] = useState(false);
  const [price, setPrice] = useState('5.00');

  useEffect(() => {
    fetch('/api/feed')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => console.log('Using local state fallback'));
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal();
      return;
    }
    if (!content.trim()) return;

    const newPost: PostItem = {
      id: Date.now().toString(),
      content,
      mediaUrl: mediaUrl || null,
      isPaywalled,
      price: isPaywalled ? parseFloat(price) : 0,
      createdAt: 'Just now',
      author: {
        name: user.name,
        role: user.role,
      },
      _count: { likes: 0, comments: 0 },
    };

    setPosts([newPost, ...posts]);
    setContent('');
    setMediaUrl('');
    setIsPaywalled(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Community Feed
        </h1>

        {/* Post Composer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 shadow-xl">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={user ? `Share an update or teaser...` : 'Sign in to create a post...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500 resize-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Media URL (Image or Video link)"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
              />

              <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPaywalled}
                    onChange={(e) => setIsPaywalled(e.target.checked)}
                    className="accent-pink-500 rounded"
                  />
                  <span>Paywall Post</span>
                </label>

                {isPaywalled && (
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-pink-400 focus:outline-none"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500">
                {user ? `Posting as ${user.role}` : 'Guest Mode'}
              </span>
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-pink-600/20"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>

        {/* Live Feed Stream */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-white">{post.author.name}</h3>
                  <span className="text-[10px] text-pink-400 font-mono uppercase bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                    {post.author.role}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{post.createdAt}</span>
              </div>

              <p className="text-sm text-slate-300 mb-4 leading-relaxed">{post.content}</p>

              {/* Paywall Overlay vs Media Content */}
              {post.isPaywalled ? (
                <div className="bg-slate-950 border border-pink-500/30 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="text-pink-500 text-2xl mb-1">🔒</div>
                  <h4 className="text-sm font-bold text-white">Locked Premium Content</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Unlock full media access for ${post.price?.toFixed(2)}
                  </p>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors">
                    Unlock Post (${post.price?.toFixed(2)})
                  </button>
                </div>
              ) : post.mediaUrl ? (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-black max-h-96 flex items-center justify-center">
                  <img
                    src={post.mediaUrl}
                    alt="Post attachment"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              {/* Like & Comment Bar */}
              <div className="flex items-center space-x-6 mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                <button className="hover:text-pink-500 flex items-center space-x-1.5 transition-colors">
                  <span>❤️</span>
                  <span>{post._count?.likes || 0} Likes</span>
                </button>
                <button className="hover:text-pink-500 flex items-center space-x-1.5 transition-colors">
                  <span>💬</span>
                  <span>{post._count?.comments || 0} Comments</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}