import { createSlice } from '@reduxjs/toolkit';

export interface ChatBotState {
  chatBotIsActive: boolean;
}

const initialState: ChatBotState = {
  chatBotIsActive: false,
};

const chatBotSlice = createSlice({
  name: 'chatBotState',
  initialState,
  reducers: {
    toggleChatBotState: (state) => {
      state.chatBotIsActive = !state.chatBotIsActive;
    },
  },
});

export const { toggleChatBotState } = chatBotSlice.actions;
export default chatBotSlice.reducer;
