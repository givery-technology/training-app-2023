import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hello, PostList, Post, APIListResponse, User } from '../models';

const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, {
    ...init,
    credentials: 'include',
    mode: 'cors',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  });

  return response.status === 204
    ? await response.text()
    : await response.json();
};

const API_ENDPOINT_PATH = import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/hello`);
});

export const getPostList = createAsyncThunk<APIListResponse<PostList>>(
  'getPostList',
  async () => {
    return await customFetch(`${API_ENDPOINT_PATH}/posts`);
  }
);

export const getPost = createAsyncThunk<Post, number>(
  'getPost',
  async (postId: number) => {
    return await customFetch(`${API_ENDPOINT_PATH}/posts/${postId}`);
  }
);

export const createPost = createAsyncThunk<
  Post,
  { title: string; body: string }
>('createPost', async (body) => {
  return await customFetch(`${API_ENDPOINT_PATH}/posts`, {
    method: 'post',
    body: JSON.stringify(body),
  });
});

export const updatePost = createAsyncThunk<
  Post,
  { postId: number; title: string; body: string }
>('updatePost', async ({ postId, ...body }) => {
  return await customFetch(`${API_ENDPOINT_PATH}/posts/${postId}`, {
    method: 'put',
    body: JSON.stringify(body),
  });
});

export const deletePost = createAsyncThunk<Post, number>(
  'deletePost',
  async (postId) => {
    return await customFetch(`${API_ENDPOINT_PATH}/posts/${postId}`, {
      method: 'delete',
    });
  }
);

export const signIn = createAsyncThunk<
  User,
  { username: string; password: string }
>('signIn', async (body) => {
  return await customFetch(`${API_ENDPOINT_PATH}/signin`, {
    method: 'post',
    body: JSON.stringify(body),
  });
});

export const signOut = createAsyncThunk('signOut', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/signout`, { method: 'post' });
});

export const getUser = createAsyncThunk<User>('getUser', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/user`);
});
