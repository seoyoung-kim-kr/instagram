import { FullPost, SimplePost } from "@/model/post";
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
    "comment": count(comments),
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

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == $id][0]{
      ...,
      "id": _id,
      "createdAt": _createdAt,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{
        comment, "username": author->username, "image": author->image, "createdAt": createdAt
      }
    }`,
      { id },
    )
    .then((post: FullPost) => ({ ...post, image: urlFor(post.image) }));
}

export async function getUserPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == $username] | order(_createdAt desc){${simplePostProjection}}`,
      { username }
    )
    .then(mapPosts);
}

export async function getSavedPosts(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == $username][0].bookmarks[]-> | order(_createdAt desc){${simplePostProjection}}`,
      { username }
    )
    .then(mapPosts);
}

export async function getLikedPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && $username in likes[]->username] | order(_createdAt desc){${simplePostProjection}}`,
      { username }
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return (posts || []).map((post: SimplePost) => ({
    ...post,
    image: urlFor(post.image),
  }));
}
