import { FullPost, SimplePost, Comment } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";
import { useCallback } from "react";

async function updateLike(id: string, like: boolean) {
  const res = await fetch("/api/likes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, like }),
  });
  return res.json();
}

async function addComment(id: string, comment: string) {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, comment }),
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
  const { mutate: globalMutate } = useSWRConfig();

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

  const postComment = useCallback(
    async (comment: Comment) => {
      if (!post) return;

      const newPost: FullPost = {
        ...post,
        comments: [...(post.comments || []), comment],
        comment: post.comment + 1,
      };

      // 1. 상세 캐시 낙관적 업데이트
      const promise = mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: true,
        rollbackOnError: true,
      });

      // 2. 피드 목록 캐시의 댓글 카운트 동기화
      globalMutate(
        "/api/posts",
        (currentPosts: SimplePost[] | undefined) => {
          if (!currentPosts) return undefined;
          return currentPosts.map((p) =>
            p.id === post.id ? { ...p, comment: p.comment + 1 } : p,
          );
        },
        { revalidate: false },
      );

      // 3. 프로필 탭 캐시 목록의 댓글 카운트 동기화
      globalMutate(
        (key) => typeof key === "string" && key.startsWith("/api/users/"),
        (currentPosts: SimplePost[] | undefined) => {
          if (!currentPosts) return undefined;
          return currentPosts.map((p) =>
            p.id === post.id ? { ...p, comment: p.comment + 1 } : p,
          );
        },
        { revalidate: false },
      );

      return promise;
    },
    [post, mutate, globalMutate],
  );

  return { post, isLoading, error, toggleLike, postComment };
}
