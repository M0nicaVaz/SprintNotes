import { User } from './User';

export type Category = {
  id: number;
  name: 'emr' | 'medclub' | 'medtest';
};

export type Comment = {
  id: number;
  description: string;
  postId: number;
  authorId: string;
  createdAt: string;
  author: User;
};

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  authorId: string;
  author: User;
  categories: Category[];
  comments?: Comment[];
  _count?: {
    [key: string]: number;
  };
};
