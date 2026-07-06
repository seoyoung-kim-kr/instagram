"use client";

import useSWR from "swr";
import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  initialUser: ProfileUser;
};

export default function UserProfile({ initialUser }: Props) {
  // SWR for user profile details (auto-revalidates and allows mutations)
  const { data: profile } = useSWR<ProfileUser>(
    `/api/users/${initialUser.username}`,
    { fallbackData: initialUser },
  );

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-y-6 md:gap-x-16 px-4">
      {/* Avatar */}
      <div className="shrink-0 md:pl-6">
        <Avatar image={profile?.image} size="lg" highlight={false} />
      </div>

      {/* User Details */}
      <div className="flex-1 flex flex-col items-center md:items-start space-y-6 text-center md:text-left min-w-0">
        <div className="flex flex-col sm:flex-row items-center gap-y-3 sm:gap-x-5 w-full justify-center md:justify-start">
          <h1 className="text-2xl font-light text-neutral-800 truncate">
            {profile?.username}
          </h1>
          {profile && <FollowButton user={profile} />}
        </div>

        {/* Counts */}
        <div className="flex items-center gap-x-8 text-neutral-700 text-sm md:text-base">
          <div>
            <span className="font-semibold text-neutral-900 mr-1">
              {profile?.posts ?? 0}
            </span>
            posts
          </div>
          <div>
            <span className="font-semibold text-neutral-900 mr-1">
              {profile?.followers?.length ?? 0}
            </span>
            followers
          </div>
          <div>
            <span className="font-semibold text-neutral-900 mr-1">
              {profile?.following?.length ?? 0}
            </span>
            following
          </div>
        </div>

        {/* Name & Bio */}
        <div className="space-y-1">
          <h2 className="font-semibold text-neutral-900 text-base">
            {profile?.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
