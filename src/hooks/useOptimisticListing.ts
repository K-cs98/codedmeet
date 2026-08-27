"use client";

import { useState, useCallback } from "react";

interface SocialCounts {
  likes: number;
  comments: number;
  attendees: number;
}

interface UserActions {
  isLiked: boolean;
  isBookmarked: boolean;
  isAttending: boolean;
}

export function useOptimisticListing(
  listingId: string,
  initialCounts: SocialCounts,
  initialActions: UserActions
) {
  const [counts, setCounts] = useState<SocialCounts>(initialCounts);
  const [actions, setActions] = useState<UserActions>(initialActions);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleLike = useCallback(async () => {
    let rollbackActions: UserActions | null = null;
    let rollbackCounts: SocialCounts | null = null;
    let targetState = false;

    setActions((prevActions) => {
      rollbackActions = prevActions;
      targetState = !prevActions.isLiked;
      return { ...prevActions, isLiked: targetState };
    });

    setCounts((prevCounts) => {
      rollbackCounts = prevCounts;
      return { ...prevCounts, likes: prevCounts.likes + (targetState ? 1 : -1) };
    });

    setIsSyncing(true);

    try {
      const res = await fetch(`/api/listings/${listingId}/like`, {
        method: targetState ? "POST" : "DELETE",
      });

      if (!res.ok) throw new Error("Failed to sync like action");
    } catch (err) {
      console.error("[OPTIMISTIC_LIKE_ERROR] Rolling back UI state:", err);
      if (rollbackActions) setActions(rollbackActions);
      if (rollbackCounts) setCounts(rollbackCounts);
    } finally {
      setIsSyncing(false);
    }
  }, [listingId]);

  const toggleBookmark = useCallback(async () => {
    let rollbackActions: UserActions | null = null;
    let targetState = false;

    setActions((prevActions) => {
      rollbackActions = prevActions;
      targetState = !prevActions.isBookmarked;
      return { ...prevActions, isBookmarked: targetState };
    });

    setIsSyncing(true);

    try {
      const res = await fetch(`/api/listings/${listingId}/bookmark`, {
        method: targetState ? "POST" : "DELETE",
      });

      if (!res.ok) throw new Error("Failed to sync bookmark action");
    } catch (err) {
      console.error("[OPTIMISTIC_BOOKMARK_ERROR] Rolling back UI state:", err);
      if (rollbackActions) setActions(rollbackActions);
    } finally {
      setIsSyncing(false);
    }
  }, [listingId]);

  const toggleRSVP = useCallback(async () => {
    let rollbackActions: UserActions | null = null;
    let rollbackCounts: SocialCounts | null = null;
    let targetState = false;

    setActions((prevActions) => {
      rollbackActions = prevActions;
      targetState = !prevActions.isAttending;
      return { ...prevActions, isAttending: targetState };
    });

    setCounts((prevCounts) => {
      rollbackCounts = prevCounts;
      return { ...prevCounts, attendees: prevCounts.attendees + (targetState ? 1 : -1) };
    });

    setIsSyncing(true);

    try {
      const res = await fetch(`/api/listings/${listingId}/rsvp`, {
        method: targetState ? "POST" : "DELETE",
      });

      if (!res.ok) throw new Error("Failed to sync RSVP state");
    } catch (err) {
      console.error("[OPTIMISTIC_RSVP_ERROR] Rolling back UI state:", err);
      if (rollbackActions) setActions(rollbackActions);
      if (rollbackCounts) setCounts(rollbackCounts);
    } finally {
      setIsSyncing(false);
    }
  }, [listingId]);

  return {
    counts,
    actions,
    isSyncing,
    toggleLike,
    toggleBookmark,
    toggleRSVP,
  };
}