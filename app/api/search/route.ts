import { auth } from "@/auth";
import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Auth required", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || undefined;

  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
