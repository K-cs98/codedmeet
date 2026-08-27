"use client";

import React, { useState } from "react";
import { SlidersHorizontal, MapPin, ShieldCheck, DollarSign, Search, X, Check } from "lucide-react";

const PROVIDERS = [
  {
    id: "m1",
    name: "Goddess Elektra",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    role: "Pro Domme / Financial Domination",
    rate: "$350 / hr",
    distance: "1.2 km away",
    location: "Private Dungeon Studio",
    isOnline: true,
    isVerified: true,
    kinks: ["FinDom", "Chastity", "Pegging", "CBT", "Wax Play"],
  },
  {
    id: "m2",
    name: "Siren Desire",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
    role: "Fetish Model / Escort / Companionship",
    rate: "$400 / hr",
    distance: "3.5 km away",
    location: "Incall & Outcall Available",
    isOnline: true,
    isVerified: true,
    kinks: ["Roleplay", "Lingerie", "Fetish Modeling", "GFE"],
  },
  {
    id: "m3",
    name: "Master Thorne",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    role: "Sadist Top / Heavy BDSM Rigging",
    rate: "$250 / hr",
    distance: "5.0 km away",
    location: "Fully Equipped Dungeon",
    isOnline: false,
    isVerified: true,
    kinks: ["Heavy Bondage", "Shibari", "Flogging", "Electrostim"],
  },
  {
    id: "m4",
    name: "Mistress Roxy & Sub Tommy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    role: "Duo Provider / Fetish Content Creators",
    rate: "$500 / hr",
    distance: "7.8 km away",
    location: "Private Residential Studio",
    isOnline: true,
    isVerified: false,
    kinks: ["Double Domination", "Foot Worship", "Humiliation"],
  },
];

export default function DirectoryFinderPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyOnline, setOnlyOnline] = useState(false);

  const filteredProviders = PROVIDERS.filter((p) => {
    if (onlyVerified && !p.isVerified) return false;
    if (onlyOnline && !p.isOnline) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.role.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-24 space-y-6">
      {/* Search Bar & Filter Drawer Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search provider names, kinks, services (e.g. Pro Domme, Shibari, FinDom)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition"
        >
          <SlidersHorizontal className="w-4 h-4 text-pink-500" /> Filters
        </button>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div key={provider.id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-pink-500/50 transition duration-150 flex flex-col justify-between">
            <div>
              {/* Card Header & Avatar Image */}
              <div className="relative h-64 bg-slate-950">
                <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                {/* Active Indicator & Verified Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {provider.isOnline ? (
                    <span className="flex items-center gap-1.5 bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ONLINE NOW
                    </span>
                  ) : (
                    <span className="bg-slate-900/80 text-slate-400 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                      Offline
                    </span>
                  )}
                </div>

                {provider.isVerified && (
                  <div className="absolute top-3 right-3 bg-pink-950/90 border border-pink-500/50 text-pink-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED PROVIDER
                  </div>
                )}

                {/* Rates overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight flex items-center gap-1.5">
                      {provider.name}
                    </h3>
                    <p className="text-xs text-pink-400 font-medium">{provider.role}</p>
                  </div>
                  <span className="bg-pink-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-lg">
                    {provider.rate}
                  </span>
                </div>
              </div>

              {/* Location & Tags */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-pink-500" /> {provider.location}</span>
                  <span className="font-mono text-slate-300">{provider.distance}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {provider.kinks.map((kink) => (
                    <span key={kink} className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md">
                      {kink}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-4 pt-0">
              <a
                href={`/profile`}
                className="w-full bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-200 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center transition duration-150"
              >
                View Adult Profile & Book Session
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-out Filter Drawer Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-pink-500" /> Directory Filters
                </h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggles */}
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span className="text-sm font-medium text-slate-200">Verified Providers Only</span>
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="w-4 h-4 accent-pink-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                  <span className="text-sm font-medium text-slate-200">Currently Online Now</span>
                  <input
                    type="checkbox"
                    checked={onlyOnline}
                    onChange={(e) => setOnlyOnline(e.target.checked)}
                    className="w-4 h-4 accent-pink-600"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}