import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/types';

const initialState: UserType = {
  id: '1',
  email: 'test@mail.com',
  password: 'asdf'
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<UserType>) => {
      return state;
    }
  }
});

export const { getUsers } = userSlice.actions;
export default userSlice.reducer;
