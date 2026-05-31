import { auth } from "@/auth";
import { getPost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Context) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Auth required", { status: 401 });
  }

  const { id } = await params;
  return getPost(id).then((data) => NextResponse.json(data));
}
