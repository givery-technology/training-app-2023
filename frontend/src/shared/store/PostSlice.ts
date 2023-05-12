import { createSlice } from '@reduxjs/toolkit';

import { Post, PostList } from '../models';
import { APIService } from '../services';

export type PostState = {
  posts: PostList[];
  post?: Post;
};

export const initialState: PostState = {
  posts: []
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.getPostList.fulfilled, (state, action) => {
      state.posts = action.payload.list;
    });

    builder.addCase(APIService.getPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export default postSlice.reducer;