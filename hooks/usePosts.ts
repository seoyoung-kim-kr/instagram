import useSWR, { useSWRConfig } from "swr";
import { SimplePost } from "@/model/post";
import { useCallback } from "react";
import { useCacheKeys } from "@/context/CacheKeysContext";

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
  const { postsKey } = useCacheKeys();
  const cacheKey = username
    ? `/api/users/${username}/posts?type=${tabType}`
    : postsKey;

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKey);

  const { mutate: globalMutate } = useSWRConfig();

  const toggleLike = useCallback(
    async (post: SimplePost, username: string, like: boolean) => {
      const newLikes = like
        ? [...(post.likes || []), username]
        : (post.likes || []).filter((u) => u !== username);

      const newPost = { ...post, likes: newLikes };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      // 1. 목록 캐시 업데이트
      mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });

      // 2. 개별 상세 캐시 동기화
      globalMutate(
        `/api/posts/${post.id}`,
        (currentPost: any) => {
          if (!currentPost) return undefined;
          return { ...currentPost, likes: newLikes };
        },
        { revalidate: false },
      );
    },
    [posts, mutate, globalMutate],
  );

  return { posts, isLoading, error, toggleLike };
}
