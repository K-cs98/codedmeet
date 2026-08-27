"use client";

import React, { useState } from "react";
import { ShieldCheck, MapPin, Calendar, Lock, MessageSquare, DollarSign, Heart, CheckCircle2 } from "lucide-react";

export default function HybridProfilePage() {
  const [activeTab, setActiveTab] = useState<"rates" | "bio" | "vault">("rates");

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6">
      {/* Profile Header & Banner */}
      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800">
        <div className="h-48 bg-gradient-to-r from-pink-950 via-slate-900 to-rose-950 relative">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80"
            alt="Cover"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 -mt-16 mb-4">
            <div className="flex items-end gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Mistress Vivienne"
                className="w-28 h-28 rounded-2xl object-cover border-4 border-slate-950 shadow-2xl"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-white">Mistress Vivienne</h1>
                  <ShieldCheck className="w-5 h-5 text-pink-500" />
                </div>
                <p className="text-xs text-pink-400 font-semibold">Pro Domme • Fetish Model • BDSM Educator</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-500" /> Downtown Dungeon Studio (Incall & Outcall)
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <a
                href="/inbox"
                className="flex-1 md:flex-none bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" /> Send Message
              </a>
              <button className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition">
                <Calendar className="w-4 h-4 text-pink-400" /> Book Session
              </button>
            </div>
          </div>

          {/* Profile Interior Tabs */}
          <div className="flex border-b border-slate-800 gap-6 text-sm font-bold pt-4">
            <button
              onClick={() => setActiveTab("rates")}
              className={`pb-3 transition relative ${
                activeTab === "rates" ? "text-pink-500 border-b-2 border-pink-500" : "text-slate-400 hover:text-white"
              }`}
            >
              Service Rates & Schedule
            </button>
            <button
              onClick={() => setActiveTab("bio")}
              className={`pb-3 transition relative ${
                activeTab === "bio" ? "text-pink-500 border-b-2 border-pink-500" : "text-slate-400 hover:text-white"
              }`}
            >
              Social Bio & Kink Taxonomy
            </button>
            <button
              onClick={() => setActiveTab("vault")}
              className={`pb-3 transition relative ${
                activeTab === "vault" ? "text-pink-500 border-b-2 border-pink-500" : "text-slate-400 hover:text-white"
              }`}
            >
              Locked Paywall Vault
            </button>
          </div>
        </div>
      </div>

      {/* Tab A: Rates & Schedule */}
      {activeTab === "rates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-pink-500" /> Session Rates & Offerings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">1 Hour Incall Session</h4>
                  <p className="text-xs text-slate-400">Rope bondage, CBT, light impact play</p>
                </div>
                <span className="font-mono font-bold text-pink-400 text-sm">$350</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">2 Hour Intensive Session</h4>
                  <p className="text-xs text-slate-400">Heavy BDSM, chastity locking, humiliation</p>
                </div>
                <span className="font-mono font-bold text-pink-400 text-sm">$650</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">Overnight Outcall Experience</h4>
                  <p className="text-xs text-slate-400">Full immersion domination experience</p>
                </div>
                <span className="font-mono font-bold text-pink-400 text-sm">$2,500</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-500" /> Studio Availability
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Monday - Thursday</span>
                <span className="font-bold text-emerald-400">12:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Friday - Saturday</span>
                <span className="font-bold text-emerald-400">11:00 AM - 2:00 AM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Sunday</span>
                <span className="font-bold text-pink-400">Private Events / Munches Only</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab B: Bio & Kink Badges */}
      {activeTab === "bio" && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-base text-white">About Mistress Vivienne</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Professional Dominant with 8+ years of experienced kink instruction and sadomasochistic play. Specializing in psychological control, Japanese Shibari suspension, Chastity enforcement, and FinDom. All submissives must pass screening prior to session confirmation.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-base text-white">Kink & Interest Taxonomy</h3>
            <div className="flex flex-wrap gap-2">
              {["Dominant", "Pro Domme", "Shibari", "Bondage", "CBT", "Chastity", "FinDom", "Foot Fetish", "Sensation Play", "Humiliation", "Latex/Leather"].map((kink) => (
                <span key={kink} className="bg-pink-950/60 text-pink-300 border border-pink-500/40 text-xs font-semibold px-3 py-1 rounded-xl">
                  {kink}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab C: Locked Paywall Vault */}
      {activeTab === "vault" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center space-y-3 border border-pink-500/30">
              <div className="mx-auto w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-white">Explicit Vault Video #{i}</h4>
              <p className="text-xs text-slate-400">Uncensored 4K Fetish Session</p>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs py-2 rounded-xl transition">
                Unlock ($19.99)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}