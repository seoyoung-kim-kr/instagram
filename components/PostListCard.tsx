import Avatar from "./Avatar";
import Image from "next/image";
import type { SimplePost } from "@/model/post";
import parseDate from "@/util/date";
import { useState } from "react";
import PostDetailDialog from "./PostDetailDialog";
import ActionBar from "./ActionBar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { id, userImage, username, createdAt, image, text, likes, comment } =
    post;
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

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
        <ActionBar
          likes={likes}
          comment={comment}
          onCommentClick={() => setIsDetailDialogOpen(true)}
        />
        <p>
          <span className="font-bold text-md">{username} </span>
          {text}
        </p>
      </div>

      {
        <PostDetailDialog
          id={id}
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
        />
      }
    </>
  );
}
