import { FaRegHeart, FaHeart } from "react-icons/fa";

type Props = {
  className?: string;
  filled?: boolean;
};

export default function LikeIcon({ className, filled = false }: Props) {
  return filled ? (
    <FaHeart className={className || "w-6 h-6"} />
  ) : (
    <FaRegHeart className={className || "w-6 h-6"} />
  );
}
