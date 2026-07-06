import { FaRegComment, FaComment } from "react-icons/fa";

type Props = {
  className?: string;
  filled?: boolean;
};

export default function CommentIcon({ className, filled = false }: Props) {
  return filled ? (
    <FaComment className={className || "w-6 h-6"} />
  ) : (
    <FaRegComment className={className || "w-6 h-6"} />
  );
}

