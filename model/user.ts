export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, "username" | "image">;

// User + Detail field
export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchedUser = User & {
  following: number;
  followers: number;
};

export type ProfileUser = DetailUser & {
  posts: number;
};
