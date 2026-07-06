import { FaTh } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function PostIcon({ className }: Props) {
  return <FaTh className={className || "w-6 h-6"} />;
}
