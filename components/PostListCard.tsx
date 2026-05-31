import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import type { SimplePost } from "@/model/post";
import LikeIcon from "./ui/icons/LikeIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import parseDate from "@/util/date";

export default function PostListCard({
  userImage,
  username,
  image,
  likes,
  text,
  createdAt,
}: SimplePost) {
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
      />
      <div className="mt-2 w-full space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <LikeIcon />
            <span className="font-bold">{likes?.length ?? 0}</span>
          </div>
          <div>
            <BookmarkIcon />
          </div>
        </div>
        <p>
          <span className="font-bold text-md">{username} </span>
          {text}
        </p>
      </div>
    </>
  );
}
