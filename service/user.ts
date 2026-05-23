// service/user.ts
import { writeClient } from "@/sanity/lib/client";

interface OAuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export async function addOAuthUser({ id, name, email, image }: OAuthUser) {
  const username = email.split("@")[0];

  return writeClient.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    name,
    email,
    image: image ?? "",
    following: [],
    bookmarks: [],
  });
}
