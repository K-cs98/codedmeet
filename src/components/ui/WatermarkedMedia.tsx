'use client';

import React from 'react';
import { usePrivacy } from '@/context/PrivacyContext';
import { useAuth } from '@/context/AuthContext';
import { EyeOff } from 'lucide-react';

interface WatermarkedMediaProps {
  src: string;
  alt: string;
  className?: string;
  isNsfw?: boolean;
}

export function WatermarkedMedia({
  src,
  alt,
  className = '',
  isNsfw = true,
}: WatermarkedMediaProps) {
  const { isStealthMode } = usePrivacy();
  const { user } = useAuth();

  const handleText = user?.name ? `@${user.name}` : 'Coded Meets Protected';

  return (
    <div className={`relative overflow-hidden group select-none ${className}`}>
      {/* Media Element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isStealthMode && isNsfw ? 'blur-xl scale-105 brightness-50' : ''
        }`}
      />

      {/* Dynamic Watermark Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25 group-hover:opacity-40 transition-opacity">
        <span className="text-white/60 font-mono text-xs font-bold rotate-[-25deg] tracking-widest whitespace-nowrap uppercase">
          {handleText} • {handleText} • {handleText}
        </span>
      </div>

      {/* Stealth Mode Indicator Overlay */}
      {isStealthMode && isNsfw && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-slate-300 text-xs gap-1 pointer-events-none">
          <EyeOff className="w-5 h-5 text-pink-400" />
          <span className="font-semibold text-[11px] uppercase tracking-wider">Stealth Mode Active</span>
        </div>
      )}
    </div>
  );
}