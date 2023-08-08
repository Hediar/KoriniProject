import { createSlice } from "@reduxjs/toolkit";

export interface ChatLogState {
  id: string;
  chatRes: string;
}

export interface RootState {
  logs: ChatLogState[];
}

const initialState: RootState = {
  logs: []
}

const chatBotLogSlice = createSlice({
  name: 'chatBotLog',
  initialState,
  reducers: {
    addChatLog: (state, action) => {
      state.logs.push({
        id: action.payload.id,
        chatRes: action.payload.chatRes,
      });
    }
  }
});

export const { addChatLog } = chatBotLogSlice.actions;
export default chatBotLogSlice.reducer;