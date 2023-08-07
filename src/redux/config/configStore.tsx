import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../module/userSlice';

const store = configureStore({
  reducer: {
    userSlice
  }
});

export default store;
