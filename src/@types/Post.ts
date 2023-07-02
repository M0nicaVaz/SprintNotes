export type Author = {
  id: string;
  name: string;
  bio: null | string;
  age: null | number;
  email: string;
  emailVerified: null | boolean;
  image: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  authorId: string;
  author: Author;
  categories: Category[];
};
