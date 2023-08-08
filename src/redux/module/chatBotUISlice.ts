import { createSlice } from '@reduxjs/toolkit';

export interface ChatBotState {
  chatBotIsActive: boolean;
}

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
