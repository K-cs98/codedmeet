'use client'

import Image from 'next/image'
import { MapPin, ShieldCheck } from 'lucide-react'

export interface ProviderProps {
  id: string
  name: string
  role: string
  hourlyRate: number
  distanceKm: number
  isVerified: boolean
  isActive: boolean
  avatarUrl: string
  tags: string[]
}

export function ProviderCard({ provider }: { provider: ProviderProps }) {
  return (
    <div className="relative group bg-surface border border-line rounded-xl p-5 transition-all duration-200 hover:border-crimson/50 hover:shadow-lg hover:shadow-crimson/5">
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-crimson/0 group-hover:border-crimson transition-all duration-200" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-crimson/0 group-hover:border-crimson transition-all duration-200" />

      <div className="flex items-start justify-between mb-4">
        <div className="relative w-14 h-14">
          <Image
            src={provider.avatarUrl}
            alt={provider.name}
            fill
            className="rounded-full object-cover border border-line"
            sizes="56px"
          />
          {provider.isActive && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface rounded-full z-10" />
          )}
        </div>
        <div className="text-right">
          <span className="font-mono text-lg font-bold text-ink">${provider.hourlyRate}</span>
          <span className="text-xs text-faint block">/ hr</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display font-semibold text-base text-ink group-hover:text-crimson transition-colors">
            {provider.name}
          </h3>
          {provider.isVerified && (
            <ShieldCheck className="w-4 h-4 text-indigo shrink-0" />
          )}
        </div>
        <p className="text-sm text-mute">{provider.role}</p>
      </div>

      <div className="flex items-center gap-1 text-xs text-faint mb-4">
        <MapPin className="w-3.5 h-3.5 text-faint" />
        <span>{provider.distanceKm} km away</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {provider.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2 py-0.5 rounded bg-raised text-mute border border-line/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}