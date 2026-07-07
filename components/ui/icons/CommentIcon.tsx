import { FaRegComment } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function CommentIcon({ className }: Props) {
  return <FaRegComment className={className ?? "w-6 h-6"} />;
}
