import useSWR from "swr";
import { HomeUser } from "@/model/user";
import { useCallback } from "react";

async function updateBookmark(id: string, bookmark: boolean) {
  const res = await fetch("/api/bookmarks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, bookmark }),
  });
  return res.json();
}

export default function useMe() {
  const { data: me, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const toggleBookmark = useCallback(
    async (postId: string, bookmark: boolean) => {
      if (!me) return;

      const newBookmarks = bookmark
        ? [...(me.bookmarks || []), postId]
        : (me.bookmarks || []).filter((id) => id !== postId);

      const newMe = { ...me, bookmarks: newBookmarks };

      mutate(updateBookmark(postId, bookmark), {
        optimisticData: newMe,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [me, mutate],
  );

  return { me, isLoading, error, toggleBookmark };
}
