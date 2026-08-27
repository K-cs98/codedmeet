'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { Calendar, MapPin, Users, Plus, CheckCircle2 } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  location: string;
  date: string;
  organizer: string;
  category: string;
  attendeesCount: number;
  isAttending: boolean;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: '1',
      title: 'London Central Lifestyle Social & Munt',
      location: 'Soho, London',
      date: 'Sat, Sep 12 • 7:00 PM',
      organizer: 'Alex Vance',
      category: 'Social / Munt',
      attendeesCount: 34,
      isAttending: false,
      description: 'A relaxed, discreet social gathering for local members to chat, network, and introduce newcomers.',
    },
    {
      id: '2',
      title: 'Rope Bondage & Safety Workshop',
      location: 'Shoreditch Studio, London',
      date: 'Fri, Sep 18 • 8:30 PM',
      organizer: 'Kink Lab UK',
      category: 'Workshop',
      attendeesCount: 18,
      isAttending: true,
      description: 'An introductory safety and friction knot tutorial hosted by verified community educators.',
    },
  ]);

  const toggleRSVP = (id: string) => {
    setEvents(
      events.map((ev) => {
        if (ev.id === id) {
          const nextState = !ev.isAttending;
          return {
            ...ev,
            isAttending: nextState,
            attendeesCount: nextState ? ev.attendeesCount + 1 : ev.attendeesCount - 1,
          };
        }
        return ev;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Local Events & Munts
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Find community socials, educational workshops, and local meetups near you.
            </p>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-colors shadow-lg shadow-pink-600/20">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-md">
                    {ev.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ev.attendeesCount} Going</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white mb-2">{ev.title}</h2>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{ev.description}</p>

                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-500">Host: {ev.organizer}</span>
                <button
                  onClick={() => toggleRSVP(ev.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
                    ev.isAttending
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {ev.isAttending && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{ev.isAttending ? 'RSVP Confirmed' : 'RSVP Going'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}