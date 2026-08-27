'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { Users, MessageSquare, Plus, ShieldCheck } from 'lucide-react';

interface GroupItem {
  id: string;
  name: string;
  category: string;
  membersCount: number;
  description: string;
  isJoined: boolean;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupItem[]>([
    {
      id: '1',
      name: 'London Shibari & Kinbaku Lounge',
      category: 'Rope & Arts',
      membersCount: 1420,
      description: 'A community space dedicated to safety, education, tie-offs, and floor work techniques.',
      isJoined: true,
    },
    {
      id: '2',
      name: 'Verified Creators & Hosts Guild',
      category: 'Professional Network',
      membersCount: 380,
      description: 'Private group for platform providers to exchange hosting safety advice and monetization strategies.',
      isJoined: false,
    },
  ]);

  const toggleJoin = (id: string) => {
    setGroups(
      groups.map((g) => {
        if (g.id === id) {
          const nextState = !g.isJoined;
          return {
            ...g,
            isJoined: nextState,
            membersCount: nextState ? g.membersCount + 1 : g.membersCount - 1,
          };
        }
        return g;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Lifestyle Groups & Forums
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Join interest-based sub-communities, share discussions, and meet like-minded members.
            </p>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-pink-600/20">
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g) => (
            <div
              key={g.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
                    {g.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{g.membersCount} Members</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white mb-2">{g.name}</h2>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{g.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-1 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Group</span>
                </div>
                <button
                  onClick={() => toggleJoin(g.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                    g.isJoined
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-pink-600 hover:bg-pink-700 text-white shadow-md'
                  }`}
                >
                  {g.isJoined ? 'Joined' : 'Join Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}