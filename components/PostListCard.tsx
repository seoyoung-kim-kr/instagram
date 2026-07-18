"use client";

import Avatar from "./Avatar";
import Image from "next/image";
import type { SimplePost } from "@/model/post";
import parseDate from "@/util/date";
import ActionBar from "./ActionBar";
import CommentIcon from "./ui/icons/CommentIcon";

type Props = {
  post: SimplePost;
  priority?: boolean;
  onCommentClick: () => void;
};

export default function PostListCard({
  post,
  priority = false,
  onCommentClick,
}: Props) {
  const { userImage, username, createdAt, image, text, comment } = post;

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Avatar image={userImage} />
        <span className="text-sm font-semibold">{username}</span>
        <span className="text-sm text-muted-foreground font-semibold">
          • {parseDate(createdAt)}
        </span>
      </div>

      <Image
        src={image}
        alt="post photo"
        width={468}
        height={585}
        className="w-full object-cover aspect-square rounded-md mt-3"
        priority={priority}
      />
      <div className="mt-2 w-full space-y-1">
        <ActionBar post={post}>
          <div className="flex items-center gap-x-1">
            <button
              type="button"
              onClick={onCommentClick}
              className="hover:opacity-60 transition-opacity outline-none cursor-pointer"
            >
              <CommentIcon />
            </button>
            {comment !== undefined && (
              <span className="font-bold text-sm">{comment}</span>
            )}
          </div>
        </ActionBar>
        <p>
          <span className="font-bold text-md">{username} </span>
          {text}
        </p>
      </div>
    </>
  );
}
