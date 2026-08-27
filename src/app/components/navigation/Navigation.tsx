"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Search, User, MessageSquare, ShieldAlert } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Explore Feed", href: "/feed", icon: Flame },
    { label: "Directory", href: "/directory", icon: Search },
    { label: "Profile", href: "/profile", icon: User },
    { label: "Inbox", href: "/inbox", icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Desktop Glassmorphic Header */}
      <header className="sticky top-0 z-40 glass-header border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
        <Link href="/feed" className="flex items-center gap-2 font-black text-lg tracking-wider text-white">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/30">
            🔥
          </span>
          FIELDWORK <span className="text-pink-500 text-xs font-mono font-bold bg-pink-950/80 px-2 py-0.5 rounded border border-pink-500/30">18+ ADULT</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  isActive ? "bg-pink-600 text-white shadow-md shadow-pink-600/20" : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Mobile Bottom Fixed Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-header border-t border-slate-800 py-2 px-6 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition ${
                isActive ? "text-pink-500" : "text-slate-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}