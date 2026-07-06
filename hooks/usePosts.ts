import useSWR from "swr";
import { SimplePost } from "@/model/post";

export default function usePosts(
  username: string,
  tabType: "posts" | "saved" | "liked" = "posts",
) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/posts?type=${tabType}`);

  return { posts, isLoading, error };
}
