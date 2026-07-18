import { getFollowingPostsOf, createPost } from "@/service/post";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, { user }) => {
  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data),
  );
});

export const POST = withAuth(async (req, { user }) => {
  try {
    const form = await req.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Missing text or file", { status: 400 });
    }

    return createPost(user.id, text, file).then((data) =>
      NextResponse.json(data),
    );
  } catch (error) {
    console.error("Failed to create post", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
