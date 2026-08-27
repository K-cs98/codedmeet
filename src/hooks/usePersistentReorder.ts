"use client";

import { useState, useCallback } from "react";

export function usePersistentReorder<T>(storageKey: string, initialItems: T[]) {
  // Synchronously initialize state from LocalStorage to prevent layout shifts
  const [items, setItems] = useState<T[]>(() => {
    if (typeof window === "undefined") return initialItems;
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialItems;
    } catch (e) {
      console.error("[LOCALSTORAGE_READ_ERROR]", e);
      return initialItems;
    }
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const updateItems = useCallback(
    (newItems: T[]) => {
      setItems(newItems);
      try {
        localStorage.setItem(storageKey, JSON.stringify(newItems));
      } catch (e) {
        console.error("[LOCALSTORAGE_WRITE_ERROR]", e);
      }
    },
    [storageKey]
  );

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...items];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setDraggedIndex(targetIndex);
    updateItems(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    items,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    updateItems,
  };
}