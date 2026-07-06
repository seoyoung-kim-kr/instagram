import { FaSearch } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function SearchIcon({ className }: Props) {
  return <FaSearch className={className || "w-7 h-7"} />;
}

