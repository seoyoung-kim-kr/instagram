import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addUser } from "./service/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { id, name, image, email }, account }) {
      const googleId = account?.providerAccountId || id;

      if (!email || !googleId) return false;

      try {
        await addUser({
          id: googleId,
          name: name ?? "",
          image: image ?? undefined,
          email,
          username: email?.split("@")[0],
        });
        return true;
      } catch (error) {
        console.error("Failed to add OAuth user", error);
        return false;
      }
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = account.providerAccountId || user.id;
      }
      return token;
    },

    async session({ session, token }) {
      const user = session?.user;
      if (user && token) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0],
          id: token.id as string,
        };
      }
      return session;
    },
  },
});
