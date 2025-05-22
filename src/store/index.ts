import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './slices';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // example: exampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
