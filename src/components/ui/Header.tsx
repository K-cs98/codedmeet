'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { StealthToggle } from './StealthToggle';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from './Sidebar';
import { usePathname } from 'next/navigation';

export function Header() {
  const { user, openAuthModal, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Mobile-Only Logo & Navigation Toggle */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="font-extrabold text-lg bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
            Coded Meets
          </Link>
        </div>

        {/* Desktop Title Indicator / Breadcrumb Spacer */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="tracking-widest uppercase">SECURE SESSION</span>
        </div>

        {/* Far-Right Controls: Stealth, Role Selector, Auth */}
        <div className="flex items-center space-x-3">
          <StealthToggle />

          {user ? (
            <div className="flex items-center space-x-2.5">
              <select
                value={user.role}
                onChange={(e) => switchRole(e.target.value as any)}
                className="bg-slate-900/90 border border-slate-800 text-xs font-semibold text-pink-400 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-500/50 cursor-pointer transition-colors"
              >
                <option value="USER">ROLE: USER</option>
                <option value="VERIFIED_HOST">ROLE: HOST</option>
                <option value="VERIFIED_PROVIDER">ROLE: PROVIDER</option>
                <option value="ADMIN">ROLE: ADMIN</option>
              </select>

              <button
                onClick={logout}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3.5 py-2 rounded-xl border border-slate-800 hover:bg-slate-900"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              <button
                onClick={openAuthModal}
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
              >
                Sign In
              </button>
              <button
                onClick={openAuthModal}
                className="text-xs font-semibold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:scale-[1.02]"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl p-4 space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/10 text-pink-400 border-l-2 border-pink-500'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-pink-500" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}