import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaComment } from "react-icons/fa";
import { SimplePost } from "@/model/post";
import { Spinner } from "@/components/ui/Spinner";
import PostDetailDialog from "./PostDetailDialog";

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
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => setSelectedPostId(post.id)}
            className="relative aspect-square group cursor-pointer overflow-hidden bg-neutral-100 border-0 p-0 text-left w-full outline-none focus:ring-2 focus:ring-neutral-300 focus:z-10"
          >
            <Image
              src={post.image}
              alt="post thumbnail"
              fill
              sizes="(max-width: 768px) 33vw, 250px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-x-4 md:gap-x-8 text-white font-bold text-sm md:text-lg">
              <div className="flex items-center gap-x-1.5 md:gap-x-2">
                <FaHeart />
                <span>{post.likes?.length ?? 0}</span>
              </div>
              <div className="flex items-center gap-x-1.5 md:gap-x-2">
                <FaComment />
                <span>{post.comment}</span>
              </div>
            </div>
          </button>
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
