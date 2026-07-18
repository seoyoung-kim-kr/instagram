import { FullPost, SimplePost } from "@/model/post";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

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
      "comment": count(comments),
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
      { username },
    )
    .then(mapPosts);
}

export async function getSavedPosts(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == $username][0].bookmarks[]-> | order(_createdAt desc){${simplePostProjection}}`,
      { username },
    )
    .then(mapPosts);
}

export async function getLikedPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && $username in likes[]->username] | order(_createdAt desc){${simplePostProjection}}`,
      { username },
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return (posts || []).map((post: SimplePost) => ({
    ...post,
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [{ _type: "reference", _ref: userId }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string,
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        _type: "comment",
        author: { _type: "reference", _ref: userId },
        comment,
        createdAt: new Date().toISOString(),
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  return client.assets.upload("image", file).then((result) => {
    return client.create(
      {
        _type: "post",
        author: { _type: "reference", _ref: userId },
        photo: {
          _type: "image",
          asset: { _type: "reference", _ref: result._id },
        },
        comments: [
          {
            _type: "comment",
            author: { _type: "reference", _ref: userId },
            comment: text,
            createdAt: new Date().toISOString(),
          },
        ],
        likes: [],
      },
      { autoGenerateArrayKeys: true },
    );
  });
}
