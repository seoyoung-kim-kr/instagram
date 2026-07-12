import { FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";
import { useCallback } from "react";

async function updateLike(id: string, like: boolean) {
  const res = await fetch("/api/likes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, like }),
  });
  return res.json();
}

export default function usePost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(postId ? `/api/posts/${postId}` : null);

  const toggleLike = useCallback(
    async (post: SimplePost, username: string, like: boolean) => {
      const newLikes = like
        ? [...(post.likes || []), username]
        : (post.likes || []).filter((u) => u !== username);

      const newPost = { ...post, likes: newLikes } as FullPost;

      mutate(updateLike(post.id, like), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate],
  );

  return { post, isLoading, error, toggleLike };
}
