import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import NewPost from "@/components/NewPost";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};

export default async function NewPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <NewPost user={session.user} />;
}
