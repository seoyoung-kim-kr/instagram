"use client";

import { useState } from "react";
import { ProfileUser } from "@/model/user";
import { Spinner } from "@/components/ui/Spinner";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Button from "./Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username, id } = user;
  const { data: session } = useSession();
  const myUsername = session?.user?.username;

  // Sync with the user details cache key to apply optimistic updates
  const { mutate } = useSWR<ProfileUser>(`/api/users/${username}`);

  const [isUpdating, setIsUpdating] = useState(false);

  const followers = user.followers ?? [];
  const isFollowing = myUsername
    ? followers.some((f) => f.username === myUsername)
    : false;

  const handleFollowToggle = async () => {
    if (isUpdating || !myUsername) return;

    setIsUpdating(true);

    try {
      const newFollowers = isFollowing
        ? followers.filter((f) => f.username !== myUsername)
        : [
            ...followers,
            {
              username: myUsername,
              image: session?.user?.image ?? undefined,
            },
          ];

      mutate(
        {
          ...user,
          followers: newFollowers,
        },
        { revalidate: false },
      );

      const res = await fetch("/api/follow", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          flow: !isFollowing,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update follow");
      }

      mutate();
    } catch (err) {
      console.error(err);
      mutate();
    } finally {
      setIsUpdating(false);
    }
  };

  if (!myUsername || myUsername === username) {
    return null;
  }

  return (
    <Button
      text={
        isUpdating ? (
          <Spinner className="size-4" />
        ) : isFollowing ? (
          "Unfollow"
        ) : (
          "Follow"
        )
      }
      onClick={handleFollowToggle}
      disabled={isUpdating}
      red={isFollowing}
    />
  );
}
