import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import type { Post } from "@/model/post";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import LikeIcon from "./ui/icons/LikeIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default function Post({
  userImage,
  username,
  photo,
  likeCount,
  text,
  createdAt,
}: Post) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Avatar image={userImage} />
        <span className="text-sm font-semibold">{username}</span>
        <span className="text-sm text-muted-foreground font-semibold">
          • {createdAt}
        </span>
      </div>

      <Image
        src={urlFor(photo).width(500).url()}
        alt="post photo"
        width={468}
        height={585}
        className="w-full object-cover aspect-square rounded-md mt-3"
      />
      <div className="mt-2 w-full space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <LikeIcon />
            <span className="font-bold">{likeCount}</span>
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
