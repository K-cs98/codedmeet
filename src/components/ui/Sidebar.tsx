'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Map,
  Rss,
  MessageSquare,
  Lock,
  Calendar,
  Users,
  Compass,
} from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/', label: 'Explore Map', icon: Map },
  { href: '/feed', label: 'Feeds & Posts', icon: Rss },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/vault', label: 'Media Vault', icon: Lock },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/groups', label: 'Groups', icon: Users },
  { href: '/directory', label: 'Directory', icon: Compass },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-slate-950/90 border-r border-slate-800/80 backdrop-blur-xl p-4 z-30 justify-between">
      <div>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 px-3 py-4 mb-6 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-pink-500/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
            C
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Coded Meets
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-transparent border-l-2 border-pink-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/80 hover:border-l-2 hover:border-slate-700'
                }`}
              >
                {/* Glowing Background Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Animated Icon */}
                <Icon
                  className={`w-4 h-4 transition-all duration-300 group-hover:scale-110 ${
                    isActive
                      ? 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'
                      : 'text-slate-500 group-hover:text-pink-400 group-hover:translate-x-0.5'
                  }`}
                />

                {/* Sliding Label */}
                <span className="transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-slate-900/80">
        <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
          <span>SYSTEM ONLINE</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>
    </aside>
  );
}