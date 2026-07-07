import { FaRegHeart } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function LikeIcon({ className }: Props) {
  return <FaRegHeart className={className ?? "w-6 h-6"} />;
}

