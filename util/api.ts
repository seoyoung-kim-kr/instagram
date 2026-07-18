import { auth } from "@/auth";
import { AuthUser } from "@/model/user";
import { NextRequest } from "next/server";

type AuthHandler = (
  req: NextRequest,
  context: { params: any; user: AuthUser },
) => Promise<Response>;

export function withAuth(handler: AuthHandler) {
  return async (req: NextRequest, context: any) => {
    const session = await auth();
    const user = session?.user as AuthUser | undefined;

    if (!user) {
      return new Response("Auth required", { status: 401 });
    }

    return handler(req, { ...context, user });
  };
}
