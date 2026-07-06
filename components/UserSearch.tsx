"use client";

import { useState } from "react";
import useSearch from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";
import UserCard from "@/components/UserCard";
import { Spinner } from "@/components/ui/Spinner";
import SearchIcon from "@/components/ui/icons/SearchIcon";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const { users, isLoading, error } = useSearch(debouncedKeyword);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl mx-auto space-y-4 py-10">
      <form onSubmit={onSubmit} className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-neutral-400" />
        </div>
        <input
          type="text"
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for a username or name..."
          className="block w-full pl-11 pr-12 py-3 border border-neutral-200 rounded-2xl bg-neutral-50 focus:bg-white text-base focus:ring-3 focus:ring-neutral-100 focus:border-neutral-300 transition-all duration-200 placeholder-neutral-400 focus:outline-none"
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <Spinner className="text-neutral-400 size-5" />
          </div>
        )}
      </form>

      <div className="flex-1">
        {error && (
          <div className="p-4 bg-red-50 text-red-500 rounded-xl text-center text-sm font-medium">
            Error loading users. Please try again.
          </div>
        )}

        {!isLoading && !error && (!users || users.length === 0) && (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg font-semibold text-neutral-600">
              No users found
            </p>
            <p className="text-sm mt-1">Try searching for something else</p>
          </div>
        )}

        {!error && users && users.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {users.map((user) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
