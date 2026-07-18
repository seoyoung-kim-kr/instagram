import { auth } from "@/auth";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import UserPosts from "@/components/UserPosts";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: Promise<{ username: string }>;
};

const getUser = cache(async (username: string) => {
  return await getUserProfile(username);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUser(username);
  return {
    title: user
      ? `${user.name} (@${user.username}) • Instantgram Photos`
      : "User Not Found",
    description: `${user?.name} posts on Instantgram`,
  };
}

export default async function UserPage({ params }: Props) {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  const { username } = await params;
  const profileUser = await getUser(username);

  if (!profileUser) {
    notFound();
  }

  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col p-4 md:py-12 space-y-12">
      <UserProfile initialUser={profileUser} />
      <UserPosts user={profileUser} />
    </section>
  );
}
