import LikeIcon from "./ui/icons/LikeIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import CommentIcon from "./ui/icons/CommentIcon";
import ActionButton from "./ActionButton";

type Props = {
  likes?: string[];
  comment?: number;
  showCount?: boolean;
  onCommentClick?: () => void;
};

export default function ActionBar({
  likes,
  comment,
  showCount = true,
  onCommentClick,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <ActionButton count={showCount ? (likes?.length ?? 0) : undefined}>
          <LikeIcon />
        </ActionButton>
        {onCommentClick && (
          <ActionButton
            count={showCount ? comment : undefined}
            onClick={onCommentClick}
          >
            <CommentIcon />
          </ActionButton>
        )}
      </div>
      <ActionButton>
        <BookmarkIcon />
      </ActionButton>
    </div>
  );
}
