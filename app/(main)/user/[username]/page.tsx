import { auth } from "@/auth";
import { getUserProfile } from "@/service/user";
import { notFound, redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserProfile(username);
  return {
    title: user
      ? `${user.name} (@${user.username}) • Instagram Photos`
      : "User Not Found",
  };
}

export default async function UserPage({ params }: Props) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const { username } = await params;
  const profileUser = await getUserProfile(username);

  if (!profileUser) {
    notFound();
  }

  return <UserProfile initialUser={profileUser} />;
}
