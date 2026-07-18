import { bookmarkPost, removeBookmark } from "@/service/user";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const PUT = withAuth(async (req, { user }) => {
  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = bookmark ? bookmarkPost : removeBookmark;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
});
