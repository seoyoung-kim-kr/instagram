import { FaUserTimes } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function UserTimesIcon({ className }: Props) {
  return <FaUserTimes className={className || "w-8 h-8"} />;
}
