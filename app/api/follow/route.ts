import { follow, getUserIdByUsername, unfollow } from "@/service/user";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const PUT = withAuth(async (req, { user }) => {
  const { id: targetId, flow } = await req.json();

  if (!targetId || flow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const myId = await getUserIdByUsername(user.username);

  if (!myId) {
    return new Response("Logged in user not found", { status: 404 });
  }

  const service = flow ? follow : unfollow;

  return service(myId, targetId)
    .then(() => NextResponse.json({ success: true }))
    .catch((error) => new Response(error.message, { status: 500 }));
});
