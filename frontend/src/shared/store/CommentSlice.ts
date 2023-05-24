import { createSlice } from '@reduxjs/toolkit';
import { APIService } from '../services';

export type CommentState = {
  submitting: boolean;
};

export const initialState: CommentState = { submitting: false };

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.createComment.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(APIService.createComment.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.createComment.rejected, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updateComment.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(APIService.updateComment.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updateComment.rejected, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deleteComment.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(APIService.deleteComment.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deleteComment.rejected, (state) => {
      state.submitting = false;
    });
  },
});

export default commentSlice.reducer;
