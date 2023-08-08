import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../module/userSlice';
import chatBotUISlice from '../module/chatBotUISlice';
import chatBotLogSlice from '../module/chatBotLogSlice';

const store = configureStore({
  reducer: {
    userSlice,
    chatBotUI: chatBotUISlice,
    chatBotLog: chatBotLogSlice,
  }
});

export default store;
