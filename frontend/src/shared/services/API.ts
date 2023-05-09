import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hello, PostList, Post, APIListResponse } from '../models';

const API_ENDPOINT_PATH =
  import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});

export const getPostList = createAsyncThunk<APIListResponse<PostList>>('getPostList', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/posts`);
  return await response.json();
});

export const getPost = createAsyncThunk<Post, number>('getPost', async (postId: number) => {
  const response = await fetch(`${API_ENDPOINT_PATH}/posts/${postId}`);
  return await response.json();
});