import { configureStore } from '@reduxjs/toolkit';

import helloReducer, { helloSlice } from './HelloSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
