'use client'

import Link from "next/link"; // ✅ Correct
import { usePathname } from 'next/navigation'
import { Aperture, LayoutGrid, MapPin, UserCircle, MessageCircle } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Explore Feed', href: '/', icon: LayoutGrid },
  { label: 'Provider Directory', href: '/directory', icon: MapPin },
  { label: 'Profile', href: '/profile', icon: UserCircle },
  { label: 'Messages', href: '/messages', icon: MessageCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-line px-5 py-6 sticky top-0 h-screen bg-base">
      <div className="flex items-center gap-2.5 px-1 mb-8">
        <div className="w-8 h-8 rounded-md bg-crimson flex items-center justify-center shrink-0">
          <Aperture className="w-4 h-4 text-base" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-ink">Fieldwork</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-raised text-ink'
                  : 'text-faint hover:text-mute hover:bg-raised/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-crimson' : 'text-faint'}`} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}