import LikeIcon from "./ui/icons/LikeIcon";
import LikeFilledIcon from "./ui/icons/LikeFilledIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";
import ToggleButton from "./ToggleButton";
import type { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";

type Props = {
  post: SimplePost;
  showCount?: boolean;
  children?: React.ReactNode;
};

export default function ActionBar({
  post,
  showCount = true,
  children,
}: Props) {
  const { likes, id } = post;
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
        {children}
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

