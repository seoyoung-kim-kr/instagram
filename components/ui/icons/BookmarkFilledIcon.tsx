import { FaBookmark } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function BookmarkFilledIcon({ className }: Props) {
  return <FaBookmark className={className ?? "w-6 h-6"} />;
}
