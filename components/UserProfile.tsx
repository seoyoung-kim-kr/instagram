"use client";

import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { ProfileUser } from "@/model/user";
import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import PostGrid from "./PostGrid";
import { FaTh, FaBookmark, FaHeart } from "react-icons/fa";

type Props = {
  initialUser: ProfileUser;
};

type TabType = "posts" | "saved" | "liked";

export default function UserProfile({ initialUser }: Props) {
  const { data: session } = useSession();
  const myUsername = session?.user?.username;

  // SWR for user profile details (auto-revalidates and allows mutations)
  const { data: profile } = useSWR<ProfileUser>(
    `/api/users/${initialUser.username}`,
    { fallbackData: initialUser },
  );

  const [activeTab, setActiveTab] = useState<TabType>("posts");

  // SWR for tab posts
  const { data: posts, isLoading: isPostsLoading } = useSWR<SimplePost[]>(
    `/api/users/${initialUser.username}/posts?type=${activeTab}`,
  );

  const tabs = [
    {
      type: "posts" as TabType,
      label: "POSTS",
      icon: <FaTh className="size-3.5" />,
    },
    {
      type: "saved" as TabType,
      label: "SAVED",
      icon: <FaBookmark className="size-3.5" />,
    },
    {
      type: "liked" as TabType,
      label: "LIKED",
      icon: <FaHeart className="size-3.5" />,
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col p-4 md:py-12 space-y-12">
      {/* Header Info */}
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

      {/* Tabs Menu */}
      <div className="border-t border-neutral-200 flex justify-center gap-x-12 md:gap-x-16 text-xs tracking-widest text-neutral-400 font-semibold select-none">
        {tabs.map(({ type, label, icon }) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex items-center gap-x-2 py-4 border-t-2 transition-colors duration-150 cursor-pointer ${
              activeTab === type
                ? "border-neutral-800 text-neutral-800 mt-[2px]"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Posts Grid */}
      <div className="px-1 md:px-0">
        <PostGrid posts={posts} isLoading={isPostsLoading} />
      </div>
    </section>
  );
}
