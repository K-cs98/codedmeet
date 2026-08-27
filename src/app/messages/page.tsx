'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { WatermarkedMedia } from '@/components/ui/WatermarkedMedia';
import { Send, Lock, Unlock, Image as ImageIcon, DollarSign, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text?: string;
  mediaUrl?: string;
  isLocked?: boolean;
  price?: number;
  isUnlocked?: boolean;
  timestamp: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'them',
      text: 'Hey! Thanks for joining my fan tier. Here is a private set for you.',
      timestamp: '2:15 PM',
    },
    {
      id: '2',
      sender: 'them',
      mediaUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
      isLocked: true,
      price: 10.0,
      isUnlocked: false,
      timestamp: '2:16 PM',
    },
  ]);

  const [input, setInput] = useState('');
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [attachUrl, setAttachUrl] = useState('');
  const [attachPrice, setAttachPrice] = useState('5.00');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'me',
        text: input,
        timestamp: 'Just now',
      },
    ]);
    setInput('');
  };

  const sendLockedAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachUrl) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'me',
        mediaUrl: attachUrl,
        isLocked: true,
        price: parseFloat(attachPrice),
        isUnlocked: false,
        timestamp: 'Just now',
      },
    ]);

    setAttachUrl('');
    setShowAttachModal(false);
  };

  const unlockMedia = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, isUnlocked: true } : msg
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl min-h-[600px]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold text-sm">
                AV
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Alex Vance</h2>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  <span>Online • Verified Host</span>
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'me' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-sm rounded-2xl p-3.5 ${
                    msg.sender === 'me'
                      ? 'bg-pink-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}
                >
                  {msg.text && <p className="text-xs leading-relaxed">{msg.text}</p>}

                  {/* PPV Media Attachment */}
                  {msg.mediaUrl && (
                    <div className="mt-2 rounded-xl overflow-hidden relative border border-slate-700">
                      {msg.isLocked && !msg.isUnlocked ? (
                        <div className="relative h-48 w-full bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
                          <Lock className="w-8 h-8 text-pink-500 mb-2 animate-bounce" />
                          <p className="text-xs font-semibold text-white mb-1">
                            Pay-Per-View Content
                          </p>
                          <p className="text-[10px] text-slate-400 mb-3">
                            Unlock this attachment for ${msg.price?.toFixed(2)}
                          </p>
                          <button
                            onClick={() => unlockMedia(msg.id)}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md flex items-center space-x-1.5"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Unlock for ${msg.price?.toFixed(2)}</span>
                          </button>
                        </div>
                      ) : (
                        <WatermarkedMedia
                          src={msg.mediaUrl}
                          alt="Message Media"
                          className="w-full h-48"
                        />
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1 flex items-center space-x-1">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-pink-500" />}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={sendMessage}
            className="p-3 border-t border-slate-800 bg-slate-950/50 flex items-center space-x-2"
          >
            <button
              type="button"
              onClick={() => setShowAttachModal(true)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Attach PPV Media"
            >
              <ImageIcon className="w-4 h-4 text-pink-400" />
            </button>

            <input
              type="text"
              placeholder="Send a private message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
            />

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-pink-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Attach Locked Media Overlay */}
      {showAttachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setShowAttachModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-white mb-4">Attach Locked PPV Media</h3>

            <form onSubmit={sendLockedAttachment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Media Source URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={attachUrl}
                  onChange={(e) => setAttachUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Unlock Price ($)
                </label>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                  <DollarSign className="w-4 h-4 text-pink-400 mr-1" />
                  <input
                    type="number"
                    step="0.01"
                    value={attachPrice}
                    onChange={(e) => setAttachPrice(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs py-3 rounded-xl transition-colors shadow-lg shadow-pink-600/20"
              >
                Send Locked Media
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}