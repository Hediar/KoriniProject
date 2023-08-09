import { configureStore } from '@reduxjs/toolkit';
import chatBotUISlice from '../module/chatBotUISlice';
import chatBotLogSlice from '../module/chatBotLogSlice';
import userSlice from '../module/userSlice';
import modalSlice from '../module/modalSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    chatBotUI: chatBotUISlice,
    chatBotLog: chatBotLogSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
