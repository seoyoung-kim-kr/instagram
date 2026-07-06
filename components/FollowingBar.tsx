"use client";

import Avatar from "./Avatar";
import Link from "next/link";
import { Spinner } from "./ui/Spinner";
import useSWR from "swr";
import { HomeUser } from "@/model/user";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<HomeUser>("/api/me");
  const users = data?.following;

  if (error)
    return (
      <p className="bg-red-100 text-red-400 px-4 py-4 rounded-lg">
        error: {error.message}
      </p>
    );
  return (
    <section className="flex items-center justify-center flex-col min-h-22.5 border border-neutral-200 rounded-md p-4">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        (!users || users.length === 0) && (
          <p className="text-center font-semibold text-sm ">
            You dont' have following.
          </p>
        )
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }) => (
            <div className="flex flex-col items-center justify-center">
              <Link key={username} href={`/user/${username}`}>
                <Avatar image={image} size="lg" />
                <p className="text-sm truncate w-16 text-center">{username}</p>
              </Link>
            </div>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
