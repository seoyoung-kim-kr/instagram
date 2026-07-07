import { FaComment } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function CommentFilledIcon({ className }: Props) {
  return <FaComment className={className ?? "w-6 h-6"} />;
}
