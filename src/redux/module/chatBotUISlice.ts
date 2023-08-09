import { createSlice } from '@reduxjs/toolkit';
import { ChatBotState } from '../../types/types';

const initialState: ChatBotState = {
  chatBotIsActive: false,
};

const chatBotUISlice = createSlice({
  name: 'chatBotUI',
  initialState,
  reducers: {
    toggleChatBotState: (state) => {
      state.chatBotIsActive = !state.chatBotIsActive;
    },
  },
});

export const { toggleChatBotState } = chatBotUISlice.actions;
export default chatBotUISlice.reducer;
