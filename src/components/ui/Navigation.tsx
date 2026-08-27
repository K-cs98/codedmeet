'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

 const links = [
  { href: '/', label: 'Explore Map' },
  { href: '/feed', label: 'Feeds & Posts' },
  { href: '/messages', label: 'Messages' },
  { href: '/vault', label: 'Media Vault' },
  { href: '/events', label: 'Events' },
  { href: '/groups', label: 'Groups' },
  { href: '/directory', label: 'Directory' },
];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-pink-500 ${
              isActive ? 'text-pink-500 font-semibold' : 'text-slate-300'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}