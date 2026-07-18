import { getPost } from "@/service/post";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export const GET = withAuth(async (_, { params }) => {
  const { id } = await params;
  return getPost(id).then((data) => NextResponse.json(data));
});
