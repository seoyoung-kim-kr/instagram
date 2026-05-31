import LikeIcon from "./ui/icons/LikeIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";

type Props = {
  likes: string[];
};

export default function ActionBar({ likes }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <LikeIcon />
        <span className="font-bold">{likes?.length ?? 0}</span>
      </div>
      <div>
        <BookmarkIcon />
      </div>
    </div>
  );
}
