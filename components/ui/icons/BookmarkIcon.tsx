import { FaRegBookmark } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function BookmarkIcon({ className }: Props) {
  return <FaRegBookmark className={className ?? "w-6 h-6"} />;
}

