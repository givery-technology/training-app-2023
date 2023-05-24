export type Comment = {
  id: number;
  post_id: number;
  body: string;
  user_id: number;
  username: string;
  created_at?: string;
  updated_at?: string;
};