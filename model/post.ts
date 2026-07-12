export type Comment = {
  comment: string;
  username: string;
  image?: string;
  createdAt: string;
};

export type SimplePost = {
  id: string;
  createdAt: string;
  username: string;
  userImage?: string;
  image: string;
  text: string;
  likes: string[];
  comment: number;
};

export type FullPost = SimplePost & {
  comments: Comment[];
};
