"use client";

import { useState } from "react";
import { ProfileUser } from "@/model/user";
import { Spinner } from "@/components/ui/Spinner";
import useSWR from "swr";
import Button from "./Button";
import useMe from "@/hooks/useMe";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username, id } = user;
  const { me, toggleFollow } = useMe();
  const myUsername = me?.username;

  // Sync with the user details cache key to apply optimistic updates
  const { mutate } = useSWR<ProfileUser>(`/api/users/${username}`);

  const [isUpdating, setIsUpdating] = useState(false);

  const followers = user.followers ?? [];
  const isFollowing = myUsername
    ? followers.some((f) => f.username === myUsername)
    : false;

  const handleFollowToggle = async () => {
    if (isUpdating || !me || !myUsername) return;

    setIsUpdating(true);

    try {
      const newFollowers = isFollowing
        ? followers.filter((f) => f.username !== myUsername)
        : [
            ...followers,
            {
              username: myUsername,
              image: me.image ?? undefined,
            },
          ];

      // 1. 상대방 프로필 캐시 낙관적 업데이트
      mutate(
        {
          ...user,
          followers: newFollowers,
        },
        { revalidate: false },
      );

      // 2. 내 팔로잉 캐시 낙관적 업데이트 및 API 호출
      await toggleFollow(id, { username: myUsername, image: me.image }, !isFollowing);

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
