import { SimplePost } from "@/model/post";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { format } from "timeago.js";

const simplePostProjection = `
    ...,
    "id": _id,
    "createdAt": _createdAt,
    "username": author->username,
    "userImage": author->image,
    "image":photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
`;

export async function getFollowingPostsOf(username: string) {
  return await client
    .fetch(
      `*[_type == "post" && (author->username == $username || author._ref in *[_type == "user" && username == $username][0].following[]._ref)] 
    | order(_createdAt desc){${simplePostProjection}}`,
      { username },
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        image: urlFor(post.image),
      })),
    );
}
