import { createSlice } from '@reduxjs/toolkit';

import { Post, PostList } from '../models';
import { APIService } from '../services';

export type PostState = {
  posts: PostList[];
  post?: Post;
  submitting: boolean;
};

export const initialState: PostState = {
  posts: [],
  submitting: false,
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

    builder.addCase(APIService.createPost.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(APIService.createPost.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.createPost.rejected, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updatePost.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(APIService.updatePost.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updatePost.rejected, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deletePost.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(APIService.deletePost.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deletePost.rejected, (state) => {
      state.submitting = false;
    });
  },
});

export default postSlice.reducer;
