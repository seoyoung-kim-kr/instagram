import { auth } from "@/auth";
import { follow, getUserIdByUsername, unfollow } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Auth required", { status: 401 });
  }

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
}
