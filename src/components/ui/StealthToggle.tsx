'use client';

import React from 'react';
import { usePrivacy } from '@/context/PrivacyContext';
import { Eye, EyeOff } from 'lucide-react';

export function StealthToggle() {
  const { isStealthMode, toggleStealthMode } = usePrivacy();

  return (
    <button
      onClick={toggleStealthMode}
      title="Toggle Stealth / Discretion Mode"
      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
        isStealthMode
          ? 'bg-pink-500/20 border-pink-500/50 text-pink-400 animate-pulse'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
      }`}
    >
      {isStealthMode ? (
        <>
          <EyeOff className="w-3.5 h-3.5 text-pink-400" />
          <span>Stealth ON</span>
        </>
      ) : (
        <>
          <Eye className="w-3.5 h-3.5" />
          <span>Stealth OFF</span>
        </>
      )}
    </button>
  );
}