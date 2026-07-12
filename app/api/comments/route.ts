import { auth } from "@/auth";
import { addComment } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Required", { status: 401 });
  }

  const { id, comment } = await req.json();

  if (!id || !comment?.trim()) {
    return new Response("Bad Request", { status: 400 });
  }

  return addComment(id, user.id, comment)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
