"use client";

import useSWR from "swr";
import { Spinner } from "./ui/Spinner";
import type { Post as PostType } from "@/model/post";
import Post from "./Post";

export default function PostList() {
  const { data: posts, isLoading, error } = useSWR<PostType[]>("/api/posts");

  return (
    <section className="w-full mt-6">
      {isLoading && <Spinner />}
      {error && <p>error: {error.message}</p>}
      {posts && posts.length > 0 && (
        <ul className="space-y-5">
          {posts.map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
