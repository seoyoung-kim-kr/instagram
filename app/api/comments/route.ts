import { addComment } from "@/service/post";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const POST = withAuth(async (req, { user }) => {
  const { id, comment } = await req.json();

  if (!id || !comment?.trim()) {
    return new Response("Bad Request", { status: 400 });
  }

  return addComment(id, user.id, comment)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
});
