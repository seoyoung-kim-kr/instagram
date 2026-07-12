import LikeIcon from "./ui/icons/LikeIcon";
import LikeFilledIcon from "./ui/icons/LikeFilledIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";
import CommentIcon from "./ui/icons/CommentIcon";
import ToggleButton from "./ToggleButton";
import type { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";

type Props = {
  post: SimplePost;
  showCount?: boolean;
  onCommentClick?: () => void;
};

export default function ActionBar({
  post,
  showCount = true,
  onCommentClick,
}: Props) {
  const { likes, comment, id } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const { me, toggleBookmark } = useMe();
  const { toggleLike } = usePosts();

  const liked = user ? likes?.includes(user.username) : false;
  const bookmarked = me?.bookmarks?.includes(id) ?? false;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <ToggleButton
          toggled={liked}
          onToggle={(like) => user && toggleLike(post, user.username, like)}
          onIcon={<LikeFilledIcon />}
          offIcon={<LikeIcon />}
          count={showCount ? (likes?.length ?? 0) : undefined}
        />
        {onCommentClick && (
          <div className="flex items-center gap-x-1">
            <button
              type="button"
              onClick={onCommentClick}
              className="hover:opacity-60 transition-opacity outline-none cursor-pointer"
            >
              <CommentIcon />
            </button>
            {showCount && comment !== undefined && (
              <span className="font-bold text-sm">{comment}</span>
            )}
          </div>
        )}
      </div>
      <ToggleButton
        toggled={bookmarked}
        onToggle={(bookmark) => toggleBookmark(id, bookmark)}
        onIcon={<BookmarkFilledIcon />}
        offIcon={<BookmarkIcon />}
      />
    </div>
  );
}

