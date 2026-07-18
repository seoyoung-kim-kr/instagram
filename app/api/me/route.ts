import { getUserByUsername } from "@/service/user";
import { withAuth } from "@/util/api";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, { user }) => {
  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data),
  );
});
