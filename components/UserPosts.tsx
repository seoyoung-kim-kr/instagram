"use client";

import { useState } from "react";
import { ProfileUser } from "@/model/user";
import usePosts from "@/hooks/usePosts";
import PostGrid from "./PostGrid";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import LikeIcon from "./ui/icons/LikeIcon";

type Props = {
  user: ProfileUser;
};

type TabType = "posts" | "saved" | "liked";

export default function UserPosts({ user }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("posts");

  // Fetch posts corresponding to the current active tab
  const { posts, isLoading, error } = usePosts(user.username, activeTab);

  const tabs = [
    {
      type: "posts" as TabType,
      label: "POSTS",
      icon: <PostIcon className="size-3.5" />,
    },
    {
      type: "saved" as TabType,
      label: "SAVED",
      icon: <BookmarkIcon className="size-3.5" filled />,
    },
    {
      type: "liked" as TabType,
      label: "LIKED",
      icon: <LikeIcon className="size-3.5" filled />,
    },
  ];

  return (
    <section className="w-full flex flex-col space-y-12">
      {/* Tabs Menu */}
      <ul className="border-t border-neutral-200 flex justify-center gap-x-12 md:gap-x-16 text-xs tracking-widest text-neutral-400 font-semibold select-none">
        {tabs.map(({ type, label, icon }) => (
          <li key={type}>
            <button
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
          </li>
        ))}
      </ul>

      {/* Tab Posts Grid */}
      <div className="px-1 md:px-0">
        {error ? (
          <div className="p-4 bg-red-50 text-red-500 rounded-xl text-center text-sm font-medium">
            게시물을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
          </div>
        ) : (
          <PostGrid posts={posts} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
}
