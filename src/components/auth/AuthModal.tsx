'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Sparkles, X } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Instant/Fast local login trigger
    setTimeout(() => {
      setLoading(false);
      login('USER');
      closeAuthModal();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Background GPU-Accelerated Seductive Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-600/30 to-purple-800/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-80 h-80 bg-rose-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="relative w-full max-w-md bg-slate-950/80 border border-pink-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(236,72,153,0.15)] backdrop-blur-2xl transition-all duration-300 animate-[fadeInUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-500 hover:text-white text-xs p-2 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 mb-3 shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-400 mt-1">Enter your credentials to enter Coded Meets</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Email / Handle
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/50 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Key / Passcode
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/50 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-600 outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition-all duration-300 shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 rounded-xl transition-all duration-300 group-hover:scale-105" />
            <span className="relative block bg-slate-950/40 rounded-xl px-4 py-3.5 text-white font-bold transition-colors group-hover:bg-transparent">
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Unlocking...</span>
                </span>
              ) : (
                'Enter Platform'
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}