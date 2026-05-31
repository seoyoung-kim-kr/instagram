export type Comment = {
  comment: string;
  username: string;
  image?: string;
  createdAt: string;
};

export type SimplePost = Omit<FullPost, "comments"> & {
  comment: number;
};

export type FullPost = {
  id: string;
  createdAt: string;
  username: string;
  userImage?: string;
  image: string;
  text: string;
  likes: string[];
  comments: Comment[];
};
