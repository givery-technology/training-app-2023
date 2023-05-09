import { configureStore } from '@reduxjs/toolkit';

import helloReducer, { helloSlice } from './HelloSlice';
import postReducer, { postSlice } from './PostSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    post: postReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
  ...postSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
