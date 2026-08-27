"use client";

import { useEffect, useState } from "react";

export interface RealtimeEventPayload {
  type: "LIKE_UPDATED" | "COMMENT_ADDED" | "RSVP_UPDATED" | "PING" | "CONNECTED";
  listingId?: string;
  likesCount?: number;
  attendeesCount?: number;
  comment?: { id: string; content: string; author: string };
}

export function useRealtimeListing(listingId: string) {
  const [eventData, setEventData] = useState<RealtimeEventPayload | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!listingId) return;

    let eventSource: EventSource | null = new EventSource(`/api/listings/${listingId}/events`);

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const payload: RealtimeEventPayload = JSON.parse(event.data);
        if (payload.type !== "PING") {
          setEventData(payload);
        }
      } catch (err) {
        console.error("[SSE_PARSING_ERROR]", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("[SSE_CONNECTION_ERROR]", err);
      setIsConnected(false);
    };

    return () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      setIsConnected(false);
    };
  }, [listingId]);

  return { eventData, isConnected };
}