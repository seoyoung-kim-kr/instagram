"use client";

import { useState } from "react";
import { Spinner } from "./ui/Spinner";
import PostListCard from "./PostListCard";
import PostDetailDialog from "./PostDetailDialog";
import usePosts from "@/hooks/usePosts";

export default function PostList() {
  const { posts, isLoading, error } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

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
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostListCard
                post={post}
                priority={index < 2}
                onCommentClick={() => setSelectedPostId(post.id)}
              />
            </li>
          ))}
        </ul>
      )}

      {selectedPostId && (
        <PostDetailDialog
          id={selectedPostId}
          open={!!selectedPostId}
          onOpenChange={(open) => !open && setSelectedPostId(null)}
        />
      )}
    </section>
  );
}
