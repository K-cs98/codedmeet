'use client';

import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';

const SUGGESTED_TAGS = [
  'Dominant',
  'Submissive',
  'Switch',
  'Rope / Shibari',
  'Impact',
  'Pet Play',
  'Sensory Deprivation',
  'Exhibitionism',
  'Voyeurism',
  'Leather',
];

export function KinkTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Switch',
    'Rope / Shibari',
  ]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center space-x-2 mb-3">
        <Tag className="w-4 h-4 text-pink-500" />
        <h3 className="text-sm font-bold text-white">Lifestyle & Kink Tags</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Select tags to display on your profile and directory listing.
      </p>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center space-x-1 text-xs font-semibold bg-pink-500/10 border border-pink-500/30 text-pink-400 px-3 py-1 rounded-full"
          >
            <span>#{tag}</span>
            <button
              onClick={() => toggleTag(tag)}
              className="hover:text-pink-200 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Suggested Chips */}
      <div className="pt-3 border-t border-slate-800/80">
        <span className="text-[11px] font-semibold text-slate-500 block mb-2 uppercase tracking-wider">
          Suggested Interests
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_TAGS.filter((t) => !selectedTags.includes(t)).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="inline-flex items-center space-x-1 text-xs bg-slate-950 border border-slate-800 text-slate-300 hover:border-pink-500/50 hover:text-white px-2.5 py-1 rounded-lg transition-colors"
            >
              <Plus className="w-3 h-3 text-slate-500" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}