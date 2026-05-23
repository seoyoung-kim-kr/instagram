// proxy.ts (또는 middleware.ts)
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isSignInPage = nextUrl.pathname === "/sign-in";

  if (!isLoggedIn && !isSignInPage) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);

    return Response.redirect(
      new URL(`/sign-in?callbackUrl=${callbackUrl}`, nextUrl),
    );
  }

  if (isLoggedIn && isSignInPage) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

/*
 * 아래 경로를 제외한 모든 주소에 미들웨어를 적용합니다.
 * - api (인증 API 라우트 영역은 통과시켜야 함)
 * - _next/static, _next/image (Next.js 정적 파일들)
 * - favicon.ico (파비콘)
 * - signIn (로그인 페이지 자체는 비로그인 상태로 접근 가능해야 함!)
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
