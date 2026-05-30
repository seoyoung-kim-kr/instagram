// service/user.ts
import { client } from "@/sanity/lib/client";
import { User } from "@/model/user";

export async function addUser({ id, username, email, name, image }: User) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image: image ?? "",
    following: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id": _id,
    following[]->{username, image},
    followers[]->{username, image},
    "bookmarks": bookmarks[]->_id
    }`,
    { username: username },
  );
}
