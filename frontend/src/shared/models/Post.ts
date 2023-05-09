export type PostList = {
  id: number;
  title: string;
  body: string;
  user_id: number;
  user_name: string;
  created_at?: string;
  updated_at?: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  user_id: number;
  user_name: string;
  created_at?: string;
  updated_at?: string;
};