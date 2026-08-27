"use client";

import React, { useState } from "react";
import { Send, Lock, ShieldCheck, Image as ImageIcon } from "lucide-react";

export default function EncryptedInboxPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Mistress Vivienne", text: "Hello. Before we confirm your session for Saturday, please confirm you have reviewed my kink consent checklist.", time: "10:14 AM", isMe: false },
    { id: 2, sender: "You", text: "Yes Mistress, I completed the screening form and I agree to all terms.", time: "10:16 AM", isMe: true },
    { id: 3, sender: "Mistress Vivienne", text: "Excellent. Send the $100 deposit via CashApp or Crypto to lock in the 2:00 PM slot.", time: "10:18 AM", isMe: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: input, time: "Just now", isMe: true }]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="glass-card rounded-t-2xl p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" className="w-10 h-10 rounded-full object-cover border border-pink-500" />
          <div>
            <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
              Mistress Vivienne <ShieldCheck className="w-4 h-4 text-pink-500" />
            </h2>
            <p className="text-[10px] text-emerald-400 font-mono">● End-to-End Encrypted Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
          <Lock className="w-3.5 h-3.5 text-pink-500" /> Encrypted Session
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 glass-card p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
            <div className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2.5 text-xs ${msg.isMe ? "bg-pink-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-200"}`}>
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 font-mono">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="glass-card rounded-b-2xl p-3 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Send encrypted message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
        />
        <button onClick={handleSend} className="bg-pink-600 hover:bg-pink-700 text-white p-2.5 rounded-xl transition">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}