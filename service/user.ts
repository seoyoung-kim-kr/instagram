import { client } from "@/sanity/lib/client";
import { User, SearchUser, ProfileUser } from "@/model/user";

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

export async function searchUsers(keyword?: string): Promise<SearchUser[]> {
  const query = keyword
    ? `*[_type == "user" && (username match $keyword || name match $keyword)]`
    : `*[_type == "user"]`;
  return client.fetch(
    `${query}{
      ...,
      "id": _id,
      "following": coalesce(count(following), 0),
      "followers": coalesce(count(followers), 0)
    }`,
    keyword ? { keyword: `${keyword}*` } : {}
  );
}

export async function getUserProfile(username: string): Promise<ProfileUser | null> {
  return client.fetch(
    `*[_type == "user" && username == $username][0]{
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "posts": count(*[_type == "post" && author->username == $username])
    }`,
    { username }
  );
}

export async function getUserIdByUsername(username: string): Promise<string | null> {
  return client.fetch(
    `*[_type == "user" && username == $username][0]._id`,
    { username }
  );
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (p) =>
      p.setIfMissing({ following: [] }).append("following", [
        { _type: "reference", _ref: targetId },
      ])
    )
    .patch(targetId, (p) =>
      p.setIfMissing({ followers: [] }).append("followers", [
        { _type: "reference", _ref: myId },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (p) => p.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (p) => p.unset([`followers[_ref=="${myId}"]`]))
    .commit();
}


