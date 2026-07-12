"use client";

import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => Promise<any>;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await onPostComment(comment);
      setComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between py-4 px-3"
    >
      <div className="flex items-center gap-x-2 flex-1 mr-4">
        <SmileIcon />
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
          className="text-md w-full bg-transparent border-none outline-none focus:outline-none disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={!comment.trim() || isLoading}
        className="font-bold text-blue-500 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

