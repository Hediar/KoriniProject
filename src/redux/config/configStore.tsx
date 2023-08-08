import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../module/userSlice';
import chatBotSlice from '../module/chatBotSlice';

const store = configureStore({
  reducer: {
    userSlice,
    chatBot: chatBotSlice,
  }
});

export default store;
