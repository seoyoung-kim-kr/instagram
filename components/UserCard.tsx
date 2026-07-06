import Link from "next/link";
import Avatar from "./Avatar";
import { SearchUser } from "@/model/user";

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { username, name, image, followers, following },
}: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center gap-x-4 p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 bg-white hover:bg-neutral-50/50 shadow-xs hover:shadow-sm transition-all duration-200"
    >
      <Avatar image={image} size="md" highlight={false} />
      <div className="flex flex-col flex-1 min-w-0">
        <p className="font-semibold text-neutral-900 truncate leading-5">
          {username}
        </p>
        <p className="text-neutral-500 text-sm truncate leading-4">{name}</p>
        <p className="text-neutral-400 text-xs mt-1 font-medium">
          {followers} {followers === 1 ? "follower" : "followers"} · {following}{" "}
          following
        </p>
      </div>
    </Link>
  );
}
