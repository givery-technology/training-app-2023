import { Comment } from '.';

export type PostList = {
  id: number;
  title: string;
  body: string;
  user_id: number;
  username: string;
  created_at?: string;
  updated_at?: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
  user_id: number;
  username: string;
  created_at?: string;
  updated_at?: string;
};