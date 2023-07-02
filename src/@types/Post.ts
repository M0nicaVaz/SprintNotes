import { User } from './User';

export type Category = {
  id: number;
  name: 'emr' | 'medclub' | 'medtest';
};

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  authorId: string;
  author: User;
  categories: Category[];
};
