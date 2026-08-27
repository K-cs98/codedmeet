"use client";

import React, { useState } from "react";
import {
  X,
  Heart,
  Bookmark,
  Share2,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Clock,
  Send,
  Lock,
  MessageSquare,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
} from "lucide-react";

export interface DirectoryItem {
  id: string;
  title: string;
  organizer: string;
  avatar: string;
  image: string;
  gallery?: string[];
  location: string;
  coordinates?: string;
  verified: boolean;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  attendees: number;
  status: string;
  rates: string;
  description?: string;
  rules?: string[];
  memberSince?: string;
}

interface DetailModalProps {
  item: DirectoryItem | null;
  onClose: () => void;
  onToggleLike: (id: string) => void;
  isLiked: boolean;
}

export default function DetailModal({
  item,
  onClose,
  onToggleLike,
  isLiked,
}: DetailModalProps) {
  if (!item) return null;

  // Mock photo gallery fallback
  const galleryImages = item.gallery || [
    item.image,
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "message">("overview");
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageText("");
      setMessageSent(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Card Container */}
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-8 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-neutral-950/70 hover:bg-neutral-950 text-neutral-300 rounded-full border border-neutral-800 backdrop-blur-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Gallery (FetLife Media Focus) */}
        <div className="w-full md:w-1/2 bg-neutral-950 relative flex flex-col justify-between min-h-[300px] md:min-h-full">
          <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
            <img
              src={galleryImages[currentImageIndex]}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Gallery Navigation Controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 p-2 bg-neutral-950/60 hover:bg-neutral-900 text-neutral-200 rounded-full backdrop-blur-sm border border-neutral-800 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 p-2 bg-neutral-950/60 hover:bg-neutral-900 text-neutral-200 rounded-full backdrop-blur-sm border border-neutral-800 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-3 left-3 bg-neutral-950/80 text-neutral-300 border border-neutral-800 text-xs px-2.5 py-1 rounded-full backdrop-blur-md font-mono">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 p-3 bg-neutral-950/90 border-t border-neutral-800/80 overflow-x-auto">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                    idx === currentImageIndex
                      ? "border-red-500 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Structured Details & Messaging */}
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-neutral-900 overflow-y-auto">
          {/* Header & Tabs */}
          <div className="p-6 border-b border-neutral-800">
            {/* Verification & Category Badges */}
            <div className="flex items-center gap-2 mb-3">
              {item.verified && (
                <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ID Verified Host
                </span>
              )}
              <span className="bg-neutral-800 text-neutral-300 text-xs px-2.5 py-1 rounded-full font-medium">
                {item.category}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-neutral-100 leading-tight mb-2">
              {item.title}
            </h2>

            {/* Organizer Profile Header */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={item.avatar}
                alt={item.organizer}
                className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm text-neutral-200">
                    {item.organizer}
                  </span>
                  {item.verified && (
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <span className="text-xs text-neutral-500">
                  Member since {item.memberSince || "2024"}
                </span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mt-6 border-b border-neutral-800">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 text-sm font-semibold transition border-b-2 ${
                  activeTab === "overview"
                    ? "border-red-500 text-red-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Overview & Rules
              </button>
              <button
                onClick={() => setActiveTab("message")}
                className={`pb-2 text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
                  activeTab === "message"
                    ? "border-red-500 text-red-400"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Send Direct Inquiry
              </button>
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 flex-1">
            {activeTab === "overview" ? (
              <div className="space-y-6">
                {/* Codedruns Technical Specs Grid */}
                <div className="grid grid-cols-2 gap-3 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 text-xs">
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Location</span>
                    <span className="text-neutral-200 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" /> {item.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Pricing / Contribution</span>
                    <span className="text-red-400 font-semibold">{item.rates}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Status</span>
                    <span className="text-neutral-200 font-medium">{item.status}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Community RSVPs</span>
                    <span className="text-neutral-200 font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" /> {item.attendees} Going
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Listing Description
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {item.description ||
                      "Private dungeon space and social lounge tailored for consensual exploration, workshops, and vetted community events. Strict consent rules enforced at all times."}
                  </p>
                </div>

                {/* House/Safety Rules (Codedruns Standard) */}
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-red-500" /> Safety & Consent Protocols
                  </h4>
                  <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside bg-neutral-950/40 p-3 rounded-lg border border-neutral-800/50">
                    <li>Explicit verbal consent required before any interaction.</li>
                    <li>No photos or recording inside designated private areas.</li>
                    <li>Vetting required prior to first-time attendance.</li>
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-neutral-800/80 text-neutral-300 text-xs px-2.5 py-1 rounded-md border border-neutral-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              /* Messaging Tab */
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Your inquiry will be sent directly to <strong>{item.organizer}</strong> via encrypted messaging.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Your Direct Message
                  </label>
                  <textarea
                    rows={5}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Hello ${item.organizer}, I saw your listing for "${item.title}" and would like to inquire about availability and vetting...`}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                {messageSent ? (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Inquiry sent successfully!
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                )}
              </form>
            )}
          </div>

          {/* Social Footer Bar */}
          <div className="border-t border-neutral-800 p-4 bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggleLike(item.id)}
                className={`flex items-center gap-1.5 transition ${
                  isLiked ? "text-red-500 font-bold" : "hover:text-red-400"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
                <span>{item.likes} Likes</span>
              </button>

              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-neutral-500" />
                <span>{item.attendees} Going</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:text-neutral-200 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:text-red-400 bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}