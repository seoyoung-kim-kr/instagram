import Image from "next/image";
import { SimplePost } from "@/model/post";
import LikeFilledIcon from "./ui/icons/LikeFilledIcon";
import CommentFilledIcon from "./ui/icons/CommentFilledIcon";

type Props = {
  post: SimplePost;
  priority?: boolean;
  onClick: () => void;
};

export default function PostGridCard({
  post,
  priority = false,
  onClick,
}: Props) {
  const { image, likes, comment } = post;
  return (
    <button
      onClick={onClick}
      className="relative aspect-square group cursor-pointer overflow-hidden bg-neutral-100 border-0 p-0 text-left w-full outline-none focus:ring-2 focus:ring-neutral-300 focus:z-10"
    >
      <Image
        src={image}
        alt="post thumbnail"
        fill
        sizes="(max-width: 768px) 33vw, 250px"
        priority={priority}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-x-4 md:gap-x-8 text-white font-bold text-sm md:text-lg">
        <div className="flex items-center gap-x-1.5 md:gap-x-2">
          <LikeFilledIcon />
          <span>{likes?.length ?? 0}</span>
        </div>
        <div className="flex items-center gap-x-1.5 md:gap-x-2">
          <CommentFilledIcon />
          <span>{comment}</span>
        </div>
      </div>
    </button>
  );
}
