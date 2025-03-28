import { configureStore } from '@reduxjs/toolkit';
import farmerReducer from './farmerSlice';

export const store = configureStore({
  reducer: {
    farmer: farmerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;