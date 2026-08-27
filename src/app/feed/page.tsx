"use client";

import React, { useState } from "react";
import { Heart, MessageSquare, Repeat, Flame, ShieldCheck, MapPin, Image as ImageIcon, Send, Lock } from "lucide-react";

const MOCK_POSTS = [
  {
    id: "p1",
    author: "Mistress Vivienne",
    handle: "@domme_vivienne",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Dominant / Pro Domme",
    verified: true,
    time: "12m ago",
    content: "Accepting new submissives for heavy rope bondage, impact play, and CBT sessions at my private dungeon studio this weekend. DM for screening requirements and rate sheet. ⛓️👠",
    tags: ["BDSM", "RopeBondage", "ImpactPlay", "ProDomme"],
    likes: 142,
    comments: 28,
    reposts: 19,
    hasPaywallContent: false,
  },
  {
    id: "p2",
    author: "Kitten Raven",
    handle: "@pup_raven",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "Pet Play / Submissive",
    verified: false,
    time: "45m ago",
    content: "New leather hood and collar arrived! Looking for a strict Master or Handler in the area for pet play, cage training, and public leash walks at the upcoming munches.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80",
    tags: ["PetPlay", "PupPlay", "LeatherKink", "Submissive"],
    likes: 289,
    comments: 41,
    reposts: 35,
    hasPaywallContent: false,
  },
  {
    id: "p3",
    author: "Sir Marcus & Slave Anna",
    handle: "@dominant_pair",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Master / Slave Couple",
    verified: true,
    time: "2h ago",
    content: "Exclusive unedited 4K video from last night's spanking and extreme sensation play session is now live on our locked vault feed.",
    tags: ["Spanking", "SensationPlay", "MasterSlave", "AdultContent"],
    likes: 512,
    comments: 67,
    reposts: 88,
    hasPaywallContent: true,
    vaultPrice: "$15.00",
  },
];

export default function ExploreFeedPage() {
  const [activeSubTab, setActiveSubTab] = useState<"following" | "local" | "providers">("local");
  const [postText, setPostText] = useState("");

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6">
      {/* Feed Sub-Header Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white">
          <Flame className="w-6 h-6 text-pink-500 fill-pink-500" /> Kink Feed
        </h1>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab("following")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === "following" ? "bg-pink-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveSubTab("local")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === "local" ? "bg-pink-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Local Kinks
          </button>
          <button
            onClick={() => setActiveSubTab("providers")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === "providers" ? "bg-pink-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Verified Providers
          </button>
        </div>
      </div>

      {/* Post Creator Status Box */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Share your kinks, post session updates, or advertise availability..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-pink-500 resize-none h-20"
        />
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-pink-400 transition">
              <ImageIcon className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500">NSFW content auto-flagged for 18+</span>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition">
            <Send className="w-3.5 h-3.5" /> Post
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-4">
        {MOCK_POSTS.map((post) => (
          <article key={post.id} className="glass-card rounded-2xl p-5 space-y-4 border border-slate-800/80">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/40" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-sm">{post.author}</h3>
                    {post.verified && <ShieldCheck className="w-4 h-4 text-pink-500" />}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{post.handle}</span>
                    <span>•</span>
                    <span className="text-pink-400 font-medium">{post.role}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-500">{post.time}</span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">{post.content}</p>

            {/* Paywall Vault Locked Card */}
            {post.hasPaywallContent && (
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-pink-500/30 p-8 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Locked NSFW Paywall Vault</h4>
                  <p className="text-xs text-slate-400">Unlock this explicit video session post for {post.vaultPrice}</p>
                </div>
                <button className="bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold px-5 py-2 rounded-xl hover:opacity-90 transition">
                  Unlock Vault Post ({post.vaultPrice})
                </button>
              </div>
            )}

            {/* Post Image */}
            {post.image && (
              <div className="rounded-xl overflow-hidden border border-slate-800 max-h-96">
                <img src={post.image} alt="Post preview" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Tag Badges */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[11px] bg-slate-900 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-md font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Engagement Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
              <button className="flex items-center gap-1.5 hover:text-pink-500 transition">
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 hover:text-slate-200 transition">
                <MessageSquare className="w-4 h-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 hover:text-slate-200 transition">
                <Repeat className="w-4 h-4" /> {post.reposts}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}