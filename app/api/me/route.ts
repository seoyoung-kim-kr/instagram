import { auth } from "@/auth";
import { getUserByUsername } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Auth required", { status: 401 });
  }

  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data),
  );
}
