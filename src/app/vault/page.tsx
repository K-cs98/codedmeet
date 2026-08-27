'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/ui/Header';
import { Lock, Unlock, Plus, Trash2, DollarSign } from 'lucide-react';

interface VaultItem {
  id: string;
  title: string;
  mediaUrl: string;
  isLocked: boolean;
  price: number;
  type: 'image' | 'video';
  createdAt: string;
}

export default function MediaVaultPage() {
  const { user, openAuthModal } = useAuth();
  const [items, setItems] = useState<VaultItem[]>([
    {
      id: '1',
      title: 'Exclusive Photoshoot Set #1',
      mediaUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
      isLocked: true,
      price: 15.0,
      type: 'image',
      createdAt: '2 days ago',
    },
    {
      id: '2',
      title: 'Behind the Scenes Teaser',
      mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
      isLocked: false,
      price: 0.0,
      type: 'image',
      createdAt: '1 week ago',
    },
  ]);

  const [title, setTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [price, setPrice] = useState('10.00');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal();
      return;
    }
    if (!title || !mediaUrl) return;

    const newItem: VaultItem = {
      id: Date.now().toString(),
      title,
      mediaUrl,
      isLocked,
      price: isLocked ? parseFloat(price) : 0,
      type: 'image',
      createdAt: 'Just now',
    };

    setItems([newItem, ...items]);
    setTitle('');
    setMediaUrl('');
    setIsLocked(true);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Creator Media Vault
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Store, price, and manage your media assets before posting or sending in DMs.
            </p>
          </div>
          <span className="text-xs text-pink-400 font-mono bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 rounded-lg">
            Total Vault Assets: {items.length}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Asset Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit shadow-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-pink-500" />
              <span>Add New Asset</span>
            </h2>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Asset Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. VIP Teaser Set"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Media Source URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 rounded-xl p-3">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLocked}
                    onChange={(e) => setIsLocked(e.target.checked)}
                    className="accent-pink-500 rounded"
                  />
                  <span>Lock Content (PPV)</span>
                </label>

                {isLocked && (
                  <div className="flex items-center bg-slate-900 border border-slate-700 rounded px-2 py-1 ml-auto">
                    <DollarSign className="w-3 h-3 text-pink-400 mr-1" />
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-16 bg-transparent text-xs text-pink-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs py-3 rounded-xl transition-colors shadow-lg shadow-pink-600/20"
              >
                Upload to Vault
              </button>
            </form>
          </div>

          {/* Asset Gallery Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col group relative"
              >
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {item.isLocked ? (
                      <span className="bg-slate-950/80 border border-pink-500/40 text-pink-400 text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 backdrop-blur-md">
                        <Lock className="w-3 h-3" />
                        <span>${item.price.toFixed(2)}</span>
                      </span>
                    ) : (
                      <span className="bg-slate-950/80 border border-emerald-500/40 text-emerald-400 text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 backdrop-blur-md">
                        <Unlock className="w-3 h-3" />
                        <span>Free</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-sm text-white mb-1">{item.title}</h3>
                    <p className="text-[10px] text-slate-500">{item.createdAt}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-rose-500 hover:text-rose-400 flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                    <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg transition-colors">
                      Attach to Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}