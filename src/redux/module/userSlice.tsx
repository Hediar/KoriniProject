import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../../types/types';

const initialState: userType = {
  id: '1',
  email: 'test@mail.com',
  password: 'asdf'
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<userType>) => {
      return state;
    }
  }
});

export const { getUsers } = userSlice.actions;
export default userSlice.reducer;
