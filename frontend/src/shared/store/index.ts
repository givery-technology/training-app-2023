import { configureStore } from '@reduxjs/toolkit';

import uiReducer, { uiSlice } from './UISlice';
import helloReducer, { helloSlice } from './HelloSlice';
import postReducer, { postSlice } from './PostSlice';
import userReducer, { userSlice } from './UserSlice';
import commentReducer, { commentSlice } from './CommentSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    post: postReducer,
    comment: commentReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
  ...postSlice.actions,
  ...commentSlice.actions,
  ...userSlice.actions,
  ...uiSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
