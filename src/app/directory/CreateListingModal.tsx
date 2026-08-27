"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  X,
  Upload,
  Plus,
  Tag,
  MapPin,
  ShieldCheck,
  DollarSign,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { DirectoryItem } from "./DetailModal";

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newItem: DirectoryItem) => void;
}

interface FormState {
  title: string;
  organizer: string;
  category: string;
  location: string;
  rates: string;
  status: string;
  description: string;
  rulesInput: string;
}

const CATEGORIES = [
  "Munches & Events",
  "Pro Services & Hosts",
  "Parties & Socials",
  "Workshops & Education",
  "Community Groups",
];

const SUGGESTED_TAGS = [
  "Shibari",
  "Bondage",
  "Beginner-Friendly",
  "Late Night",
  "Dress Code Strict",
  "Dominance",
  "Leather",
  "Sensory Play",
];

export default function CreateListingModal({
  isOpen,
  onClose,
  onCreated,
}: CreateListingModalProps) {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    organizer: "",
    category: CATEGORIES[0],
    location: "",
    rates: "Free Entry",
    status: "Upcoming",
    description: "",
    rulesInput: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Form Field Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tag Selector Handlers
  const handleAddTag = (tagToAdd: string) => {
    const cleaned = tagToAdd.trim().replace(/^#/, "");
    if (cleaned && !tags.includes(cleaned) && tags.length < 5) {
      setTags([...tags, cleaned]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Image Upload & Preview Handlers
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (imageFiles.length + files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setError(null);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  // Submission Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.title.trim()) return setError("Listing title is required.");
    if (!formData.organizer.trim()) return setError("Organizer handle is required.");
    if (!formData.location.trim()) return setError("Location is required.");
    if (imagePreviews.length === 0) return setError("Please upload at least one image.");

    setIsSubmitting(true);

    try {
      // Build FormData payload for Server Action or API Route
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("organizer", formData.organizer);
      payload.append("category", formData.category);
      payload.append("location", formData.location);
      payload.append("rates", formData.rates);
      payload.append("status", formData.status);
      payload.append("description", formData.description);
      payload.append("tags", JSON.stringify(tags));
      payload.append(
        "rules",
        JSON.stringify(
          formData.rulesInput
            .split("\n")
            .map((r) => r.trim())
            .filter(Boolean)
        )
      );

      imageFiles.forEach((file) => payload.append("images", file));

      // Simulate API endpoint latency (Replace with actual endpoint call: fetch('/api/directory', { method: 'POST', body: payload }))
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const createdListing: DirectoryItem = {
        id: Date.now().toString(),
        title: formData.title,
        organizer: formData.organizer,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        image: imagePreviews[mainImageIndex] || imagePreviews[0],
        gallery: imagePreviews,
        location: formData.location,
        verified: false,
        category: formData.category,
        tags: tags.length > 0 ? tags : ["Community"],
        likes: 0,
        comments: 0,
        attendees: 1,
        status: formData.status,
        rates: formData.rates,
        description: formData.description,
        rules: formData.rulesInput
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
        memberSince: "2026",
      };

      onCreated(createdListing);
      onClose();
    } catch (err) {
      setError("Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div>
            <h2 className="text-xl font-bold text-neutral-100">Create New Listing</h2>
            <p className="text-xs text-neutral-400">Publish a new event, space, or service</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-950/60 border border-red-800/60 rounded-lg flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Main Title & Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Shibari Foundations & Social"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Organizer Handle *
              </label>
              <input
                type="text"
                name="organizer"
                required
                placeholder="e.g. Host_Alex"
                value={formData.organizer}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Rates / Pricing
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  name="rates"
                  placeholder="Free / £15 Door"
                  value={formData.rates}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Tag Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Tags (Max 5)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-red-950/60 text-red-300 border border-red-800/60 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Type custom tag and press Add"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-1.5 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
              />
              <button
                type="button"
                onClick={() => handleAddTag(tagInput)}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-neutral-500 self-center">Suggestions:</span>
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => handleAddTag(suggested)}
                  className="text-[11px] bg-neutral-950 hover:bg-neutral-800 text-neutral-400 border border-neutral-800 rounded px-2 py-0.5 transition"
                >
                  +{suggested}
                </button>
              ))}
            </div>
          </div>

          {/* Image Selector & Previews */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Media Gallery (Up to 5 images) *
            </label>
            
            <div className="grid grid-cols-5 gap-3 mb-2">
              {imagePreviews.map((src, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-square rounded-lg overflow-hidden border ${
                    mainImageIndex === idx
                      ? "border-red-500 ring-2 ring-red-500/30"
                      : "border-neutral-800"
                  }`}
                >
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-red-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMainImageIndex(idx)}
                    className="absolute bottom-1 left-1 bg-neutral-950/80 text-[10px] text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-700"
                  >
                    {mainImageIndex === idx ? "Cover" : "Set Cover"}
                  </button>
                </div>
              ))}

              {imagePreviews.length < 5 && (
                <label className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-lg aspect-square flex flex-col items-center justify-center text-neutral-500 hover:text-neutral-300 cursor-pointer transition">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Provide a detailed breakdown of your listing or event..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Rules / Etiquette */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Rules & Guidelines (One per line)
            </label>
            <textarea
              name="rulesInput"
              rows={2}
              placeholder="e.g. Consent mandatory before contact.&#10;No photos inside venue."
              value={formData.rulesInput}
              onChange={handleInputChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-200 focus:outline-none focus:border-red-600 transition"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                </>
              ) : (
                <>Publish Listing</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}