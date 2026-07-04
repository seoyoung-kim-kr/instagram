import { auth } from "@/auth";
import { getUserProfile } from "@/service/user";
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

  return getUserProfile(username).then((data) => {
    if (!data) {
      return new Response("User not found", { status: 404 });
    }
    return NextResponse.json(data);
  });
}
