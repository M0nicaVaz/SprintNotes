import { Comment, Post } from './Post';

export type User = {
  id: string;
  name: string;
  bio: null | string;
  age: null | number;
  email: string;
  emailVerified: null | boolean;
  image: string;
  posts?: Post[];
  comments?: Comment[];
  _count?: {
    [key: string]: number;
  };
};
