import useSWR from "swr";
import { SimplePost } from "@/model/post";
import { useCallback } from "react";

async function updateLike(id: string, like: boolean) {
  const res = await fetch("/api/likes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, like }),
  });
  return res.json();
}

export default function usePosts(
  username?: string,
  tabType: "posts" | "saved" | "liked" = "posts",
) {
  const cacheKey = username
    ? `/api/users/${username}/posts?type=${tabType}`
    : "/api/posts";

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKey);

  const toggleLike = useCallback(
    async (post: SimplePost, username: string, like: boolean) => {
      const newLikes = like
        ? [...(post.likes || []), username]
        : (post.likes || []).filter((u) => u !== username);

      const newPost = { ...post, likes: newLikes };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate],
  );

  return { posts, isLoading, error, toggleLike };
}
