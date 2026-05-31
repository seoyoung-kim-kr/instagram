"use client";

import useSWR from "swr";
import { Spinner } from "./ui/Spinner";
import type { SimplePost } from "@/model/post";
import Post from "./PostListCard";

export default function PostList() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section className="w-full mt-6">
      {isLoading && (
        <div className="flex justify-center items-center mt-32">
          <Spinner />
        </div>
      )}
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
