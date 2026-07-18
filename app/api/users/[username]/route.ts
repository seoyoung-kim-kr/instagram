import { getUserProfile } from "@/service/user";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, { params }) => {
  const { username } = await params;

  return getUserProfile(username).then((data) => {
    if (!data) {
      return new Response("User not found", { status: 404 });
    }
    return NextResponse.json(data);
  });
});
