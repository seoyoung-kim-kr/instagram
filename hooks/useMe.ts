import useSWR from "swr";
import { HomeUser, SimpleUser } from "@/model/user";
import { useCallback } from "react";

async function updateBookmark(id: string, bookmark: boolean) {
  const res = await fetch("/api/bookmarks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, bookmark }),
  });
  return res.json();
}

async function updateFollow(targetId: string, follow: boolean) {
  const res = await fetch("/api/follow", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: targetId, flow: follow }),
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

  const toggleFollow = useCallback(
    async (targetId: string, targetUser: SimpleUser, follow: boolean) => {
      if (!me) return;

      const newFollowing = follow
        ? [...(me.following || []), targetUser]
        : (me.following || []).filter(
            (u) => u.username !== targetUser.username,
          );

      const newMe = { ...me, following: newFollowing };

      await mutate(
        async () => {
          await updateFollow(targetId, follow);
          return newMe;
        },
        {
          optimisticData: newMe,
          rollbackOnError: true,
          populateCache: true,
          revalidate: true,
        },
      );
    },
    [me, mutate],
  );

  return { me, isLoading, error, toggleBookmark, toggleFollow };
}
