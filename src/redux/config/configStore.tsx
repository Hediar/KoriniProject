import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../module/userSlice';
import chatBotUISlice from '../module/chatBotUISlice';
import chatLogSlice from '../module/chatLogSlice';

const store = configureStore({
  reducer: {
    userSlice,
    chatBotUI: chatBotUISlice,
    chatBotLog: chatLogSlice,
  }
});

export default store;
