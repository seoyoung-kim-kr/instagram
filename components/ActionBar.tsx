import LikeIcon from "./ui/icons/LikeIcon";
import LikeFilledIcon from "./ui/icons/LikeFilledIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import CommentIcon from "./ui/icons/CommentIcon";
import ToggleButton from "./ToggleButton";

type Props = {
  likes?: string[];
  comment?: number;
  showCount?: boolean;
  onCommentClick?: () => void;
  liked?: boolean;
  onLike?: (like: boolean) => void;
};

export default function ActionBar({
  likes,
  comment,
  showCount = true,
  onCommentClick,
  liked = false,
  onLike,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <ToggleButton
          toggled={liked}
          onToggle={onLike}
          onIcon={<LikeFilledIcon />}
          offIcon={<LikeIcon />}
          count={showCount ? (likes?.length ?? 0) : undefined}
        />
        {onCommentClick && (
          <div className="flex items-center gap-x-1">
            <button
              type="button"
              onClick={onCommentClick}
              className="hover:opacity-60 transition-opacity outline-none"
            >
              <CommentIcon />
            </button>
            {showCount && comment !== undefined && (
              <span className="font-bold text-sm">{comment}</span>
            )}
          </div>
        )}
      </div>
      <button
        type="button"
        className="hover:opacity-60 transition-opacity outline-none"
      >
        <BookmarkIcon />
      </button>
    </div>
  );
}

