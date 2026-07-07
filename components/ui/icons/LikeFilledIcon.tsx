import { FaHeart } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function LikeFilledIcon({ className }: Props) {
  return <FaHeart className={className ?? "w-6 h-6 text-red-500"} />;
}
