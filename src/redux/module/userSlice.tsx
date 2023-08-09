import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/types';

interface UserState {
  user: UserType | null;
}

// user : email, name, userid
const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
