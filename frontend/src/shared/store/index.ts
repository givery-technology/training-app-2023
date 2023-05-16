import { configureStore } from '@reduxjs/toolkit';

import helloReducer, { helloSlice } from './HelloSlice';
import appReducer, { appSlice } from './AppSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    app: appReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
  ...appSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
