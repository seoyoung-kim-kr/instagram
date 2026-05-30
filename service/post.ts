import { Post } from "@/model/post";
import { client } from "@/sanity/lib/client";
import { format } from "timeago.js"; // 💡 timeago 라이브러리 임포트

export async function getFollowingPostsOf(username: string): Promise<Post[]> {
  const posts = await client.fetch(
    `*[_type == "post" && author->username in *[_type == "user" && username == $username][0].following[]->username] 
    | order(_createdAt desc){
      "id": _id,
      "createdAt": _createdAt,
      "username": author->username,
      "userImage": author->image, 
      "photo": photo,
      "likes": likes[]->username,
      "likeCount": count(likes),
      "text": comments[0].comment,
      "comments": comments[]{
        "username": author->username,
        "userImage": author->image, 
        "text": comment,
        "createdAt": createdAt 
      }
    }`,
    { username },
  );

  return posts.map((post: any) => ({
    ...post,
    createdAt: format(post.createdAt, "ko"),
    comments:
      post.comments?.map((comment: any) => ({
        ...comment,
        createdAt: comment.createdAt ? format(comment.createdAt, "ko") : "",
      })) || [],
  }));
}
