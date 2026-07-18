import { getLikedPosts, getSavedPosts, getUserPosts } from "@/service/post";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, { params }) => {
  const { username } = await params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "posts";

  let queryFunction = getUserPosts;
  if (type === "saved") {
    queryFunction = getSavedPosts;
  } else if (type === "liked") {
    queryFunction = getLikedPosts;
  }

  return queryFunction(username).then((data) => NextResponse.json(data));
});
