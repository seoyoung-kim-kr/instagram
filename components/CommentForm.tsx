import React from "react";
import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center justify-between py-4 px-3">
      <div className="flex items-center gap-x-2 flex-1 mr-4">
        <SmileIcon />
        <input
          type="text"
          placeholder="Add a comment..."
          className="text-md w-full bg-transparent border-none outline-none focus:outline-none"
        />
      </div>
      <button className="font-bold text-blue-500 shrink-0">Post</button>
    </form>
  );
}
