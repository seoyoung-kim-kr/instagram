import { useState } from "react";
import { SimplePost } from "@/model/post";
import { Spinner } from "@/components/ui/Spinner";
import PostDetailDialog from "./PostDetailDialog";
import PostGridCard from "./PostGridCard";

type Props = {
  posts?: SimplePost[];
  isLoading: boolean;
};

export default function PostGrid({ posts, isLoading }: Props) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner className="size-8 text-neutral-400" />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-24 text-neutral-400">
        <p className="text-lg font-semibold text-neutral-500">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {posts.map((post, index) => (
          <PostGridCard
            key={post.id}
            post={post}
            priority={index < 6}
            onClick={() => setSelectedPostId(post.id)}
          />
        ))}
      </div>

      {selectedPostId && (
        <PostDetailDialog
          id={selectedPostId}
          open={!!selectedPostId}
          onOpenChange={(open) => !open && setSelectedPostId(null)}
        />
      )}
    </div>
  );
}
