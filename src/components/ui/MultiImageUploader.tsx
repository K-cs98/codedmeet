"use client";

import React, { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface MultiImageUploaderProps {
  onImagesUploaded: (urls: string[]) => void;
  maxFiles?: number;
}

export default function MultiImageUploader({
  onImagesUploaded,
  maxFiles = 5,
}: MultiImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (previews.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    // Generate local previews instantly
    const localPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...localPreviews]);

    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      onImagesUploaded(data.urls);
    } catch (err) {
      console.error("[UPLOAD_CLIENT_ERROR]", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <label className="border-2 border-dashed border-neutral-800 hover:border-red-600/60 transition bg-neutral-900/40 hover:bg-neutral-900 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
        <Upload className="w-8 h-8 text-neutral-400 mb-2" />
        <span className="text-sm font-semibold text-neutral-200">
          Click or drag photos to upload gallery
        </span>
        <span className="text-xs text-neutral-500 mt-1">
          PNG, JPG, WEBP up to 5MB ({previews.length}/{maxFiles})
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading || previews.length >= maxFiles}
          className="hidden"
        />
      </label>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-neutral-800 group bg-neutral-950"
            >
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-neutral-950/80 hover:bg-red-950 text-neutral-300 hover:text-red-400 p-1 rounded-full border border-neutral-800 backdrop-blur-sm transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}