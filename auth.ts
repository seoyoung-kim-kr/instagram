import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addOAuthUser } from "./service/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      const googleId = account?.providerAccountId || user.id;

      if (!user.email || !googleId) return false;

      try {
        await addOAuthUser({
          id: googleId,
          name: user.name ?? "",
          email: user.email,
          image: user.image,
        });
        return true;
      } catch (error) {
        console.error("Failed to add OAuth user", error);
        return false;
      }
    },

    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0],
        };
      }
      return session;
    },
  },
});
