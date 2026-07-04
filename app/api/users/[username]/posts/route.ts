import { auth } from "@/auth";
import { getLikedPosts, getSavedPosts, getUserPosts } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Auth required", { status: 401 });
  }

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
}
