import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type Props = {
  className?: string;
  filled?: boolean;
};

export default function BookmarkIcon({ className, filled = false }: Props) {
  return filled ? (
    <FaBookmark className={className || "w-6 h-6"} />
  ) : (
    <FaRegBookmark className={className || "w-6 h-6"} />
  );
}
