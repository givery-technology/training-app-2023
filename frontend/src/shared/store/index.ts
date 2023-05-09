import { configureStore } from '@reduxjs/toolkit';

import uiReducer, { uiSlice } from './UISlice';
import helloReducer, { helloSlice } from './HelloSlice';
import postReducer, { postSlice } from './PostSlice';
import userReducer, { userSlice } from './UserSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    post: postReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
  ...postSlice.actions,
  ...userSlice.actions,
  ...uiSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
