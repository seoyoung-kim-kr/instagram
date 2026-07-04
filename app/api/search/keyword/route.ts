import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || undefined;

  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
