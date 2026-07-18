import { dislikePost, likePost } from "@/service/post";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const PUT = withAuth(async (req, { user }) => {
  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(id, user.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
});
