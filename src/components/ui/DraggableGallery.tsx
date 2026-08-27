"use client";

import React from "react";
import { GripVertical } from "lucide-react";
import { usePersistentReorder } from "@/hooks/usePersistentReorder";

interface DraggableGalleryProps {
  listingId: string;
  initialImages: string[];
  onOrderChange?: (newOrder: string[]) => void;
}

export default function DraggableGallery({
  listingId,
  initialImages,
  onOrderChange,
}: DraggableGalleryProps) {
  const {
    items: images,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = usePersistentReorder<string>(`gallery-order-${listingId}`, initialImages);

  const syncWithServer = async () => {
    if (onOrderChange) onOrderChange(images);

    try {
      await fetch(`/api/listings/${listingId}/gallery`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery: images }),
      });
    } catch (err) {
      console.error("[GALLERY_SYNC_ERROR]", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-400">
          Drag cards to reorder image precedence
        </span>
        <button
          onClick={syncWithServer}
          className="text-xs bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-md transition"
        >
          Save Order
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`relative group aspect-square rounded-xl overflow-hidden border transition cursor-grab active:cursor-grabbing ${
              draggedIndex === idx
                ? "border-red-500 opacity-40 scale-95"
                : "border-neutral-800 hover:border-neutral-600 bg-neutral-900"
            }`}
          >
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition">
              <GripVertical className="w-4 h-4" />
            </div>
            <span className="absolute bottom-2 right-2 bg-black/70 text-neutral-300 text-[10px] font-mono px-1.5 py-0.5 rounded">
              #{idx + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}