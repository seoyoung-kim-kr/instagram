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
          image,
          email,
          username: email?.split("@")[0],
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
