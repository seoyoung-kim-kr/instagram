export type Post = {
  id: string;
  createdAt: string;
  username: string;
  userImage?: string;
  photo: string;
  likes: string[];
  likeCount: number;
  text: string;
  comments: {
    username: string;
    userImage?: string;
    text: string;
    createdAt: string;
  }[];
};
