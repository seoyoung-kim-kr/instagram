import { auth } from "@/auth";
import { getFollowingPostsOf, createPost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Auth required", { status: 401 });
  }

  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data),
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Auth required", { status: 401 });
  }

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
}
